import path from 'path';

import axios from 'axios';
import { Project } from 'ts-morph';

// import { payload } from './src/data';

axios
  .get(
    'https://developers.gigwage.com/reference/postapiv1contractors?json=on',
    {
      headers: {
        'x-requested-with': 'XMLHttpRequest',
        accept: 'application/json',
      },
    },
  )
  .then(({ data }) => {
    // console.log(oasDefinition);

    const payload = data.oasDefinition;

    // const paths = payload.paths;

    // const endpoints = Object.entries(paths).reduce((prev, [path, data]) => {
    //   console.log(path);
    //   const endpoint = {
    //     path,
    //     ...data,
    //   };

    //   return [...prev, endpoint];
    // }, [] as any);

    const project = new Project({});
    project.addSourceFilesAtPaths(
      path.resolve(__dirname + '/generated/**/*.ts'),
    );

    type Tag = {
      description: string;
      name: string;
    };
    type PreparedTag = Tag & {
      functionName: string;
    };

    type Endpoint = {
      description: string;
      method: string;
      parameters:
        | {
            description: string;
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

    type TagMap = typeof TAG_MAP;

    const convertTag = (tag: string) => {
      const newTag = TAG_MAP[tag as keyof TagMap];
      if (!newTag) {
        throw new Error(`Unregistered tag ${tag} found.`);
      }
      return newTag;
    };

    const tags = [
      ...payload.tags,
      { name: 'Partnerships', description: 'Partnership APIs' },
    ]
      .filter(tag => tag.name !== 'Webhooks' && tag.name !== 'Partnerships')
      .map(({ name, description }) => {
        return {
          name,
          description,
          functionName: convertTag(name),
        };
      });

    const getTagEndpoints = (tag: TagMap[keyof TagMap], list: Endpoint[]) =>
      list.filter(endpoint => endpoint.tags.includes(tag));

    const endpoints: Endpoint[] = Object.entries(payload.paths)
      .reduce<any>((prev, [path, value]) => {
        const methods = Object.entries(value as any).map(
          ([method, args]: any) => {
            const response = (
              args.responses?.['200'] ??
              args.responses?.['201'] ??
              args.responses?.['204']
            )?.content?.['application/json']?.schema;

            return {
              ...args,
              path,
              method,
              tags: args.tags.map(convertTag),
              responseType: (
                response?.$ref ??
                response?.items?.$ref ??
                ''
              ).replace('#/components/schemas/', ''),
              responseTypeIsArray: response?.type === 'array',
              parameters:
                args?.parameters?.map((param: any) => ({
                  ...param,
                  schema: param.schema?.type,
                })) || null,
              requestBody:
                (
                  args.requestBody?.content?.['application/json']?.schema
                    ?.$ref ?? ''
                ).replace('#/components/schemas/', '') || null,
            };
          },
        );

        return [...prev, ...methods];
      }, [])
      .filter((e: Endpoint) => !e.tags.includes('partnerships'));

    const mapTypes = (type: string) => {
      switch (type) {
        case 'integer':
          return 'number';
        default:
          return type;
      }
    };

    const writeDescription = (endpoint: Endpoint) =>
      `/** ${endpoint.description} */`;

    const endpointName = (endpoint: Endpoint) =>
      endpoint.summary
        .replace(/\s+/g, '')
        .replace(/\-/g, '')
        .replace(/\'/g, '');

    const writeEndpointType = (endpoint: Endpoint) => {
      return `export type ${endpointName(endpoint)}Options = ${
        endpoint.parameters
          ? `{${(endpoint.parameters || [])
              ?.map(
                param => `
      ${param.description ? `//** ${param.description} */` : ''}
  ${param.name}${param.required ? '' : '?'}:${mapTypes(param.schema)}
  `,
              )
              .join('')}
}`
          : ''
      }${
        endpoint.requestBody
          ? ` ${endpoint.parameters ? '&' : ''} ${endpoint.requestBody}`
          : ''
      }`;
    };

    const writeEndpointFunctionParameters = (endpoint: Endpoint) => {
      return `{${
        endpoint.parameters?.reduce((prev, p) => `${prev} ${p.name},`, ``) || ''
      } ...options}: ${endpointName(endpoint)}Options`;
    };

    const writeEndpointFunction = (endpoint: Endpoint) => {
      return `${endpointName(endpoint)}: (${writeEndpointFunctionParameters(
        endpoint,
      )})=> httpClient.${endpoint.method}<${endpoint.responseType}${
        endpoint.responseTypeIsArray ? '[]' : ''
      }>(\`${(endpoint.parameters || []).reduce(
        (prev, param) =>
          prev.replace(`{${param.name}}`, '${' + param.name + '}'),
        endpoint.path,
      )}\`${
        endpoint.method === 'post' ||
        endpoint.method === 'patch' ||
        endpoint.method === 'put'
          ? ', options'
          : ''
      }),`; // TODO: add query arguments
    };

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
      ).reduce((prev, cur) => {
        if (prev.includes(cur)) {
          return prev;
        }
        return [...prev, cur];
      }, [] as string[]);

      tagFile.addImportDeclarations([
        {
          moduleSpecifier: '../http-client',
          namedImports: [{ name: 'GigWageHttpClient' }],
        },
        {
          moduleSpecifier: '../endpoints/entities',
          namedImports: generatedImports.map(name => ({
            name,
          })),
        },
      ]);

      tagEndpoints.forEach(endpoint => {
        tagFile.addStatements(writer => {
          writer.writeLine(writeEndpointType(endpoint));
        });
      });

      const tagFunction = tagFile.addFunction({
        isDefaultExport: true,
        name: `${tag.functionName}Endpoints`,
        parameters: [{ name: 'httpClient', type: 'GigWageHttpClient' }],
      });
      tagFunction.setBodyText(writer => {
        writer.writeLine('return {');

        tagEndpoints.forEach(endpoint => {
          writer.writeLine(writeDescription(endpoint));
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

    console.log(endpoints.length);
    project.save();
  });
