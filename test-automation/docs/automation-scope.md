# Allwyn.com — Regression Automation Scope

Status: proposal for review · Prepared 2026-10-22 · Target launch 2026-11-01

Sources: staging site `allwyn-web-staging.vercel.app` (sitemap + rendered pages), Strapi v5 Content API
(`cat-admin.allwyn.com`, read-only token), and the _Allwyn.com MVP — Technical Approach_ deck.

## 1. Constraints from the technical approach

| Deck statement                                                      | What automation must do                                                     |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| "A limited set of templates renders a very large amount of content" | Data-driven tests over **every** CMS record, not a sample page              |
| "Volume QA is the gate" / "Shared modules span many templates"      | Module checks run on every template that uses the module                    |
| "URLs: nothing moves"                                               | Every existing URL must keep resolving                                      |
| "Localization: maintained"                                          | `en`, `cs`, `de`, `el` (`/gr`) routes and `hreflang` keep working           |
| "Investor pages: refresh only — records and archive untouched"      | Investor listings must show every CMS record and its document link          |
| "SEO and llms.txt", "GTM preserved"                                 | Metadata, `llms.txt` and the GTM container are asserted                     |
| "Playwright: end-to-end coverage of critical user journeys"         | This suite; Vitest covers components, manual QA and UAT give final sign-off |

**Read-only rule:** tests only read from Strapi and the site. Nothing creates, updates or deletes CMS data, and
forms are never submitted (that would create real enquiries); only client-side validation is checked.

## 2. Site inventory

The sitemap lists **475 URLs**: 343 in `en`, plus 132 localized URLs (`/cs`, `/de`, `/gr`).

| Route family                                        | Pages |
| --------------------------------------------------- | ----: |
| `/investors-news/*`                                 |   141 |
| `/news/*`                                           |    86 |
| `/regulatory-announcements/*`                       |    38 |
| `/general-meeting-disclosure/*`                     |    24 |
| `/markets/*`, `/sponsorships/*`                     |  6, 6 |
| `/gaming-studio/*`, `/p/*`                          |  3, 3 |
| `/report/*`                                         |     1 |
| Standalone pages (home, about, legal, investors, …) |   ~35 |

## 3. Strapi content types → pages

Strapi is **v5** (flat responses with `documentId`). The token cannot read the schema endpoints (403), so types
were discovered by probing `/api/<id>` and mapped by evidence: slug match for collections, API name + SEO title
for single types, and dynamic-zone text where ambiguous.

### 3.1 Global

| Type     | Fields                                                                                                                        | Appears on |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `global` | `menu_items`, `footer_link_groups`, `socials`, newsletter, `info_popup`, `career_banner`, `brand_line`, `llms_text`, `schema` | Every page |

### 3.2 Collection types (detail templates)

Every route maps **1:1** to a CMS slug, with no orphans in either direction.

| Type                      | Records (en) | Route                             | Locales          | Also feeds                                                         |
| ------------------------- | -----------: | --------------------------------- | ---------------- | ------------------------------------------------------------------ |
| `articles`                |           86 | `/news/:slug`                     | en only          | Latest-articles module on `/`, `/news-insights`, sponsorship pages |
| `investors-articles`      |          141 | `/investors-news/:slug`           | en only          | `/investors-news`, `/investors`                                    |
| `investors-announcements` |           38 | `/regulatory-announcements/:slug` | en only          | `/regulatory-announcements`                                        |
| `markets`                 |            6 | `/markets/:slug`                  | en, cs, de, el   | Markets map on `/`, `/markets`                                     |
| `sponsorships`            |            6 | `/sponsorships/:slug`             | en only          | `/sponsorships`                                                    |
| `gaming-studios`          |            3 | `/gaming-studio/:slug`            | en, cs, de, el   | `/markets`                                                         |
| `content-pages`           |            3 | `/p/:slug`                        | en (+1 cs/de/el) | —                                                                  |
| `reports`                 |            1 | `/report/:slug`                   | en, cs, de, el   | —                                                                  |

Supporting collections (no detail route):

| Type                      | Records | Rendered on                                  |
| ------------------------- | ------: | -------------------------------------------- |
| `brands`                  |      31 | `/our-brands`, home logo strip, market pages |
| `article-categories`      |       2 | Article listing/filters                      |
| `investors-presentations` |      12 | `/investors-presentations`, `/investors`     |
| `investors-results`       |      44 | `/investors-results`                         |
| `investors-dividends`     |       6 | `/dividends`                                 |
| `investors-esg-reports`   |       7 | `/esg-reports`                               |

### 3.3 Single types (one page each)

