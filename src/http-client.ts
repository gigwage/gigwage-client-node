import axios, { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';

import { ENVIRONMENTS } from './constants';
import { GigwageEnvironments } from './types';

type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface IGenerateRequestHeadersOptions {
  /**
   * Gig Wage API key
   *
   * Learn more about Gigwage API keys at https://developers.gigwage.com/#introduction
   */
  apiKey: string;
  /**
   * Gig Wage API Secret
   *
   * Learn more about Gig Wage API keys at https://developers.gigwage.com/#introduction
   */
  apiSecret: string;
  /**
   * A Javascript Object `{...}`
   *
   * The object is stringified internally.
   */
  data?: any;
  /**
   * The endpoint your API it hitting.
   *
   * Example: `/api/v1/contractors`
   */
  endpoint: string;
  /**
   * HTTP method used
   *
   * example: `GET` | `POST` | `PATCH` | `DELETE`
   */
  method: HttpMethods;
  /**
   * only use for testing. Allows for passing the timestamp to create consistent signatures.
   * `new Date().getTime().toString()`
   */
  testTimestamp?: string;
}

/**
 * Generates the request headers for a Gig Wage API request.
 *
 * These headers are unique per request.
 */
export const generateRequestHeaders = ({
  apiKey,
  apiSecret,
  endpoint,
  method,
  data,
  testTimestamp,
}: IGenerateRequestHeadersOptions) => {
  const timestamp = testTimestamp ?? new Date().getTime().toString();
  const stringifiedData = JSON.stringify(data);

  const payload = [
    timestamp,
    method,
    endpoint,
    data ? stringifiedData : undefined,
  ].join('');
  const bytes = CryptoJS.HmacSHA256(payload, apiSecret);
  const signature = bytes.toString(CryptoJS.enc.Hex);

  var headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Gw-Api-Key': apiKey,
    'X-Gw-Timestamp': timestamp,
    'X-Gw-Signature': signature,
  };

  return headers;
};

interface ICreateHttpClientOptions {
  apiEnvironment?: GigwageEnvironments;
  apiKey: string;
  apiSecret: string;
  baseUrl?: string;
}

/**
 * Creates an HTTP client for handling requests to Gig Wage API.
 */
export const createHttpClient = ({
  apiKey,
  apiEnvironment = 'production',
  apiSecret,
  baseUrl: baseUrlOverride,
}: ICreateHttpClientOptions) => {
  const baseUrl = baseUrlOverride ?? ENVIRONMENTS[apiEnvironment];

  /**
   * Calls a GET request to Gig Wage API.
   *
   * Pass in a path like `/api/v1/contractors`
   */
  const get = <ResponseData = any>(
    endpoint: string,
    params: object = {},
  ): Promise<AxiosResponse<ResponseData, any>> => {
    const url = `${baseUrl}${endpoint}`;
    const method = 'GET';
    const headers = generateRequestHeaders({
      apiSecret,
      method,
      endpoint,
      apiKey,
    });

    return axios.request<ResponseData>({
      url,
      headers,
      params
    });
  };

  /**
   * Calls a POST request to Gig Wage API.
   *
   * Pass in a path like `/api/v1/contractors`
   */
  const post = async <ResponseData = any>(
    endpoint: string,
    data: object = {},
  ): Promise<AxiosResponse<ResponseData, any>> => {
    const url = `${baseUrl}${endpoint}`;
    const method = 'POST';
    const headers = generateRequestHeaders({
      apiSecret,
      method,
      apiKey,
      endpoint,
      data,
    });
    return axios.request({
      url,
      method,
      headers,
      data,
    });
  };

  /**
   * Calls a PATCH request to Gig Wage API.
   *
   * Pass in a path like `/api/v1/contractors`
   */
  const patch = <ResponseData = any>(
    endpoint: string,
    data: object = {},
  ): Promise<AxiosResponse<ResponseData, any>> => {
    const url = `${baseUrl}${endpoint}`;
    const method = 'PATCH';
    const headers = generateRequestHeaders({
      apiSecret,
      method,
      apiKey,
      endpoint,
      data,
    });

    return axios.request({
      url,
      method,
      headers,
      data,
    });
  };

  /**
   * Calls a DELETE request to Gig Wage API.
   *
   * Pass in a path like `/api/v1/contractors`
   */
  const del = async <ResponseData = any>(
    endpoint: string,
  ): Promise<AxiosResponse<ResponseData, any>> => {
    const url = `${baseUrl}${endpoint}`;
    const method = 'DELETE';
    const headers = generateRequestHeaders({
      apiSecret,
      method,
      apiKey,
      endpoint,
    });

    return axios.request({
      url,
      method,
      headers,
    });
  };

  return {
    get,
    post,
    patch,
    delete: del,
  };
};
