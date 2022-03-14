import CryptoJS from 'crypto-js';
import fetch from 'node-fetch';

import { ENVIRONMENTS } from './constants';
import { GigwageEnvironments } from './types';

interface ICreateHttpClientOptions {
  apiEnvironment?: GigwageEnvironments;
  apiKey: string;
  apiSecret: string;
}

export const createHttpClient = ({
  apiKey,
  apiEnvironment = 'production',
  apiSecret,
}: ICreateHttpClientOptions) => {
  const generateRequestHeaders = (
    apiSecret: string,
    method: string,
    endpoint: string,
    payload: any = '{}',
  ) => {
    const timestamp = new Date().getTime().toString();
    const data = [timestamp, method, endpoint, payload].join('');
    const bytes = CryptoJS.HmacSHA256(data, apiSecret);
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

  const get = async <ResponseData = any>(
    endpoint: string,
  ): Promise<ResponseData> => {
    const response = await fetch(`${ENVIRONMENTS[apiEnvironment]}${endpoint}`, {
      method: 'GET',
      headers: generateRequestHeaders(apiSecret, 'GET', endpoint),
    });

    return (await response.json()) as ResponseData;
  };

  const post = async <ResponseData = any>(
    endpoint: string,
    body: object = {},
  ): Promise<ResponseData> => {
    const stringifiedBody = JSON.stringify(body);

    const response = await fetch(`${ENVIRONMENTS[apiEnvironment]}${endpoint}`, {
      method: 'POST',
      headers: generateRequestHeaders(
        apiSecret,
        'POST',
        endpoint,
        stringifiedBody,
      ),
    });

    return (await response.json()) as ResponseData;
  };

  const patch = async <ResponseData = any>(
    endpoint: string,
    body: object = {},
  ): Promise<ResponseData> => {
    const stringifiedBody = JSON.stringify(body);
    const response = await fetch(`${ENVIRONMENTS[apiEnvironment]}${endpoint}`, {
      method: 'PATCH',
      headers: generateRequestHeaders(
        apiSecret,
        'PATCH',
        endpoint,
        stringifiedBody,
      ),
      body: stringifiedBody,
    });

    return (await response.json()) as ResponseData;
  };

  const del = async <ResponseData = any>(
    endpoint: string,
  ): Promise<ResponseData> => {
    const response = await fetch(`${ENVIRONMENTS[apiEnvironment]}${endpoint}`, {
      method: 'DELETE',
      headers: generateRequestHeaders(apiSecret, 'DELETE', endpoint),
    });

    return (await response.json()) as ResponseData;
  };

  return {
    get,
    post,
    patch,
    delete: del,
  };
};
