import { GigWageHttpClient } from '../http-client';

import {
  CustomerEntity,
  PatchApiV1Customers,
  PostApiV1Customers,
} from './types';

export type CreateCustomerOptions = {} & PostApiV1Customers;

export type ListCustomersOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type UpdateACustomerOptions = {
  id: number;
} & PatchApiV1Customers;

export type DeleteACustomerOptions = {
  id: number;
};

export type ReturnACustomerOptions = {
  id: number;
};

export function customersEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Creates a new customer. */
    createCustomer: ({
      ...options
    }: CreateCustomerOptions): Promise<{ customer: CustomerEntity }> =>
      httpClient
        .post<{ customer: CustomerEntity }>(`/api/v1/customers`, options)
        .then(r => r.data),

    /** List customers. */
    listCustomers: ({
      page,
      per_page,
      offset,
    }: ListCustomersOptions = {}): Promise<{ customers: CustomerEntity[] }> =>
      httpClient
        .get<{ customers: CustomerEntity[] }>(`/api/v1/customers`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Updates an existing customer */
    updateACustomer: ({
      id,
      ...options
    }: UpdateACustomerOptions): Promise<{ customer: CustomerEntity }> =>
      httpClient
        .patch<{ customer: CustomerEntity }>(`/api/v1/customers/${id}`, options)
        .then(r => r.data),

    /** Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments */
    deleteACustomer: ({
      id,
    }: DeleteACustomerOptions): Promise<{ customer: CustomerEntity }> =>
      httpClient
        .delete<{ customer: CustomerEntity }>(`/api/v1/customers/${id}`)
        .then(r => r.data),

    /** Returns the details for a given customer. */
    returnACustomer: ({
      id,
    }: ReturnACustomerOptions): Promise<{ customer: CustomerEntity }> =>
      httpClient
        .get<{ customer: CustomerEntity }>(`/api/v1/customers/${id}`)
        .then(r => r.data),
  };
}
