import { GigWageHttpClient } from '../http-client';

import { LedgerEntity } from './types';

export type ListTransactionsOptions = {
  page?: number;
  size?: number;
};

export function transactionsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** List transactions. */
    listTransactions: ({ page, size }: ListTransactionsOptions = {}): Promise<
      LedgerEntity[]
    > =>
      httpClient
        .get<LedgerEntity[]>(`/api/v1/ledger`, {
          page,
          size,
        })
        .then(r => r.data),
  };
}
