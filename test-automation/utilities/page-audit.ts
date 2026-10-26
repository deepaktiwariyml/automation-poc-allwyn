import type { Page } from "@playwright/test";

/** Console errors and failed first-party requests seen while a page was open (sheet 1, check 3). */
export interface NetworkLog {
  consoleErrors: string[];
  failedRequests: string[];
}

// Requests to these hosts must succeed; third parties (analytics, embeds) are outside our control.
const FIRST_PARTY_HOSTS = ["cdn.allwyn.com"];

/** Starts recording; call before the page is opened. */
export function recordNetwork(page: Page, siteOrigin: string): NetworkLog {
  const log: NetworkLog = { consoleErrors: [], failedRequests: [] };
  const isFirstParty = (url: string): boolean => {
    const { origin, host } = new URL(url);
    return origin === siteOrigin || FIRST_PARTY_HOSTS.includes(host);
  };
  page.on("console", (message) => {
    if (message.type() === "error") log.consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    const reason = request.failure()?.errorText ?? "failed";
    // Aborts come from navigation and prefetch cancellation, not from broken resources.
    if (isFirstParty(request.url()) && !reason.includes("ERR_ABORTED")) {
      log.failedRequests.push(`${reason} ${request.url()}`);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && isFirstParty(response.url())) {
      log.failedRequests.push(`${String(response.status())} ${response.url()}`);
    }
  });
  return log;
}

/** What the page shows once fully scrolled (sheet 1, checks 5, 6 and 8). */
export interface PageAudit {
  brokenImages: string[];
  emptyHeadings: string[];
  emptyLists: string[];
  emptyLandmarks: string[];
  invalidLinks: string[];
  unsafeExternalLinks: string[];
  /** Absolute URLs of same-site links and cdn.allwyn.com documents, for status checks. */
  checkableLinks: string[];
}

const IMAGE_LOAD_TIMEOUT = 15_000;

/**
 * Scrolls the page so lazy images load, waits for visible images to finish, then inspects images,
 * empty elements, and the links inside `linkScope` (default `main`; the shared header and footer
 * links are checked once, site-wide).
 */
export async function auditPage(page: Page, linkScope = "main"): Promise<PageAudit> {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("load");
  await page
    .waitForFunction(
      () => [...document.querySelectorAll("img")].every((image) => !image.checkVisibility() || image.complete),
      undefined,
      {
        timeout: IMAGE_LOAD_TIMEOUT,
      },
    )
    .catch(() => undefined); // images still loading after the wait are reported below
  return page.evaluate(
    ({ cdnHosts, scope }) => {
      const describe = (element: Element): string =>
        `<${element.tagName.toLowerCase()}> in ${element.closest("[data-name]")?.getAttribute("data-name") ?? "page"}`;
      const visible = (element: Element): boolean => element.checkVisibility();
      const hasText = (element: Element): boolean => element.textContent.trim() !== "";
      const hasMedia = (element: Element): boolean =>
        element.querySelector("img, svg, video, iframe, picture") !== null;

      const brokenImages = [...document.querySelectorAll("img")]
        .filter((image) => visible(image) && image.getAttribute("src") !== null)
        // Off-screen lazy images (e.g. later slides) are never requested, so they are not broken;
        // failed image requests are caught by the network log.
        .filter((image) => (image.complete ? image.naturalWidth === 0 : image.loading !== "lazy"))
        .map((image) => image.currentSrc || image.src);
      const emptyHeadings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")]
        .filter((heading) => visible(heading) && !hasText(heading) && !hasMedia(heading))
        .map(describe);
      const emptyLists = [...document.querySelectorAll("ul, ol")]
        .filter((list) => visible(list) && list.querySelector(":scope > li") === null)
        .map(describe);
      const emptyLandmarks = [...document.querySelectorAll("main, header, footer, nav, aside, section")]
        .filter((landmark) => visible(landmark) && !hasText(landmark) && !hasMedia(landmark))
        .map(describe);

      const linkSelector = scope
        .split(",")
        .map((part) => `${part.trim()} a`)
        .join(", ");
      const anchors = [...document.querySelectorAll<HTMLAnchorElement>(linkSelector)];
      const invalidLinks = anchors
        .filter((anchor) => {
          const href = anchor.getAttribute("href")?.trim() ?? "";
          return href === "" || href === "#" || /^javascript:/i.test(href) || href.includes("$undefined");
        })
        .map(
          (anchor) =>
            `${describe(anchor)} "${anchor.textContent.trim().slice(0, 40)}" → "${anchor.getAttribute("href") ?? ""}"`,
        );
      const external = anchors.filter(
        (anchor) => /^https?:$/.test(anchor.protocol) && anchor.origin !== location.origin,
      );
      const unsafeExternalLinks = external
        .filter((anchor) => {
          // Documents on the site's own CDN are downloads, not outbound links.
          if (cdnHosts.includes(anchor.host)) return false;
          // `noreferrer` implies `noopener` in the HTML standard, so either keeps the opener safe.
          const rel = (anchor.getAttribute("rel") ?? "").split(/\s+/);
          return anchor.target !== "_blank" || !(rel.includes("noopener") || rel.includes("noreferrer"));
        })
        .map((anchor) => `${anchor.href} (target="${anchor.target}", rel="${anchor.getAttribute("rel") ?? ""}")`);
      const checkableLinks = [
        ...new Set(
          anchors
            .filter((anchor) => anchor.origin === location.origin || cdnHosts.includes(anchor.host))
            .map((anchor) => anchor.href.split("#")[0] ?? anchor.href),
        ),
      ];
      return {
        brokenImages,
        emptyHeadings,
        emptyLists,
        emptyLandmarks,
        invalidLinks,
        unsafeExternalLinks,
        checkableLinks,
      };
    },
    { cdnHosts: FIRST_PARTY_HOSTS, scope: linkScope },
  );
}
