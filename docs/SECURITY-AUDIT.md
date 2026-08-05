# Security Audit — Flora de Luxe Kyiv OPT

**Date:** 2026-08-02  
**Scope:** Tracked Git sources + local production verification (`next start`)  
**Auditor role:** Application Security / Next.js  
**Stages:** (1) analysis-only audit → (2) targeted P1/P2 hardening (this update)

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
**No open P1 blockers** after this hardening stage (clickjacking headers, Privacy/Maps disclosure, site URL hardening, Report-Only CSP, Permissions-Policy).

Main residual items before public production:

1. **Full CSP** remains Report-Only (`'unsafe-inline'` required by Next inline bootstraps) — enforce only after staging observation.
2. **Transitive** `pnpm audit` advisories under `next` (`sharp@0.34.5`, `postcss@8.4.31`) — **not remediated in this stage** (no lockfile / dependency changes).
3. **HSTS** — verify only after HTTPS staging; do not treat local HTTP as production HSTS done.
4. Dead **LeadForm / submitLead** stack — Low / maintenance debt; not a public endpoint today.

**Staging readiness (security):** acceptable for closed/demo staging with HTTPS at the edge, after setting `NEXT_PUBLIC_SITE_URL`.  
**Production readiness:** closer — complete deferred items in §16 (enforce CSP carefully, HSTS at edge, dependency track).

---

## 2. Architecture and attack surface

### 2.1 Inventory (tracked)

- ~180 tracked files via `git ls-files`
- No `middleware.ts` / `proxy.ts`
- No App Router `route.ts` API handlers in `src/`
- No `.github/` workflows
- No `.npmrc`
- Tracked env template: `.env.example` (`NEXT_PUBLIC_SITE_URL` only)
- `.env` / `.env.*` / `.env*.local` gitignored (exception: `.env.example`)

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

All listed routes report as **static** (`○`) after `pnpm build`. Unchanged by hardening.

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
| Site URL | `NEXT_PUBLIC_SITE_URL` via `resolveSiteUrl()`; local fallback `http://localhost:3000` | Canonical/sitemap/JSON-LD |

### 2.6 Environment variables

| Variable | Exposure | Usage |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public (by design) | `site-config.ts` — http/https only, trailing slash stripped via `URL.origin`, invalid → localhost fallback |
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
- Dependency advisories (`pnpm audit`, `pnpm why`) — **no dependency remediation this stage**  
- Response headers from running production server  
- Privacy vs third-party behaviour  
- `pnpm lint` / `tsc` / `build` / `qa` / browser CSP Report-Only probe

**Not deeply reviewed (binaries):** image/video bytes (paths and provenance only).

---

## 4. Threat model (current architecture)

| Threat | Relevance | Notes |
| --- | --- | --- |
| Anonymous internet attacker | Yes | Public static site |
| Malicious POST / Server Action abuse | Low today | `submitLead` absent from production manifest |
| XSS / HTML injection | Low | No user HTML; JSON-LD escapes `<`; Report-Only CSP monitors |
| Clickjacking | Mitigated | `X-Frame-Options: DENY` + enforced `frame-ancestors 'none'` |
| Open redirect | Low | `absoluteUrl` path-only |
| SSRF | Low (prod) | No server fetch from request input; import script is offline |
| Secret leak | Low | No live secrets in repo |
| Malicious / compromised npm package | Medium (supply chain) | Advisories under `next` — deferred |
| Accidental publish of internals | Low | `public/` mostly media + `images/README.md` |
| Iframe abuse / Maps referrer | Low–Medium | Static Maps embed; disclosed in Privacy; CSP `frame-src` Report-Only |
| Unsafe SVG | Low | One static brand SVG; no `dangerouslyAllowSVG` |
| Misconfigured production | Medium | Must set `NEXT_PUBLIC_SITE_URL`; HSTS at HTTPS edge |

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
| **Status** | **Deferred** (dependency remediation stage) |
| **Evidence** | `pnpm audit`: GHSA-f88m-g3jw-g9cj; `pnpm why sharp` → `sharp@0.34.5` under `next@16.2.12`. Project also has direct `sharp@0.35.3` (devDependency, patched). |
| **Attack scenario** | Malicious image crafted for libvips CVEs processed by Next image optimization. |
| **Conditions** | Attacker must get a malicious image into a path Next will process. This app has **no** `images.remotePatterns` / `domains` — only local `/public` assets. |
| **Impact** | Potential RCE/DoS in image pipeline on the Node host (deployment-dependent). |
| **Reason deferred** | This stage forbids `pnpm update` / overrides / lockfile changes. |
| **Required before production** | Prefer Next release with nested patched `sharp`, or validated override in a dedicated dependency stage. |

