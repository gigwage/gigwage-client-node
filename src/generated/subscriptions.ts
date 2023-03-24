import { GigWageHttpClient } from '../http-client';

import {
  PatchApiV1Subscriptions,
  PostApiV1Subscriptions,
  WebhookSubscriptionEntity,
} from './types';

export type CreateSubscriptionOptions = {} & PostApiV1Subscriptions;

export type ListSubscriptionsOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type DeleteSubscriptionOptions = {
  id: number;
};

export type UpdateSubscriptionURLOptions = {
  id: number;
} & PatchApiV1Subscriptions;

export type ReactivateSubscriptionOptions = {
  id: number;
};

export type ShowSubscriptionOptions = {
  id: number;
};

export type DeactivateSubscriptionOptions = {
  id: number;
};

export function subscriptionsEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Subscribe to webhooks of the chosen type. Please note that multiple consecutive failures to deliver webhooks will deactivate this subscription, and it will need to be reactivated. See PUT below. */

    createSubscription: ({ ...options }: CreateSubscriptionOptions) =>
      httpClient
        .post<WebhookSubscriptionEntity>(`/api/v1/subscriptions`, options)
        .then(r => r.data),

    /** Returns a list of all subscriptions. */

    listSubscriptions: ({
      page,
      per_page,
      offset,
    }: ListSubscriptionsOptions = {}) =>
      httpClient
        .get<WebhookSubscriptionEntity[]>(`/api/v1/subscriptions`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Permanently remove a subscription. */

    deleteSubscription: ({ id }: DeleteSubscriptionOptions) =>
      httpClient
        .delete<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`)
        .then(r => r.data),

    /** Change the URL where webhooks are sent. */

    updateSubscriptionURL: ({ id, ...options }: UpdateSubscriptionURLOptions) =>
      httpClient
        .patch<WebhookSubscriptionEntity>(
          `/api/v1/subscriptions/${id}`,
          options,
        )
        .then(r => r.data),

    /** Reactivate an inactive subscription. */

    reactivateSubscription: ({
      id,
      ...options
    }: ReactivateSubscriptionOptions) =>
      httpClient
        .put<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`, options)
        .then(r => r.data),

    /** Get the details of a subscription. */

    showSubscription: ({ id }: ShowSubscriptionOptions) =>
      httpClient
        .get<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`)
        .then(r => r.data),

    /** Deactivate a subscription. */

    deactivateSubscription: ({ id }: DeactivateSubscriptionOptions) =>
      httpClient
        .delete<WebhookSubscriptionEntity>(
          `/api/v1/subscriptions/${id}/deactivate`,
        )
        .then(r => r.data),
  };
}
