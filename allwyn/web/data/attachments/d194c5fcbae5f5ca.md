# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/web/templates/components.test.ts >> components /report/2025
- Location: tests/web/templates/components.test.ts:26:7

# Error details

```
Error: dynamic_zone[0] testimony-list-module content

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "text thelotteryandgamingsectoristransformingrapidlydrivenbytechno",
+ ]
```

```
Error: dynamic_zone[3] file-cards-module content

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "text keydocuments",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - navigation "Main navigation" [ref=e4]:
      - list [ref=e7]:
        - listitem [ref=e8]:
          - generic [ref=e9]:
            - link "Allwyn home" [ref=e10] [cursor=pointer]:
              - /url: /
            - link "Home of all feelings" [ref=e11] [cursor=pointer]:
              - /url: /feel-it-all
            - button "Menu" [ref=e13] [cursor=pointer]
        - listitem [ref=e18]:
          - generic [ref=e19]:
            - link "Play in Greece" [ref=e21] [cursor=pointer]:
              - /url: /markets/greece
              - generic [ref=e22]:
                - generic [aria-hidden] [ref=e23]: 🇬🇷
                - generic [ref=e24]: Play in Greece
            - link "Careers" [ref=e27] [cursor=pointer]:
              - /url: /careers
            - button "Investors" [ref=e29] [cursor=pointer]
  - main [ref=e33]:
    - generic [ref=e38]:
      - heading "2025 Annual Report and Accounts" [level=1] [ref=e41]
      - link "Download Full Report (opens in a new tab)" [ref=e43] [cursor=pointer]:
        - /url: https://cdn.allwyn.com/Allwyn_International_AG_Annual_Report_2025_cd01b568c4.pdf
        - text: Download Full Report
        - generic [ref=e44]: (opens in a new tab)
    - generic [ref=e45]:
      - generic [ref=e47]:
        - heading "Building a leading global gaming entertainment company" [level=2] [ref=e48]
        - paragraph [ref=e49]: In a landmark transaction for Allwyn and for the global gaming sector, Allwyn agreed a combination with OPAP, its publicly-listed subsidiary operating in Greece and Cyprus. This completed in March 2026, resulting in Allwyn being listed on the Athens stock exchange and creating the second largest listed lottery and gaming operator globally.
      - list [ref=e50]:
        - listitem [ref=e51]:
          - article [ref=e52]:
            - figure "Karel Komarek Chair of the Board" [ref=e53]:
              - blockquote [ref=e54]:
                - paragraph [ref=e55]: "\"2025 was a landmark year, defined by major strategic milestones and operational progress as we advance towards our vision of being the leading global gaming entertainment company.\""
              - generic [ref=e56]:
                - generic [aria-hidden] [ref=e58]: KK
                - generic [ref=e59]:
                  - generic [ref=e60]: Karel Komarek
                  - generic [ref=e61]: Chair of the Board
    - generic [ref=e62]:
      - heading "2025 Financial highlights" [level=2] [ref=e65]
      - list [ref=e66]:
        - listitem [ref=e67]:
          - generic [ref=e68]:
            - term [ref=e69]: Net Revenue
            - definition [ref=e70]:
              - generic [ref=e71]:
                - generic [aria-hidden] [ref=e72]: €0.0bn
                - generic [ref=e73]: €4.1bn
        - listitem [ref=e74]:
          - generic [ref=e75]:
            - term [ref=e76]: New Revenue Growth
            - definition [ref=e77]:
              - generic [ref=e78]:
                - generic [aria-hidden] [ref=e79]: +0%
                - generic [ref=e80]: +4%
        - listitem [ref=e81]:
          - generic [ref=e82]:
            - term [ref=e83]: Online NGR share
            - definition [ref=e84]:
              - generic [ref=e85]:
                - generic [aria-hidden] [ref=e86]: 0%
                - generic [ref=e87]: 37%
        - listitem [ref=e88]:
          - generic [ref=e89]:
            - term [ref=e90]: Adjusted EBITDA
            - definition [ref=e91]:
              - generic [ref=e92]:
                - generic [aria-hidden] [ref=e93]: €0.0bn
                - generic [ref=e94]: €1.6bn
        - listitem [ref=e95]:
          - generic [ref=e96]:
            - term [ref=e97]: Adjusted EBITDA margin of Net Revenue
            - definition [ref=e98]:
              - generic [ref=e99]:
                - generic [aria-hidden] [ref=e100]: 0%
                - generic [ref=e101]: 39%
    - list [ref=e103]:
      - listitem [ref=e104]:
        - article [ref=e105]:
          - figure "Robert Chvatal Chief Executive Officer" [ref=e106]:
            - blockquote [ref=e107]:
              - paragraph [ref=e108]: "\"2025 was a pivotal year. We delivered on all dimensions of our strategy and agreed two transformative transactions – further strengthening our positioning for an exciting future as a listed company.\""
            - generic [ref=e109]:
              - generic [aria-hidden] [ref=e111]: RC
              - generic [ref=e112]:
                - generic [ref=e113]: Robert Chvatal
                - generic [ref=e114]: Chief Executive Officer
      - listitem [ref=e115]:
        - article [ref=e116]:
          - figure "Kenneth Morton Chief Financial Officer" [ref=e117]:
            - blockquote [ref=e118]:
              - paragraph [ref=e119]: "\"Another year of good financial performance alongside significant strategic progress – reflected in strong support from capital markets as we start our journey as a listed company.\""
            - generic [ref=e120]:
              - generic [aria-hidden] [ref=e122]: KM
              - generic [ref=e123]:
                - generic [ref=e124]: Kenneth Morton
                - generic [ref=e125]: Chief Financial Officer
    - generic [ref=e126]:
      - heading "Download centre" [level=2] [ref=e129]
      - list [ref=e130]:
        - listitem [ref=e131]:
          - article [ref=e132]:
            - generic [ref=e134]:
              - paragraph [ref=e135]:
                - time [ref=e136]: 09 Apr 2026
              - heading [level=3] [ref=e137]:
                - link "Allwyn 2025 Annual Report (download)" [ref=e138] [cursor=pointer]:
                  - /url: https://cdn.allwyn.com/Allwyn_International_AG_Annual_Report_2025_cd01b568c4.pdf
                  - text: Allwyn 2025 Annual Report
                  - generic [ref=e139]: (download)
              - paragraph [ref=e140]: PDF
        - listitem [ref=e145]:
          - article [ref=e146]:
            - generic [ref=e148]:
              - paragraph [ref=e149]:
                - time [ref=e150]: 25 Apr 2025
              - heading [level=3] [ref=e151]:
                - link "Allwyn 2024 Annual Report (download)" [ref=e152] [cursor=pointer]:
                  - /url: https://cdn.allwyn.com/Allwyn_Annual_Report_2024_Hyperlink_250425_2_ea0f81ce81.pdf
                  - text: Allwyn 2024 Annual Report
                  - generic [ref=e153]: (download)
              - paragraph [ref=e154]: PDF
        - listitem [ref=e159]:
          - article [ref=e160]:
            - generic [ref=e162]:
              - paragraph [ref=e163]:
                - time [ref=e164]: 26 Apr 2024
              - heading [level=3] [ref=e165]:
                - link "Allwyn 2023 Annual Report (download)" [ref=e166] [cursor=pointer]:
                  - /url: https://cdn.allwyn.com/Allwyn_AR_23_Bookmarked_PDF_240503_d2d7d32ff4_e9d466cd17_8d82a3239b.pdf
                  - text: Allwyn 2023 Annual Report
                  - generic [ref=e167]: (download)
              - paragraph [ref=e168]: PDF
        - listitem [ref=e173]:
          - article [ref=e174]:
            - generic [ref=e176]:
              - paragraph [ref=e177]:
                - time [ref=e178]: 28 Apr 2023
              - heading [level=3] [ref=e179]:
                - link "Allwyn 2022 Annual Report (download)" [ref=e180] [cursor=pointer]:
                  - /url: https://cdn.allwyn.com/pdf_9ab4fd1bfc_cda17d6a91_90dbb03d86.pdf
                  - text: Allwyn 2022 Annual Report
                  - generic [ref=e181]: (download)
              - paragraph [ref=e182]: PDF
    - generic [ref=e188]:
      - heading "Explore more" [level=2] [ref=e191]
      - list [ref=e192]:
        - listitem [ref=e193]:
          - article [ref=e194]:
            - generic [ref=e196]:
              - heading "Allwyn News" [level=3] [ref=e197]
              - paragraph [ref=e198]: Read the latest news from Allwyn and learn more about our business and the industry.
              - link "Latest News , Allwyn News" [ref=e199] [cursor=pointer]:
                - /url: /news
                - text: Latest News
                - generic [ref=e200]: ", Allwyn News"
        - listitem [ref=e201]:
          - article [ref=e202]:
            - generic [ref=e204]:
              - heading "Investor Relations" [level=3] [ref=e205]
              - paragraph [ref=e206]: Allwyn is a growing business operating in a global industry that has growth opportunities at every turn.
              - link "Investors , Investor Relations" [ref=e207] [cursor=pointer]:
                - /url: /investors
                - text: Investors
                - generic [ref=e208]: ", Investor Relations"
  - contentinfo "Site footer" [ref=e209]:
    - generic [ref=e212]:
      - region [ref=e213]:
        - heading "Email alerts" [level=2] [ref=e214]
        - paragraph [ref=e215]: Subscribe to receive email updates
        - generic [ref=e216]:
          - generic [ref=e217]:
            - generic [ref=e218]:
              - text: Email address *
              - generic [ref=e219]: (required)
            - textbox "Email address (required)" [ref=e220]:
              - /placeholder: Enter email address
          - button "Sign up" [ref=e221] [cursor=pointer]
      - generic [ref=e222]:
        - region [ref=e223]:
          - heading "Legal" [level=2] [ref=e224]
          - list [ref=e225]:
            - listitem [ref=e226]:
              - link "Privacy notice" [ref=e227] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e228]:
              - link "Cookie policy" [ref=e229] [cursor=pointer]:
                - /url: /cookie-policy
            - listitem [ref=e230]:
              - link "Terms of use" [ref=e231] [cursor=pointer]:
                - /url: /terms-of-use
            - listitem [ref=e232]:
              - link "Whistleblowing (opens in a new tab)" [ref=e233] [cursor=pointer]:
                - /url: https://report.whistleb.com/en/allwyn
                - text: Whistleblowing
                - generic [ref=e234]: (opens in a new tab)
        - region [ref=e235]:
          - heading "Contact" [level=2] [ref=e236]
          - list [ref=e237]:
            - listitem [ref=e238]:
              - link "Contact us" [ref=e239] [cursor=pointer]:
                - /url: /contact-us
        - region [ref=e240]:
          - heading "Resources" [level=2] [ref=e241]
          - list [ref=e242]:
            - listitem [ref=e243]:
              - link "Important documents" [ref=e244] [cursor=pointer]:
                - /url: /important-documents-and-information
            - listitem [ref=e245]:
              - link "Annual reports" [ref=e246] [cursor=pointer]:
                - /url: /report/2025
        - region [ref=e247]:
          - heading "Where to play" [level=2] [ref=e248]
          - list [ref=e249]:
            - listitem [ref=e250]:
              - link "Austria (opens in a new tab)" [ref=e251] [cursor=pointer]:
                - /url: https://www.casinos.at
                - text: Austria
                - generic [ref=e252]: (opens in a new tab)
            - listitem [ref=e253]:
              - link "Greece & Cyprus (opens in a new tab)" [ref=e254] [cursor=pointer]:
                - /url: https://www.opap.gr
                - text: Greece & Cyprus
                - generic [ref=e255]: (opens in a new tab)
            - listitem [ref=e256]:
              - link "United Kingdom (opens in a new tab)" [ref=e257] [cursor=pointer]:
                - /url: https://www.allwyn.co.uk
                - text: United Kingdom
                - generic [ref=e258]: (opens in a new tab)
            - listitem [ref=e259]:
              - link "Czech Republic (opens in a new tab)" [ref=e260] [cursor=pointer]:
                - /url: https://www.allwyn.cz
                - text: Czech Republic
                - generic [ref=e261]: (opens in a new tab)
            - listitem [ref=e262]:
              - link "North America (opens in a new tab)" [ref=e263] [cursor=pointer]:
                - /url: https://www.allwynna.com
                - text: North America
                - generic [ref=e264]: (opens in a new tab)
      - region "Language" [ref=e265]:
        - navigation "Language" [ref=e266]:
          - link "English" [ref=e267] [cursor=pointer]:
            - /url: /report/2025
          - link "Čeština" [ref=e268] [cursor=pointer]:
            - /url: /cs/vyrocni-zprava/2025
          - link "Deutsch" [ref=e269] [cursor=pointer]:
            - /url: /de/report/2025
          - link "Ελληνικά" [ref=e270] [cursor=pointer]:
            - /url: /gr/anafora/2025
        - generic [ref=e271]: 18+
        - link "Play responsibly" [ref=e272] [cursor=pointer]:
          - /url: /responsibility/play-responsible
    - generic [ref=e275]:
      - paragraph [ref=e276]: © 2026 Allwyn Entertainment AG
      - list "Follow Allwyn" [ref=e277]:
        - listitem [ref=e278]:
          - link "Instagram (opens in a new tab)" [ref=e279] [cursor=pointer]:
            - /url: https://www.instagram.com/allwyn.global/
        - listitem [ref=e284]:
          - link "TikTok (opens in a new tab)" [ref=e285] [cursor=pointer]:
            - /url: https://www.tiktok.com/@allwyn.global
        - listitem [ref=e288]:
          - link "YouTube (opens in a new tab)" [ref=e289] [cursor=pointer]:
            - /url: https://www.youtube.com/@allwyn.Global
        - listitem [ref=e292]:
          - link "Linkedin (opens in a new tab)" [ref=e293] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/allwynglobal/
  - alert [ref=e296]
```