### SEC-H2 — Transitive `postcss` (via `next`) below patched floors

| Field | Value |
| --- | --- |
| **ID** | SEC-H2 |
| **Severity** | High *(advisory)* / **Low–Medium** *(runtime for this site)* |
| **Confidence** | High (version), Medium (reachability) |
| **Category** | Supply chain / build tooling |
| **Status** | **Deferred** (dependency remediation stage) |
| **Evidence** | Three advisories on the same nested `postcss@8.4.31` under `next`: GHSA-6g55-p6wh-862q (High), GHSA-r28c-9q8g-f849 (High), GHSA-qx2v-qp2m-jg93 (Moderate). Direct/dev `postcss@8.5.25` is newer. |
| **Note on counting** | Findings table groups these as **one** High finding (SEC-H2) for nested PostCSS. `pnpm audit` reports **3 High + 1 Moderate** advisories total (1 sharp High + 2 postcss High + 1 postcss Moderate). Multiple advisories map to one finding when they share the same package instance. |
| **Attack scenario** | Attacker-controlled CSS/`sourceMappingURL` during CSS tooling. |
| **Conditions** | Primarily **build-time** / tooling paths, not anonymous HTML page GET. |
| **Impact** | File disclosure / XSS in tooling contexts if untrusted CSS is processed. |
| **Reason deferred** | No dependency changes in this stage. |
| **Required before production** | Track Next upgrade when nested `postcss` is patched. |

---

## 7. Medium findings

### SEC-M1 — Missing clickjacking protections

| Field | Value |
| --- | --- |
| **ID** | SEC-M1 |
| **Severity** | Medium |
| **Status** | **Fixed** |
| **Fix** | `next.config.ts`: `X-Frame-Options: DENY` + enforced CSP `frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'`. Site must not be embedded on external domains. |
| **Verification** | `curl -sI` on `/`, `/assortment`, `/contacts`, `/privacy`, 404 — all return XFO DENY and enforced CSP with `frame-ancestors 'none'`. `pnpm qa` asserts the same. |

### SEC-M2 — No Content-Security-Policy

| Field | Value |
| --- | --- |
| **ID** | SEC-M2 |
| **Severity** | Medium |
| **Status** | **Partially fixed** — minimal CSP **enforced**; full policy **Report-Only** |
| **Fix** | Enforced minimal CSP (see SEC-M1). Full inventory-based `Content-Security-Policy-Report-Only` in `next.config.ts` with `script-src`/`style-src` including `'unsafe-inline'` (Next.js inline bootstraps; Report-Only only — not a final strict policy). `frame-src https://www.google.com` only. No `report-uri`/`report-to` (no endpoint). No nonce / middleware / dynamic rendering. |
| **Verification** | Headers present on HTML routes; Puppeteer probe on `/`, `/contacts` (after map scroll), `/privacy`, `/assortment`, `/faq`, 404 — **zero** `securitypolicyviolation` events and no CSP console refusals. |
| **Required before production** | Observe Report-Only on HTTPS staging; then tighten and consider enforcement. Do not claim the Report-Only policy is a strict final CSP. |

### SEC-M3 — Privacy page omits Google Maps third-party load

| Field | Value |
| --- | --- |
| **ID** | SEC-M3 |
| **Severity** | Medium |
| **Status** | **Fixed** |
| **Fix** | `src/lib/content/privacy.ts`: §2 no web form / Telegram leaves site; new §5 Google Maps lazy iframe + technical data Google may receive; §8 no own analytics / tracking pixels / ad cookies (neutral, no legal guarantees). Visual Privacy layout unchanged. |
| **Verification** | Content review + contacts map still lazy-mounts static HTTPS embed. |

---

## 8. Low findings

### SEC-L1 — Missing `Permissions-Policy`

| Field | Value |
| --- | --- |
| **ID** | SEC-L1 |
| **Severity** | Low |
| **Status** | **Fixed** |
| **Fix** | `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()` after confirming code does not use these APIs. No `allow="geolocation"` on Maps iframe. |
| **Verification** | Header present on production responses; Maps iframe still loads. |

### SEC-L2 — `.gitignore` gaps for some env filenames

