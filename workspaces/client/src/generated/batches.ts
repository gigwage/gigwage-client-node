import { GigWageHttpClient } from "../http-client";
import { postApiV1Batches, BatchEntity } from "../endpoints/entities";
export type CreatebatchOptions =   postApiV1Batches
export type ListbatchesOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type ShowbatchpaymentsOptions = {
      
  id:number
  
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type ShowbatchOptions = {
      
  id:number
  
}

export default function batchesEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Creates a new batch of payments. */
    Createbatch: ({ ...options}: CreatebatchOptions)=> httpClient.post<BatchEntity>(`/api/v1/batches`, options),
    /** Returns a list of batches, sorted newest-first. */
    Listbatches: ({ page, per_page, offset, ...options}: ListbatchesOptions)=> httpClient.get<BatchEntity[]>(`/api/v1/batches`),
    /** Returns the payments from a single batch. */
    Showbatchpayments: ({ id, page, per_page, offset, ...options}: ShowbatchpaymentsOptions)=> httpClient.get<BatchEntity>(`/api/v1/batches/${id}/payments`),
    /** Returns the details of a single batch. */
    Showbatch: ({ id, ...options}: ShowbatchOptions)=> httpClient.get<BatchEntity>(`/api/v1/batches/${id}`),
    }
}
