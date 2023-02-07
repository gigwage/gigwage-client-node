import { GigWageHttpClient } from "../http-client";
import { SubaccountEntity } from "../endpoints/entities";
export type ShowbalanceOptions =

export default function balancesEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Returns the current and available balance for the account. */
    Showbalance: ({ ...options}: ShowbalanceOptions)=> httpClient.get<SubaccountEntity>(`/api/v1/balance`),
    }
}
