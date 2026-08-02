# Security Audit — Flora de Luxe Kyiv OPT

**Date:** 2026-08-02  
**Scope:** Tracked Git sources of this repository (first stage — analysis only)  
**Auditor role:** Application Security / Next.js / independent code review  
**Code changes in this stage:** none (this document only)

---

## 1. Executive summary

Flora de Luxe Kyiv OPT is a mostly **static** Next.js 16 App Router marketing site with:

- no authentication;
- no database;
- no public lead form mounted;
- order path via **Telegram** deep links;
- one lazy-loaded **Google Maps** iframe on contacts;
- one unused Server Action (`submitLead`) that remains in source but **does not appear** in the production server-reference manifest after `pnpm build`.

**No Critical findings** for the current public surface.  
**No live secrets** found in tracked files or safe Git-history pattern scans.  
**No P0 blockers** for a private/internal staging demo.

Main residual risks before a **public** staging/production deploy:

1. Missing **clickjacking** protections (`frame-ancestors` / `X-Frame-Options`).
2. No **Content-Security-Policy** (defense-in-depth).
3. **Privacy copy** does not clearly disclose Google Maps as a third party loaded on contacts.
4. **Transitive** `pnpm audit` High advisories under `next` (`sharp@0.34.5`, `postcss@8.4.31`) — limited practical reachability for this architecture, but should be tracked until Next ships patched nested versions.
5. Dead **LeadForm / submitLead** stack still in the repo (safe today because unused in production graph; risk rises if remounted without real delivery).

**Staging readiness (security):** acceptable for a closed/demo staging with HTTPS at the edge, after acknowledging header and privacy gaps.  
**Production readiness:** not yet — complete P1/P2 items below.

---

## 2. Architecture and attack surface

### 2.1 Inventory (tracked)

- ~180 tracked files via `git ls-files`
- No `middleware.ts` / `proxy.ts`
- No App Router `route.ts` API handlers in `src/`
- No `.github/` workflows
- No `.npmrc`
- No tracked `.env*` files

### 2.2 Pages (App Router)

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Static |
| `/assortment` | `src/app/assortment/page.tsx` | Static |
| `/supplies` | `src/app/supplies/page.tsx` | Static |
| `/suppliers` | `src/app/suppliers/page.tsx` | Static |
| `/about` | `src/app/about/page.tsx` | Static |
| `/faq` | `src/app/faq/page.tsx` | Static |
| `/contacts` | `src/app/contacts/page.tsx` | Static + Maps |
| `/privacy` | `src/app/privacy/page.tsx` | Static |
| 404 | `src/app/not-found.tsx` | Static |
| `/sitemap.xml` | `src/app/sitemap.ts` | Metadata |
| `/robots.txt` | `src/app/robots.ts` | Metadata |
| `/manifest.webmanifest` | `src/app/manifest.ts` | Metadata |
| `/icon`, `/apple-icon`, `/opengraph-image` | generated | Metadata |

All listed routes report as **static** (`○`) after `pnpm build`.

### 2.3 Server Actions / endpoints

| Item | Location | Production status |
| --- | --- | --- |
| `submitLead` | `src/lib/actions/submit-lead.ts` | **Not registered** in `.next/server/server-reference-manifest.json` (`node`/`edge` empty) |
| `deliverLead` | private helper in same file | Throws; only reachable if `submitLead` were live |
| `route.ts` / REST API | — | None in tracked `src/` |
| Middleware | — | None |

Only `"use server"` file: `src/lib/actions/submit-lead.ts`.

### 2.4 Client Components (browser JS)

Including: `site-header`, `mobile-menu`, `hero-visual`, `gallery-section`, `contact-map`, `reveal`, Radix UI wrappers (`accordion`, `dialog`, `sheet`, `field`), unused `lead-form`.

### 2.5 External URLs / third parties

| Destination | Source of truth | Usage |
| --- | --- | --- |
| `https://t.me/floradeluxekyiv_opt` | `src/lib/contact-config.ts` | CTAs via `telegramLink()` |
| `tel:+380688881008` | `contact-config.ts` | Phone links |
| Google Maps short + embed | `mapsUrl`, `mapsEmbedUrl` | Contacts iframe + links |
| Instagram URL | configured, **not rendered** in UI | Dead config |
| Google Fonts via `next/font` | `layout.tsx` | Self-hosted by Next at build |
| Fallback site URL | `NEXT_PUBLIC_SITE_URL` or `https://opt.floradeluxe.com.ua` | Canonical/sitemap/JSON-LD |

