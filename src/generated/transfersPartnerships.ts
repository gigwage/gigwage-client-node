import { GigWageHttpClient } from '../http-client';

import {
  PostApiV1BusinessesBusinessIdTransfers,
  TransferTransactionEntity,
} from './types';

export type ListTransfersPartnershipsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type CreateTransferPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdTransfers;

export type DeleteTransferPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type ShowTransferPartnershipsOptions = {
  id: number;
  business_id: number;
};

export function transfersPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Get a list of all transfers. */
    listTransfers: ({
      page,
      per_page,
      offset,
      business_id,
    }: ListTransfersPartnershipsOptions): Promise<{
      transfers: TransferTransactionEntity[];
    }> =>
      httpClient
        .get<{ transfers: TransferTransactionEntity[] }>(
          `/api/v1/businesses/${business_id}/transfers`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Create a transfer transaction. */
    createTransfer: ({
      business_id,
      ...options
    }: CreateTransferPartnershipsOptions): Promise<{
      transfer: TransferTransactionEntity;
    }> =>
      httpClient
        .post<{ transfer: TransferTransactionEntity }>(
          `/api/v1/businesses/${business_id}/transfers`,
          options,
        )
        .then(r => r.data),

    /** Attempt to cancel a transfer. */
    deleteTransfer: ({
      id,
      business_id,
    }: DeleteTransferPartnershipsOptions): Promise<{
      transfer: TransferTransactionEntity;
    }> =>
      httpClient
        .delete<{ transfer: TransferTransactionEntity }>(
          `/api/v1/businesses/${business_id}/transfers/${id}`,
        )
        .then(r => r.data),

    /** Get details of an existing transfer. */
    showTransfer: ({
      id,
      business_id,
    }: ShowTransferPartnershipsOptions): Promise<{
      transfer: TransferTransactionEntity;
    }> =>
      httpClient
        .get<{ transfer: TransferTransactionEntity }>(
          `/api/v1/businesses/${business_id}/transfers/${id}`,
        )
        .then(r => r.data),
  };
}
