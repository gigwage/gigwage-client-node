import { GigWageHttpClient } from '../http-client';

import {
  ArPaymentEntity,
  PostApiV1BusinessesBusinessIdArPayments,
} from './types';

export type CreateAccountsReceivablePaymentPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdArPayments;

export type ListAccountsReceivablePaymentsPartnershipsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type ReturnAnAccountsReceivablePaymentPartnershipsOptions = {
  id: number;
  business_id: number;
};

export function accountsReceivablePaymentsPartnershipsEndpoints(
  httpClient: GigWageHttpClient,
) {
  return {
    /** Creates a new Accounts Receivable Payment. */
    createAccountsReceivablePayment: ({
      business_id,
      ...options
    }: CreateAccountsReceivablePaymentPartnershipsOptions): Promise<{
      ar_payment: ArPaymentEntity;
    }> =>
      httpClient
        .post<{ ar_payment: ArPaymentEntity }>(
          `/api/v1/businesses/${business_id}/ar_payments`,
          options,
        )
        .then(r => r.data),

    /** List Accounts Receivable payments. */
    listAccountsReceivablePayments: ({
      page,
      per_page,
      offset,
      business_id,
    }: ListAccountsReceivablePaymentsPartnershipsOptions): Promise<{
      ar_payments: ArPaymentEntity[];
    }> =>
      httpClient
        .get<{ ar_payments: ArPaymentEntity[] }>(
          `/api/v1/businesses/${business_id}/ar_payments`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Returns the details for Accounts Receivable Payment */
    returnAnAccountsReceivablePayment: ({
      id,
      business_id,
    }: ReturnAnAccountsReceivablePaymentPartnershipsOptions): Promise<{
      ar_payment: ArPaymentEntity;
    }> =>
      httpClient
        .get<{ ar_payment: ArPaymentEntity }>(
          `/api/v1/businesses/${business_id}/ar_payments/${id}`,
        )
        .then(r => r.data),
  };
}
