import { GigWageHttpClient } from '../http-client';

import { PostApiV11099s, Ten99Entity } from './types';

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
};

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
    create1099: ({
      ...options
    }: Create1099Options): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .post<{ '1099': Ten99Entity }>(`/api/v1/1099s`, options)
        .then(r => r.data),

    /** Returns a list of 1099s, sorted newest-first. */
    list1099s: ({ page, per_page, offset }: List1099sOptions = {}): Promise<{
      '1099s': Ten99Entity[];
    }> =>
      httpClient
        .get<{ '1099s': Ten99Entity[] }>(`/api/v1/1099s`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Update a 1099 */
    update1099: ({
      id,
      ...options
    }: Update1099Options): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .patch<{ '1099': Ten99Entity }>(`/api/v1/1099s/${id}`, options)
        .then(r => r.data),

    /** Delete a 1099. */
    delete1099: ({ id }: Delete1099Options): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .delete<{ '1099': Ten99Entity }>(`/api/v1/1099s/${id}`)
        .then(r => r.data),

    /** Get details of a 1099. */
    show1099: ({ id }: Show1099Options): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .get<{ '1099': Ten99Entity }>(`/api/v1/1099s/${id}`)
        .then(r => r.data),

    /** Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour. */
    get1099PDFURL: ({ id }: Get1099PDFURLOptions): Promise<string> =>
      httpClient.get<string>(`/api/v1/1099s/${id}/retrieve`).then(r => r.data),

    /** Submit 1099 to the IRS. */
    submit1099ToIRS: ({
      id,
      ...options
    }: Submit1099ToIRSOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .post<{ '1099': Ten99Entity }>(`/api/v1/1099s/${id}/submit`, options)
        .then(r => r.data),

    /** Mark 1099 as ready to submit to the IRS. */
    approve1099: ({
      id,
      ...options
    }: Approve1099Options): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .post<{ '1099': Ten99Entity }>(`/api/v1/1099s/${id}/approve`, options)
        .then(r => r.data),
  };
}
