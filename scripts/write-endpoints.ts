import path from 'path';

import axios from 'axios';
import { Project } from 'ts-morph';

// import { payload as data } from './src/data';
import payload from './openapi.json';

type Endpoint = {
  description: string;
  method: string;
  parameters:
    | {
        description: string;
        in: 'path' | 'query';
        name: string;
        required: boolean;
        schema: string;
      }[]
    | null;
  path: string;
  requestBody: string | null;
  responseType: string;
  responseTypeIsArray: boolean;
  summary: string;
  tags: TagMap[keyof TagMap][];
};

const TAG_MAP = {
  Contractors: 'contractors',
  Payments: 'payments',
  'Line Items': 'lineItems',
  Transfers: 'transfers',
  'API Keys': 'apiKeys',
  Subscriptions: 'subscriptions',
  Batches: 'batches',
  Balances: 'balances',
  '1099s': 'ten99s',
  Webhooks: 'webhooks',
  Transactions: 'transactions',
  Customers: 'customers',
  AccountsReceivablePayments: 'accountsReceivablePayments',
  Partnerships: 'partnerships',
};

const VARIABLE_MAP: Record<string, string> = {
  '1099_id': 'ten99_id',
};

type TagMap = typeof TAG_MAP;

/**
 * Convert a tag name to function name
 */
const tagToFuncName = (tag: string) => {
  const newTag = TAG_MAP[tag as keyof TagMap];
  if (!newTag) {
    throw new Error(`Unregistered tag ${tag} found.`);
  }
  return newTag;
};

/** Get endpoints for a specific tag */
const getTagEndpoints = (tag: TagMap[keyof TagMap], list: Endpoint[]) =>
  list.filter(endpoint => endpoint.tags.includes(tag));

const extractTags = (oasDefinition: any) =>
  [
    ...oasDefinition.tags,
    // Need to manually add in partnerships for some reason
    { name: 'Partnerships', description: 'Partnership APIs' },
  ].map(({ name, description }) => ({
    name,
    description,
    functionName: tagToFuncName(name),
  }));
/**
 * Extracts endpoints from OAS defiinition into a flattened list of endpoints.
 * Converts to more useful object pattern for writing TS.
 */
const extractEndpoints = (oasDefinition: any): Endpoint[] =>
  Object.entries(oasDefinition.paths).reduce<any>((prev, [path, value]) => {
    const methods = Object.entries(value as any).map(([method, args]: any) => {
      // Response object definition extracted from possible return codes.
      const response = (
        args.responses?.['200'] ??
        args.responses?.['201'] ??
        args.responses?.['204']
      )?.content?.['application/json']?.schema;

      // Extracts the string literal reference name for response type.
      const responseType = (
        response?.$ref ??
        response?.items?.$ref ??
        ''
      ).replace('#/components/schemas/', '');

      // Includes path and query parameters.
      const parameters =
        args?.parameters?.map((param: any) => ({
          ...param,
          schema: param.schema?.type,
        })) || null;

      // Request payload type if post, put, patch
      const requestBody =
        (
          args.requestBody?.content?.['application/json']?.schema?.$ref ?? ''
        ).replace('#/components/schemas/', '') || null;

      // Converted Endpoint data.
      return {
        ...args,
        path,
        method,
        tags: args.tags.map(tagToFuncName),
        responseType,
        responseTypeIsArray: response?.type === 'array',
        parameters,
        requestBody,
      };
    });

    return [...prev, ...methods];
  }, []);

const mapTypes = (type: string) => {
  switch (type) {
    case 'integer':
      return 'number';
    default:
      return type;
  }
};

/** Writes a comment docblock if content exists*/
const writeDocBlock = (content?: string) =>
  !!content ? `/** ${content} */` : '';

export const capitalize = (input: string) =>
  input.slice(0, 1).toUpperCase() + input.slice(1, input.length);

const lowerCase = (input: string) =>
  input.slice(0, 1).toLocaleLowerCase() + input.slice(1, input.length);

