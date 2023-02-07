import { GigWageHttpClient } from "../http-client";
import { postApiV1ApiKeys, ApiKeyEntity } from "../endpoints/entities";
export type CreateAPIkeyOptions =   postApiV1ApiKeys
export type ListAPIkeysOptions = {
      //** Page offset to fetch. */
  page?:number
  
      //** Number of results to return per page. */
  per_page?:number
  
      //** Pad a number of results. */
  offset?:number
  
}
export type RevokeAPIkeyOptions = {
      //** API Key */
  id:string
  
}
export type ShowAPIkeyOptions = {
      //** API Key */
  id:string
  
}

export default function apiKeysEndpoints(httpClient: GigWageHttpClient) {
    return {
    /** Create a new API key. Note: This is the only time you'll get the secret. */
    CreateAPIkey: ({ ...options}: CreateAPIkeyOptions)=> httpClient.post<ApiKeyEntity>(`/api/v1/api_keys`, options),
    /** Get a list of all API keys. */
    ListAPIkeys: ({ page, per_page, offset, ...options}: ListAPIkeysOptions)=> httpClient.get<ApiKeyEntity[]>(`/api/v1/api_keys`),
    /** Revoke an API key. Note: The API key currently in use cannot be revoked. */
    RevokeAPIkey: ({ id, ...options}: RevokeAPIkeyOptions)=> httpClient.delete<ApiKeyEntity>(`/api/v1/api_keys/${id}`),
    /** Get details of an existing API key. */
    ShowAPIkey: ({ id, ...options}: ShowAPIkeyOptions)=> httpClient.get<ApiKeyEntity>(`/api/v1/api_keys/${id}`),
    }
}
