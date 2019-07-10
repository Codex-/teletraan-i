import fetch, { Response } from "node-fetch";

import { UrbanDefinition, UrbanResponse } from "./urban.model";

const BASE_API = "http://api.urbandictionary.com/v0/";
const METHOD = "define";

export async function urbanApi(term: string): Promise<UrbanDefinition[]> {
  const apiResponse: Response = await fetch(
    `${BASE_API}${METHOD}?term=${term}`
  );
  const apiJson: UrbanResponse = await apiResponse.json();

  return apiJson.list;
}
