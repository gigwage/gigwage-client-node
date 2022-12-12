import { GigWageHttpClient } from '../http-client';

export const lineItemEndpoints = (httpClient: GigWageHttpClient) => {
  const updateLineItem = () => httpClient.put(``);

  return {
    updateLineItem,
  };
};
