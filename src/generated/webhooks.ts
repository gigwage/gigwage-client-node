import { GigWageHttpClient } from '../http-client';

import { WebhookEntity } from './types';

export type ListWebhooksOptions = {
  /** Show webhooks only for the specified contractor */
  contractor_id?: number;
  /** Show webhooks only for the specified 1099 */
  ten99_id?: number;
  /** Show webhooks only for the specified payment */
  payment_id?: number;
  /** Show webhooks only for the specified TIN check */
  tin_check_id?: number;
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type ShowWebhookOptions = {
  id: number;
  /** Show webhook only for the specified contractor */
  contractor_id?: number;
  /** Show webhook only for the specified 1099 */
  ten99_id?: number;
  /** Show webhook only for the specified payment */
  payment_id?: number;
  /** Show webhook only for the specified TIN check */
  tin_check_id?: number;
};

export function webhooksEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** List all webhooks */

    listWebhooks: ({
      contractor_id,
      ten99_id,
      payment_id,
      tin_check_id,
      page,
      per_page,
      offset,
    }: ListWebhooksOptions = {}) =>
      httpClient
        .get<WebhookEntity[]>(`/api/v1/webhooks`, {
          contractor_id,
          '1099_id': ten99_id,
          payment_id,
          tin_check_id,
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Get webhook details */

    showWebhook: ({
      id,
      contractor_id,
      ten99_id,
      payment_id,
      tin_check_id,
    }: ShowWebhookOptions) =>
      httpClient
        .get<WebhookEntity>(`/api/v1/webhooks/${id}`, {
          contractor_id,
          '1099_id': ten99_id,
          payment_id,
          tin_check_id,
        })
        .then(r => r.data),
  };
}
