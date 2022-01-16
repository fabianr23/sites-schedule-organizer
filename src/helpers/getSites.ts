import { URL_API_SITES, LIMIT_PAGE } from "@/helpers/constants.ts";

export const getSitesByPageNumber = (pageNumber: number): Promise<any> => {
  return fetch(`${URL_API_SITES}?_page=${pageNumber}&_limit=${LIMIT_PAGE}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getSitesByCategory = (category: string): Promise<any> => {
  return fetch(`${URL_API_SITES}?title=${category}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getSitesByQuery = (query: string): Promise<any> => {
  return fetch(`${URL_API_SITES}?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getSitesByFilter = (
  filter: string,
  query: string
): Promise<any> => {
  return fetch(`${URL_API_SITES}?${filter}=${query}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
