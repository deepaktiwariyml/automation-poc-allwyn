import { INTERACTION_PAGES, REDESIGNED_SURFACES } from "../../testdata/templates";
import { type CmsDetailEntry, type CmsGlobal, GLOBAL_POPULATE } from "../../utilities/cms-types";
import { auditPage } from "../../utilities/page-audit";
import { firstParagraph } from "../../utilities/page-checks";
import { normaliseText } from "../../utilities/text";
import { expect, test } from "../fixtures";

// Component behaviour (Allwyn-staging-FE-test-scope.xlsx, sheets 2 and 3; accessibility and breakpoints excluded).

test.describe("Global navigation and footer", () => {
  test.skip(
    !REDESIGNED_SURFACES.navigationAndFooter,
    "redesigned; switched on in testdata/templates.ts when developed",
  );

  test(
    "menu opens and closes, and shows the CMS menu items",
    { tag: ["@regression", "@cms"] },
    async ({ poManager, strapi }) => {
      const { menu_items } = await strapi.getSingleType<CmsGlobal>("global", GLOBAL_POPULATE);
      const page = poManager.getContentPage("/");
      await page.open();
      const navigation = page.page.getByRole("navigation", { name: "Main navigation" });

      await navigation.getByRole("button", { name: "Menu", exact: true }).click();

      // The toggle is relabelled "Close" while the menu is open.
      const closeButton = navigation.getByRole("button", { name: "Close", exact: true });
      await expect(closeButton).toHaveAttribute("aria-expanded", "true");
      for (const { title } of menu_items) {
        await expect
          .soft(
            navigation
              .getByRole("link", { name: title, exact: true })
              .or(navigation.getByRole("button", { name: title, exact: true }))
              .first(),
            `menu item "${title}"`,
          )
          .toBeVisible();
      }
      await closeButton.click();
      await expect(navigation.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    },
  );

  test(
    "header and footer links resolve, and external ones open safely",
    { tag: ["@regression"] },
    async ({ poManager, linkStatus }) => {
      const page = poManager.getContentPage("/");
      await page.open();
      await page.page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("button", { name: "Menu", exact: true })
        .click();

      const shell = await auditPage(page.page, "header, footer");

      expect.soft(shell.invalidLinks, "links with no usable href").toEqual([]);
      expect
        .soft(shell.unsafeExternalLinks, 'external links without target="_blank" and rel noopener/noreferrer')
        .toEqual([]);
      expect.soft(await linkStatus.findProblems(shell.checkableLinks), "links that do not resolve").toEqual([]);
    },
  );

  test(
    "footer shows the CMS link groups, socials and language switcher",
    { tag: ["@regression", "@cms"] },
    async ({ poManager, strapi }) => {
      const { footer_link_groups, socials } = await strapi.getSingleType<CmsGlobal>("global", GLOBAL_POPULATE);
      const page = poManager.getContentPage("/");
      await page.open();
      const footer = page.page.locator("footer");

      for (const group of footer_link_groups) {
        await expect
          .soft(footer.getByText(group.title, { exact: true }), `footer group "${group.title}"`)
          .toBeVisible();
        for (const link of group.items) {
          await expect
            .soft(footer.getByRole("link", { name: link.label }).first(), `footer link "${link.label}"`)
            .toHaveAttribute("href", link.target_value);
        }
      }
      for (const social of socials) {
        await expect.soft(footer.locator(`a[href="${social.target_value}"]`).first(), social.label).toBeAttached();
      }
      // One entry per site language (en, cs, de, el).
      await expect(footer.getByRole("navigation", { name: "Language" }).getByRole("link")).toHaveCount(4);
    },
  );
});

test.describe("Home hero", () => {
  test.skip(!REDESIGNED_SURFACES.home, "redesigned; switched on in testdata/templates.ts when developed");

  test("has a skip-intro control and the ticker shows text", { tag: ["@regression"] }, async ({ poManager }) => {
    const page = poManager.getContentPage("/");
    await page.open();

    await expect(page.main.locator('[data-name="HomeHero"]').getByRole("button", { name: /skip/i })).toBeVisible();
    await expect(page.main.locator('[data-name="Ticker"]').first(), "ticker").not.toBeEmpty();
  });
});

test.describe("Interactive components", () => {
  test("gallery readout advances to the next photo", { tag: ["@regression"] }, async ({ poManager }) => {
    const page = poManager.getContentPage(INTERACTION_PAGES.gallery);
    await page.open();
    const gallery = page.main.locator('[data-name="GalleryModule"]').first();
    const readout = gallery.getByText(/^\d+ of \d+$/);
    await expect(readout).toHaveText(/^1 of \d+$/);

    await gallery.getByRole("button", { name: "Next photo" }).click();

    await expect(readout).toHaveText(/^2 of \d+$/);
  });

  test("tabs switch the selected tab", { tag: ["@regression"] }, async ({ poManager }) => {
    const page = poManager.getContentPage(INTERACTION_PAGES.tabs);
    await page.open();
    const tabs = page.main.locator('[data-name="TabsModule"]').first().getByRole("tab");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");

    await tabs.nth(1).click();

    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "false");
  });

  test("videos have a play control", { tag: ["@regression"] }, async ({ poManager }) => {
    const page = poManager.getContentPage(INTERACTION_PAGES.video);
    await page.open();
    const videos = page.main.locator('[data-name="WideVideo"], [data-name="VideoHero"]');
    await expect(videos.first()).toBeAttached();

    for (const video of await videos.all()) {
      await expect.soft(video.getByRole("button", { name: /play/i }).first()).toBeAttached();
    }
  });

  test(
    "each FAQ question opens to its CMS answer",
    { tag: ["@regression", "@cms"] },
    async ({ poManager, cmsResolver }) => {
      const { dynamic_zone = [] } = await cmsResolver.require<{
        dynamic_zone?: { __component: string; items?: { title: string; text: string }[] }[];
      }>(INTERACTION_PAGES.faq);
      const faq = dynamic_zone.find((module) => module.__component === "modules.faq-module");
      const page = poManager.getContentPage(INTERACTION_PAGES.faq);
      await page.open();
      const accordion = page.main.locator('[data-name="AccordionBlock"]').first();
      expect(faq?.items?.length ?? 0, "the CMS page has FAQ items").toBeGreaterThan(0);

      for (const item of faq?.items ?? []) {
        await accordion.getByRole("button", { name: normaliseText(item.title) }).click();
        await expect.soft(accordion, `answer to "${item.title}"`).toContainText(firstParagraph(item.text).slice(0, 60));
      }
    },
  );

  test("map shows its pins", { tag: ["@regression"] }, async ({ poManager }) => {
    const page = poManager.getContentPage(INTERACTION_PAGES.map);
    await page.open();

    await expect(page.main.locator('[data-name="MarketsMap"] [data-name="MarketsMapPin"]').first()).toBeAttached();
  });

  test("slot machine renders with its spin control", { tag: ["@regression"] }, async ({ poManager }) => {
    const page = poManager.getContentPage(INTERACTION_PAGES.slotMachine);
    await page.open();

    await expect(page.main.locator('[data-name="SlotMachine"]').getByRole("button").first()).toBeVisible();
  });
});

