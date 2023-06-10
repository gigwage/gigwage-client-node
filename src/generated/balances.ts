import { GigWageHttpClient } from '../http-client';

import { SubaccountEntity } from './types';

export type ShowBalanceOptions = {};

export function balancesEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Returns the current and available balance for the account. */
    showBalance: ({}: ShowBalanceOptions): Promise<{
      gigwage_account: SubaccountEntity;
    }> =>
      httpClient
        .get<{ gigwage_account: SubaccountEntity }>(`/api/v1/balance`)
        .then(r => r.data),
  };
}
