import type { Locator } from "@playwright/test";
import { MODULE_RENDERING } from "../configs/cms-components";

export interface CmsModule {
  __component: string;
  [field: string]: unknown;
}

/** A CMS module (or, for `eachItem` modules, one of its items) the page is expected to render. */
export interface ExpectedComponent {
  /** Position and type in the entry, e.g. `dynamic_zone[6] faq-module`. */
  label: string;
  components: readonly string[];
  /** The CMS data whose content the rendered component must show. */
  content: unknown;
  ignoreFields: readonly string[];
  presenceOnly: boolean;
}

/** An expected component and the index of the rendered top-level component it matched. */
export interface ComponentMatch {
  expected: ExpectedComponent;
  renderedIndex: number;
}

/** Attribute the test sets on each top-level component so a match can be located again. */
export const COMPONENT_INDEX_ATTRIBUTE = "data-qa-component-index";

function moduleLabel(module: CmsModule, index: number): string {
  return `dynamic_zone[${String(index)}] ${module.__component.replace("modules.", "")}`;
}

/** The components a page must show for its dynamic zone, in CMS order, minus modules not drawn by design. */
export function expectedComponents(dynamicZone: readonly CmsModule[]): ExpectedComponent[] {
  return dynamicZone.flatMap((module, index): ExpectedComponent[] => {
    const rendering = MODULE_RENDERING[module.__component];
    if (rendering === undefined) {
      throw new Error(`${moduleLabel(module, index)} has no entry in configs/cms-components.ts`);
    }
    if ("notRendered" in rendering) return [];
    const field = rendering.itemsField === undefined ? undefined : module[rendering.itemsField];
    const items: unknown[] | undefined = Array.isArray(field) ? (field as unknown[]) : undefined;
    if (items?.length === 0) return []; // the frontend skips empty lists
    const label = moduleLabel(module, index);
    const shared = {
      components: rendering.components,
      ignoreFields: rendering.ignoreFields ?? [],
      presenceOnly: rendering.presenceOnly ?? false,
    };
    if (rendering.eachItem === true && items !== undefined) {
      return items.map((item, itemIndex) => ({
        ...shared,
        label: `${label} item ${String(itemIndex)}`,
        content: item,
      }));
    }
    return [{ ...shared, label, content: module }];
  });
}

/**
 * Top-level components inside `region`, in page order (components nested in another are ignored).
 * Each is tagged with its index in COMPONENT_INDEX_ATTRIBUTE so tests can locate it.
 */
export async function renderedComponents(region: Locator): Promise<string[]> {
  return region.evaluate((root, attribute) => {
    const topLevel = [...root.querySelectorAll("[data-name]")].filter((element) => {
      const outer = element.parentElement?.closest("[data-name]");
      return outer === null || outer === undefined || !root.contains(outer);
    });
    topLevel.forEach((element, index) => {
      element.setAttribute(attribute, String(index));
    });
    return topLevel.map((element) => element.getAttribute("data-name") ?? "");
  }, COMPONENT_INDEX_ATTRIBUTE);
}

/**
 * Matches expected components to rendered ones in order. Other components may sit in between
 * (app-owned sections and headers are not part of the dynamic zone).
 */
export function matchInOrder(
  expected: readonly ExpectedComponent[],
  rendered: readonly string[],
): { matches: ComponentMatch[]; missing: string[] } {
  const matches: ComponentMatch[] = [];
  const missing: string[] = [];
  let position = 0;
  for (const component of expected) {
    const found = rendered.findIndex((name, index) => index >= position && component.components.includes(name));
    if (found === -1) {
      missing.push(`${component.label} → ${component.components.join(" or ")}`);
    } else {
      matches.push({ expected: component, renderedIndex: found });
      position = found + 1;
    }
  }
  return { matches, missing };
}

/** Expected components not found in order. */
export function missingInOrder(expected: readonly ExpectedComponent[], rendered: readonly string[]): string[] {
  return matchInOrder(expected, rendered).missing;
}
