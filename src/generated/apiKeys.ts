import { GigWageHttpClient } from '../http-client';

import { ApiKeyEntity, PostApiV1ApiKeys } from './types';

export type CreateAPIKeyOptions = {} & PostApiV1ApiKeys;

export type ListAPIKeysOptions = {
  /** Page offset to fetch. */
  page?: number;
  /** Number of results to return per page. */
  per_page?: number;
  /** Pad a number of results. */
  offset?: number;
};

export type RevokeAPIKeyOptions = {
  /** API Key */
  id: string;
};

export type ShowAPIKeyOptions = {
  /** API Key */
  id: string;
};

export function apiKeysEndpoints(httpClient: GigWageHttpClient) {
  return {
    /** Create a new API key. Note: This is the only time you'll get the secret. */

    createAPIKey: ({
      ...options
    }: CreateAPIKeyOptions): Promise<ApiKeyEntity> =>
      httpClient
        .post<ApiKeyEntity>(`/api/v1/api_keys`, options)
        .then(r => r.data),

    /** Get a list of all API keys. */

    listAPIKeys: ({ page, per_page, offset }: ListAPIKeysOptions = {}): Promise<
      ApiKeyEntity[]
    > =>
      httpClient
        .get<ApiKeyEntity[]>(`/api/v1/api_keys`, {
          page,
          per_page,
          offset,
        })
        .then(r => r.data),

    /** Revoke an API key. Note: The API key currently in use cannot be revoked. */

    revokeAPIKey: ({ id }: RevokeAPIKeyOptions): Promise<ApiKeyEntity> =>
      httpClient
        .delete<ApiKeyEntity>(`/api/v1/api_keys/${id}`)
        .then(r => r.data),

    /** Get details of an existing API key. */

    showAPIKey: ({ id }: ShowAPIKeyOptions): Promise<ApiKeyEntity> =>
      httpClient.get<ApiKeyEntity>(`/api/v1/api_keys/${id}`).then(r => r.data),
  };
}
