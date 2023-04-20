import { GigWageHttpClient } from '../http-client';

import { SubaccountEntity } from './types';

export type ShowBalanceOptions = {};

export function balancesEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Returns the current and available balance for the account. */

    showBalance: ({}: ShowBalanceOptions): Promise<SubaccountEntity> =>
      httpClient.get<SubaccountEntity>(`/api/v1/balance`).then(r => r.data),
  };
}
