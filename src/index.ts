import { createHttpClient } from './http-client';
import { GigwageEnvironments } from './types';

interface IGigwageClientOptions {
  /**
   * The Gigewage API environment.
   */
  apiEnvironment?: GigwageEnvironments;
  /**
   * Gigwage API key
   *
   * Learn more about Gigwage API keys at https://developers.gigwage.com/#introduction
   */
  apiKey: string;
  apiSecret: string;
}

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
