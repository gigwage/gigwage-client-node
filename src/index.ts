import { createHttpClient } from './http-client';
import { GigwageEnvironments } from './types';

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
   * Gig Wage API key
   *
   * Learn more about Gig Wage API keys at https://developers.gigwage.com/#introduction
   */
  apiSecret: string;
}

/**
 * Creates a client to access the Gig Wage API.
 */
export const createGigwageClient = ({
  apiEnvironment = 'production',
  apiKey,
  apiSecret,
}: IGigwageClientOptions) => {
  const httpClient = createHttpClient({ apiSecret, apiKey, apiEnvironment });

  return {
    ...httpClient,
  };
};