### 2.6 Environment variables

| Variable | Exposure | Usage |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public (by design) | `site-config.ts` |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Mentioned **only in comments** in `submit-lead.ts` | Not read at runtime |

### 2.7 User input (runtime)

**None on the public site today.**  
No mounted forms, no `searchParams` / `cookies()` / `headers()` consumers, no redirects from query strings.

Offline tooling (`scripts/import-opt-media.mjs`) fetches Telegram HTML/images for asset import — not part of the production request path.

---

## 3. Areas reviewed

- App / components / lib / content / scripts / public / docs  
- `package.json`, lockfile, `next.config.ts`, ESLint/TS configs, `.gitignore`  
- Server Actions + production server-reference manifest  
- XSS sinks, links, iframe, SVG  
- Secrets (tracked files + limited Git history patterns)  
- Client/server boundaries and production JS grep for token-like strings  
- Dependency advisories (`pnpm audit`, `pnpm outdated`, `pnpm why`)  
- Response headers from running production server  
- Privacy vs third-party behaviour  
- `pnpm lint` / `tsc` / `build` / `qa`

**Not deeply reviewed (binaries):** image/video bytes (paths and provenance only).

---

## 4. Threat model (current architecture)

| Threat | Relevance | Notes |
| --- | --- | --- |
| Anonymous internet attacker | Yes | Public static site |
| Malicious POST / Server Action abuse | Low today | `submitLead` absent from production manifest |
| XSS / HTML injection | Low | No user HTML; JSON-LD escapes `<` |
| Clickjacking | Medium | No `frame-ancestors` / `X-Frame-Options` |
| Open redirect | Low | `absoluteUrl` has `http` short-circuit but callers pass static paths |
| SSRF | Low (prod) | No server fetch from request input; import script is offline |
| Secret leak | Low | No live secrets in repo |
| Malicious / compromised npm package | Medium (supply chain) | Standard risk; advisories under `next` |
| Accidental publish of internals | Low | `public/` mostly media + `images/README.md` |
| Iframe abuse / Maps referrer | Low–Medium | Static Maps embed; loads Google when visible |
| Unsafe SVG | Low | One static brand SVG; no `dangerouslyAllowSVG` |
| Misconfigured production | Medium | Headers incomplete; site URL via env |

Out of scope / not applicable: auth bypass, IDOR, SQLi, session fixation (no auth/DB).

---

## 5. Critical findings

**None.**

---

## 6. High findings

### SEC-H1 — Transitive `sharp` (via `next`) below patched floor

| Field | Value |
| --- | --- |
| **ID** | SEC-H1 |
| **Severity** | High *(advisory)* / **Medium** *(practical reachability here)* |
| **Confidence** | High (version), Medium (exploitability) |
| **Category** | Supply chain / image processing |
| **Evidence** | `pnpm audit`: GHSA-f88m-g3jw-g9cj; `pnpm why sharp` → `sharp@0.34.5` under `next@16.2.12`. Project also has direct `sharp@0.35.3` (devDependency, patched). |
| **Attack scenario** | Malicious image crafted for libvips CVEs processed by Next image optimization. |
| **Conditions** | Attacker must get a malicious image into a path Next will process. This app has **no** `images.remotePatterns` / `domains` — only local `/public` assets. |
| **Impact** | Potential RCE/DoS in image pipeline on the Node host (deployment-dependent). |
| **Fix** | Wait for / upgrade to a Next release that bundles patched `sharp`, or vendor override after validating Next compatibility (separate hardening stage). |
| **Fix risk** | Medium (overrides can break Next image pipeline). |
| **Before staging** | Document accepted risk for closed staging. |
| **Before production** | Prefer patched transitive `sharp` or hosting that isolates image optimization. |

### SEC-H2 — Transitive `postcss` (via `next`) below patched floors

