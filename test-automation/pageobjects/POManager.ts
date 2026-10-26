import type { Page } from "@playwright/test";
import { ContentPage } from "./ContentPage";
import { HomePage } from "./HomePage";

/** Single entry point for page objects so tests share one instance per page. */
export class POManager {
  private homePage: HomePage | undefined;

  constructor(private readonly page: Page) {}

  getHomePage(): HomePage {
    this.homePage ??= new HomePage(this.page);
    return this.homePage;
  }

  /** Page object for any path; not cached because the path varies. */
  getContentPage(path: string): ContentPage {
    return new ContentPage(this.page, path);
  }
}
