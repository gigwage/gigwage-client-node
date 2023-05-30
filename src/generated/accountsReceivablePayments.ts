import { GigWageHttpClient } from '../http-client';

import { ArPaymentEntity, PostApiV1ArPayments } from './types';

export type CreateAccountsReceivablePaymentOptions = {} & PostApiV1ArPayments;

export type ListAccountsReceivablePaymentsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type ReturnAnAccountsReceivablePaymentOptions = {
  id: number;
};

export function accountsReceivablePaymentsEndpoints(
  httpClient: GigWageHttpClient,
) {
  return {
    /** Creates a new Accounts Receivable Payment. */
    createAccountsReceivablePayment: ({
      ...options
    }: CreateAccountsReceivablePaymentOptions): Promise<{
      ar_payment: ArPaymentEntity;
    }> =>
      httpClient
        .post<{ ar_payment: ArPaymentEntity }>(`/api/v1/ar_payments`, options)
        .then(r => r.data),

    /** List Accounts Receivable payments. */
    listAccountsReceivablePayments: ({
      page,
      per_page,
      offset,
    }: ListAccountsReceivablePaymentsOptions = {}): Promise<{
      ar_payments: ArPaymentEntity[];
    }> =>
      httpClient
        .get<{ ar_payments: ArPaymentEntity[] }>(`/api/v1/ar_payments`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Returns the details for Accounts Receivable Payment */
    returnAnAccountsReceivablePayment: ({
      id,
    }: ReturnAnAccountsReceivablePaymentOptions): Promise<{
      ar_payment: ArPaymentEntity;
    }> =>
      httpClient
        .get<{ ar_payment: ArPaymentEntity }>(`/api/v1/ar_payments/${id}`)
        .then(r => r.data),
  };
}
