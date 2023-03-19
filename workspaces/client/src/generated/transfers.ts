import { GigWageHttpClient } from '../http-client';

import { PostApiV1Transfers, TransferTransactionEntity } from './types';

export type ListTransfersOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type CreateTransferOptions = {} & PostApiV1Transfers;

export type DeleteTransferOptions = {
  id: number;
};

export type ShowTransferOptions = {
  id: number;
};

export function transfersEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Get a list of all transfers. */

    listTransfers: ({ page, per_page, offset }: ListTransfersOptions) =>
      httpClient.get<TransferTransactionEntity[]>(`/api/v1/transfers`, {
        page,
        per_page,
        offset,
      }),

    /** Create a transfer transaction. */

    createTransfer: ({ ...options }: CreateTransferOptions) =>
      httpClient.post<TransferTransactionEntity>(`/api/v1/transfers`, options),

    /** Attempt to cancel a transfer. */

    deleteTransfer: ({ id }: DeleteTransferOptions) =>
      httpClient.delete<TransferTransactionEntity>(`/api/v1/transfers/${id}`),

    /** Get details of an existing transfer. */

    showTransfer: ({ id }: ShowTransferOptions) =>
      httpClient.get<TransferTransactionEntity>(`/api/v1/transfers/${id}`),
  };
}
