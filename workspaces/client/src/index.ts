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
}: IGigwageClientOptions) => {
  const httpClient = createHttpClient({
    apiSecret,
    apiKey,
    apiEnvironment,
    baseUrl,
  });

  return {
    ...httpClient,
    contractors: {
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
    },
  };
};