| Field | Value |
| --- | --- |
| **ID** | SEC-H2 |
| **Severity** | High *(advisory)* / **Low–Medium** *(runtime for this site)* |
| **Confidence** | High (version), Medium (reachability) |
| **Category** | Supply chain / build tooling |
| **Evidence** | GHSA-6g55-p6wh-862q, GHSA-r28c-9q8g-f849, GHSA-qx2v-qp2m-jg93; `postcss@8.4.31` under `next`. Direct/dev `postcss@8.5.25` is newer. |
| **Attack scenario** | Attacker-controlled CSS/`sourceMappingURL` during CSS tooling. |
| **Conditions** | Primarily **build-time** / tooling paths, not anonymous HTML page GET. |
| **Impact** | File disclosure / XSS in tooling contexts if untrusted CSS is processed. |
| **Fix** | Upgrade Next when nested `postcss` is patched; avoid processing untrusted CSS in CI. |
| **Fix risk** | Low–Medium. |
| **Before staging** | No urgent runtime block. |
| **Before production** | Track Next upgrade. |

---

## 7. Medium findings

### SEC-M1 — Missing clickjacking protections

| Field | Value |
| --- | --- |
| **ID** | SEC-M1 |
| **Severity** | Medium |
| **Confidence** | High |
| **Category** | Security headers |
| **File** | `next.config.ts` (headers block ~L11–21); confirmed absent on live responses |
| **Evidence** | Production responses lack `Content-Security-Policy` `frame-ancestors` and `X-Frame-Options`. |
| **Attack scenario** | Site embedded in attacker iframe for UI redress / clickjacking on Telegram CTAs. |
| **Conditions** | Attacker hosts a page framing this origin; user interaction. |
| **Impact** | Misleading clicks toward Telegram/phone; reputation risk. |
| **Fix** | Add `Content-Security-Policy: frame-ancestors 'self'` (preferred) and/or `X-Frame-Options: DENY`/`SAMEORIGIN`. |
| **Fix risk** | Low (unless legitimate embedding is required — currently not). |
| **Before staging (public)** | Yes. |
| **Before production** | Yes. |

### SEC-M2 — No Content-Security-Policy

| Field | Value |
| --- | --- |
| **ID** | SEC-M2 |
| **Severity** | Medium |
| **Confidence** | High |
| **Category** | Security headers / XSS defense-in-depth |
| **Evidence** | Header absent on `/`, `/contacts`, etc. |
| **Attack scenario** | Future XSS or injected third-party script would run without CSP constraints. |
| **Conditions** | Requires an injection vector (none confirmed today). |
| **Impact** | Weaker containment if XSS appears later. |
| **Fix** | Roll out CSP in Report-Only first (see §13), then enforce. |
| **Fix risk** | Medium — can break Maps / Next inline styles if over-strict. |
| **Before staging** | Report-Only recommended. |
| **Before production** | Enforcing CSP preferred. |

### SEC-M3 — Privacy page omits Google Maps third-party load

| Field | Value |
| --- | --- |
| **ID** | SEC-M3 |
| **Severity** | Medium |
| **Confidence** | High |
| **Category** | Privacy / third-party |
| **File** | `src/lib/content/privacy.ts` (cookies/analytics section); Maps: `src/components/sections/contact-map.tsx` |
| **Evidence** | Privacy states no advertising trackers / third-party analytics scripts. Contacts map mounts `iframe` to `google.com/maps` when near viewport. |
| **Scenario** | User opens `/contacts` and scrolls to map → browser requests Google; IP/UA/Referer may be visible to Google. |
| **Impact** | Documentation mismatch (technical, not a legal conclusion). |
| **Fix** | Disclose Maps embed + when it loads; keep lazy-load behaviour. |
| **Fix risk** | Low (copy change). |
| **Before staging** | Recommended. |
| **Before production** | Yes. |

---

## 8. Low findings

### SEC-L1 — Missing `Permissions-Policy`

| Field | Value |
| --- | --- |
| **ID** | SEC-L1 |
| **Severity** | Low |
| **Confidence** | High |
| **Category** | Security headers |
| **Evidence** | Not present on production responses. |
| **Impact** | Browser features not explicitly disabled (camera, mic, geolocation, etc.). |
| **Fix** | Add a restrictive `Permissions-Policy` allowing only what is needed (likely empty/deny-most). |
| **Fix risk** | Low; verify Maps still works. |
| **Staging / production** | P2/P3. |

