/**
 * Pages exercised by the suite (English only).
 *
 * Scope: the **reskinned** pages of the scope document's page inventory, with one page per slug route.
 * Redesigned and net-new surfaces (Home, About, Our Markets landing, Navigation and footer, Feel It
 * All) are switched off in REDESIGNED_SURFACES and added back as they are developed.
 *
 * Templates and routes follow the frontend's route helpers and route manifest; CMS entries are found
 * by route (single types) or URL section + slug (collections, see configs/cms-content.ts).
 */

/**
 * Redesigned and net-new surfaces. Their tests stay in the suite and skip until switched on here.
 * Switch one on when it is developed (and add its pages to the lists below).
 */
export const REDESIGNED_SURFACES: Readonly<Record<"home" | "navigationAndFooter" | "feelItAll", boolean>> = {
  home: false,
  navigationAndFooter: false,
  feelItAll: false,
};

/** Detail template (detailPage, E-014): one page per slug route. `headingField` is the entry field shown as <h1>. */
export const DETAIL_PAGES = [
  { path: "/investors-news/allwyn-and-opap-progress-landmark-business-combination", headingField: "heading" },
  {
    path: "/regulatory-announcements/allwyn-announcement-of-issue-price-for-re-investment-of-0-80-special-distribution",
    headingField: "heading",
  },
  { path: "/general-meeting-disclosure/invitation-to-general-meeting", headingField: "heading" },
  { path: "/markets/czech-republic", headingField: "display_name" },
] as const;

/** Article template (/news/[slug], E-011/E-012): one article. */
export const ARTICLE_PAGES = ["/news/allwyn-becomes-an-official-partner-of-the-mc-laren-formula-1-team"] as const;

/**
 * Listing template (renderListing, E-015). `sort` is the order the listing must follow
 * (ALW-176: news and investor items newest first, important documents by priority; ALW-246).
 * `items` says what each listed item links to: its detail page under the listing path, or its file.
 */
export const LISTING_PAGES = [
  { path: "/news", collection: "articles", sort: "date:desc", items: "detail" },
  { path: "/investors-news", collection: "investors-articles", sort: "date:desc", items: "detail" },
  { path: "/regulatory-announcements", collection: "investors-announcements", sort: "date:desc", items: "detail" },
  { path: "/general-meeting-disclosure", collection: "investors-gm-disclosures", sort: "date:desc", items: "detail" },
  { path: "/dividends", collection: "investors-dividends", sort: "date:desc", items: "file" },
  { path: "/esg-reports", collection: "investors-esg-reports", sort: "date:desc", items: "file" },
  { path: "/important-documents-and-information", collection: "important-docs", sort: "priority:asc", items: "file" },
] as const;

/**
 * Investor document listings (renderListing, E-015: ALW-200, ALW-244, ALW-247): every CMS record is
 * on one page. `ordered` pages list records newest first; the calendar's order is still undecided
 * (ALW-244) and regulatory documents are grouped by `groupField` (ALW-247), so those are checked for
 * completeness only.
 */
export interface DocumentListingPage {
  path: string;
  collection: string;
  ordered: boolean;
  /** Relation field whose `heading` titles a group of records on the page. */
  groupField?: string;
}

export const DOCUMENT_LISTING_PAGES: readonly DocumentListingPage[] = [
  { path: "/investors-results", collection: "investors-results", ordered: true },
  { path: "/investors-presentations", collection: "investors-presentations", ordered: true },
  { path: "/financial-calendar", collection: "investors-events", ordered: false },
  {
    path: "/regulatory-disclosure",
    collection: "investors-regulatory-docs",
    ordered: false,
    groupField: "investors_regulatory_group",
  },
];

/** Legal pages (legalPage): `compliances` entries found by slug. */
export const LEGAL_PAGES = ["/privacy-policy", "/cookie-policy", "/terms-of-use"] as const;

/**
 * Composed template (composedRoute, E-013): reskinned single-type pages, plus one page per
 * collection slug route (sponsorship, gaming studio, campaign page, report).
 */
export const COMPOSED_PAGES = [
  "/board",
  "/career",
  "/career/culture-and-benefits",
  "/career/global-careers",
  "/career/hq-and-markets",
  "/investors-consensus",
  "/management",
  "/news-insights",
  "/our-brands",
  "/our-history",
  "/responsibility",
  "/responsibility/community-award",
  "/responsibility/play-responsible",
  "/responsibility/player-protection-lab",
  "/shareholder-structure",
  "/sponsorships",
  "/sponsorships/allwyn-at-the-kviff",
  "/gaming-studio/iwg-instant-win-gaming",
  "/p/tips-and-tricks-app",
  "/report/2025",
] as const;

/** Pages used for component behaviour checks (tests/web/interactions.test.ts), one per behaviour. */
export const INTERACTION_PAGES = {
  gallery: "/sponsorships/allwyn-at-the-kviff",
  tabs: "/career/global-careers",
  faq: "/career/global-careers",
  video: "/responsibility/play-responsible",
  map: "/career/hq-and-markets",
  slotMachine: "/career/culture-and-benefits",
  pagination: "/news",
} as const;

/** Every page the suite visits, for the checks that apply to all pages (tests/web/page-health.test.ts). */
export const ALL_PAGES: readonly string[] = [
  ...new Set([
    ...DETAIL_PAGES.map(({ path }) => path),
    ...ARTICLE_PAGES,
    ...LISTING_PAGES.map(({ path }) => path),
    ...DOCUMENT_LISTING_PAGES.map(({ path }) => path),
    ...LEGAL_PAGES,
    ...COMPOSED_PAGES,
    "/contact-us",
    "/email-alerts",
    "/investors",
  ]),
];
