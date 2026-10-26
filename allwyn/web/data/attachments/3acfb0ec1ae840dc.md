# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/web/page-health.test.ts >> page health /news/allwyn-becomes-an-official-partner-of-the-mc-laren-formula-1-team
- Location: tests/web/page-health.test.ts:10:7

# Error details

```
Error: external links without target="_blank" and rel noopener/noreferrer

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "https://www.allwyn.com/sponsorships/mclaren (target=\"\", rel=\"\")",
+   "https://www.mclaren.com/racing/sustainability/ (target=\"\", rel=\"\")",
+   "https://www.mclaren.com/racing/ (target=\"\", rel=\"\")",
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
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e39]:
            - heading "Allwyn becomes an Official Partner of the McLaren Formula 1 Team" [level=1] [ref=e40]
            - paragraph [ref=e41]: Leading multi-national lottery operator’s partnership with 2024 F1 Constructors’ Champions the McLaren F1 Team, combined with the newly announced official partnership with Formula 1, further underlines Allwyn’s global ambition
          - time [ref=e42]: 12 Feb 2025
        - img "Allwyn becomes an Official Partner of the McLaren Formula 1 Team" [ref=e44]
      - generic [ref=e47]:
        - paragraph [ref=e48]:
          - strong [ref=e49]: LUCERNE, SWITZERLAND, 12 FEBRUARY 2025
          - text: "- Today, leading multi-national lottery operator Allwyn announces a global official partnership with 2024 F1 Constructors’ Champions, the"
          - link "McLaren F1 Team" [ref=e50] [cursor=pointer]:
            - /url: https://www.allwyn.com/sponsorships/mclaren
          - text: . The partnership with McLaren, alongside the multi-year deal announced with Formula 1 earlier this week, will support and accelerate Allwyn’s plans for further global growth.
        - paragraph [ref=e51]: Allwyn and McLaren share the principles of innovation, high performance and excellence, and the partnership will help both brands drive awareness to global audiences. Together, Allwyn and McLaren will give fans unparalleled access to McLaren through exclusive behind-the-scenes content, live fan experiences, and unlocking more possibilities for fans to enjoy the sport.
        - paragraph [ref=e52]: Importantly, the collaboration will provide a powerful global platform for Allwyn to drive responsible gaming awareness among a highly engaged audience.
        - paragraph [ref=e53]:
          - strong [ref=e54]: "Karel Komárek, Allwyn Board Chair and Founder, commented:"
          - text: “This exciting partnership – alongside the partnership we announced earlier this week with F1 - is a big step forward on Allwyn’s journey to expand its business and brand globally. Our collaboration with McLaren benefits from a shared drive to thrive, fueled by technology and with innovation at its heart; characteristics that will continue to power Allwyn’s global development.”
        - paragraph [ref=e55]:
          - strong [ref=e56]: On the partnership, Robert Chvátal, Allwyn CEO, commented,
          - text: “McLaren is an iconic name in Formula 1, with huge international appeal. It is one of the most successful racing teams in the world – with incredibly exciting drivers. We take pride that wherever Allwyn operates, we create safe and responsible ways for people to play. We know that McLaren, like the wider world of Formula 1, also prioritises safety and responsibility. We look forward to working together to realise our shared ambition of a world full of winning moments.”
        - paragraph [ref=e57]:
          - strong [ref=e58]: Zak Brown, CEO, McLaren Racing, said
          - text: ": “We are delighted to welcome Allwyn to the McLaren Racing family. Off the back of a fantastic 2024 season in Formula 1, it’s great to have an international brand like Allwyn join us at a time when the team – and the sport – is going from strength to strength. We’re excited to go racing together.”"
        - paragraph [ref=e59]: As an Official Partner of McLaren Racing, Allwyn branding will feature on multiple team assets, including on the race cars and driver overalls of McLaren F1 Team drivers Lando Norris and Oscar Piastri.
        - paragraph [ref=e60]:
          - strong [ref=e61]: ENDS
        - paragraph [ref=e62]:
          - strong [ref=e63]: Notes to editors
          - text: Allwyn’s partnership with McLaren has been entered into by Allwyn AG, the parent company of the Allwyn group, which is based in Lucerne, Switzerland. It is a global partnership that is not directed or targeted at any individual country.
        - paragraph [ref=e64]:
          - strong [ref=e65]: Media enquiries
          - text: pr@allwyn.com
          - strong [ref=e66]: Investor enquiries
          - text: ir@allwyn.com
        - paragraph [ref=e67]:
          - strong [ref=e68]: About Allwyn
          - text: Allwyn is a leading multi-national lottery operator. Allwyn builds better lotteries that return more to good causes by focusing on innovation, technology, efficiency and safety across a growing casual gaming entertainment portfolio. The lottery-first approach of focusing on affordable recreational play has earned Allwyn leading market positions with trusted brands across Europe in Austria, Czech Republic, Greece and Cyprus, Italy, the United Kingdom, and the United States (Illinois). For more information about Allwyn and its initiatives, please visit www.allwyn.com.
        - paragraph [ref=e69]:
          - strong [ref=e70]: About McLaren Racing
          - text: McLaren Racing was founded by racing driver Bruce McLaren in 1963. The team entered its first Formula 1 race in 1966. McLaren has since won 21 Formula 1 world championships, 189 Formula 1 grands prix, the Indianapolis 500 three times, and the Le Mans 24 Hours at its first attempt.
        - paragraph [ref=e71]: McLaren Racing competes across five racing series. The team competes in the FIA Formula 1 World Championship with McLaren F1 drivers Lando Norris and Oscar Piastri, the NTT INDYCAR SERIES with Arrow McLaren drivers Pato O’Ward, Nolan Siegel and Christian Lundgaard, the ABB FIA Formula E World Championship as the NEOM McLaren Formula E Team with drivers Sam Bird and Taylor Barnard, and F1 Academy with Rodin Motorsport and Driver Development programme member Ella Lloyd. The team also competes in the F1 Sim Racing Championship as McLaren Shadow with Lucas Blakeley, Wilson Hughes and Alfie Butcher.
        - paragraph [ref=e72]:
          - text: McLaren is a champion for sustainability in the sport and a signatory to the UN Sports for Climate Action Commitment. It is
          - link "committed to achieving net zero by 2040" [ref=e73] [cursor=pointer]:
            - /url: https://www.mclaren.com/racing/sustainability/
          - text: and fostering a diverse and inclusive culture in the motorsport industry.
        - paragraph [ref=e74]:
          - link "McLaren Racing – Official Website" [ref=e75] [cursor=pointer]:
            - /url: https://www.mclaren.com/racing/
        - paragraph [ref=e76]:
          - strong [ref=e77]: Forward-Looking Statements
          - text: This announcement may include forward-looking statements regarding certain of our plans and our current goals, intentions, beliefs and expectations concerning, among other things, our future results of operation, financial condition, liquidity, prospects, growth, strategies, pending acquisitions or other transactions, financing plans and the industries in which we operate. These forward-looking statements can be identified by the fact that they do not relate only to historical or current facts. By their nature, forward-looking statements are inherently subject to risks and uncertainties because they relate to events and depend on circumstances that may or may not occur in the future. We caution you that forward-looking statements are not guarantees of future performance and that actual results and outcomes may differ materially from those made in or suggested by the forward-looking statements contained in this announcement. You should carefully consider the risks and uncertainties described in the “Risk Factors” section of the annual report published by Allwyn International AG (formerly Allwyn International a.s.) and other documents we publish on our website.
      - generic [ref=e78]:
        - generic [ref=e81]:
          - heading "Related News" [level=2] [ref=e85]
          - link "Show all" [ref=e88] [cursor=pointer]:
            - /url: /news-insights
        - list [ref=e93]:
          - listitem [ref=e94]:
            - article [ref=e95]:
              - generic [ref=e97]:
                - heading [level=3] [ref=e98]:
                  - link "Allwyn brings inaugural Allwyn x McLaren Racing event to Athens" [ref=e99] [cursor=pointer]:
                    - /url: /news/allwyn-brings-inaugural-allwyn-mclaren-racing-event-to-athens
                - paragraph [ref=e101]:
                  - time [ref=e102]: 24 Aug 2026
          - listitem [ref=e103]:
            - article [ref=e104]:
              - generic [ref=e106]:
                - heading [level=3] [ref=e107]:
                  - link "“Celebrating what is possible” - F1® Allwyn Global Community Award supports children's inclusive sport in the Netherlands" [ref=e108] [cursor=pointer]:
                    - /url: /news/celebrating-what-is-possible-f1-allwyn-global-community-award-supports-inclusive-sport-in-the-netherlands
                - paragraph [ref=e110]:
                  - time [ref=e111]: 24 Aug 2026
          - listitem [ref=e112]:
            - article [ref=e113]:
              - generic [ref=e115]:
                - heading [level=3] [ref=e116]:
                  - link "Spieren voor Spieren wins Dutch F1® Allwyn Global Community Award to transform lives through adaptive sport" [ref=e117] [cursor=pointer]:
                    - /url: /news/spieren-voor-spieren-wins-dutch-f1-allwyn-global-community-award-transform-lives-adaptive-sport
                - paragraph [ref=e119]:
                  - time [ref=e120]: 21 Aug 2026
  - contentinfo "Site footer" [ref=e121]:
    - generic [ref=e124]:
      - region [ref=e125]:
        - heading "Email alerts" [level=2] [ref=e126]
        - paragraph [ref=e127]: Subscribe to receive email updates
        - generic [ref=e128]:
          - generic [ref=e129]:
            - generic [ref=e130]:
              - text: Email address *
              - generic [ref=e131]: (required)
            - textbox "Email address (required)" [ref=e132]:
              - /placeholder: Enter email address
          - button "Sign up" [ref=e133] [cursor=pointer]
      - generic [ref=e134]:
        - region [ref=e135]:
          - heading "Legal" [level=2] [ref=e136]
          - list [ref=e137]:
            - listitem [ref=e138]:
              - link "Privacy notice" [ref=e139] [cursor=pointer]:
                - /url: /privacy-policy
            - listitem [ref=e140]:
              - link "Cookie policy" [ref=e141] [cursor=pointer]:
                - /url: /cookie-policy
            - listitem [ref=e142]:
              - link "Terms of use" [ref=e143] [cursor=pointer]:
                - /url: /terms-of-use
            - listitem [ref=e144]:
              - link "Whistleblowing (opens in a new tab)" [ref=e145] [cursor=pointer]:
                - /url: https://report.whistleb.com/en/allwyn
                - text: Whistleblowing
                - generic [ref=e146]: (opens in a new tab)
        - region [ref=e147]:
          - heading "Contact" [level=2] [ref=e148]
          - list [ref=e149]:
            - listitem [ref=e150]:
              - link "Contact us" [ref=e151] [cursor=pointer]:
                - /url: /contact-us
        - region [ref=e152]:
          - heading "Resources" [level=2] [ref=e153]
          - list [ref=e154]:
            - listitem [ref=e155]:
              - link "Important documents" [ref=e156] [cursor=pointer]:
                - /url: /important-documents-and-information
            - listitem [ref=e157]:
              - link "Annual reports" [ref=e158] [cursor=pointer]:
                - /url: /report/2025
        - region [ref=e159]:
          - heading "Where to play" [level=2] [ref=e160]
          - list [ref=e161]:
            - listitem [ref=e162]:
              - link "Austria (opens in a new tab)" [ref=e163] [cursor=pointer]:
                - /url: https://www.casinos.at
                - text: Austria
                - generic [ref=e164]: (opens in a new tab)
            - listitem [ref=e165]:
              - link "Greece & Cyprus (opens in a new tab)" [ref=e166] [cursor=pointer]:
                - /url: https://www.opap.gr
                - text: Greece & Cyprus
                - generic [ref=e167]: (opens in a new tab)
            - listitem [ref=e168]:
              - link "United Kingdom (opens in a new tab)" [ref=e169] [cursor=pointer]:
                - /url: https://www.allwyn.co.uk
                - text: United Kingdom
                - generic [ref=e170]: (opens in a new tab)
            - listitem [ref=e171]:
              - link "Czech Republic (opens in a new tab)" [ref=e172] [cursor=pointer]:
                - /url: https://www.allwyn.cz
                - text: Czech Republic
                - generic [ref=e173]: (opens in a new tab)
            - listitem [ref=e174]:
              - link "North America (opens in a new tab)" [ref=e175] [cursor=pointer]:
                - /url: https://www.allwynna.com
                - text: North America
                - generic [ref=e176]: (opens in a new tab)
      - region "Language" [ref=e177]:
        - navigation "Language" [ref=e178]:
          - link "English" [ref=e179] [cursor=pointer]:
            - /url: /news/allwyn-becomes-an-official-partner-of-the-mc-laren-formula-1-team
          - link "Čeština" [ref=e180] [cursor=pointer]:
            - /url: /cs/tiskove-zpravy
          - link "Deutsch" [ref=e181] [cursor=pointer]:
            - /url: /de/neuigkeiten
          - link "Ελληνικά" [ref=e182] [cursor=pointer]:
            - /url: /gr/nea
        - generic [ref=e183]: 18+
        - link "Play responsibly" [ref=e184] [cursor=pointer]:
          - /url: /responsibility/play-responsible
    - generic [ref=e187]:
      - paragraph [ref=e188]: © 2026 Allwyn Entertainment AG
      - list "Follow Allwyn" [ref=e189]:
        - listitem [ref=e190]:
          - link "Instagram (opens in a new tab)" [ref=e191] [cursor=pointer]:
            - /url: https://www.instagram.com/allwyn.global/
        - listitem [ref=e196]:
          - link "TikTok (opens in a new tab)" [ref=e197] [cursor=pointer]:
            - /url: https://www.tiktok.com/@allwyn.global
        - listitem [ref=e200]:
          - link "YouTube (opens in a new tab)" [ref=e201] [cursor=pointer]:
            - /url: https://www.youtube.com/@allwyn.Global
        - listitem [ref=e204]:
          - link "Linkedin (opens in a new tab)" [ref=e205] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/allwynglobal/
  - alert [ref=e208]
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