// const { createGigwageClient } = require('@gigwage/client');
import { createGigwageClient } from '@gigwage/client';
import dotenv from 'dotenv';

dotenv.config();

// console.log(Object.keys(thing));
const client = createGigwageClient({
  apiKey: process.env.GIGWAGE_API_KEY ?? '',
  apiSecret: process.env.GIGWAGE_SECRET ?? '',
  apiEnvironment: 'sandbox',
});

client.listContractors({}).then(c => console.log(c));

// const data = await client.listContractors();

// client
//   .get('/api/v1/contractors')
//   .then(res => console.log(res.data))
//   .catch(e => console.log(e.response.statusText));
