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
    listTransfers: ({
      page,
      per_page,
      offset,
    }: ListTransfersOptions = {}): Promise<{
      transfers: TransferTransactionEntity[];
    }> =>
      httpClient
        .get<{ transfers: TransferTransactionEntity[] }>(`/api/v1/transfers`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Create a transfer transaction. */
    createTransfer: ({
      ...options
    }: CreateTransferOptions): Promise<{
      transfer: TransferTransactionEntity;
    }> =>
      httpClient
        .post<{ transfer: TransferTransactionEntity }>(
          `/api/v1/transfers`,
          options,
        )
        .then(r => r.data),

    /** Attempt to cancel a transfer. */
    deleteTransfer: ({
      id,
    }: DeleteTransferOptions): Promise<{
      transfer: TransferTransactionEntity;
    }> =>
      httpClient
        .delete<{ transfer: TransferTransactionEntity }>(
          `/api/v1/transfers/${id}`,
        )
        .then(r => r.data),

    /** Get details of an existing transfer. */
    showTransfer: ({
      id,
    }: ShowTransferOptions): Promise<{ transfer: TransferTransactionEntity }> =>
      httpClient
        .get<{ transfer: TransferTransactionEntity }>(`/api/v1/transfers/${id}`)
        .then(r => r.data),
  };
}