/** creates a js syntax friendly endpoint method name. */
const endpointName = (endpoint: Endpoint) =>
  lowerCase(
    //
    endpoint.summary
      .split(' ') // separate words by space
      .map(capitalize) // capitalize each word
      .join('') // rejoin without spaces
      .replace(/\s+/g, '') // replace all spaces with nothing
      .replace(/\-/g, '') // replace dashes with nothing
      .replace(/\'/g, ''), // ''s with nothing.
  );

const convertVariableName = (name: string) => {
  return VARIABLE_MAP[name as keyof typeof VARIABLE_MAP] ?? name;
};

/**
 * Writes code from array of values.
 * filters out non-string/number values.
 * Allows array nesting for new lines.
 */
export const writecode = (set: any[], separator = ' '): string => {
  return set
    .filter(t => !!t)
    .reduce((prev, cur, index, array) => {
      const isFirst = index === 0;
      const isLast = index === array.length - 1;

      const next = Array.isArray(cur) ? '\n' + writecode(cur) : cur;
      // filter out non string or number values.
      if (!next || (typeof next !== 'string' && typeof next !== 'number')) {
        return prev;
      }

      return `${isFirst ? '\n' : ''}${prev}${next}${isLast ? '\n' : separator}`;
    }, '')
    .replace(/\n\s*\n/g, '\n')
    .replace(/\n{2,}/g, '\n');
};

/** Comma separated list*/
const writeList = (code: any[]) => writecode(code, ', ');
/** Wraps content in object */
const writeObject = (code: any) => writecode(['{', code, '}']);

const hasPayoad = (endpoint: Endpoint) => {
  return (
    endpoint.method === 'post' ||
    endpoint.method === 'patch' ||
    endpoint.method === 'put'
  );
};

const writeComponentType = (type: string) => capitalize(type);

const writeEndpointType = (endpoint: Endpoint) =>
  writecode([
    'export type',
    `${capitalize(endpointName(endpoint))}Options`,
    '=',
    '{',
    endpoint.parameters?.map(param => [
      writeDocBlock(param.description),
      [
        convertVariableName(param.name),
        param.required ? '' : '?',
        ':',
        mapTypes(param.schema),
      ],
    ]),
    '}',
    endpoint.requestBody
      ? '& ' + writeComponentType(endpoint.requestBody)
      : null,
  ]);

const writeEndpointFunctionParameters = (endpoint: Endpoint) => {
  return writecode([
    writeObject(
      writeList([
        ...(endpoint.parameters ?? []).map(param =>
          convertVariableName(param.name),
        ),
        hasPayoad(endpoint) && '...options',
      ]),
    ),
    ':',
    `${capitalize(endpointName(endpoint))}Options`,
  ]);
};

const writeEndpointFunction = (endpoint: Endpoint) => {
  const pathParams = (endpoint.parameters || []).filter(p => p.in === 'path');
  const queryParams = (endpoint.parameters || []).filter(p => p.in === 'query');

  return writecode([
    endpointName(endpoint),
    ':(',
    writeEndpointFunctionParameters(endpoint),
    ')=>',
    `httpClient.${endpoint.method}<${writeComponentType(
      endpoint.responseType,
    )}${endpoint.responseTypeIsArray ? '[]' : ''}>`,
    '(',
    // replace url params with interpolation
    writeList([
      backTicks(
        pathParams.reduce(
          (prev, param) =>
            prev.replace(`{${param.name}}`, '${' + param.name + '}'),
          endpoint.path,
        ),
      ),
      hasPayoad(endpoint) && 'options',
      queryParams.length &&
        writeObject(
          writeList(
            queryParams.map(p => {
              return !VARIABLE_MAP[p.name]
                ? p.name
                : `'${p.name}': ${convertVariableName(p.name)}`;
            }),
          ),
        ),
    ]),
    '),',
  ]);
};

const backTicks = (code: string) => `\`${code}\``;

const project = new Project({});

/** Create working tags */
const tags = extractTags(payload);
const endpoints = extractEndpoints(payload).filter(
  (e: Endpoint) => !e.tags.includes('partnerships'),
);

tags.forEach(tag => {
  const tagFile = project.createSourceFile(
    `src/generated/${tag.functionName}.ts`,
    '',
    {
      overwrite: true,
    },
  );

  const tagEndpoints = getTagEndpoints(tag.functionName, endpoints);

  const generatedImports: string[] = (
    [
      ...tagEndpoints.map(endpoint => endpoint.requestBody),
      ...tagEndpoints.map(endpoint => endpoint.responseType),
    ].filter(item => !!item) as string[]
  )
    .reduce((prev, cur) => {
      if (prev.includes(cur)) {
        return prev;
      }
      return [...prev, cur];
    }, [] as string[])
    .map(capitalize);

  tagFile.addImportDeclarations([
    {
      moduleSpecifier: '../http-client',
      namedImports: [{ name: 'GigWageHttpClient' }],
    },
    {
      moduleSpecifier: './types',
      namedImports: generatedImports.map(name => ({ name })).sort(),
    },
  ]);

  tagEndpoints.forEach(endpoint => {
    tagFile.addStatements(writer => {
      const t = writeEndpointType(endpoint);
      // const l = JSON.stringify(t);
      writer.writeLine(writeEndpointType(endpoint));
    });
  });

  const tagFunction = tagFile.addFunction({
    isDefaultExport: false,
    isExported: true,
    name: `${tag.functionName}Endpoints`,
    parameters: [{ name: 'httpClient', type: 'GigWageHttpClient' }],
  });

  tagFunction.setBodyText(writer => {
    writer.writeLine('return {');

    tagEndpoints.forEach(endpoint => {
      writer.writeLine(writeDocBlock(endpoint.description));
      writer.writeLine(writeEndpointFunction(endpoint));
    });
    writer.writeLine('}');
  });
  // tagFunction.addStatements([{kind:StructureKind.}])
});

// endpoints.forEach(endpoint => {
//   sampleFile.addStatements(writer => {
//     const name = endpointName(endpoint);

//     writer.write(
//       `
//     ${writeEndpointType(endpoint)}
//     ${writeDescription(endpoint)}
//     ${writeEndpointFunction(endpoint)}`,
//     );
//   });
// });

project.save();
