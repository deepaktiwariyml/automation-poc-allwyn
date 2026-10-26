import type { APIRequestContext, APIResponse } from "@playwright/test";
import * as allure from "allure-js-commons";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  /** Query string parameters appended to the endpoint. */
  params?: Record<string, string>;
  /** Extra headers merged over the defaults (e.g. `X-API-Key`). */
  headers?: Record<string, string>;
  /** JSON payload for POST/PUT/PATCH requests. */
  data?: unknown;
}

/**
 * Thin wrapper over Playwright's APIRequestContext that applies default headers,
 * optional bearer authentication and attaches request/response details to Allure.
 */
export class ApiHelper {
  private readonly baseUrl: string;
  private readonly token: string | undefined;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async get(
    request: APIRequestContext,
    endpoint: string,
    options: Omit<RequestOptions, "data"> = {},
  ): Promise<APIResponse> {
    return this.send(request, "GET", endpoint, options);
  }

  async post(request: APIRequestContext, endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send(request, "POST", endpoint, options);
  }

  async put(request: APIRequestContext, endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send(request, "PUT", endpoint, options);
  }

  async patch(request: APIRequestContext, endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.send(request, "PATCH", endpoint, options);
  }

  async delete(
    request: APIRequestContext,
    endpoint: string,
    options: Omit<RequestOptions, "data"> = {},
  ): Promise<APIResponse> {
    return this.send(request, "DELETE", endpoint, options);
  }

  private buildUrl(endpoint: string, params: Record<string, string> = {}): string {
    // Join rather than resolve so a base path such as `/v1` is preserved.
    const url = new URL(`${this.baseUrl.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }
    return url.toString();
  }

  private buildHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders,
    };
    if (this.token !== undefined) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async send(
    request: APIRequestContext,
    method: HttpMethod,
    endpoint: string,
    options: RequestOptions,
  ): Promise<APIResponse> {
    const url = this.buildUrl(endpoint, options.params);
    const startTime = Date.now();
    const response = await request.fetch(url, {
      method,
      headers: this.buildHeaders(options.headers),
      data: options.data,
    });
    await this.report(method, url, options.data, response, Date.now() - startTime);
    return response;
  }

  private async report(
    method: HttpMethod,
    url: string,
    requestBody: unknown,
    response: APIResponse,
    responseTimeMs: number,
  ): Promise<void> {
    const responseBody = await response.text();
    await allure.step(`${method} ${url}`, async () => {
      await allure.parameter("Status Code", String(response.status()));
      await allure.parameter("Response Time", `${responseTimeMs} ms`);
      if (requestBody !== undefined) {
        await allure.attachment("Request Body", JSON.stringify(requestBody, null, 2), "application/json");
      }
      if (responseBody !== "") {
        const contentType = response.headers()["content-type"] ?? "text/plain";
        await allure.attachment("Response Body", responseBody, contentType);
      }
    });
    console.log(`${method} ${url} | Status: ${response.status()} | Time: ${responseTimeMs}ms`);
  }
}