| Field | Value |
| --- | --- |
| **ID** | SEC-L2 |
| **Severity** | Low |
| **Status** | **Fixed** |
| **Fix** | `.gitignore`: `.env`, `.env.*`, `!.env.example`, `.env*.local`. Added `.env.example` with `NEXT_PUBLIC_SITE_URL=`. |
| **Verification** | Patterns reviewed; template is the only tracked env file. |

### SEC-L3 — Dead lead stack can mislead if remounted

| Field | Value |
| --- | --- |
| **ID** | SEC-L3 |
| **Severity** | Low / maintenance debt |
| **Status** | **Deferred** (not removed this stage by design) |
| **Files** | `src/lib/actions/submit-lead.ts`, `src/components/sections/lead-form.tsx` |
| **Evidence** | Reconfirmed after hardening build: `submitLead` **absent** from `.next/server/server-reference-manifest.json` (`node`/`edge` empty). Not a public production Server Action endpoint. |
| **Reason** | Keep for future go-live; removal is a separate product decision. |
| **Required before production** | Do not remount until real delivery exists; then fix honeypot false-success wording. |

### SEC-L4 — Maps iframe without `sandbox`

| Field | Value |
| --- | --- |
| **ID** | SEC-L4 |
| **Severity** | Low / Accepted risk |
| **Status** | **Accepted risk** (unchanged) |
| **Evidence** | Static `src={contactConfig.mapsEmbedUrl}`; HTTPS; `loading="lazy"`; `title`; `referrerPolicy="no-referrer-when-downgrade"`; reserved aspect-ratio; no user input in `src`; no `sandbox` (would break Maps); no `allow="geolocation"`. |
| **Fix** | Rely on static src + Report-Only / future enforced `frame-src`. |

---

## 9. Informational findings

### SEC-I1 — `absoluteUrl` path hygiene

| Field | Value |
| --- | --- |
| **ID** | SEC-I1 |
| **Severity** | Informational |
| **Status** | **Fixed** (hardening) |
| **File** | `src/lib/site-config.ts` |
| **Fix** | Path-only absolute URL builder; no passthrough of absolute `http(s)` strings. |

### SEC-I2 — JSON-LD uses `dangerouslySetInnerHTML` safely

| Field | Value |
| --- | --- |
| **ID** | SEC-I2 |
| **Severity** | Informational |
| **File** | `src/components/seo/json-ld.tsx` |
| **Evidence** | Payload from typed SEO helpers; `<` escaped to `\u003c`. Not user-controlled. |

### SEC-I3 — Site URL configuration

| Field | Value |
| --- | --- |
| **ID** | SEC-I3 |
| **Severity** | Informational |
| **Status** | **Fixed** (hardening) |
| **File** | `src/lib/site-config.ts`, `.env.example` |
| **Fix** | Single `resolveSiteUrl()` from `NEXT_PUBLIC_SITE_URL`; only `http:`/`https:`; invalid → `http://localhost:3000`; staging/production must set env on the host. No invented production domain. Env not logged to the client console. |

### SEC-I4 — Offline media import fetches Telegram

| Field | Value |
| --- | --- |
| **ID** | SEC-I4 |
| **Severity** | Informational |
| **File** | `scripts/import-opt-media.mjs` |
| **Evidence** | `fetch` to `t.me` + image URLs during local import. Not production request path. |

### SEC-I5 — QA touch-target noise

| Field | Value |
| --- | --- |
| **ID** | SEC-I5 |
| **Severity** | Informational |
| **Evidence** | `pnpm qa` reports ~40 “under 44px” hits (skip-link / desktop nav). Not security issues. Security header / Maps / Telegram CTA / no `#lead-form` checks pass. |

---

## 10. Dependency audit

### Direct production versions *(unchanged this stage)*

| Package | Version |
| --- | --- |
| next | 16.2.12 |
| react / react-dom | 19.2.8 |
| zod | 4.4.3 |
| react-hook-form | 7.83.0 |
| lucide-react | 1.28.0 |
| Radix UI packages | pinned as in `package.json` |

No Git/tarball dependencies. No `overrides` / `patchedDependencies`. **`package.json` and `pnpm-lock.yaml` were not modified.**

### `pnpm audit --audit-level low` (no `--fix`) — re-run after hardening

