import type { Locator, Page, Response } from "@playwright/test";

/** Behaviour shared by every Allwyn page object. */
export abstract class BasePage {
  readonly page: Page;
  readonly body: Locator;
  readonly main: Locator;
  readonly heading: Locator;

  /** Path relative to the configured `baseURL`. */
  protected abstract readonly path: string;

  constructor(page: Page) {
    this.page = page;
    this.body = page.locator("body");
    this.main = page.locator("main");
    this.heading = page.locator("h1").first();
  }

  async open(): Promise<Response | null> {
    return this.page.goto(this.path);
  }
}
