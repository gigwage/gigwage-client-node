import { GigWageHttpClient } from "../http-client";
import { postApiV1Customers, patchApiV1Customers, CustomerEntity } from "../endpoints/entities";
export type CreatecustomerOptions =   postApiV1Customers
export type ListcustomersOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type UpdateacustomerOptions = {
      
  id:number
  
} & patchApiV1Customers
export type DeleteacustomerOptions = {
      
  id:number
  
}
export type ReturnacustomerOptions = {
      
  id:number
  
}

export default function customersEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Creates a new customer. */
    Createcustomer: ({ ...options}: CreatecustomerOptions)=> httpClient.post<CustomerEntity>(`/api/v1/customers`, options),
    /** List customers. */
    Listcustomers: ({ page, per_page, offset, ...options}: ListcustomersOptions)=> httpClient.get<CustomerEntity[]>(`/api/v1/customers`),
    /** Updates an existing customer */
    Updateacustomer: ({ id, ...options}: UpdateacustomerOptions)=> httpClient.patch<CustomerEntity>(`/api/v1/customers/${id}`, options),
    /** Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments */
    Deleteacustomer: ({ id, ...options}: DeleteacustomerOptions)=> httpClient.delete<CustomerEntity>(`/api/v1/customers/${id}`),
    /** Returns the details for a given customer. */
    Returnacustomer: ({ id, ...options}: ReturnacustomerOptions)=> httpClient.get<CustomerEntity>(`/api/v1/customers/${id}`),
    }
}
