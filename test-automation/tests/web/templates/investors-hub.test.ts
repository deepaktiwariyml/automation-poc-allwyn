import type { CmsDetailEntry, CmsInvestorsHub } from "../../../utilities/cms-types";
import { expectNoRawMarkup, expectSingleHeading, present } from "../../../utilities/page-checks";
import { normaliseText } from "../../../utilities/text";
import { expect, test } from "../../fixtures";

// Investors hub (renderInvestorsHub, E-019: ALW-217).
test("investors hub /investors", { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver, strapi }) => {
  const hub = await cmsResolver.require<CmsInvestorsHub>("/investors");
  const { entries: latestNews } = await strapi.getCollection<CmsDetailEntry>("investors-articles", {
    sort: "date:desc",
    "pagination[pageSize]": "10",
  });
  const page = poManager.getContentPage("/investors");

  const response = await page.open();

  expect(response?.status()).toBe(200);
  await expectSingleHeading(page.page, hub.simple_header?.title?.heading ?? undefined);
  // AC5: region titles come from the CMS.
  const regionTitles = [
    hub.news_heading,
    hub.events_heading,
    hub.latest_results_title?.heading,
    hub.governance_title?.heading,
  ];
  for (const title of regionTitles.flatMap(present)) await expect(page.main).toContainText(normaliseText(title));
  // AC7: CMS buttons render as links.
  for (const button of [...hub.news_buttons, ...hub.events_buttons]) {
    await expect(page.main.locator(`a[href="${button.target_value ?? ""}"]`).first()).toContainText(button.label ?? "");
  }
  // AC8: latest news lists the newest investor articles.
  const shown = [
    ...new Set(
      await page.main
        .locator("section")
        .filter({ has: page.page.getByRole("heading", { name: normaliseText(hub.news_heading), exact: true }) })
        .locator('a[href^="/investors-news/"]')
        .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
    ),
  ];
  expect(shown.length, "latest news should show articles").toBeGreaterThan(0);
  expect(shown).toEqual(latestNews.slice(0, shown.length).map((article) => `/investors-news/${article.slug}`));
  await expectNoRawMarkup(page.main);
});
