import { faker } from '@faker-js/faker';
import axios from 'axios';

import 'dotenv/config';
import { ENVIRONMENTS } from './constants';
import { generateRequestHeaders } from './http-client';

import { createGigwageClient } from './index';

jest.mock('axios');

const mockRequest = axios.request as jest.Mock;

const apiKey = 'apiKey';
const apiSecret = 'apiSecret';

describe('HTTP Client', () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  describe(`createHttpClient`, () => {
    it('should generate client with http verbs', () => {
      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
      });
      expect(typeof client.get).toBe('function');
      expect(typeof client.post).toBe('function');
      expect(typeof client.patch).toBe('function');
      expect(typeof client.delete).toBe('function');
    });

    it('should allow overriding base URL', async () => {
      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
        baseUrl: 'http://localhost:3000',
      });

      await client.get('/api/v1/contractors');
      const mockArg = mockRequest.mock.calls[0][0];

      expect(mockArg).toMatchObject({
        url: 'http://localhost:3000/api/v1/contractors',
      });
    });

    it('should use public base URL for default', async () => {
      const client = createGigwageClient({
        apiKey,
        apiSecret,
      });

      await client.get('/api/v1/contractors');
      const mockArg = mockRequest.mock.calls[0][0];

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['production']}/api/v1/contractors`,
      });
    });

    it('should use public base URL when specified', async () => {
      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'production',
      });

      await client.get('/api/v1/contractors');
      const mockArg = mockRequest.mock.calls[0][0];

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['production']}/api/v1/contractors`,
      });
    });

    it('should use sandbox base URL when specified', async () => {
      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
      });

      await client.get('/api/v1/contractors');
      const mockArg = mockRequest.mock.calls[0][0];

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['sandbox']}/api/v1/contractors`,
      });
    });
  });

  describe(`createHttpClient.get`, () => {
    it('should be able to send get request', async () => {
      mockRequest.mockImplementationOnce(() =>
        Promise.resolve({ data: { contractors: [] } }),
      );

      const endpoint = '/api/v1/contractors';

      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
      });
      await client.get<{ contractors: [] }>(endpoint);
      const mockArg = mockRequest.mock.calls[0][0];

      const expectedHeaders = generateRequestHeaders({
        apiKey,
        apiSecret,
        endpoint: endpoint,
        method: 'GET',
        testTimestamp: mockArg.headers['X-Gw-Timestamp'],
      });

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['sandbox']}${endpoint}`,
        headers: expectedHeaders,
      });
    });
  });

  describe(`createHttpClient.delete`, () => {
    it('should be able to send delete request', async () => {
      mockRequest.mockImplementationOnce(() =>
        Promise.resolve({ data: { contractors: [] } }),
      );

      const endpoint = '/api/v1/contractors/id';

      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
      });
      await client.delete<{ contractors: [] }>(endpoint);
      const mockArg = mockRequest.mock.calls[0][0];

      const expectedHeaders = generateRequestHeaders({
        apiKey,
        apiSecret,
        endpoint: endpoint,
        method: 'DELETE',
        testTimestamp: mockArg.headers['X-Gw-Timestamp'],
      });

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['sandbox']}${endpoint}`,
        headers: expectedHeaders,
      });
    });
  });

  describe(`createHttpClient.post`, () => {
    it('should be able to send post request', async () => {
      mockRequest.mockImplementationOnce(() =>
        Promise.resolve({ data: { contractors: [] } }),
      );

      const endpoint = '/api/v1/contractors';

      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
      });

      const fakeContractor = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
      };

      const response = await client.post<{
        contractor: {
          email: string;
          first_name: string;
          id: number;
          last_name: string;
        };
      }>(endpoint, fakeContractor);
      const mockArg = mockRequest.mock.calls[0][0];

      const expectedHeaders = generateRequestHeaders({
        apiKey,
        apiSecret,
        endpoint: endpoint,
        method: 'POST',
        data: fakeContractor,
        testTimestamp: mockArg.headers['X-Gw-Timestamp'],
      });

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['sandbox']}${endpoint}`,
        headers: expectedHeaders,
      });
    });
  });

  describe(`createHttpClient.patch`, () => {
    it('should be able to send patch request', async () => {
      mockRequest.mockImplementationOnce(() =>
        Promise.resolve({ data: { contractors: [] } }),
      );

      const endpoint = '/api/v1/contractors';

      const client = createGigwageClient({
        apiKey,
        apiSecret,
        apiEnvironment: 'sandbox',
      });

      const fakeContractor = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
      };

      const response = await client.patch<{
        contractor: {
          email: string;
          first_name: string;
          id: number;
          last_name: string;
        };
      }>(endpoint, fakeContractor);
      const mockArg = mockRequest.mock.calls[0][0];

      const expectedHeaders = generateRequestHeaders({
        apiKey,
        apiSecret,
        endpoint: endpoint,
        method: 'PATCH',
        data: fakeContractor,
        testTimestamp: mockArg.headers['X-Gw-Timestamp'],
      });

      expect(mockArg).toMatchObject({
        url: `${ENVIRONMENTS['sandbox']}${endpoint}`,
        headers: expectedHeaders,
      });
    });
  });
});
