import { GigwageEnvironments } from './types';

export const ENVIRONMENTS: Record<GigwageEnvironments, string> = {
  sandbox: 'https://sandbox.gigwage.com/api/v1',
  production: 'https://www.gigwage.com/api/v1',
};
