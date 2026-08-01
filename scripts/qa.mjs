/**
 * Local QA pass: drives the installed Chrome against the dev server, captures
 * full-page screenshots at several breakpoints and reports layout problems
 * (horizontal overflow, tiny touch targets, images that failed to decode).
 *
 * Usage: node scripts/qa.mjs [baseUrl]
 */

import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3300";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = ".shots";

const pages = ["/", "/assortment", "/supplies", "/about", "/faq", "/contacts", "/privacy", "/nope"];
const viewports = [
  { name: "320", width: 320, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

const problems = [];

function report(scope, message) {
  problems.push(`${scope}: ${message}`);
}

async function audit(page, scope) {
  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const offenders = [];
    const viewportWidth = window.innerWidth;

    /** True when an ancestor clips overflow, so the box is not actually visible. */
    const isClipped = (el) => {
      for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
        const overflow = getComputedStyle(node).overflowX;
        if (overflow === "hidden" || overflow === "clip" || overflow === "auto") return true;
      }
      return false;
    };

    for (const el of document.body.querySelectorAll("*")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      // Elements parked entirely off-screen (honeypot, skip link) are intentional.
      if (rect.right <= 0) continue;
      if (rect.right > viewportWidth + 1.5 || rect.left < -1.5) {
        if (isClipped(el)) continue;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.getAttribute("class") ?? "").slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
    }

    const smallTargets = [];
    for (const el of document.querySelectorAll("a, button, input, select, textarea")) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right <= 0) continue;
      // Links inside running text are exempt from target-size rules.
      const inlineInText = el.tagName === "A" && getComputedStyle(el).display === "inline";
      if (inlineInText) continue;
      // A control wrapped in a large label is hit through the label.
      const label = el.closest("label");
      const effectiveHeight = label ? label.getBoundingClientRect().height : rect.height;
      if (Math.max(rect.height, effectiveHeight) < 43.5) {
        smallTargets.push({
          tag: el.tagName.toLowerCase(),
          text: (el.textContent ?? el.getAttribute("aria-label") ?? "").trim().slice(0, 40),
          height: Math.round(Math.max(rect.height, effectiveHeight)),
        });
      }
    }

    const brokenImages = [...document.images]
      // An image inside a `hidden md:block` wrapper never loads by design.
      .filter((img) => img.getBoundingClientRect().width > 0)
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src);

    const missingAlt = [...document.images].filter((img) => !img.hasAttribute("alt")).length;

    return {
      scrollWidth: doc.scrollWidth,
      innerWidth: viewportWidth,
      offenders: offenders.slice(0, 8),
      offenderCount: offenders.length,
      smallTargets: smallTargets.slice(0, 8),
      smallTargetCount: smallTargets.length,
      brokenImages,
      missingAlt,
      h1Count: document.querySelectorAll("h1").length,
    };
  });

  if (result.scrollWidth > result.innerWidth + 1) {
    report(scope, `HORIZONTAL OVERFLOW scrollWidth=${result.scrollWidth} innerWidth=${result.innerWidth}`);
  }
  if (result.offenderCount > 0) {
    report(scope, `${result.offenderCount} element(s) exceed viewport: ${JSON.stringify(result.offenders)}`);
  }
  if (result.smallTargetCount > 0) {
    report(scope, `${result.smallTargetCount} control(s) under 44px: ${JSON.stringify(result.smallTargets)}`);
  }
  if (result.brokenImages.length > 0) {
    report(scope, `broken images: ${result.brokenImages.join(", ")}`);
  }
  if (result.missingAlt > 0) {
    report(scope, `${result.missingAlt} image(s) without alt`);
  }
  if (result.h1Count !== 1) {
    report(scope, `h1 count = ${result.h1Count}`);
  }

  return result;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "shell",
    args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1"],
  });

  try {
    for (const viewport of viewports) {
      const page = await browser.newPage();
      await page.setViewport({ width: viewport.width, height: viewport.height });

      for (const path of pages) {
        const url = `${BASE}${path}`;
        const scope = `${viewport.name}px ${path}`;
        const response = await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
        const status = response?.status() ?? 0;
        if (path !== "/nope" && status !== 200) report(scope, `HTTP ${status}`);

        // Trigger every scroll reveal so screenshots show the settled layout.
        await page.evaluate(async () => {
          const step = window.innerHeight;
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 400));
        });

        await audit(page, scope);

        const shouldShoot = viewport.name === "390" || viewport.name === "1440";
        if (shouldShoot) {
          const slug = path === "/" ? "home" : path.replace(/\//g, "");
          await page.screenshot({
            path: `${OUT}/${slug}-${viewport.name}.png`,
            fullPage: true,
          });
        }
      }

      await page.close();
    }

    // Interaction checks at mobile width.
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });

    await page.click('button[aria-label="Відкрити меню"]');
    await new Promise((r) => setTimeout(r, 600));
    const menuOpen = await page.$('[role="dialog"]');
    if (!menuOpen) report("mobile menu", "sheet did not open");
    await page.screenshot({ path: `${OUT}/mobile-menu.png` });

    await page.evaluate(() => {
      const link = [...document.querySelectorAll('[role="dialog"] a')].find(
        (a) => a.textContent?.trim() === "Асортимент",
      );
      link?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 1500));
    const afterNav = page.url();
    const menuStillOpen = await page.$('[role="dialog"]');
    if (!afterNav.includes("/assortment")) report("mobile menu", `navigation failed, url=${afterNav}`);
    if (menuStillOpen) report("mobile menu", "sheet stayed open after navigation");

    // Gallery dialog.
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
    await page.evaluate(() => {
      document.querySelector("#gallery")?.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.evaluate(() => {
      const button = document.querySelector("#gallery button");
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 700));
    const galleryDialog = await page.$('[role="dialog"]');
    if (!galleryDialog) report("gallery", "dialog did not open");
    else await page.screenshot({ path: `${OUT}/gallery-dialog.png` });
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 600));
    if (await page.$('[role="dialog"]')) report("gallery", "dialog did not close on Escape");

    // FAQ accordion.
    await page.goto(`${BASE}/faq`, { waitUntil: "networkidle2" });
    await page.evaluate(() => {
      const trigger = document.querySelector("#faq button[aria-expanded]");
      trigger?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 700));
    const expanded = await page.evaluate(
      () => document.querySelector("#faq button[aria-expanded]")?.getAttribute("aria-expanded"),
    );
    if (expanded !== "true") report("faq", `accordion did not expand (aria-expanded=${expanded})`);
    await page.screenshot({ path: `${OUT}/faq-open.png` });

    // Lead form: empty submit must surface inline errors.
    await page.goto(`${BASE}/contacts`, { waitUntil: "networkidle2" });
    await page.evaluate(() => document.querySelector("#lead-form")?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 400));
    await page.evaluate(() => {
      const submit = document.querySelector('#lead-form button[type="submit"]');
      submit?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 900));
    const invalidCount = await page.evaluate(
      () => document.querySelectorAll('#lead-form [aria-invalid="true"]').length,
    );
    if (invalidCount === 0) report("lead form", "empty submit produced no aria-invalid fields");
    await page.screenshot({ path: `${OUT}/form-errors.png` });

    // Lead form: happy path.
    await page.evaluate(() => {
      // React Hook Form listens for native input events, so values must be set
      // through the prototype setter rather than assigned directly.
      const fill = (name, value, proto) => {
        const el = document.querySelector(`#lead-form [name="${name}"]`);
        if (!el) throw new Error(`field not found: ${name}`);
        Object.getOwnPropertyDescriptor(proto.prototype, "value")?.set?.call(el, value);
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("blur", { bubbles: true }));
      };

      fill("name", "Тест Тестенко", HTMLInputElement);
      fill("company", "Квіткова Крамниця", HTMLInputElement);
      fill("phone", "+380671234567", HTMLInputElement);
      fill("telegram", "@testshop", HTMLInputElement);
      fill("city", "Київ", HTMLInputElement);
      fill("comment", "Регулярна закупівля.", HTMLTextAreaElement);

      const select = document.querySelector('#lead-form [name="budget"]');
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")?.set?.call(
        select,
        select.options[1].value,
      );
      select.dispatchEvent(new Event("change", { bubbles: true }));

      // First category chip, then the consent box (rendered last).
      const checkboxes = [...document.querySelectorAll('#lead-form button[role="checkbox"]')];
      checkboxes[0]?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      checkboxes.at(-1)?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.evaluate(() => {
      const submit = document.querySelector('#lead-form button[type="submit"]');
      submit?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await new Promise((r) => setTimeout(r, 2500));
    const successText = await page.evaluate(() => {
      const region = document.querySelector("#lead-form [aria-live]");
      return region?.textContent?.trim() ?? "";
    });
    if (!successText.includes("Дякуємо")) {
      report("lead form", `no success message after valid submit, live region = "${successText}"`);
    }
    await page.screenshot({ path: `${OUT}/form-success.png` });

    await page.close();
  } finally {
    await browser.close();
  }

  if (problems.length === 0) {
    console.log("QA PASS — no problems detected");
  } else {
    console.log(`QA found ${problems.length} problem(s):`);
    for (const problem of problems) console.log(` - ${problem}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
