import { contractorEndpoints } from './endpoints/contractors';
import { createHttpClient } from './http-client';
import { GigwageEnvironments } from './types';

export {
  generateRequestHeaders,
  IGenerateRequestHeadersOptions,
} from './http-client';

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
      ...contractorEndpoints(httpClient),
    },
  };
};
