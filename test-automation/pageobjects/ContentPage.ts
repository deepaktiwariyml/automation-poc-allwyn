import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/** Any site page addressed by path, e.g. one discovered by the crawler. */
export class ContentPage extends BasePage {
  constructor(
    page: Page,
    protected readonly path: string,
  ) {
    super(page);
  }
}
