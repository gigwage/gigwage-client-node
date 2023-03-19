import { GigWageHttpClient } from '../http-client';

import { BatchEntity, PostApiV1Batches } from './types';

export type CreateBatchOptions = {} & PostApiV1Batches;

export type ListBatchesOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type ShowBatchPaymentsOptions = {
  id: number;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type ShowBatchOptions = {
  id: number;
};

export function batchesEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Creates a new batch of payments. */

    createBatch: ({ ...options }: CreateBatchOptions) =>
      httpClient.post<BatchEntity>(`/api/v1/batches`, options),

    /** Returns a list of batches, sorted newest-first. */

    listBatches: ({ page, per_page, offset }: ListBatchesOptions) =>
      httpClient.get<BatchEntity[]>(`/api/v1/batches`, {
        page,
        per_page,
        offset,
      }),

    /** Returns the payments from a single batch. */

    showBatchPayments: ({
      id,
      page,
      per_page,
      offset,
    }: ShowBatchPaymentsOptions) =>
      httpClient.get<BatchEntity>(`/api/v1/batches/${id}/payments`, {
        page,
        per_page,
        offset,
      }),

    /** Returns the details of a single batch. */

    showBatch: ({ id }: ShowBatchOptions) =>
      httpClient.get<BatchEntity>(`/api/v1/batches/${id}`),
  };
}