# Test source

```ts
  1  | import { APP_OWNED_ZONE_PAGES } from "../../../configs/cms-components";
  2  | import { COMPOSED_PAGES, DETAIL_PAGES } from "../../../testdata/templates";
  3  | import { missingContent, moduleContent } from "../../../utilities/component-content";
  4  | import {
  5  |   COMPONENT_INDEX_ATTRIBUTE,
  6  |   type CmsModule,
  7  |   expectedComponents,
  8  |   matchInOrder,
  9  |   renderedComponents,
  10 | } from "../../../utilities/component-order";
  11 | import { expect, test } from "../../fixtures";
  12 | 
  13 | /*
  14 |  * Every component in a page's CMS dynamic zone is rendered, in CMS order (configs/cms-components.ts),
  15 |  * and shows its own CMS content: texts, link targets, images/files and dates (sheet 2 and 3 "renders"
  16 |  * checks: captions, stats, testimony, documents, timeline, tabs, promos, …).
  17 |  */
  18 | test.describe.configure({ mode: "parallel" });
  19 | 
  20 | const PAGES_WITH_MODULES = [
  21 |   ...COMPOSED_PAGES,
  22 |   ...DETAIL_PAGES.filter(({ path }) => path.startsWith("/markets/")).map(({ path }) => path),
  23 | ];
  24 | 
  25 | for (const path of PAGES_WITH_MODULES) {
  26 |   test(`components ${path}`, { tag: ["@regression", "@cms"] }, async ({ poManager, cmsResolver }) => {
  27 |     const appOwned = APP_OWNED_ZONE_PAGES[path];
  28 |     test.skip(appOwned !== undefined, `CMS zone replaced by app-owned sections: ${appOwned ?? ""}`);
  29 |     const { dynamic_zone = [] } = await cmsResolver.require<{ dynamic_zone?: CmsModule[] }>(path);
  30 |     const expected = expectedComponents(dynamic_zone);
  31 |     const page = poManager.getContentPage(path);
  32 | 
  33 |     await page.open();
  34 |     const rendered = await renderedComponents(page.main);
  35 |     const { matches, missing } = matchInOrder(expected, rendered);
  36 | 
  37 |     expect.soft(missing, `CMS components missing or out of order; rendered: ${rendered.join(", ")}`).toEqual([]);
  38 | 
  39 |     for (const { expected: component, renderedIndex } of matches.filter(({ expected }) => !expected.presenceOnly)) {
  40 |       const element = page.main.locator(`[${COMPONENT_INDEX_ATTRIBUTE}="${String(renderedIndex)}"]`);
  41 |       const content = moduleContent(component.content, component.ignoreFields);
> 42 |       expect.soft(await missingContent(element, content), `${component.label} content`).toEqual([]);
     |                                                                                         ^ Error: dynamic_zone[3] file-cards-module content
  43 |     }
  44 |   });
  45 | }
  46 | 
```