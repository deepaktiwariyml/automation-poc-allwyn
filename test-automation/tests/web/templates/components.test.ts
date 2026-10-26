import { APP_OWNED_ZONE_PAGES } from "../../../configs/cms-components";
import { COMPOSED_PAGES, DETAIL_PAGES } from "../../../testdata/templates";
import { missingContent, moduleContent } from "../../../utilities/component-content";
import {
  COMPONENT_INDEX_ATTRIBUTE,
  type CmsModule,
  expectedComponents,
  matchInOrder,
  renderedComponents,
} from "../../../utilities/component-order";
import { expect, test } from "../../fixtures";

/*
 * Every component in a page's CMS dynamic zone is rendered, in CMS order (configs/cms-components.ts),
 * and shows its own CMS content: texts, link targets, images/files and dates (sheet 2 and 3 "renders"
 * checks: captions, stats, testimony, documents, timeline, tabs, promos, …).
 */
test.describe.configure({ mode: "parallel" });

const PAGES_WITH_MODULES = [
  ...COMPOSED_PAGES,
  ...DETAIL_PAGES.filter(({ path }) => path.startsWith("/markets/")).map(({ path }) => path),
];

for (const path of PAGES_WITH_MODULES) {
  test(`components ${path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
    const appOwned = APP_OWNED_ZONE_PAGES[path];
    test.skip(appOwned !== undefined, `CMS zone replaced by app-owned sections: ${appOwned ?? ""}`);
    const { dynamic_zone = [] } = await cmsResolver.require<{ dynamic_zone?: CmsModule[] }>(path);
    const expected = expectedComponents(dynamic_zone);
    const page = poManager.getContentPage(path);

    await page.open();
    const rendered = await renderedComponents(page.main);
    const { matches, missing } = matchInOrder(expected, rendered);

    expect.soft(missing, `CMS components missing or out of order; rendered: ${rendered.join(", ")}`).toEqual([]);

    for (const { expected: component, renderedIndex } of matches.filter(({ expected }) => !expected.presenceOnly)) {
      const element = page.main.locator(`[${COMPONENT_INDEX_ATTRIBUTE}="${String(renderedIndex)}"]`);
      const content = moduleContent(component.content, component.ignoreFields);
      expect.soft(await missingContent(element, content), `${component.label} content`).toEqual([]);
    }
  });
}
