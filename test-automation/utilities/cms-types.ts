/** The Strapi fields the template tests read. Only fields used as expectations are declared. */

export interface CmsMedia {
  url: string;
  name: string;
}

export interface CmsTitle {
  heading?: string | null;
  text?: string | null;
}

export interface CmsHeader {
  title?: CmsTitle | null;
}

export interface CmsLink {
  label?: string | null;
  target_value?: string | null;
}

/** Fields shared by detail-style entries (articles, investor articles, announcements, GM disclosures, markets). */
export interface CmsDetailEntry {
  slug: string;
  title?: string;
  heading?: string;
  name?: string;
  display_name?: string;
  date?: string | null;
  perex?: string | null;
  content?: string | null;
  download_label?: string | null;
  download_file?: CmsMedia | null;
  /** Market flag. */
  flag?: CmsMedia | null;
  dynamic_zone?: { __component: string; content?: string | null }[];
}

/** An item of a listing page's collection. */
export interface CmsListingItem {
  slug?: string;
  title?: string;
  heading?: string;
  date?: string | null;
  file?: CmsMedia | null;
}

/** A record of an investor document listing (results, presentations, events, regulatory documents). */
export interface CmsDocumentRecord {
  heading?: string | null;
  date?: string | null;
  [field: string]: unknown;
}

export interface CmsComplianceEntry {
  heading: string;
  content: string;
}

export interface CmsContactPage {
  simple_header?: CmsHeader | null;
  gdpr_heading?: string | null;
  emails_heading?: string | null;
  offices_heading?: string | null;
  emails: { email: string; label?: string | null }[];
  contact_cards: { heading: string }[];
}

export interface CmsInvestorsHub {
  simple_header?: CmsHeader | null;
  news_heading?: string | null;
  events_heading?: string | null;
  latest_results_title?: CmsTitle | null;
  governance_title?: CmsTitle | null;
  news_buttons: CmsLink[];
  events_buttons: CmsLink[];
}

/** Strapi `global`: the site header menu and footer. */
export interface CmsGlobal {
  menu_items: { title: string }[];
  footer_link_groups: { title: string; items: { label: string; target_value: string }[] }[];
  socials: { label: string; target_value: string }[];
}

export const GLOBAL_POPULATE = {
  "populate[menu_items][populate]": "*",
  "populate[footer_link_groups][populate]": "*",
  "populate[socials][populate]": "*",
} as const;
