import { GigWageHttpClient } from '../http-client';

import { PaymentEntity, PostApiV1Payments, PutApiV1Payments } from './types';

export type SendPaymentOptions = {} & PostApiV1Payments;

export type ListSentPaymentsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  /** Filter results by contractor_id */
  contractor_id?: string;
  /** Include associated object. for example `includes=contractor` */
  includes?: string;
};

export type RetryPaymentOptions = {
  id: number;
};

export type DeletePaymentOptions = {
  id: number;
};

export type UpdatePaymentOptions = {
  id: number;
} & PutApiV1Payments;

export type ShowPaymentOptions = {
  id: number;
};

export function paymentsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours. */

    sendPayment: ({ ...options }: SendPaymentOptions) =>
      httpClient
        .post<PaymentEntity>(`/api/v1/payments`, options)
        .then(r => r.data),

    /** Returns a list of payments, sorted newest first. */

    listSentPayments: ({
      page,
      per_page,
      offset,
      contractor_id,
      includes,
    }: ListSentPaymentsOptions = {}) =>
      httpClient
        .get<PaymentEntity[]>(`/api/v1/payments`, {
          page,
          per_page,
          offset,
          contractor_id,
          includes,
        })
        .then(r => r.data),

    /** Retry a canceled or returned payment. */

    retryPayment: ({ id, ...options }: RetryPaymentOptions) =>
      httpClient
        .post<PaymentEntity>(`/api/v1/payments/${id}/retry`, options)
        .then(r => r.data),

    /** Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible. */

    deletePayment: ({ id }: DeletePaymentOptions) =>
      httpClient
        .delete<PaymentEntity>(`/api/v1/payments/${id}`)
        .then(r => r.data),

    /** Update a payment's metadata. */

    updatePayment: ({ id, ...options }: UpdatePaymentOptions) =>
      httpClient
        .put<PaymentEntity>(`/api/v1/payments/${id}`, options)
        .then(r => r.data),

    /** Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment. */

    showPayment: ({ id }: ShowPaymentOptions) =>
      httpClient.get<PaymentEntity>(`/api/v1/payments/${id}`).then(r => r.data),
  };
}
