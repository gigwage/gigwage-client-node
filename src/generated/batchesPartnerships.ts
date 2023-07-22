import { GigWageHttpClient } from '../http-client';

import { BatchEntity, PostApiV1BusinessesBusinessIdBatches } from './types';

export type CreateBatchPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdBatches;

export type ListBatchesPartnershipsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type ShowBatchPaymentsPartnershipsOptions = {
  id: number;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type ShowBatchPartnershipsOptions = {
  id: number;
  business_id: number;
};

export function batchesPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Creates a new batch of payments. */
    createBatch: ({
      business_id,
      ...options
    }: CreateBatchPartnershipsOptions): Promise<{ batch: BatchEntity }> =>
      httpClient
        .post<{ batch: BatchEntity }>(
          `/api/v1/businesses/${business_id}/batches`,
          options,
        )
        .then(r => r.data),

    /** Returns a list of batches, sorted newest-first. */
    listBatches: ({
      page,
      per_page,
      offset,
      business_id,
    }: ListBatchesPartnershipsOptions): Promise<{ batches: BatchEntity[] }> =>
      httpClient
        .get<{ batches: BatchEntity[] }>(
          `/api/v1/businesses/${business_id}/batches`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Returns the payments from a single batch. */
    showBatchPayments: ({
      id,
      page,
      per_page,
      offset,
      business_id,
    }: ShowBatchPaymentsPartnershipsOptions): Promise<{
      payments: BatchEntity;
    }> =>
      httpClient
        .get<{ payments: BatchEntity }>(
          `/api/v1/businesses/${business_id}/batches/${id}/payments`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Returns the details of a single batch. */
    showBatch: ({
      id,
      business_id,
    }: ShowBatchPartnershipsOptions): Promise<{ batch: BatchEntity }> =>
      httpClient
        .get<{ batch: BatchEntity }>(
          `/api/v1/businesses/${business_id}/batches/${id}`,
        )
        .then(r => r.data),
  };
}
