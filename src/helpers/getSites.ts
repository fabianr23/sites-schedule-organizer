import { URL_API_SITES, LIMIT_PAGE } from "@/helpers/constants.ts";

export const getSitesByPageNumber = (pageNumber: number): Promise<any> => {
  return fetch(`${URL_API_SITES}?_page=${pageNumber}&_limit=${LIMIT_PAGE}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("sites List:", data);
      return data;
    });
};

export const getSitesByCategory = (query: string): Promise<any> => {
  return fetch(`${URL_API_SITES}?title=${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("sites List:", data);
      return data;
    });
};

export const getSitesByFilter = (query: string): Promise<any> => {
  if (query === "All Sites") {
    return getSitesByPageNumber(1);
  }
  return fetch(`${URL_API_SITES}?title=${query}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("sites List:", data);
      return data;
    });
};
