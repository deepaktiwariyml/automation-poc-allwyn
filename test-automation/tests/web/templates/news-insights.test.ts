import type { CmsModule } from "../../../utilities/component-order";
import type { CmsDetailEntry, CmsHeader } from "../../../utilities/cms-types";
import { expectNoRawMarkup, expectSingleHeading } from "../../../utilities/page-checks";
import { normaliseText } from "../../../utilities/text";
import { expect, test } from "../../fixtures";

// News and insights landing (composed page with a latest-articles module, ALW-210 AC4).
test(
  "news and insights /news-insights",
  { tag: ["@regression", "@cms"] },
  async ({ poManager, cmsResolver, strapi }) => {
    const { simple_header, dynamic_zone = [] } = await cmsResolver.require<{
      simple_header?: CmsHeader | null;
      dynamic_zone?: CmsModule[];
    }>("/news-insights");
    const latestArticles = dynamic_zone.find((module) => module.__component === "modules.latest-articles-module");
    const batchSize = Number(latestArticles?.batch_size ?? 0);
    const { entries: newest } = await strapi.getCollection<CmsDetailEntry>("articles", {
      sort: "date:desc",
      "fields[0]": "slug",
      "pagination[pageSize]": String(batchSize),
    });
    const page = poManager.getContentPage("/news-insights");

    const response = await page.open();

    expect(response?.status()).toBe(200);
    await expectSingleHeading(page.page, normaliseText(simple_header?.title?.heading));
    expect(batchSize, "the CMS latest-articles module sets how many articles to show").toBeGreaterThan(0);
    const shown = await page.main
      .locator('[data-name="ArticlesModule"] a[href^="/news/"]')
      .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
    expect(shown, "latest articles are the newest CMS articles").toEqual(
      newest.map((article) => `/news/${article.slug}`),
    );
    await expectNoRawMarkup(page.main);
  },
);
