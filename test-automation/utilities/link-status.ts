import type { APIRequestContext } from "@playwright/test";

const CONCURRENCY = 6;

/**
 * Checks that links resolve: pages return a success status, and documents on the CDN return a file
 * rather than an HTML error page. Results are cached for the worker, because the header and footer
 * repeat the same links on every page.
 */
export class LinkStatus {
  private readonly cache = new Map<string, Promise<string | undefined>>();

  constructor(private readonly request: APIRequestContext) {}

  /** Problems found, one line per broken URL; empty when every URL resolves. */
  async findProblems(urls: Iterable<string>): Promise<string[]> {
    const queue = [...new Set(urls)];
    const problems: string[] = [];
    const worker = async (): Promise<void> => {
      for (let url = queue.shift(); url !== undefined; url = queue.shift()) {
        const problem = await this.check(url);
        if (problem !== undefined) problems.push(problem);
      }
    };
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    return problems.sort();
  }

  private check(url: string): Promise<string | undefined> {
    let result = this.cache.get(url);
    if (result === undefined) {
      result = this.probe(url);
      this.cache.set(url, result);
    }
    return result;
  }

  private async probe(url: string): Promise<string | undefined> {
    try {
      let response = await this.request.fetch(url, { method: "HEAD", failOnStatusCode: false });
      if (response.status() === 405 || response.status() === 501) {
        response = await this.request.get(url, { failOnStatusCode: false });
      }
      const status = response.status();
      if (status >= 400) return `${String(status)} ${url}`;
      const isDocument = new URL(url).host === "cdn.allwyn.com";
      const type = response.headers()["content-type"] ?? "";
      if (isDocument && type.includes("text/html")) return `not a file (${type}) ${url}`;
      return undefined;
    } catch (error) {
      return `${error instanceof Error ? error.message : String(error)} ${url}`;
    }
  }
}
