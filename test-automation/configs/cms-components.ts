/**
 * How each Strapi dynamic-zone module is rendered, mirrored from the frontend's module registry
 * (allwyn-website-poc: apps/web/lib/modules/render-modules.ts). Rendered components carry
 * `data-name="<Component>"` on their root element.
 *
 * - `components`: the component(s) the module may render as.
 * - `itemsField`: the module's list field; the frontend skips the module when that list is empty.
 * - `eachItem`: each item of `itemsField` renders as its own component (no wrapper component).
 * - `ignoreFields`: fields not shown by design, with the reason in a comment.
 * - `presenceOnly`: content appears only on interaction (e.g. map pins), so only presence is checked.
 * - `notRendered`: the module is deliberately not drawn, with the reason and its source.
 *
 * A module type missing from this table fails the test, so a new CMS module cannot be skipped silently.
 */
export type ModuleRendering =
  | {
      components: readonly string[];
      itemsField?: string;
      eachItem?: boolean;
      ignoreFields?: readonly string[];
      presenceOnly?: boolean;
    }
  | { notRendered: string };

export const MODULE_RENDERING: Readonly<Record<string, ModuleRendering>> = {
  "modules.animated-icon-texts-module": { components: ["IconTexts"], itemsField: "items" },
  "modules.articles-module": { components: ["ArticlesModule"], itemsField: "articles" },
  "modules.banner-cards-carousel-module": { components: ["CarouselModule"], itemsField: "items" },
  "modules.banner-cards-module": { components: ["FancyBannerCardsModule"], itemsField: "items" },
  "modules.banner-module": { components: ["PromoModule"] },
  "modules.carousel-module": { components: ["CarouselModule", "GalleryModule"], itemsField: "items" },
  "modules.contacts-banner-module": { components: ["ContactsBanner"], itemsField: "items" },
  "modules.downloads-module": { components: ["DocumentsList"], itemsField: "items" },
  "modules.fancy-banner-cards-module": { components: ["FancyBannerCardsModule"], itemsField: "items" },
  // Built; submission is not connected until Flo's endpoint exists (ALW-265).
  "modules.enquiry-form-module": { components: ["EnquiryFormModule"] },
  // Answers render only when their question is opened (one at a time); tests/web/interactions.test.ts opens each.
  "modules.faq-module": { components: ["AccordionBlock"], itemsField: "items", ignoreFields: ["text"] },
  "modules.features-module": { components: ["IconTexts"], itemsField: "items" },
  "modules.feelings-made-real-module": { components: ["FeelingsMadeRealModule"], itemsField: "feelings" },
  "modules.file-cards-module": { components: ["DocumentsList"], itemsField: "items" },
  "modules.gallery-module": { components: ["GalleryModule"], itemsField: "images" },
  "modules.icon-texts-module": { components: ["IconTexts"], itemsField: "items" },
  "modules.image-panels-module": { components: ["ImagePanelsModule"], itemsField: "items" },
  "modules.latest-articles-module": { components: ["ArticlesModule"] },
  "modules.logo-cards-module": { components: ["LogoGridModule"], itemsField: "items" },
  "modules.logo-strip-module": { components: ["LogoStrip"], itemsField: "items" },
  // Pin details show only when a pin is opened.
  "modules.map-module": { components: ["MarketsMap"], itemsField: "items", presenceOnly: true },
  "modules.markets-map-module": { components: ["MarketsMap"], presenceOnly: true },
  // The brand list and its heading may be dropped on purpose (ALW-171 AC7).
  "modules.metrics-module": {
    components: ["StatsModule"],
    itemsField: "stats_items",
    ignoreFields: ["brands", "brands_heading"],
  },
  "modules.pills-grid-module": { components: ["Pills"], itemsField: "items" },
  "modules.pills-module": { components: ["Pills"], itemsField: "items" },
  // The list wrapper carries no data-name; each item renders as its own PromoModule.
  "modules.promo-list-module": { components: ["PromoModule"], itemsField: "items", eachItem: true },
  "modules.promo-module": { components: ["PromoModule"] },
  "modules.rich-text-module": { components: ["RichTextModule"] },
  "modules.slot-machine-module": { components: ["SlotMachine"], itemsField: "items" },
  // Shows its heading even with no posts (ALW-275), so it has no emptiness rule.
  "modules.social-widget-module": { components: ["SocialWidget"] },
  "modules.stats-module": { components: ["StatsModule"], itemsField: "items" },
  "modules.tabs-module": { components: ["TabsModule"], itemsField: "items" },
  "modules.testimony-list-module": { components: ["TestimonyList"], itemsField: "items" },
  "modules.text-items-module": { components: ["TextItemsModule"], itemsField: "items" },
  "modules.timeline-module": { components: ["TimelineModule"], itemsField: "items" },
  "modules.title-block-module": { components: ["TitleBlock"] },
  "modules.traits-module": { components: ["IconTexts"], itemsField: "items" },
  "modules.two-cols-text-module": { components: ["TwoColsText"] },
  "modules.wide-video-module": { components: ["WideVideo"] },

  "modules.carousel-timeline-module": { notRendered: "deferred: no component yet (ALW-167)" },
  "modules.promo-cards-module": { notRendered: "no component yet; fold into FancyBannerCardsModule undecided" },
  "modules.event-mode-module": { notRendered: "off by default pending sign-off (ALW-212)" },
  "modules.fortune-breaker-module": { notRendered: "off by default pending sign-off (ALW-212)" },
  "modules.metrics-chart-module": { notRendered: "chart not built; skipped by design (ALW-218)" },
  "modules.sponsorships-module": { notRendered: "no UI until design supplies it (ALW-188)" },
};

/**
 * Pages whose CMS dynamic zone is replaced by app-owned sections by decision, so the zone is not
 * expected on the page. Their structure is covered by the page-level tests instead.
 */
export const APP_OWNED_ZONE_PAGES: Readonly<Record<string, string>> = {
  "/": "legacy Strapi sections removed; home sections are app-owned (ALW-283, ALW-211)",
  "/about-us": "legacy Strapi header and modules removed; about sections are app-owned (ALW-284, ALW-191)",
  "/markets": "markets landing is composed from app-owned sections (ALW-192)",
};
