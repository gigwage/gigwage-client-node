import { GigWageHttpClient } from '../http-client';

export const contractorEndpoints = (httpClient: GigWageHttpClient) => {
  const sendPayment = () => httpClient.post(``);
  const listSentPayments = () => httpClient.get(``);
  const retryPayment = () => httpClient.post(``);
  const deletePayment = () => httpClient.delete(``);
  const updatePayment = () => httpClient.put(``);
  const showPayment = () => httpClient.get(``);

  return {};
};
