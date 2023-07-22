import { GigWageHttpClient } from '../http-client';

import {
  PaymentEntity,
  PostApiV1BusinessesBusinessIdPayments,
  PutApiV1BusinessesBusinessIdPayments,
} from './types';

export type SendPaymentPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdPayments;

export type ListSentPaymentsPartnershipsOptions = {
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
  business_id: number;
};

export type RetryPaymentPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type DeletePaymentPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type UpdatePaymentPartnershipsOptions = {
  id: number;
  business_id: number;
} & PutApiV1BusinessesBusinessIdPayments;

export type ShowPaymentPartnershipsOptions = {
  id: number;
  business_id: number;
};

export function paymentsPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours. */
    sendPayment: ({
      business_id,
      ...options
    }: SendPaymentPartnershipsOptions): Promise<{ payment: PaymentEntity }> =>
      httpClient
        .post<{ payment: PaymentEntity }>(
          `/api/v1/businesses/${business_id}/payments`,
          options,
        )
        .then(r => r.data),

    /** Returns a list of payments, sorted newest first. */
    listSentPayments: ({
      page,
      per_page,
      offset,
      contractor_id,
      includes,
      business_id,
    }: ListSentPaymentsPartnershipsOptions): Promise<{
      payments: PaymentEntity[];
    }> =>
      httpClient
        .get<{ payments: PaymentEntity[] }>(
          `/api/v1/businesses/${business_id}/payments`,
          {
            page,
            per_page,
            offset,
            contractor_id,
            includes,
          },
        )
        .then(r => r.data),

    /** Retry a canceled or returned payment. */
    retryPayment: ({
      id,
      business_id,
      ...options
    }: RetryPaymentPartnershipsOptions): Promise<{ payment: PaymentEntity }> =>
      httpClient
        .post<{ payment: PaymentEntity }>(
          `/api/v1/businesses/${business_id}/payments/${id}/retry`,
          options,
        )
        .then(r => r.data),

    /** Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible. */
    deletePayment: ({
      id,
      business_id,
    }: DeletePaymentPartnershipsOptions): Promise<{ payment: PaymentEntity }> =>
      httpClient
        .delete<{ payment: PaymentEntity }>(
          `/api/v1/businesses/${business_id}/payments/${id}`,
        )
        .then(r => r.data),

    /** Update a payment's metadata. */
    updatePayment: ({
      id,
      business_id,
      ...options
    }: UpdatePaymentPartnershipsOptions): Promise<{ payment: PaymentEntity }> =>
      httpClient
        .put<{ payment: PaymentEntity }>(
          `/api/v1/businesses/${business_id}/payments/${id}`,
          options,
        )
        .then(r => r.data),

    /** Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment. */
    showPayment: ({
      id,
      business_id,
    }: ShowPaymentPartnershipsOptions): Promise<{ payment: PaymentEntity }> =>
      httpClient
        .get<{ payment: PaymentEntity }>(
          `/api/v1/businesses/${business_id}/payments/${id}`,
        )
        .then(r => r.data),
  };
}
