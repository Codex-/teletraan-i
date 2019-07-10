import fetch, { Response } from "node-fetch";

/**
 * Fetch from a URL that returns JSON.
 *
 * @param url
 * @returns JSON response.
 */
export async function fetchUrl<T>(url: string): Promise<T> {
  const apiResponse: Response = await fetch(url);
  return apiResponse.json();
}
