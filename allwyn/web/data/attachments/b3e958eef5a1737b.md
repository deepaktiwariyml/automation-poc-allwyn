# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/web/page-health.test.ts >> page health /terms-of-use
- Location: tests/web/page-health.test.ts:10:7

# Error details

```
Error: external links without target="_blank" and rel noopener/noreferrer

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "https://www.allwyn.com/ (target=\"\", rel=\"\")",
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
    - article [ref=e34]:
      - heading "Terms of use" [level=1] [ref=e40]
      - generic [ref=e43]:
        - paragraph [ref=e44]: Allwyn is a multi-national group, which comprises legal entities ("affiliates" or "subsidiaries"), business processes, management structures, and technical systems in numerous jurisdictions, in particular in Switzerland, Austria, the Czech Republic, Greece, Cyprus, and the United Kingdom.
        - paragraph [ref=e45]:
          - text: This statement applies to this Allwyn website (
          - link "https://www.allwyn.com/" [ref=e46] [cursor=pointer]:
            - /url: https://www.allwyn.com/
          - text: ) ("web site").
        - heading "Use of this Site" [level=2] [ref=e47]
        - paragraph [ref=e48]: Allwyn maintains this Site for your personal entertainment, information, education, and communication. Please feel free to browse the Site.
        - paragraph [ref=e49]: You may download material displayed on web sites for non-commercial, personal use only provided you also retain all copyright and other proprietary notices contained on the materials. You may not, however, distribute, modify, transmit, reuse, re-post, or use the content of the Site for commercial purposes, including the text, images, audio and video without Allwyn’s written permission.
        - paragraph [ref=e50]: Changes periodically are made to Allwyn web sites without any prior notice.
        - heading "No Warranties; Limitation of Liability" [level=2] [ref=e51]
        - paragraph [ref=e52]: THIS SITE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        - paragraph [ref=e53]: Allwyn also assumes no responsibility and shall not be liable for any damages to or viruses that may infect, your computer equipment, software, data or other property on account of your access to, use of, or browsing in the Site or your downloading of any materials, data, text, images, video or audio from the Site or any linked sites.
        - paragraph [ref=e54]: In no event shall Allwyn or any other party, involved in creating, producing, maintaining or delivering the Site, or any of their affiliates, or the officers, directors, employees, shareholders, or agents of each of them, be liable for any damages of any kind, including without limitation any direct, special, incidental, indirect, exemplary, punitive or consequential damages, whether or not advised of the possibility of such damages, and on any theory of liability whatsoever, arising out of or in connection with the use or performance of, or your browsing in, or your links to other sites from Allwyn web sites.
        - heading "Unaffiliated Products and Sites" [level=2] [ref=e55]
        - paragraph [ref=e56]: Descriptions of, or references to, products, publications or sites not owned by Allwyn or its affiliates do not imply endorsement of that product, publication or site. Allwyn has not reviewed material linked to the Allwyn web sites and is not responsible for the content of any such material. Allwyn disclaims any responsibility or liability. Your linking to any other sites is at your own risk.
        - heading "Intellectual Property" [level=2] [ref=e57]
        - paragraph [ref=e58]: Unless otherwise noted, product names, designs, logos, titles, text, images, audio and video within Allwyn web sites are the trademarks, service marks, trade names, copyrights or other property of Allwyn and its Subsidiaries ("Allwyn Intellectual Property"). All other trademarks are the property of their respective owners. Nothing contained on Allwyn web sites should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any Allwyn Intellectual Property without the written permission of Allwyn.
        - paragraph [ref=e59]: All proprietary information, software, graphics, files, logos and trademarks received or transmitted electronically are the property of Allwyn and further distribution or downloading of such information does not confer any rights on any other person or company.
        - heading "Accuracy" [level=2] [ref=e60]
        - paragraph [ref=e61]: Allwyn disclaims any responsibility or liability for any errors, omissions or inaccuracies in the material on this site, and is not responsible for any uses or decisions made by third parties based on this information.
        - heading "Availability of Products and Services" [level=2] [ref=e62]
        - paragraph [ref=e63]: Notwithstanding the foregoing, Allwyn web sites may be viewed internationally and may contain products or services not available in all countries or available in some countries only on other terms, including terms as to price. References to a particular product or service do not imply that Allwyn intends to make such products or services available in such countries.
        - paragraph [ref=e64]:
          - strong [ref=e65]: Last updated May 11, 2022
  - contentinfo "Site footer" [ref=e66]:
    - generic [ref=e69]:
      - region [ref=e70]:
        - heading "Email alerts" [level=2] [ref=e71]
        - paragraph [ref=e72]: Subscribe to receive email updates
        - generic [ref=e73]:
          - generic [ref=e74]:
            - generic [ref=e75]:
              - text: Email address *
              - generic [ref=e76]: (required)
            - textbox "Email address (required)" [ref=e77]:
              - /placeholder: Enter email address
          - button "Sign up" [ref=e78] [cursor=pointer]
      - generic [ref=e79]:
        - region [ref=e80]:
          - heading "Legal" [level=2] [ref=e81]
          - list [ref=e82]:
            - listitem [ref=e83]:
              - link "Privacy notice" [ref=e84] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e85]:
              - link "Cookie policy" [ref=e86] [cursor=pointer]:
                - /url: /cookie-policy
            - listitem [ref=e87]:
              - link "Terms of use" [ref=e88] [cursor=pointer]:
                - /url: /terms-of-use
            - listitem [ref=e89]:
              - link "Whistleblowing (opens in a new tab)" [ref=e90] [cursor=pointer]:
                - /url: https://report.whistleb.com/en/allwyn
                - text: Whistleblowing
                - generic [ref=e91]: (opens in a new tab)
        - region [ref=e92]:
          - heading "Contact" [level=2] [ref=e93]
          - list [ref=e94]:
            - listitem [ref=e95]:
              - link "Contact us" [ref=e96] [cursor=pointer]:
                - /url: /contact-us
        - region [ref=e97]:
          - heading "Resources" [level=2] [ref=e98]
          - list [ref=e99]:
            - listitem [ref=e100]:
              - link "Important documents" [ref=e101] [cursor=pointer]:
                - /url: /important-documents-and-information
            - listitem [ref=e102]:
              - link "Annual reports" [ref=e103] [cursor=pointer]:
                - /url: /report/2025
        - region [ref=e104]:
          - heading "Where to play" [level=2] [ref=e105]
          - list [ref=e106]:
            - listitem [ref=e107]:
              - link "Austria (opens in a new tab)" [ref=e108] [cursor=pointer]:
                - /url: https://www.casinos.at
                - text: Austria
                - generic [ref=e109]: (opens in a new tab)
            - listitem [ref=e110]:
              - link "Greece & Cyprus (opens in a new tab)" [ref=e111] [cursor=pointer]:
                - /url: https://www.opap.gr
                - text: Greece & Cyprus
                - generic [ref=e112]: (opens in a new tab)
            - listitem [ref=e113]:
              - link "United Kingdom (opens in a new tab)" [ref=e114] [cursor=pointer]:
                - /url: https://www.allwyn.co.uk
                - text: United Kingdom
                - generic [ref=e115]: (opens in a new tab)
            - listitem [ref=e116]:
              - link "Czech Republic (opens in a new tab)" [ref=e117] [cursor=pointer]:
                - /url: https://www.allwyn.cz
                - text: Czech Republic
                - generic [ref=e118]: (opens in a new tab)
            - listitem [ref=e119]:
              - link "North America (opens in a new tab)" [ref=e120] [cursor=pointer]:
                - /url: https://www.allwynna.com
                - text: North America
                - generic [ref=e121]: (opens in a new tab)
      - region "Language" [ref=e122]:
        - navigation "Language" [ref=e123]:
          - link "English" [ref=e124] [cursor=pointer]:
            - /url: /terms-of-use
          - link "Čeština" [ref=e125] [cursor=pointer]:
            - /url: /cs/terms-of-use
          - link "Deutsch" [ref=e126] [cursor=pointer]:
            - /url: /de/terms-of-use
          - link "Ελληνικά" [ref=e127] [cursor=pointer]:
            - /url: /gr/oroi-chrisis
        - generic [ref=e128]: 18+
        - link "Play responsibly" [ref=e129] [cursor=pointer]:
          - /url: /responsibility/play-responsible
    - generic [ref=e132]:
      - paragraph [ref=e133]: © 2026 Allwyn Entertainment AG
      - list "Follow Allwyn" [ref=e134]:
        - listitem [ref=e135]:
          - link "Instagram (opens in a new tab)" [ref=e136] [cursor=pointer]:
            - /url: https://www.instagram.com/allwyn.global/
        - listitem [ref=e141]:
          - link "TikTok (opens in a new tab)" [ref=e142] [cursor=pointer]:
            - /url: https://www.tiktok.com/@allwyn.global
        - listitem [ref=e145]:
          - link "YouTube (opens in a new tab)" [ref=e146] [cursor=pointer]:
            - /url: https://www.youtube.com/@allwyn.Global
        - listitem [ref=e149]:
          - link "Linkedin (opens in a new tab)" [ref=e150] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/allwynglobal/
  - alert [ref=e153]
```

