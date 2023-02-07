import { GigWageHttpClient } from "../http-client";
import { LedgerEntity } from "../endpoints/entities";
export type ListtransactionsOptions = {
      
  page?:number
  
      
  size?:number
  
}

export default function transactionsEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** List transactions. */
    Listtransactions: ({ page, size, ...options}: ListtransactionsOptions)=> httpClient.get<LedgerEntity[]>(`/api/v1/ledger`),
    }
}
