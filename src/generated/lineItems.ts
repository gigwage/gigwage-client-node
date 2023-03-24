import { GigWageHttpClient } from '../http-client';

import { LineItemEntity, PutApiV1LineItems } from './types';

export type UpdateLineItemOptions = {
  id: number;
} & PutApiV1LineItems;

export function lineItemsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Update a line item's metadata. */

    updateLineItem: ({ id, ...options }: UpdateLineItemOptions) =>
      httpClient
        .put<LineItemEntity>(`/api/v1/line_items/${id}`, options)
        .then(r => r.data),
  };
}
