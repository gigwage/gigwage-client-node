import { GigWageHttpClient } from '../http-client';

export const transferEndpoints = (httpClient: GigWageHttpClient) => {
  const listTransfers = () => httpClient.get(`/transfers`);

  const showTransfer = () => httpClient.get(`/transfers`);

  const createTransfer = ({ id }: { id: number }) =>
    httpClient.delete(`/transfers/${id}`);

  const deleteTransfer = ({ id }: { id: number }) =>
    httpClient.post(`/transfers/${id}`);

  return { listTransfers, showTransfer, createTransfer, deleteTransfer };
};
