import axios, { AxiosResponse } from 'axios';
import CryptoJS from 'crypto-js';

import { ENVIRONMENTS } from './constants';
import { GigwageEnvironments } from './types';

type HttpMethods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface IGenerateRequestHeadersOptions {
  apiKey: string;
  apiSecret: string;
  /**
   * Stringified JSON object
   */
  data?: any;
  endpoint: string;
  /**
   * HTTP method used
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
  apiSecret,
  method,
  endpoint,
  apiKey,
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
}

/**
 * Creates an HTTP client for handling requests to Gig Wage API.
 */
export const createHttpClient = ({
  apiKey,
  apiEnvironment = 'production',
  apiSecret,
}: ICreateHttpClientOptions) => {
  /**
   * Calls a GET request to Gig Wage API.
   *
   * Pass in a path like `/api/v1/contractors`
   */
  const get = <ResponseData = any>(
    endpoint: string,
  ): Promise<AxiosResponse<ResponseData, any>> => {
    const url = `${ENVIRONMENTS[apiEnvironment]}${endpoint}`;
    const method = 'GET';
    const headers = generateRequestHeaders({
      apiSecret,
      method,
      endpoint,
      apiKey,
    });

    return axios.request<ResponseData>({ url, headers });
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
    const url = `${ENVIRONMENTS[apiEnvironment]}${endpoint}`;
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
    const url = `${ENVIRONMENTS[apiEnvironment]}${endpoint}`;
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
    const url = `${ENVIRONMENTS[apiEnvironment]}${endpoint}`;
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
