import { GigWageHttpClient } from '../http-client';

import {
  CustomerEntity,
  PatchApiV1BusinessesBusinessIdCustomers,
  PostApiV1BusinessesBusinessIdCustomers,
} from './types';

export type CreateCustomerPartnershipsOptions = {
  business_id: number;
} & PostApiV1BusinessesBusinessIdCustomers;

export type ListCustomersPartnershipsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
  business_id: number;
};

export type UpdateACustomerPartnershipsOptions = {
  id: number;
  business_id: number;
} & PatchApiV1BusinessesBusinessIdCustomers;

export type DeleteACustomerPartnershipsOptions = {
  id: number;
  business_id: number;
};

export type ReturnACustomerPartnershipsOptions = {
  id: number;
  business_id: number;
};

export function customersPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Creates a new customer. */
    createCustomer: ({
      business_id,
      ...options
    }: CreateCustomerPartnershipsOptions): Promise<{
      customer: CustomerEntity;
    }> =>
      httpClient
        .post<{ customer: CustomerEntity }>(
          `/api/v1/businesses/${business_id}/customers`,
          options,
        )
        .then(r => r.data),

    /** List customers. */
    listCustomers: ({
      page,
      per_page,
      offset,
      business_id,
    }: ListCustomersPartnershipsOptions): Promise<{
      customers: CustomerEntity[];
    }> =>
      httpClient
        .get<{ customers: CustomerEntity[] }>(
          `/api/v1/businesses/${business_id}/customers`,
          {
            page,
            per_page,
            offset,
          },
        )
        .then(r => r.data),

    /** Updates an existing customer */
    updateACustomer: ({
      id,
      business_id,
      ...options
    }: UpdateACustomerPartnershipsOptions): Promise<{
      customer: CustomerEntity;
    }> =>
      httpClient
        .patch<{ customer: CustomerEntity }>(
          `/api/v1/businesses/${business_id}/customers/${id}`,
          options,
        )
        .then(r => r.data),

    /** Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments */
    deleteACustomer: ({
      id,
      business_id,
    }: DeleteACustomerPartnershipsOptions): Promise<{
      customer: CustomerEntity;
    }> =>
      httpClient
        .delete<{ customer: CustomerEntity }>(
          `/api/v1/businesses/${business_id}/customers/${id}`,
        )
        .then(r => r.data),

    /** Returns the details for a given customer. */
    returnACustomer: ({
      id,
      business_id,
    }: ReturnACustomerPartnershipsOptions): Promise<{
      customer: CustomerEntity;
    }> =>
      httpClient
        .get<{ customer: CustomerEntity }>(
          `/api/v1/businesses/${business_id}/customers/${id}`,
        )
        .then(r => r.data),
  };
}
