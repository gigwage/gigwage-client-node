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

async function run() {
  const { contractors } = await client.listContractors();
}
