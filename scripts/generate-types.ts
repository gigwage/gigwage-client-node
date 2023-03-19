import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

import { components } from './openapi.json';
import { capitalize, writecode } from './write-endpoints';

const schemas = components.schemas;

const componentTypes = Object.keys(schemas);

/** takes openapi object with tags/components etc. */

// type SchemaResponseType = { oasDefinition: OpenAPI3 };

const run = async () => {
  execSync(
    'npx openapi-typescript scripts/openapi.json --output ./src/generated/openapi-type.ts',
    {
      stdio: 'inherit',
    },
  );

  const openapiTypeFile = readFileSync(
    path.resolve(__dirname, '../src/generated/openapi-type.ts'),
    'utf8',
  );

  const onlyComponents = openapiTypeFile.slice(
    openapiTypeFile.indexOf('export interface components'),
    openapiTypeFile.indexOf('export type external'),
  );

  writeFileSync(
    path.resolve(__dirname, '../src/generated/openapi-type.ts'),
    onlyComponents,
  );

  const file = writecode([
    ['import { components } from "./openapi-type";'],
    ...componentTypes
      .sort()
      .map(name => [
        'export type',
        capitalize(name),
        '=',
        `components['schemas']['${name}']`,
      ]),
  ]);

  writeFileSync(path.resolve(__dirname, '../src/generated/types.ts'), file);
};

run();
export default {};
