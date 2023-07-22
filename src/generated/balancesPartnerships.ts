import { GigWageHttpClient } from '../http-client';

import { SubaccountEntity } from './types';

export type ShowBalancePartnershipsOptions = {
  business_id: number;
};

export function balancesPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Returns the current and available balance for the account. */
    showBalance: ({
      business_id,
    }: ShowBalancePartnershipsOptions): Promise<{
      gigwage_account: SubaccountEntity;
    }> =>
      httpClient
        .get<{ gigwage_account: SubaccountEntity }>(
          `/api/v1/businesses/${business_id}/balance`,
        )
        .then(r => r.data),
  };
}