| Type                           | Route                                  | Modules (dynamic zone)                                                                                               |
| ------------------------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `home-page`                    | `/`                                    | banner, stats, pills-grid, promo, logo-strip, carousel, social-widget, pills, markets-map, latest-articles, features |
| `about-page`                   | `/about-us`                            | carousel-timeline, metrics, promo, carousel, features                                                                |
| `career-page`                  | `/career`                              | pills, icon-texts, enquiry-form, social-widget                                                                       |
| `global-careers-page`          | `/career/global-careers`               | tabs, animated-icon-texts, banner-cards, fancy-banner-cards, faq, social-widget                                      |
| `management-page`              | `/management`                          | image-panels                                                                                                         |
| `board-page`                   | `/board`                               | image-panels                                                                                                         |
| `history-page`                 | `/our-history`                         | timeline, features                                                                                                   |
| `responsibility-page`          | `/responsibility`                      | traits, fancy-banner-cards, title-block, promo, pills-grid, articles, downloads                                      |
| `community-award-page`         | `/responsibility/community-award`      | two-cols-text, promo, pills-grid, carousel, banner-cards, icon-texts, banner                                         |
| `play-responsible-page`        | `/responsibility/play-responsible`     | wide-video, promo, contacts-banner                                                                                   |
| `markets-page`                 | `/markets`                             | features                                                                                                             |
| `brands-page`                  | `/our-brands`                          | logo-cards, features                                                                                                 |
| `sponsorships-page`            | `/sponsorships`                        | sponsorships                                                                                                         |
| `news-and-insights-page`       | `/news-insights`                       | latest-articles, features                                                                                            |
| `contact`                      | `/contact-us`                          | contact cards, emails, offices, national lottery                                                                     |
| `investors-news-page`          | `/investors-news`                      | header only (lists `investors-articles`)                                                                             |
| `investors-announcements-page` | `/regulatory-announcements`            | header only (lists `investors-announcements`)                                                                        |
| `investors-presentations-page` | `/investors-presentations`             | header only (lists `investors-presentations`)                                                                        |
| `investors-results-page`       | `/investors-results`                   | header only (lists `investors-results`)                                                                              |
| `investors-dividends-page`     | `/dividends`                           | header only (lists `investors-dividends`)                                                                            |
| `investors-esg-reports-page`   | `/esg-reports`                         | header only (lists `investors-esg-reports`)                                                                          |
| `investors-consensus-page`     | `/investors-consensus`                 | rich-text                                                                                                            |
| `email-alerts-page`            | `/email-alerts`                        | header only                                                                                                          |
| `important-docs-page`          | `/important-documents-and-information` | header only                                                                                                          |
| `gaming-studios-page`          | none in sitemap                        | empty dynamic zone; possibly supplies the gaming-studios heading                                                     |

### 3.4 Pages with no identified content type

These need the type list from Flo (a Content-Type Builder screenshot is enough), or confirmation that they are
hard-coded:

`/investors`, `/general-meeting-disclosure` (+24 documents), `/regulatory-disclosure`, `/play-the-right-way`,
`/feel-it-all`, `/privacy-policy`, `/cookie-policy`, `/terms-of-use`, `/career/culture-and-benefits`,
`/career/hq-and-markets`, `/responsibility/player-protection-lab`.

### 3.5 Shared modules (regression blast radius)

One module edit surfaces on every template listed against it:

| Module                                                                  | Used by                                                                                                  |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `features-module`                                                       | 9 types: home, about, history, markets page, brands, news-and-insights, markets, reports, gaming-studios |
| `carousel-module`                                                       | 7 types: home, about, community-award, articles, investors-articles, sponsorships, gaming-studios        |
| `promo-module`                                                          | 6 types: home, about, responsibility, community-award, play-responsible, markets                         |
| `metrics-module`                                                        | 4 types: about, markets, sponsorships, gaming-studios                                                    |
| `rich-text-module`                                                      | 4 types: investors-consensus, articles, investors-articles, investors-announcements                      |
| `banner`, `pills-grid`, `social-widget`, `latest-articles`, `downloads` | 3 types each                                                                                             |

A further 25 modules are used by one or two types each.

## 4. Observations from the analysis (to confirm)

Staging is still being built, so treat these as checks to confirm with the team, not as logged defects:

1. **SEO titles not taken from the CMS.** On `/`, `/about-us`, `/board`, `/management`, `/our-history` and `/markets`,
   `<title>` and `og:title` render as `Allwyn`, while `metadata.title` is set in Strapi (for example
   `The Board || Allwyn`). `/contact-us` renders correctly as `Contact us | Allwyn`.
2. **`/llms.txt` returns 404**, while `global.llms_text` is populated and the deck commits to `llms.txt`.
3. **`robots.txt` is `Disallow: /`.** That's correct for staging, but it must not reach production, so add a
   production-only check.
