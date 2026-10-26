import { ARTICLE_PAGES } from "../../../testdata/templates";
import type { CmsDetailEntry } from "../../../utilities/cms-types";
import {
  expectDate,
  expectNoRawMarkup,
  expectSingleHeading,
  firstParagraph,
  plainText,
  present,
} from "../../../utilities/page-checks";
import { expect, test } from "../../fixtures";

// News article template (E-011/E-012: ALW-129, ALW-131, ALW-180).
for (const path of ARTICLE_PAGES) {
  test(`article ${path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
    const article = await cmsResolver.require<CmsDetailEntry>(path);
    const title = article.title ?? "";
    const page = poManager.getContentPage(path);

    const response = await page.open();

    expect(response?.status()).toBe(200);
    await expectSingleHeading(page.page, title);
    await expect(page.page).toHaveTitle(`${title} | Allwyn`);
    for (const date of present(article.date)) await expectDate(page.main, date);
    for (const perex of present(article.perex)) await expect(page.main).toContainText(plainText(perex));
    for (const content of present(article.content)) await expect(page.main).toContainText(firstParagraph(content));
    await expectNoRawMarkup(page.main);
  });
}
