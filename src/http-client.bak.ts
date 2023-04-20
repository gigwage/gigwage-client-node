import { faker } from '@faker-js/faker';

import { createGigwageClient } from './index';

import 'dotenv/config';
describe.skip('HTTP Client', () => {
  afterAll(async () => {
    jest.setTimeout(20000);
    const client = createGigwageClient({
      apiKey: process.env.GIGWAGE_API_KEY ?? '',
      apiSecret: process.env.GIGWAGE_SECRET ?? '',
      apiEnvironment: 'sandbox',
    });

    const response = await client.get<{ contractors: [{ id: number }] }>(
      '/api/v1/contractors',
    );

    for (let contractor of response.data.contractors) {
      await client.delete(`/api/v1/contractors/${contractor.id}`);
    }
  });

  describe(`createHttpClient`, () => {
    it('should generate client with http verbs', () => {
      const client = createGigwageClient({
        apiKey: process.env.GIGWAGE_API_KEY ?? '',
        apiSecret: process.env.GIGWAGE_SECRET ?? '',
        apiEnvironment: 'sandbox',
      });
      expect(typeof client.get).toBe('function');
      expect(typeof client.post).toBe('function');
      expect(typeof client.patch).toBe('function');
      expect(typeof client.delete).toBe('function');
    });
  });

  describe(`createHttpClient.get`, () => {
    it('should be able to send get request', async () => {
      const client = createGigwageClient({
        apiKey: process.env.GIGWAGE_API_KEY ?? '',
        apiSecret: process.env.GIGWAGE_SECRET ?? '',
        apiEnvironment: 'sandbox',
      });
      const response = await client.get<{ contractors: [] }>(
        '/api/v1/contractors',
      );
      expect(Array.isArray(response.data?.contractors)).toBe(true);
    });
  });

  describe(`createHttpClient.post`, () => {
    it('should be able to send post request', async () => {
      const client = createGigwageClient({
        apiKey: process.env.GIGWAGE_API_KEY ?? '',
        apiSecret: process.env.GIGWAGE_SECRET ?? '',
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
        }[];
      }>('/api/v1/contractors', {
        contractor: fakeContractor,
      });

      expect(response.data).toMatchObject({
        contractor: { ...fakeContractor },
      });
    });
  });

  describe(`createHttpClient.patch`, () => {
    it('should be able to send patch request', async () => {
      const client = createGigwageClient({
        apiKey: process.env.GIGWAGE_API_KEY ?? '',
        apiSecret: process.env.GIGWAGE_SECRET ?? '',
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
      }>('/api/v1/contractors', {
        contractor: fakeContractor,
      });

      expect(response.data).toMatchObject({
        contractor: { ...fakeContractor },
      });

      // update contractor
      const newFirstName = faker.name.firstName();
      const patchResponse = await client.patch<{
        contractor: {
          email: string;
          first_name: string;
          id: number;
          last_name: string;
        }[];
      }>(`/api/v1/contractors/${response.data.contractor.id}`, {
        contractor: {
          first_name: newFirstName,
        },
      });

      expect(patchResponse.data.contractor).toMatchObject({
        ...fakeContractor,
        id: response.data.contractor.id,
        first_name: newFirstName,
      });
    });
  });

  describe(`createHttpClient.delete`, () => {
    it('should be able to send delete request', async () => {
      const client = createGigwageClient({
        apiKey: process.env.GIGWAGE_API_KEY ?? '',
        apiSecret: process.env.GIGWAGE_SECRET ?? '',
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
      }>('/api/v1/contractors', {
        contractor: fakeContractor,
      });
      // Should not throw
      await client.get<{ contractors: [] }>(
        `/api/v1/contractors/${response.data.contractor.id}`,
      );

      expect(response.data).toMatchObject({
        contractor: { ...fakeContractor },
      });

      const deleteResponse = await client.delete(
        `/api/v1/contractors/${response.data.contractor.id}`,
      );
      expect(deleteResponse.data).toMatchObject({
        contractor: { ...fakeContractor },
      });

      await expect(
        client.get<{ contractors: [] }>(
          `/api/v1/contractors/${response.data.contractor.id}`,
        ),
      ).rejects.toThrow();
    });
  });
});
