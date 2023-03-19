import { GigWageHttpClient } from '../http-client';

import { PatchApiV11099s, PostApiV11099s, Ten99Entity } from './types';

export type Create1099Options = {} & PostApiV11099s;

export type List1099sOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type Update1099Options = {
  id: number;
} & PatchApiV11099s;

export type Delete1099Options = {
  id: number;
};

export type Show1099Options = {
  id: number;
};

export type Get1099PDFURLOptions = {
  id: number;
};

export type Submit1099ToIRSOptions = {
  id: number;
};

export type Approve1099Options = {
  id: number;
};

export function ten99sEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Create a 1099 for a contractor. */

    create1099: ({ ...options }: Create1099Options) =>
      httpClient.post<Ten99Entity>(`/api/v1/1099s`, options),

    /** Returns a list of 1099s, sorted newest-first. */

    list1099s: ({ page, per_page, offset }: List1099sOptions) =>
      httpClient.get<Ten99Entity[]>(`/api/v1/1099s`, {
        page,
        per_page,
        offset,
      }),

    /** Update a 1099 */

    update1099: ({ id, ...options }: Update1099Options) =>
      httpClient.patch<Ten99Entity>(`/api/v1/1099s/${id}`, options),

    /** Delete a 1099. */

    delete1099: ({ id }: Delete1099Options) =>
      httpClient.delete<Ten99Entity>(`/api/v1/1099s/${id}`),

    /** Get details of a 1099. */

    show1099: ({ id }: Show1099Options) =>
      httpClient.get<Ten99Entity>(`/api/v1/1099s/${id}`),

    /** Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour. */

    get1099PDFURL: ({ id }: Get1099PDFURLOptions) =>
      httpClient.get(`/api/v1/1099s/${id}/retrieve`),

    /** Submit 1099 to the IRS. */

    submit1099ToIRS: ({ id, ...options }: Submit1099ToIRSOptions) =>
      httpClient.post<Ten99Entity>(`/api/v1/1099s/${id}/submit`, options),

    /** Mark 1099 as ready to submit to the IRS. */

    approve1099: ({ id, ...options }: Approve1099Options) =>
      httpClient.post<Ten99Entity>(`/api/v1/1099s/${id}/approve`, options),
  };
}
