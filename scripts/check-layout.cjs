// Run against a local HTTP server with Playwright available through NODE_PATH.
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
  });
  try {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [width, height] of [
      [1440, 900],
      [1366, 768],
      [1280, 800],
      [768, 1024],
      [390, 844],
      [360, 800],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(process.argv[2] || "http://127.0.0.1:8017/");
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => {
        const rect = (selector) => {
          const { top, bottom, height } = document
            .querySelector(selector)
            .getBoundingClientRect();
          return { top, bottom, height };
        };
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          hero: rect(".nameplate"),
          projects: rect(".projects-grid"),
          about: rect("#sobre-mi"),
          cards: document.querySelectorAll(".project").length,
          location: document.body.textContent.includes(
            "Banfield, Buenos Aires",
          ),
        };
      });
      assert.equal(layout.overflow, false, `${width}: horizontal overflow`);
      assert.equal(layout.cards, 5);
      assert.equal(layout.location, false);
      assert(layout.projects.top < layout.about.top);
      if (width >= 1280) {
        assert(layout.hero.height < 250, `${width}: oversized nameplate`);
        assert(
          layout.projects.bottom <= height,
          `${width}: projects end at ${layout.projects.bottom}`,
        );
      }
      await page.locator(".capture-book summary").focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await page.locator(".capture-book").getAttribute("open"),
        "",
      );
      assert.equal(await page.locator(".book-pages").isVisible(), true);
      assert.equal(await page.locator(".book-page img").count(), 2);
      await page.waitForFunction(() =>
        [...document.querySelectorAll(".book-page img")].every(
          (img) => img.complete && img.naturalWidth > 0,
        ),
      );
      if (process.env.SCREENSHOT_DIR && [1440, 390].includes(width)) {
        await page.locator(".project-featured").screenshot({
          path: `${process.env.SCREENSHOT_DIR}/captures-${width}.png`,
        });
      }
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await page.keyboard.press("Enter");
      assert.equal(await page.locator(".book-pages").isVisible(), false);
      for (const id of ["proyectos", "sobre-mi", "experiencia", "contacto"]) {
        await page.locator(`.site-header a[href="#${id}"]`).click();
        const target = await page.locator(`#${id}`).boundingBox();
        const header = await page.locator(".site-header").boundingBox();
        assert.equal(Math.round(header.y), 0, `${width}: header not sticky`);
        assert(
          target.y >= header.height,
          `${width}: ${id} hidden behind header`,
        );
      }
      await page.goto(process.argv[2] || "http://127.0.0.1:8017/");
      if (process.env.SCREENSHOT_DIR) {
        await page.screenshot({
          path: `${process.env.SCREENSHOT_DIR}/portfolio-${width}.png`,
          fullPage: true,
        });
      }
      console.log(
        `${width}x${height}: OK; nameplate=${layout.hero.height.toFixed(0)}px; projects bottom=${layout.projects.bottom.toFixed(0)}px`,
      );
    }
    for (const width of [1280, 360]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(process.argv[2] || "http://127.0.0.1:8017/");
      await page.evaluate(() => {
        document.documentElement.style.fontSize = "200%";
      });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${width}: overflow at 200% text size`,
      );
    }
    await page.goto(process.argv[2] || "http://127.0.0.1:8017/");
    for (const href of await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")))) {
      assert.equal(
        await page.locator(href).count(),
        1,
        `Missing anchor: ${href}`,
      );
    }
    const download = page.waitForEvent("download");
    await page.locator(".hero a[download]").click();
    assert.equal(
      (await download).suggestedFilename(),
      "cv-miguel-caraballo.pdf",
    );
    assert.deepEqual(errors, []);
    console.log("Layout, keyboard disclosure, anchors, sticky header: OK");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
