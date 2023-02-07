import { GigWageHttpClient } from "../http-client";
import { putApiV1LineItems, LineItemEntity } from "../endpoints/entities";
export type UpdatelineitemOptions = {
      
  id:number
  
} & putApiV1LineItems

export default function lineItemsEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Update a line item's metadata. */
    Updatelineitem: ({ id, ...options}: UpdatelineitemOptions)=> httpClient.put<LineItemEntity>(`/api/v1/line_items/${id}`, options),
    }
}