| Advisory | Package | Installed (path) | Severity | Direct? | Prod/Dev path | Patched | Reachable here? | Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GHSA-f88m-g3jw-g9cj | sharp | 0.34.5 via `next` | High | Transitive | Prod (Next image) | ≥0.35.0 | Limited (local images only) | Separate dependency remediation |
| GHSA-6g55-p6wh-862q | postcss | 8.4.31 via `next` | High | Transitive | Nested under Next | ≥8.5.12 | Mostly build/tooling | Separate dependency remediation |
| GHSA-r28c-9q8g-f849 | postcss | 8.4.31 via `next` | High | Transitive | Nested under Next | ≥8.5.18 | Mostly build/tooling | Separate dependency remediation |
| GHSA-qx2v-qp2m-jg93 | postcss | 8.4.31 via `next` | Moderate | Transitive | Nested under Next | ≥8.5.10 | Mostly build/tooling | Separate dependency remediation |

**Audit count vs findings table:** `pnpm audit` → **3 High + 1 Moderate** advisories. Findings table → **2 High findings** (SEC-H1 sharp, SEC-H2 postcss). SEC-H2 intentionally aggregates **three** PostCSS advisories on the same nested `8.4.31` instance.

Direct `sharp@0.35.3` and `postcss@8.5.25` (dev) are newer than the vulnerable nested copies.

---

## 11. Secret scan

| Check | Result |
| --- | --- |
| Tracked `.env*` | `.env.example` only (no secrets) |
| Live tokens/keys in `src/` | None found |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Comment-only placeholders in `submit-lead.ts` |
| Production client bundles (`.next/static`) | No matches for token-like patterns searched |
| Git history (`git log -S TELEGRAM_BOT_TOKEN`) | Comment string present since commit `6b54e8d` — **not a live secret value** |
| Tracked private keys / PEM | None (`.pem` gitignored) |

**No secret rotation required** based on this scan.

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

**Verdict:** **Not a production Server Action.** Low / maintenance debt. Not removed in this hardening stage.

No other Server Actions or `route.ts` handlers in tracked `src/`.

---

## 13. Security headers (post-hardening)

Observed on production server (`pnpm start --port 3400`), HTML routes (`/`, `/assortment`, `/contacts`, `/privacy`, 404):

| Header | Status |
| --- | --- |
| `X-Content-Type-Options: nosniff` | Present (unchanged) |
| `Referrer-Policy: strict-origin-when-cross-origin` | Present (unchanged) |
| `X-DNS-Prefetch-Control: on` | Present (unchanged) |
| `x-powered-by` | Absent (`poweredByHeader: false`) |
| `X-Frame-Options: DENY` | **Added** |
| `Content-Security-Policy` (enforced minimal) | **Added** — see below |
| `Content-Security-Policy-Report-Only` (full inventory) | **Added** — see below |
| `Permissions-Policy` | **Added** — camera/microphone/geolocation/payment/usb empty |
| `Strict-Transport-Security` | **Not added** — verify after HTTPS staging; do not enable `includeSubDomains`/`preload` automatically; avoid conflicting with platform HSTS |
| `Cross-Origin-Opener-Policy` | **Deferred** — no proof they are safe with Maps/media |
| `Cross-Origin-Embedder-Policy` | **Deferred** |
| `Cross-Origin-Resource-Policy` | **Deferred** |
| `X-XSS-Protection` | Do **not** enable `1` |

Sitemap/robots also receive the same Next `/:path*` header set today; that is acceptable and not treated as a defect.

### Enforced CSP

```
frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'
```

Does **not** restrict scripts, styles, images, fonts, or Maps frames.

