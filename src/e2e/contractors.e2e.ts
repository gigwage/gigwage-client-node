import faker from '@faker-js/faker';

import { createGigwageClient } from '../index';

import 'dotenv/config';

const client = createGigwageClient({
  apiKey: process.env.GIGWAGE_API_KEY ?? '',
  apiSecret: process.env.GIGWAGE_SECRET ?? '',
  apiEnvironment: 'sandbox',
});

describe('contractors', () => {
  it('createContractor', async () => {
    const contractor = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email().toLowerCase(),
    };
    const data = await client.createContractor({
      contractor,
    });

    expect(data).toMatchObject({ contractor });
  });

  it('listContractors', async () => {
    const data = await client.listContractors();
    console.log(data);

    expect(data).toMatchObject({ contractors: expect.any(Array) });
  });

  it('createApiKey', async () => {
    const data = await client.createAPIKey({
      api_key: { name: 'test', test_key: true },
    });

    expect(data).toMatchObject({
      api_key: { name: 'test' },
    });
  });
});