### SEC-L2 — `.gitignore` gaps for some env filenames

| Field | Value |
| --- | --- |
| **ID** | SEC-L2 |
| **Severity** | Low |
| **Confidence** | High |
| **Category** | Secrets hygiene |
| **File** | `.gitignore` L18–19: `.env`, `.env*.local` |
| **Evidence** | Patterns do **not** ignore `.env.production` / `.env.development` (without `.local`). |
| **Impact** | Accidental commit risk if someone creates those filenames. |
| **Fix** | Add `.env.*` (and keep exceptions for `.env.example` if introduced). |
| **Fix risk** | Low. |

### SEC-L3 — Dead lead stack can mislead if remounted

| Field | Value |
| --- | --- |
| **ID** | SEC-L3 |
| **Severity** | Low |
| **Confidence** | High |
| **Category** | Dead code / integrity |
| **Files** | `src/lib/actions/submit-lead.ts`, `src/components/sections/lead-form.tsx` |
| **Evidence** | `deliverLead` throws; honeypot branch returns success text «Заявку прийнято» (L64–65); catch returns generic error. Not in production server-reference manifest. |
| **Impact** | If remounted without real delivery, users could see false success (honeypot) or errors — integrity/UX risk, not current HTTP surface. |
| **Fix** | Keep unmounted until delivery exists; or delete/gate behind explicit feature flag in a later stage. |
| **Staging / production** | Do not remount before delivery. |

### SEC-L4 — Maps iframe without `sandbox`

| Field | Value |
| --- | --- |
| **ID** | SEC-L4 |
| **Severity** | Low / Accepted risk |
| **Confidence** | High |
| **Category** | Iframe hardening |
| **File** | `src/components/sections/contact-map.tsx` ~L64–75 |
| **Evidence** | Static `src={contactConfig.mapsEmbedUrl}`; `loading="lazy"`; `title` set; `referrerPolicy="no-referrer-when-downgrade"`; no `sandbox`. |
| **Impact** | Full iframe capabilities for Google origin (expected for Maps). |
| **Fix** | Prefer leaving without sandbox (sandbox often breaks Maps). Rely on CSP `frame-src`. |
| **Accepted risk** | Yes, with static src + CSP later. |

---

## 9. Informational findings

### SEC-I1 — `absoluteUrl` accepts absolute `http(s)` strings

| Field | Value |
| --- | --- |
| **ID** | SEC-I1 |
| **Severity** | Informational |
| **File** | `src/lib/site-config.ts` L36–38 |
| **Evidence** | `if (pathname.startsWith("http")) return pathname;` |
| **Callers** | Static paths only (`sitemap.ts`, `seo.ts`, `robots.ts`). |
| **Note** | Not an open redirect today; harden if ever fed user input. |

### SEC-I2 — JSON-LD uses `dangerouslySetInnerHTML` safely

| Field | Value |
| --- | --- |
| **ID** | SEC-I2 |
| **Severity** | Informational |
| **File** | `src/components/seo/json-ld.tsx` L8–14 |
| **Evidence** | Payload from typed SEO helpers; `<` escaped to `\u003c`. Not user-controlled. |

### SEC-I3 — Hardcoded fallback site origin

| Field | Value |
| --- | --- |
| **ID** | SEC-I3 |
| **Severity** | Informational |
| **File** | `src/lib/site-config.ts` L11 |
| **Evidence** | Default `https://opt.floradeluxe.com.ua` if env unset. |
| **Impact** | Wrong canonical/sitemap hosts on misconfigured deploys — set `NEXT_PUBLIC_SITE_URL`. |

### SEC-I4 — Offline media import fetches Telegram

| Field | Value |
| --- | --- |
| **ID** | SEC-I4 |
| **Severity** | Informational |
| **File** | `scripts/import-opt-media.mjs` |
| **Evidence** | `fetch` to `t.me` + image URLs during local import. |
| **Impact** | Not production request path; SSRF only if script pointed at attacker URLs by a developer. |

### SEC-I5 — QA touch-target noise

| Field | Value |
| --- | --- |
| **ID** | SEC-I5 |
| **Severity** | Informational |
| **Evidence** | `pnpm qa` reports ~40 “under 44px” hits (skip-link / desktop nav). Not security issues. |