test.describe("Listing pagination", () => {
  test(
    "next page lists the following CMS items, and an out-of-range page is not found",
    {
      tag: ["@regression", "@cms"],
    },
    async ({ poManager, strapi }) => {
      const path = INTERACTION_PAGES.pagination;
      const page = poManager.getContentPage(path);
      await page.open();
      const items = page.main.locator(`a[href^="${path}/"]`);
      const firstPage = [
        ...new Set(await items.evaluateAll((links) => links.map((link) => link.getAttribute("href")))),
      ];
      const pagination = page.page.getByRole("navigation", { name: /pagination/i });
      await expect(pagination.getByRole("link", { name: /previous/i }), "no previous link on page 1").toHaveCount(0);
      const { entries } = await strapi.getCollection<CmsDetailEntry>("articles", {
        sort: "date:desc",
        "fields[0]": "slug",
        "pagination[pageSize]": String(firstPage.length),
        "pagination[page]": "2",
      });

      await pagination.getByRole("link", { name: /next/i }).click();
      await page.page.waitForURL(/[?&]page=2/);

      const secondPage = [
        ...new Set(await items.evaluateAll((links) => links.map((link) => link.getAttribute("href")))),
      ];
      expect(secondPage).toEqual(entries.map((article) => `${path}/${article.slug}`));
      const outOfRange = await page.page.goto(`${path}?page=9999`);
      expect(outOfRange?.status(), "a page past the last one is not found (ALW-198)").toBe(404);
    },
  );
});
