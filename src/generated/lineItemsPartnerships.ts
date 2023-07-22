import { GigWageHttpClient } from '../http-client';

import { LineItemEntity, PutApiV1BusinessesBusinessIdLineItems } from './types';

export type UpdateLineItemPartnershipsOptions = {
  id: number;
  business_id: number;
} & PutApiV1BusinessesBusinessIdLineItems;

export function lineItemsPartnershipsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Update a line item's metadata. */
    updateLineItem: ({
      id,
      business_id,
      ...options
    }: UpdateLineItemPartnershipsOptions): Promise<{
      line_item: LineItemEntity;
    }> =>
      httpClient
        .put<{ line_item: LineItemEntity }>(
          `/api/v1/businesses/${business_id}/line_items/${id}`,
          options,
        )
        .then(r => r.data),
  };
}