---

## 10. Dependency audit

### Direct production versions

| Package | Version |
| --- | --- |
| next | 16.2.12 |
| react / react-dom | 19.2.8 |
| zod | 4.4.3 |
| react-hook-form | 7.83.0 |
| lucide-react | 1.28.0 |
| Radix UI packages | pinned as in `package.json` |

No Git/tarball dependencies. No `overrides` / `patchedDependencies`. No custom lifecycle install scripts beyond Next defaults.

### `pnpm audit --audit-level low` (no `--fix`)

| Advisory | Package | Installed (path) | Severity | Direct? | Prod/Dev path | Patched | Reachable here? | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GHSA-f88m-g3jw-g9cj | sharp | 0.34.5 via `next` | High | Transitive | Prod (Next image) | ≥0.35.0 | Limited (local images only) | Track Next upgrade / override carefully |
| GHSA-6g55-p6wh-862q | postcss | 8.4.31 via `next` | High | Transitive | Nested under Next | ≥8.5.12 | Mostly build/tooling | Track Next upgrade |
| GHSA-r28c-9q8g-f849 | postcss | 8.4.31 via `next` | High | Transitive | Nested under Next | ≥8.5.18 | Mostly build/tooling | Track Next upgrade |
| GHSA-qx2v-qp2m-jg93 | postcss | 8.4.31 via `next` | Moderate | Transitive | Nested under Next | ≥8.5.10 | Mostly build/tooling | Track Next upgrade |

Direct `sharp@0.35.3` and `postcss@8.5.25` (dev) are newer than the vulnerable nested copies.

### `pnpm outdated` (informational)

`@hookform/resolvers`, `react-hook-form`, `eslint`, `typescript` have newer majors/minors. Not treated as vulnerabilities by themselves.

---

## 11. Secret scan

| Check | Result |
| --- | --- |
| Tracked `.env*` | None |
| Live tokens/keys in `src/` | None found |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Comment-only placeholders in `submit-lead.ts` |
| Production client bundles (`.next/static`) | No matches for token-like patterns searched |
| Git history (`git log -S TELEGRAM_BOT_TOKEN`) | Comment string present since commit `6b54e8d` — **not a live secret value** |
| Tracked private keys / PEM | None (`.pem` gitignored) |

**No secret rotation required** based on this scan.  
If a real bot token was ever pasted into a file and force-pushed elsewhere outside this scan, treat that as out-of-band.

> Note: Next’s empty server-reference manifest still contains a build-local encryption key field under `.next/` (gitignored). Do not commit `.next`. Value intentionally omitted from this report.

---

## 12. Server Actions and endpoints — verdict

### `submitLead`

| Question | Answer |
| --- | --- |
| Exported? | Yes (`export async function submitLead`) |
| Imported? | Only by unused `LeadForm` (`lead-form.tsx`) |
| Mounted in pages? | No (`TelegramOrderCta` used instead) |
| In production server-reference manifest? | **No** (`node`/`edge` empty; no `submitLead` string under `.next/server`) |
| Callable via Next Server Action POST today? | **No evidence it is registered** |
| Accepts FormData? | Yes (in source) |
| Logs / stores / external I/O? | No (throws in `deliverLead`) |
| Returns excessive errors? | Generic UA messages; fieldErrors from Zod |

**Verdict:** **Action is absent from the production Server Action surface** after current `pnpm build`.  
It remains **dead code in the repository** and must not be remounted until real delivery exists.

No other Server Actions or `route.ts` handlers in tracked `src/`.

---

## 13. Recommended security headers

Observed on production server (ports 3400 / 3415), HTML routes:

| Header | Status |
| --- | --- |
| `X-Content-Type-Options: nosniff` | Present (from `next.config.ts`) |
| `Referrer-Policy: strict-origin-when-cross-origin` | Present |
| `X-DNS-Prefetch-Control: on` | Present |
| `x-powered-by` | Absent (`poweredByHeader: false`) |
| `Content-Security-Policy` | **Missing** — recommended |
| `Content-Security-Policy-Report-Only` | **Missing** — good first step |
| `frame-ancestors` / `X-Frame-Options` | **Missing** — recommended before public staging |
| `Permissions-Policy` | **Missing** — recommended |
| `Strict-Transport-Security` | **Missing** — apply at HTTPS edge / after TLS |
| `Cross-Origin-Opener-Policy` | Optional |
| `Cross-Origin-Resource-Policy` | Optional / may need care with assets |
| `X-XSS-Protection` | Do **not** enable `1` |

