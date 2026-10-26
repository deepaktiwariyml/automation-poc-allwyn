/**
 * How site pages relate to Strapi content. Mirrors the frontend's route manifest
 * (allwyn-website-poc: apps/web/lib/routes/route-manifest.json), English paths only.
 */

/**
 * Collection types published as `<section>/<slug>` pages: section → collection type API ID.
 * The entry is the one whose `slug` equals the URL's last segment. The section matters because
 * the same story can exist in two collections (e.g. a news article and an investor article).
 * Legal pages sit at the root (`/privacy-policy`) and are `compliances` entries found by slug.
 */
export const COLLECTION_ROUTES: Readonly<Record<string, string>> = {
  "": "compliances",
  "/gaming-studio": "gaming-studios",
  "/general-meeting-disclosure": "investors-gm-disclosures",
  "/investors-news": "investors-articles",
  "/markets": "markets",
  "/news": "articles",
  "/p": "content-pages",
  "/regulatory-announcements": "investors-announcements",
  "/report": "reports",
  "/sponsorships": "sponsorships",
};

/** Single types have no slug, so their page is fixed: path → single type API ID. */
export const SINGLE_TYPE_ROUTES: Readonly<Record<string, string>> = {
  "/": "home-page",
  "/about-us": "about-page",
  "/board": "board-page",
  "/career": "career-page",
  "/career/culture-and-benefits": "culture-career-page",
  "/career/global-careers": "global-careers-page",
  "/career/hq-and-markets": "locations-career-page",
  "/contact-us": "contact",
  "/dividends": "investors-dividends-page",
  "/email-alerts": "email-alerts-page",
  "/esg-reports": "investors-esg-reports-page",
  "/financial-calendar": "investors-events-page",
  "/general-meeting-disclosure": "investors-gm-disclosures-page",
  "/important-documents-and-information": "important-docs-page",
  "/investors": "investors-general",
  "/investors-consensus": "investors-consensus-page",
  "/investors-news": "investors-news-page",
  "/investors-presentations": "investors-presentations-page",
  "/investors-results": "investors-results-page",
  "/management": "management-page",
  "/markets": "markets-page",
  "/news": "articles-index-page",
  "/news-insights": "news-and-insights-page",
  "/our-brands": "brands-page",
  "/our-history": "history-page",
  "/play-the-right-way": "puck-page",
  "/regulatory-announcements": "investors-announcements-page",
  "/regulatory-disclosure": "investors-regul-disclosure-page",
  "/responsibility": "responsibility-page",
  "/responsibility/community-award": "community-award-page",
  "/responsibility/play-responsible": "play-responsible-page",
  "/responsibility/player-protection-lab": "people-protection-lab-page",
  "/shareholder-structure": "investors-opap-shareholders-page",
  "/sponsorships": "sponsorships-page",
};
