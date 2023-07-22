import { GigWageHttpClient } from '../http-client';

import { PostApiV1BusinessesBusinessId1099s, Ten99Entity } from './types';

export type Create1099PartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessId1099s;

export type List1099sPartnershipsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type Update1099PartnershipsOptions = {
  id: number;
  business_id: number;
};

export type Delete1099PartnershipsOptions = {
  id: number;
  business_id: number;
};

export type Show1099PartnershipsOptions = {
  id: number;
  business_id: number;
};

export type Get1099PDFURLPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type Submit1099ToIRSPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type Approve1099PartnershipsOptions = {
  id: number;
  business_id: number;
};

export function ten99sPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Create a 1099 for a contractor. */
    create1099: ({
      business_id,
      ...options
    }: Create1099PartnershipsOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .post<{ '1099': Ten99Entity }>(
          `/api/v1/businesses/${business_id}/1099s`,
          options,
        )
        .then(r => r.data),

    /** Returns a list of 1099s, sorted newest-first. */
    list1099s: ({
      page,
      per_page,
      offset,
      business_id,
    }: List1099sPartnershipsOptions): Promise<{ '1099s': Ten99Entity[] }> =>
      httpClient
        .get<{ '1099s': Ten99Entity[] }>(
          `/api/v1/businesses/${business_id}/1099s`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Update a 1099 */
    update1099: ({
      id,
      business_id,
      ...options
    }: Update1099PartnershipsOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .patch<{ '1099': Ten99Entity }>(
          `/api/v1/businesses/${business_id}/1099s/${id}`,
          options,
        )
        .then(r => r.data),

    /** Delete a 1099. */
    delete1099: ({
      id,
      business_id,
    }: Delete1099PartnershipsOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .delete<{ '1099': Ten99Entity }>(
          `/api/v1/businesses/${business_id}/1099s/${id}`,
        )
        .then(r => r.data),

    /** Get details of a 1099. */
    show1099: ({
      id,
      business_id,
    }: Show1099PartnershipsOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .get<{ '1099': Ten99Entity }>(
          `/api/v1/businesses/${business_id}/1099s/${id}`,
        )
        .then(r => r.data),

    /** Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour. */
    get1099PDFURL: ({
      id,
      business_id,
    }: Get1099PDFURLPartnershipsOptions): Promise<string> =>
      httpClient
        .get<string>(`/api/v1/businesses/${business_id}/1099s/${id}/retrieve`)
        .then(r => r.data),

    /** Submit 1099 to the IRS. */
    submit1099ToIRS: ({
      id,
      business_id,
      ...options
    }: Submit1099ToIRSPartnershipsOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .post<{ '1099': Ten99Entity }>(
          `/api/v1/businesses/${business_id}/1099s/${id}/submit`,
          options,
        )
        .then(r => r.data),

    /** Mark 1099 as ready to submit to the IRS. */
    approve1099: ({
      id,
      business_id,
      ...options
    }: Approve1099PartnershipsOptions): Promise<{ '1099': Ten99Entity }> =>
      httpClient
        .post<{ '1099': Ten99Entity }>(
          `/api/v1/businesses/${business_id}/1099s/${id}/approve`,
          options,
        )
        .then(r => r.data),
  };
}