**Do not implement in this audit stage.**

---

## 14. Draft CSP (not implemented)

Based on actual resources:

- Scripts: Next runtime (`'self'`; nonces or strict-dynamic may be needed — evaluate Report-Only).
- Styles: `'self'` + likely `'unsafe-inline'` for Next/Tailwind unless nonce strategy is adopted (may force dynamic rendering).
- Images: `'self'`, `data:` (blur LQIP / icons), `blob:` if used.
- Fonts: `'self'` (next/font self-host).
- Frames: `https://www.google.com` (Maps embed).
- Connect: `'self'` (+ Maps/Google endpoints if client connect appears — verify in Report-Only).
- Media: `'self'`.
- Objects: `'none'`.
- Base URI: `'self'`.
- Frame ancestors: `'self'`.

**Suggested rollout**

1. Start with `Content-Security-Policy-Report-Only`.
2. Confirm Maps + gallery videos + fonts in browser console.
3. Tighten; only then enforce.
4. Prefer edge/platform HSTS rather than only Next config if CDN terminates TLS.

Wildcard `*` should be avoided.

---

## 15. Privacy / third-party review

| Behaviour | Privacy text | Match? |
| --- | --- | --- |
| No web form PII collection | Stated | Yes |
| Telegram / phone for orders | Stated | Yes |
| No ad analytics scripts | Stated | Yes |
| Google Maps iframe on `/contacts` (lazy) | Not clearly disclosed | **Gap (SEC-M3)** |
| `next/font` self-hosted | N/A | OK |
| Referer on external Telegram/Maps links | `noopener noreferrer` on `_blank` | Good practice |

Not a legal opinion — technical consistency only.

---

## 16. Priority plan

### P0 — blocks any deploy

*None identified.*

### P1 — before public staging

1. Add clickjacking protection (`frame-ancestors` and/or `X-Frame-Options`).
2. Update Privacy to disclose Google Maps embed behaviour.
3. Set `NEXT_PUBLIC_SITE_URL` correctly for the staging host.

### P2 — before production

1. CSP Report-Only → enforce.
2. `Permissions-Policy`.
3. HSTS at HTTPS terminator.
4. Plan Next upgrade path for nested `sharp` / `postcss` advisories.
5. Keep `LeadForm`/`submitLead` unmounted until real delivery; remove false-success honeypot wording when wiring delivery.

### P3 — hardening

1. Expand `.gitignore` env patterns.
2. COOP/CORP evaluation.
3. Optional removal of unused Instagram config / dead lead modules after go-live decision.

### Accepted risk (for now)

- Maps iframe without `sandbox` (compatibility).
- Closed staging without full CSP if Report-Only is scheduled.

---

## 17. What could not be fully verified

- Deep exploitability of libvips/PostCSS advisories against this exact host OS build of Next.
- Full Git object carving beyond pattern/`-S` searches (7 commits in history).
- CDN/edge header overlays (Vercel/Cloudflare) — only Node `next start` observed.
- Runtime behaviour of a remounted `submitLead` under forged Next action IDs (not registered in current build).
- Binary malware scanning of media files.

---

## 18. lint / tsc / build / qa

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm exec tsc --noEmit` | Pass |
| `pnpm build` | Pass — all app routes static |
| `pnpm qa` | Completes; ~40 known a11y touch-target false positives; no overflow/broken-image reports in filtered review |
| Production headers | Verified via HTTP against running `next start` |

---

## 19. Confirmation

- **Only new/changed file intended for this stage:** `docs/SECURITY-AUDIT.md`
- **No** dependency updates, `pnpm audit --fix`, installs, CSP/header implementation, Server Action deletion, or mass refactors were performed as remediation.
- **No** secret values are reproduced in this document.
- Analysis used tracked sources + local build artefacts under `.next` (gitignored) for server-reference and header verification.
