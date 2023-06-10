import { OpenAPI3 } from 'openapi-typescript';
import { Project } from 'ts-morph';

import payload from './openapi.json';
// import { payload as data } from './src/data';

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
  renderedResponseType: string;
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

const extractResponseSchema = (
  schema: any,
): { responseType: string; renderedResponseType: string } => {
  try {
    if (!schema) {
      return {
        responseType: 'string',
        renderedResponseType: 'string',
      };
    }

    if (schema?.type === 'object') {
      const objectProperty = Object.keys(schema.properties)[0];
      const objectSchema = schema.properties[objectProperty];

      const { responseType, renderedResponseType } =
        extractResponseSchema(objectSchema);

      return {
        responseType,
        renderedResponseType: `{ '${objectProperty}': ${renderedResponseType} } `,
      };
    }

    if (schema?.type === 'array') {
      const responseType = capitalize(
        schema.items.$ref.replace('#/components/schemas/', ''),
      );

      return {
        responseType,
        renderedResponseType: `${responseType}[]`,
      };
    }

    const responseType = capitalize(
      schema.$ref.replace('#/components/schemas/', ''),
    );

    return {
      responseType,
      renderedResponseType: `${responseType}`,
    };
  } catch (e) {
    console.log('Error with', schema);
    throw e;
  }
};

/**
 * Extracts endpoints from OAS defiinition into a flattened list of endpoints.
 * Converts to more useful object pattern for writing TS.
 */
const extractEndpoints = (oasDefinition: OpenAPI3): Endpoint[] =>
  Object.entries(oasDefinition.paths!).reduce<any>((prev, [path, value]) => {
    const methods = Object.entries(value).map(([method, args]) => {
      // Response object definition extracted from possible return codes.
      const responseSchema = (
        (args.responses?.['200'] ??
          args.responses?.['201'] ??
          args.responses?.['204']) as any
      )?.content?.['application/json']?.schema!;
      if (!responseSchema) {
        console.log('No response schema for', path, method, responseSchema);
      }

      const { responseType, renderedResponseType } =
        extractResponseSchema(responseSchema);

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
        renderedResponseType,
        parameters,
        requestBody,
        summary:
          path === '/api/v1/contractors/batch'
            ? 'Batch Create Contractor'
            : args.summary,
      };
    });
    return [...prev, ...methods];
  }, [] as Endpoint[]);

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

const areAllParamsOptional = (endpoint: Endpoint) => {
  return (
    endpoint.parameters?.filter(param => param.required).length === 0 &&
    !endpoint.requestBody
  );
};

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
    areAllParamsOptional(endpoint) && '= {}',
  ]);
};

const writeEndpointFunction = (endpoint: Endpoint) => {
  const pathParams = (endpoint.parameters || []).filter(p => p.in === 'path');
  const queryParams = (endpoint.parameters || []).filter(p => p.in === 'query');

  return writecode([
    endpointName(endpoint),
    ':(',
    writeEndpointFunctionParameters(endpoint),
    ')',
    endpoint.responseType && `:Promise<${endpoint.renderedResponseType}>`,
    '=>',
    `httpClient.${endpoint.method}`,
    endpoint.responseType && `<${endpoint.renderedResponseType}>`,
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
    ').then(r=>r.data),',
  ]);
};

const backTicks = (code: string) => `\`${code}\``;

const project = new Project({});

/** Create working tags */
const tags = extractTags(payload);
const endpoints = extractEndpoints(payload as any).filter(
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
    ].filter(item => !!item && item.toLowerCase() !== 'string') as string[]
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
      writer.writeLine(
        writeDocBlock(endpoint.description) + writeEndpointFunction(endpoint),
      );
      // writer.writeLine(writeEndpointFunction(endpoint));
    });
    writer.writeLine('}');
  });
});

project.save();
