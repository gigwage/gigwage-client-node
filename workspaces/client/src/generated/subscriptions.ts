import { GigWageHttpClient } from "../http-client";
import { postApiV1Subscriptions, patchApiV1Subscriptions, WebhookSubscriptionEntity } from "../endpoints/entities";
export type CreatesubscriptionOptions =   postApiV1Subscriptions
export type ListsubscriptionsOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type DeletesubscriptionOptions = {
      
  id:number
  
}
export type UpdatesubscriptionURLOptions = {
      
  id:number
  
} & patchApiV1Subscriptions
export type ReactivatesubscriptionOptions = {
      
  id:number
  
}
export type ShowsubscriptionOptions = {
      
  id:number
  
}
export type DeactivatesubscriptionOptions = {
      
  id:number
  
}

export default function subscriptionsEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Subscribe to webhooks of the chosen type. Please note that multiple consecutive failures to deliver webhooks will deactivate this subscription, and it will need to be reactivated. See PUT below. */
    Createsubscription: ({ ...options}: CreatesubscriptionOptions)=> httpClient.post<WebhookSubscriptionEntity>(`/api/v1/subscriptions`, options),
    /** Returns a list of all subscriptions. */
    Listsubscriptions: ({ page, per_page, offset, ...options}: ListsubscriptionsOptions)=> httpClient.get<WebhookSubscriptionEntity[]>(`/api/v1/subscriptions`),
    /** Permanently remove a subscription. */
    Deletesubscription: ({ id, ...options}: DeletesubscriptionOptions)=> httpClient.delete<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`),
    /** Change the URL where webhooks are sent. */
    UpdatesubscriptionURL: ({ id, ...options}: UpdatesubscriptionURLOptions)=> httpClient.patch<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`, options),
    /** Reactivate an inactive subscription. */
    Reactivatesubscription: ({ id, ...options}: ReactivatesubscriptionOptions)=> httpClient.put<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`, options),
    /** Get the details of a subscription. */
    Showsubscription: ({ id, ...options}: ShowsubscriptionOptions)=> httpClient.get<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}`),
    /** Deactivate a subscription. */
    Deactivatesubscription: ({ id, ...options}: DeactivatesubscriptionOptions)=> httpClient.delete<WebhookSubscriptionEntity>(`/api/v1/subscriptions/${id}/deactivate`),
    }
}
