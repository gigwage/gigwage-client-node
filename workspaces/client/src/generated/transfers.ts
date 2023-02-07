import { GigWageHttpClient } from "../http-client";
import { postApiV1Transfers, TransferTransactionEntity } from "../endpoints/entities";
export type ListtransfersOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type CreatetransferOptions =   postApiV1Transfers
export type DeletetransferOptions = {
      
  id:number
  
}
export type ShowtransferOptions = {
      
  id:number
  
}

export default function transfersEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Get a list of all transfers. */
    Listtransfers: ({ page, per_page, offset, ...options}: ListtransfersOptions)=> httpClient.get<TransferTransactionEntity[]>(`/api/v1/transfers`),
    /** Create a transfer transaction. */
    Createtransfer: ({ ...options}: CreatetransferOptions)=> httpClient.post<TransferTransactionEntity>(`/api/v1/transfers`, options),
    /** Attempt to cancel a transfer. */
    Deletetransfer: ({ id, ...options}: DeletetransferOptions)=> httpClient.delete<TransferTransactionEntity>(`/api/v1/transfers/${id}`),
    /** Get details of an existing transfer. */
    Showtransfer: ({ id, ...options}: ShowtransferOptions)=> httpClient.get<TransferTransactionEntity>(`/api/v1/transfers/${id}`),
    }
}