4. **Strapi `/_health` is behind Cloudflare Access** (it redirects to SSO), while `/api/*` is reachable with the
   token. The current `tests/apis/strapi.test.ts` health check will therefore fail and should use
   `GET /api/global` instead.
5. **SEO titles in Strapi follow different formats**: `Investors || News`, `Email Alerts Page`, `Brands page`,
   `Important docs`. Worth a content review before launch.

## 5. Test approach

### 5.1 Two tiers, both read-only

| Tier                   | Tooling                           | Covers                                                                                       | Speed        |
| ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------------- | ------------ |
| **HTTP / archive**     | Playwright `request` (no browser) | All 475 URLs: status, `<title>`, `<h1>`, canonical, `hreflang`, CMS title/date/perex present | Minutes      |
| **Browser / template** | Playwright pages + page objects   | Header, footer, modules, listings, media and interactions per template; desktop and mobile   | Per template |

The HTTP tier delivers "volume QA" cheaply. The browser tier checks rendering on every template, and on every record
where the template is small (for example markets or sponsorships).

### 5.2 Comparison rules (UI vs CMS)

- Titles, headings, dates and labels: exact match after whitespace normalisation, using the site's date format.
- Rich text: compare normalised plain text (strip markup) and check that the CMS text appears.
- Media and documents: the rendered URL is on `cdn.allwyn.com` and returns 200 (`HEAD` request).
- Links from the CMS (menus, footer, CTAs): `href` matches and the target resolves.
- Only published content is compared (Strapi's default). Never request drafts.
- Pass the page's locale to Strapi (`locale=cs|de|el`) for localized routes.

### 5.3 Proposed structure

```
configs/
  cms-routes.ts              # single registry: content type → route pattern → page object
pageobjects/
  components/                # Header, Footer, CookieBanner (from `global`)
  modules/                   # FeaturesModule, CarouselModule, PromoModule, … (one per Strapi module)
  pages/                     # HomePage, AboutPage, ContactPage, InvestorListingPage, …
  templates/                 # ArticlePage, InvestorArticlePage, MarketPage, SponsorshipPage, …
tests/
  apis/
    strapi-contract.test.ts  # every type reachable, required fields present, slugs unique
  web/
    archive/                 # HTTP tier: sitemap URLs, SEO metadata, hreflang, robots/llms.txt
    global/                  # header, footer, socials, newsletter vs `global`
    pages/                   # one spec per single-type page
    templates/               # data-driven specs per collection (every record)
    investors/               # listing record counts and document links
    i18n/                    # localized routes for localized types
utilities/
  strapi-client.ts           # exists
  content-normaliser.ts      # rich text / date normalisation shared by comparisons
```

Strapi data is fetched once per worker (fixture) and shared by the tests in that worker. Data-driven specs generate
one test per record, so a failure names the exact slug.

### 5.4 Tags and runs

| Tag           | Content                                                      | When                                    |
| ------------- | ------------------------------------------------------------ | --------------------------------------- |
| `@smoke`      | One record per template, global, Strapi contract (~30 tests) | Every staging deploy (weekly drop)      |
| `@regression` | Full archive and every template record                       | Before promotion to production, nightly |
| `@cms`        | UI vs CMS content comparisons                                | Part of regression                      |
| `@seo`        | Metadata, canonical, hreflang, robots, llms.txt              | Part of regression                      |
| `@i18n`       | `cs`, `de`, `el` routes                                      | Part of regression                      |
| `@investors`  | Investor listings and documents                              | Part of regression                      |

Projects: `chromium` desktop and mobile emulation (the deck says mobile-first) for regression; `all-browsers` for
smoke before release.

## 6. Priorities

| Priority              | Scope                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0 — before 1 Nov** | URL inventory (475 URLs resolve); global header/footer vs CMS; one smoke test per template; investor listing counts and document links; Strapi contract and health fix |
| **P1**                | Data-driven detail templates (all 86 + 141 + 38 records and the smaller collections); SEO metadata; localized routes                                                   |
| **P2**                | Module-level checks across templates; mobile and cross-browser regression; accessibility smoke                                                                         |

## 7. Out of scope

- Any write to Strapi, and the Strapi admin UI.
- Submitting forms (contact, career enquiry, newsletter): validation only.
- Internals of third parties (Recruitis, reCAPTCHA, WhistleB, Chorus Call): presence and handoff only.
- Component states (Vitest and Storybook), and final manual QA and UAT sign-off.
- Voting module: still an open decision in the deck.

## 8. Open items

1. The content-type list from Flo, to close the pages in §3.4.
2. Confirmation of the SEO-title and `llms.txt` observations in §4.
3. Whether production Strapi is reachable from CI (Cloudflare Access service token).
4. The date-format and locale rules the frontend applies to CMS dates.
