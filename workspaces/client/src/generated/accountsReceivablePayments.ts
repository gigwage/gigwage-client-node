import { GigWageHttpClient } from "../http-client";
import { postApiV1ArPayments, ArPaymentEntity } from "../endpoints/entities";
export type CreateAccountsReceivablePaymentOptions =   postApiV1ArPayments
export type ListAccountsReceivablepaymentsOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type ReturnanAccountsReceivablePaymentOptions = {
      
  id:number
  
}

export default function accountsReceivablePaymentsEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Creates a new Accounts Receivable Payment. */
    CreateAccountsReceivablePayment: ({ ...options}: CreateAccountsReceivablePaymentOptions)=> httpClient.post<ArPaymentEntity>(`/api/v1/ar_payments`, options),
    /** List Accounts Receivable payments. */
    ListAccountsReceivablepayments: ({ page, per_page, offset, ...options}: ListAccountsReceivablepaymentsOptions)=> httpClient.get<ArPaymentEntity[]>(`/api/v1/ar_payments`),
    /** Returns the details for Accounts Receivable Payment */
    ReturnanAccountsReceivablePayment: ({ id, ...options}: ReturnanAccountsReceivablePaymentOptions)=> httpClient.get<ArPaymentEntity>(`/api/v1/ar_payments/${id}`),
    }
}
