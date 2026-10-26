import { DETAIL_PAGES } from "../../../testdata/templates";
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

// Detail page template (E-014: ALW-194, ALW-195, ALW-196).
test.describe.configure({ mode: "parallel" });

/** The entry's body: its `content` field and any rich-text modules in its dynamic zone. */
function richTextBodies(entry: CmsDetailEntry): string[] {
  const modules = (entry.dynamic_zone ?? []).filter((module) => module.__component === "modules.rich-text-module");
  return [entry.content, ...modules.map((module) => module.content)].flatMap(present);
}

function fileBaseName(url: string): string {
  return (url.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/i, "");
}

for (const { path, headingField } of DETAIL_PAGES) {
  test(`detail ${path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
    const entry = await cmsResolver.require<CmsDetailEntry>(path);
    const heading = entry[headingField] ?? entry.name ?? "";
    const page = poManager.getContentPage(path);

    const response = await page.open();

    expect(response?.status()).toBe(200);
    await expectSingleHeading(page.page, heading);
    await expect(page.page).toHaveTitle(`${heading} | Allwyn`);
    for (const date of present(entry.date)) await expectDate(page.main, date);
    for (const perex of present(entry.perex)) await expect(page.main).toContainText(plainText(perex));
    for (const file of present(entry.download_file)) {
      await expect(page.main.locator(`a[href="${file.url}"]`).first()).toContainText(entry.download_label ?? file.name);
    }
    // Sheet 2: the rich-text body renders (its links are checked by page-health).
    for (const body of richTextBodies(entry)) await expect(page.main).toContainText(firstParagraph(body));
    // Sheet 2: market pages show their flag.
    for (const flag of present(entry.flag)) {
      await expect(page.main.locator(`img[src*="${fileBaseName(flag.url)}"]`).first(), "market flag").toBeAttached();
    }
    await expectNoRawMarkup(page.main);
  });
}
