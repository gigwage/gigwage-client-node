import { GigWageHttpClient } from "../http-client";
import { postApiV1Payments, putApiV1Payments, PaymentEntity } from "../endpoints/entities";
export type SendpaymentOptions =   postApiV1Payments
export type ListsentpaymentsOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
      //** Filter results by contractor_id */
  contractor_id?:string
  
      //** Include associated object. for example `includes=contractor` */
  includes?:string
  
}
export type RetrypaymentOptions = {
      
  id:number
  
}
export type DeletepaymentOptions = {
      
  id:number
  
}
export type UpdatepaymentOptions = {
      
  id:number
  
} & putApiV1Payments
export type ShowpaymentOptions = {
      
  id:number
  
}

export default function paymentsEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours. */
    Sendpayment: ({ ...options}: SendpaymentOptions)=> httpClient.post<PaymentEntity>(`/api/v1/payments`, options),
    /** Returns a list of payments, sorted newest first. */
    Listsentpayments: ({ page, per_page, offset, contractor_id, includes, ...options}: ListsentpaymentsOptions)=> httpClient.get<PaymentEntity[]>(`/api/v1/payments`),
    /** Retry a canceled or returned payment. */
    Retrypayment: ({ id, ...options}: RetrypaymentOptions)=> httpClient.post<PaymentEntity>(`/api/v1/payments/${id}/retry`, options),
    /** Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible. */
    Deletepayment: ({ id, ...options}: DeletepaymentOptions)=> httpClient.delete<PaymentEntity>(`/api/v1/payments/${id}`),
    /** Update a payment's metadata. */
    Updatepayment: ({ id, ...options}: UpdatepaymentOptions)=> httpClient.put<PaymentEntity>(`/api/v1/payments/${id}`, options),
    /** Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment. */
    Showpayment: ({ id, ...options}: ShowpaymentOptions)=> httpClient.get<PaymentEntity>(`/api/v1/payments/${id}`),
    }
}