# Test source

```ts
  1  | import { requireEnv } from "../../configs/environment";
  2  | import { ALL_PAGES } from "../../testdata/templates";
  3  | import { auditPage, recordNetwork } from "../../utilities/page-audit";
  4  | import { expect, test } from "../fixtures";
  5  | 
  6  | // Checks every page gets (Allwyn-staging-FE-test-scope.xlsx, sheet 1: checks 1, 3, 5, 6 and 8).
  7  | test.describe.configure({ mode: "parallel" });
  8  | 
  9  | for (const path of ALL_PAGES) {
  10 |   test(`page health ${path}`, { tag: ["@regression"] }, async ({ poManager, linkStatus }) => {
  11 |     const page = poManager.getContentPage(path);
  12 |     const network = recordNetwork(page.page, new URL(requireEnv("ALLWYN_BASE_URL")).origin);
  13 | 
  14 |     const response = await page.open();
  15 |     const audit = await auditPage(page.page);
  16 |     const brokenLinks = await linkStatus.findProblems(audit.checkableLinks);
  17 | 
  18 |     // 1. Loads with real content and a page-specific title.
  19 |     expect(response?.status()).toBe(200);
  20 |     await expect(page.main).not.toBeEmpty();
  21 |     const title = (await page.page.title()).trim();
  22 |     expect.soft(title, "title should name the page, not just the brand").not.toMatch(/^(Allwyn)?$/);
  23 |     // 3. No console errors or failed first-party requests.
  24 |     expect.soft(network.consoleErrors, "console errors").toEqual([]);
  25 |     expect.soft(network.failedRequests, "failed requests").toEqual([]);
  26 |     // 5. Images load.
  27 |     expect.soft(audit.brokenImages, "images that did not load").toEqual([]);
  28 |     // 6. No empty headings, lists or landmarks.
  29 |     expect.soft(audit.emptyHeadings, "empty headings").toEqual([]);
  30 |     expect.soft(audit.emptyLists, "empty lists").toEqual([]);
  31 |     expect.soft(audit.emptyLandmarks, "empty landmarks").toEqual([]);
  32 |     // 8. Links are valid, external links open safely, and pages and downloads resolve.
  33 |     expect.soft(audit.invalidLinks, "links with no usable href").toEqual([]);
  34 |     expect
  35 |       .soft(audit.unsafeExternalLinks, 'external links without target="_blank" and rel noopener/noreferrer')
> 36 |       .toEqual([]);
     |        ^ Error: external links without target="_blank" and rel noopener/noreferrer
  37 |     expect.soft(brokenLinks, "links that do not resolve, or downloads that are not files").toEqual([]);
  38 |   });
  39 | }
  40 | 
```