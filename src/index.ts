import { accountsReceivablePaymentsEndpoints } from './generated/accountsReceivablePayments';
import { apiKeysEndpoints } from './generated/apiKeys';
import { balancesEndpoints } from './generated/balances';
import { batchesEndpoints } from './generated/batches';
import { contractorsEndpoints } from './generated/contractors';
import { customersEndpoints } from './generated/customers';
import { lineItemsEndpoints } from './generated/lineItems';
import { paymentsEndpoints } from './generated/payments';
import { subscriptionsEndpoints } from './generated/subscriptions';
import { ten99sEndpoints } from './generated/ten99s';
import { transactionsEndpoints } from './generated/transactions';
import { transfersEndpoints } from './generated/transfers';
import { webhooksEndpoints } from './generated/webhooks';

import { accountsReceivablePaymentsPartnershipsEndpoints } from './generated/accountsReceivablePaymentsPartnerships';
import { balancesPartnershipsEndpoints } from './generated/balancesPartnerships';
import { batchesPartnershipsEndpoints } from './generated/batchesPartnerships';
import { contractorsPartnershipsEndpoints } from './generated/contractorsPartnerships';
import { customersPartnershipsEndpoints } from './generated/customersPartnerships';
import { lineItemsPartnershipsEndpoints } from './generated/lineItemsPartnerships';
import { paymentsPartnershipsEndpoints } from './generated/paymentsPartnerships';
import { ten99sPartnershipsEndpoints } from './generated/ten99sPartnerships';
import { transfersPartnershipsEndpoints } from './generated/transfersPartnerships';

import { createHttpClient } from './http-client';
import { GigwageEnvironments } from './types';

export {
  generateRequestHeaders,
  IGenerateRequestHeadersOptions,
} from './http-client';

export * from './generated/types';

interface IGigwageClientOptions {
  /**
   * The Gig Wage API environment.
   */
  apiEnvironment?: GigwageEnvironments;
  /**
   * Gig Wage API key
   *
   * Learn more about Gigwage API keys at https://developers.gigwage.com/#introduction
   */
  apiKey: string;
  /**
   * Gig Wage API Secret
   *
   * Learn more about Gig Wage API keys at https://developers.gigwage.com/#introduction
   */
  apiSecret: string;

  /**
   * *TESTING ONLY*
   *
   * When set, will override the apiEnvironment and use the provided base URL.
   *
   * Use pattern `https://www.gigwage.com`.
   *
   */
  baseUrl?: string;
}

/**
 * Creates a client to access the Gig Wage API.
 */
export const createGigwageClient = ({
  apiEnvironment = 'production',
  apiKey,
  apiSecret,
  baseUrl,
}: IGigwageClientOptions): ReturnType<typeof createHttpClient> &
  ReturnType<typeof accountsReceivablePaymentsEndpoints> &
  ReturnType<typeof apiKeysEndpoints> &
  ReturnType<typeof contractorsEndpoints> &
  ReturnType<typeof customersEndpoints> &
  ReturnType<typeof balancesEndpoints> &
  ReturnType<typeof batchesEndpoints> &
  ReturnType<typeof customersEndpoints> &
  ReturnType<typeof lineItemsEndpoints> &
  ReturnType<typeof paymentsEndpoints> &
  ReturnType<typeof subscriptionsEndpoints> &
  ReturnType<typeof ten99sEndpoints> &
  ReturnType<typeof transactionsEndpoints> &
  ReturnType<typeof transfersEndpoints> &
  ReturnType<typeof webhooksEndpoints> & {
    partnerships: ReturnType<
      typeof accountsReceivablePaymentsPartnershipsEndpoints
    > &
      ReturnType<typeof balancesPartnershipsEndpoints> &
      ReturnType<typeof batchesPartnershipsEndpoints> &
      ReturnType<typeof contractorsPartnershipsEndpoints> &
      ReturnType<typeof customersPartnershipsEndpoints> &
      ReturnType<typeof lineItemsPartnershipsEndpoints> &
      ReturnType<typeof paymentsPartnershipsEndpoints> &
      ReturnType<typeof ten99sPartnershipsEndpoints> &
      ReturnType<typeof transfersPartnershipsEndpoints>;
  } => {
  const httpClient = createHttpClient({
    apiSecret,
    apiKey,
    apiEnvironment,
    baseUrl,
  });

  return {
    ...httpClient,
    ...accountsReceivablePaymentsEndpoints(httpClient),
    ...apiKeysEndpoints(httpClient),
    ...contractorsEndpoints(httpClient),
    ...customersEndpoints(httpClient),
    ...balancesEndpoints(httpClient),
    ...batchesEndpoints(httpClient),
    ...customersEndpoints(httpClient),
    ...lineItemsEndpoints(httpClient),
    ...paymentsEndpoints(httpClient),
    ...subscriptionsEndpoints(httpClient),
    ...ten99sEndpoints(httpClient),
    ...transactionsEndpoints(httpClient),
    ...transfersEndpoints(httpClient),
    ...webhooksEndpoints(httpClient),
    partnerships: {
      ...accountsReceivablePaymentsPartnershipsEndpoints(httpClient),
      ...balancesPartnershipsEndpoints(httpClient),
      ...batchesPartnershipsEndpoints(httpClient),
      ...contractorsPartnershipsEndpoints(httpClient),
      ...customersPartnershipsEndpoints(httpClient),
      ...lineItemsPartnershipsEndpoints(httpClient),
      ...paymentsPartnershipsEndpoints(httpClient),
      ...ten99sPartnershipsEndpoints(httpClient),
      ...transfersPartnershipsEndpoints(httpClient),
    },
  };
};