### Report-Only CSP

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob:;
font-src 'self' data:;
connect-src 'self';
frame-src https://www.google.com;
media-src 'self';
worker-src 'self' blob:;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none'
```

`'unsafe-inline'` is allowed **only** in Report-Only because production Next.js emits inline scripts/styles. This is **not** a strict final enforced policy.

### CSP Report-Only violations (local production probe)

**None observed** on `/`, `/contacts` (with Maps scrolled into view), `/privacy`, `/assortment`, `/faq`, 404.

Allowlist was **not** expanded “just in case.”

---

## 14. Draft CSP rollout (updated)

1. ~~Start with Report-Only~~ — **done** (full inventory policy).
2. ~~Minimal enforced clickjacking CSP~~ — **done**.
3. Confirm Maps + gallery + fonts on HTTPS staging console.
4. Tighten; only then consider enforcing broader directives.
5. Prefer edge/platform HSTS rather than only Next config if CDN terminates TLS.

Wildcard `*` avoided. No nonce / `proxy.ts` / dynamic rendering for CSP.

---

## 15. Privacy / third-party review

| Behaviour | Privacy text | Match? |
| --- | --- | --- |
| No web form PII collection | Stated (§2) | Yes |
| Telegram / phone for orders; user leaves site | Stated (§2, §4) | Yes |
| No own analytics / ad trackers / pixels | Stated (§8) | Yes |
| Google Maps iframe on `/contacts` (lazy) | Stated (§5) | Yes |
| `next/font` self-hosted | N/A | OK |
| Referer on external Telegram/Maps links | `noopener noreferrer` on `_blank` | Good practice |

Not a legal opinion — technical consistency only. No claims of full legal compliance.

---

## 16. Priority plan

### P0 — blocks any deploy

*None identified.*

### P1 — before public staging

1. ~~Add clickjacking protection~~ — **Fixed**
2. ~~Update Privacy to disclose Google Maps~~ — **Fixed**
3. ~~Harden `NEXT_PUBLIC_SITE_URL` + `.env.example`~~ — **Fixed** (set real value on staging host)

### P2 — before production

1. Observe Report-Only CSP on HTTPS staging → decide enforcement.
2. ~~`Permissions-Policy`~~ — **Fixed**
3. **HSTS** at HTTPS terminator after staging proof; confirm no conflicting platform header; do not auto-`includeSubDomains` / `preload`.
4. Plan Next upgrade path for nested `sharp` / `postcss` advisories (**separate dependency stage**).
5. Keep `LeadForm`/`submitLead` unmounted until real delivery; remove false-success honeypot wording when wiring delivery.

### P3 — hardening

1. ~~Expand `.gitignore` env patterns~~ — **Fixed**
2. COOP/COEP/CORP evaluation **only with proof** they do not break Maps/images/video.
3. Optional removal of unused Instagram config / dead lead modules after go-live decision.

### Accepted risk / deferred

- Maps iframe without `sandbox` (compatibility).
- Full CSP not yet enforced (Report-Only + minimal enforced).
- COOP/COEP/CORP not added.
- HSTS not added locally.
- Dependency advisories not patched this stage.
- `submitLead` retained as dead source (not production surface).

---

## 17. What could not be fully verified

- Deep exploitability of libvips/PostCSS advisories against this exact host OS build of Next.
- Full Git object carving beyond pattern/`-S` searches.
- CDN/edge header overlays (Vercel/Cloudflare) — only Node `next start` observed.
- Runtime behaviour of a remounted `submitLead` under forged Next action IDs (not registered in current build).
- Binary malware scanning of media files.
- HSTS behaviour on the real production domain (requires HTTPS staging/production).

---

## 18. lint / tsc / build / qa / audit (hardening verification)

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm exec tsc --noEmit` | Pass |
| `pnpm build` | Pass — all app routes static (`○`) |
| `pnpm qa` | Completes; ~40 known a11y touch-target noise; **no** security-header / Maps / Telegram / lead-form / overflow / broken-image failures |
| `pnpm audit --audit-level low` | 3 High + 1 Moderate (unchanged; not fixed) |
| `pnpm why sharp` / `pnpm why postcss` | Nested under `next` + newer direct/dev copies |
| Production headers | Verified via `curl` against `next start --port 3400` |
| CSP Report-Only console | Zero violations in local probe |
| `submitLead` in server-reference manifest | Absent |

---

## 19. Hardening stage confirmation

**Changed this stage:**

- `next.config.ts` — security headers (XFO, enforced CSP, Report-Only CSP, Permissions-Policy)
- `src/lib/site-config.ts` — `NEXT_PUBLIC_SITE_URL` resolver + path-only `absoluteUrl`
- `src/lib/content/privacy.ts` — Privacy copy aligned with behaviour
- `.env.example` — `NEXT_PUBLIC_SITE_URL=`
- `.gitignore` — broader env ignores + exception for example
- `scripts/qa.mjs` — resilient security header + Maps checks
- `docs/SECURITY-AUDIT.md` — status updates

**Not changed:**

- Dependencies / lockfile / overrides / versions
- Hero, design, marketing copy (except Privacy), routes, Telegram URL, Maps URL
- Static generation / performance architecture
- LeadForm / submitLead (kept unmounted)
- HSTS, COOP/COEP/CORP
- No deploy performed
