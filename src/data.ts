export const payload = {
  openapi: '3.0.0',
  info: {
    title: 'API Endpoints',
    description: 'A description of the API.',
    termsOfService: 'https://gigwage.com/tos',
    contact: {
      name: 'Gig Wage Team',
      email: 'support@gigwage.com',
    },
    version: '0.0.1',
  },
  security: [{}],
  tags: [
    {
      name: 'Contractors',
      description: 'Operations about Contractors',
    },
    {
      name: 'Payments',
      description: 'Operations about Payments',
    },
    {
      name: 'Line Items',
      description: 'Operations about Line Items',
    },
    {
      name: 'Transfers',
      description: 'Operations about Transfers',
    },
    {
      name: 'API Keys',
      description: 'Operations about API Keys',
    },
    {
      name: 'Subscriptions',
      description: 'Operations about Subscriptions',
    },
    {
      name: 'Batches',
      description: 'Operations about Batches',
    },
    {
      name: 'Balances',
      description: 'Operations about Balances',
    },
    {
      name: '1099s',
      description: 'Operations about 1099s',
    },
    {
      name: 'Webhooks',
      description: 'Operations about Webhooks',
    },
    {
      name: 'Transactions',
      description: 'Operations about Transactions',
    },
    {
      name: 'Customers',
      description: 'Operations about Customers',
    },
    {
      name: 'AccountsReceivablePayments',
      description: 'Operations about AccountsReceivablePayments',
    },
  ],
  paths: {
    '/api/v1/contractors/find_by': {
      get: {
        summary: 'Find contractor uniquely',
        description: 'Find a contractor by email, external_id or id.',
        parameters: [
          {
            in: 'query',
            name: 'email',
            description: 'Contractor email address',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'external_id',
            description: 'Customer assigned ID',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'id',
            description: 'Contractor ID',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Find a contractor by email, external_id or id.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1ContractorsFindBy',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/find_by?email=karen@example.com',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/find_by?email=karen@example.com", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors': {
      post: {
        summary: 'Create contractor',
        description: 'Creates a new contractor.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1Contractors',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1Contractors',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: {\n  first_name: 'John',\n  last_name: 'Smith',\n  email: 'jsmith@gigwage.com'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/contractors',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {\n  "first_name": "John",\n  "last_name": "Smith",\n  "email": "jsmith@gigwage.com"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List contractors',
        description: 'List contractors.',
        parameters: [
          {
            in: 'query',
            name: 'q',
            description: 'Search query to find contractors',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'List contractors.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/BusinessRelationshipEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1Contractors',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}/invitations': {
      post: {
        summary: 'Invite a contractor',
        description:
          'Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description:
              'Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ContractorInvitationEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsIdInvitations',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/invitations',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/invitations", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}': {
      patch: {
        summary: 'Update a contractor',
        description:
          'Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1Contractors',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description:
              'Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'patchApiV1ContractorsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: { first_name: 'Karen' } }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/contractors/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {"first_name": "Karen"}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      delete: {
        summary: 'Delete a contractor',
        description:
          "Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s ",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description:
              "Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s ",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'deleteApiV1ContractorsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/contractors/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Return a contractor',
        description: 'Returns the details for a given contractor.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'full',
            description:
              'set 1 to return full information of contractor (including Address, phone number, and birthday)',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'include_ssn',
            description: 'set 1 to return security number of contractor',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details for a given contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1ContractorsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}/1099s': {
      get: {
        summary: 'List all 1099s for a contractor',
        description: 'List all 1099s for a contractor',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'query',
            name: 'year',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List all 1099s for a contractor',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Ten99Entity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1ContractorsId1099s',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/1099s',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/1099s", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}/tin_check': {
      post: {
        summary: 'Create a TIN check',
        description:
          "Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description:
              "Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsIdTinCheck',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/tin_check',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/tin_check", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}/w9': {
      patch: {
        summary: 'Update W-9 information',
        description: 'Update W9 information for a contractor.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1ContractorsIdW9',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Update W9 information for a contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'patchApiV1ContractorsIdW9',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: { address1: '100 Main st' } }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/w9',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {"address1": "100 Main st"}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors/1/w9", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show W-9 information',
        description: 'Get W9 information for a contractor.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'include_ssn',
            description: 'set true to include social security',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get W9 information for a contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1ContractorsIdW9',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/w9',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/w9", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      post: {
        summary: 'Submit W-9 information',
        description:
          "Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ContractorsIdW9',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              "Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsIdW9',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: {\n  address1: '100 Main st',\n  city: 'Austin',\n  state: 'TX',\n  zip: '78701',\n  tax_classification: 'single_member_llc'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/w9',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {\n  "address1": "100 Main st",\n  "city": "Austin",\n  "state": "TX",\n  "zip": "78701",\n  "tax_classification": "single_member_llc"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors/1/w9", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}/kyc': {
      post: {
        summary: 'Submit KYC information',
        description:
          'Submit KYC (know your customer) information for a contractor',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ContractorsIdKyc',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              'Submit KYC (know your customer) information for a contractor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsIdKyc',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: {\n  social_security: '111-22-3333',\n  phone_number: '222-333-4444',\n  birthdate: '01/01/1990',\n  tax_classification: 'single_member_llc'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/kyc',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {\n  "social_security": "111-22-3333",\n  "phone_number": "222-333-4444",\n  "birthdate": "1990-01-31",\n  "tax_classification": "single_member_llc"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors/1/kyc", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{id}/invite': {
      post: {
        summary: 'Send invite to contractor',
        description:
          'Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description:
              'Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsIdInvite',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/invite',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/invite", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{contractor_id}/accounts': {
      post: {
        summary: 'Add account to contractor',
        description: 'Add a bank account to an existing contractor.',
        parameters: [
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ContractorsContractorIdAccounts',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Add a bank account to an existing contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsContractorIdAccounts',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { account: { \n  account_number: '123', \n  routing_number: '456', \n  name: 'Schwab Checking', \n  account_type: 'checking' \n} }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/accounts',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"account": {\n  "account_number": \'123\', \n  "routing_number": \'456\', \n  "name": \'Schwab Checking\', \n  "account_type": \'checking\' \n}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors/1/accounts", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body \n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List contractor accounts',
        description: 'List all accounts for the contractor.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List all accounts for the contractor.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AccountEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1ContractorsContractorIdAccounts',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/accounts',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/accounts", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{contractor_id}/accounts/{id}': {
      delete: {
        summary: 'Deactivate account',
        description: "Deactivate contractor's bank account.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Account ID',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: "Deactivate contractor's bank account.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'deleteApiV1ContractorsContractorIdAccountsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/accounts/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/accounts/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Get account detail',
        description: 'Get details of an existing bank account.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'Account ID',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get details of an existing bank account.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'getApiV1ContractorsContractorIdAccountsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/accounts/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/accounts/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{contractor_id}/cards': {
      post: {
        summary: 'Add contractor debit card',
        description: 'Add debit card to contractor',
        parameters: [
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ContractorsContractorIdCards',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Add debit card to contractor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsContractorIdCards',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/contractors/1/cards',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/contractors/1/cards", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/contractors/{contractor_id}/identity_document': {
      post: {
        summary: "Create contractor's identity document",
        description: 'Upload identity document',
        parameters: [
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ContractorsContractorIdIdentityDocument',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Upload identity document',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Contractors'],
        operationId: 'postApiV1ContractorsContractorIdIdentityDocument',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: 'require \'httparty\'\nbody = { identity_document: { \n  subtype: \'driver_license\', \n  front: File.new("front.jpg", "rb"), \n  back: File.new("back.jpg", "rb") \n} }.to_json\nresponse = HTTParty.post(\n  \'https://sandbox.gigwage.com/api/v1/contractors/1/identity_document\',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n',
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"identity_document": {\n  "subtype": "driver_license" \n}});\nfetch("https://sandbox.gigwage.com/api/v1/contractors/1/identity_document", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/payments': {
      post: {
        summary: 'Send payment',
        description:
          'Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1Payments',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              'Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Payments'],
        operationId: 'postApiV1Payments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { payment: {\n  contractor_id: 123,\n  nonce: 'abc123',\n  line_items: { amount: 10.25 }\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/payments',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"payment": {\n  "contractor_id": "123",\n  "nonce": "abc123",\n  "line_items": {"amount": 10.25}\n}});\nfetch("https://sandbox.gigwage.com/api/v1/payments", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List sent payments',
        description: 'Returns a list of payments, sorted newest first.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'query',
            name: 'contractor_id',
            description: 'Filter results by contractor_id',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'includes',
            description:
              'Include associated object. for example `includes=contractor`',
            required: false,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of payments, sorted newest first.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/PaymentEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Payments'],
        operationId: 'getApiV1Payments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/payments?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/payments?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/payments/{id}/retry': {
      post: {
        summary: 'Retry payment',
        description: 'Retry a canceled or returned payment.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Retry a canceled or returned payment.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
        },
        tags: ['Payments'],
        operationId: 'postApiV1PaymentsIdRetry',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/payments/1/retry',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/payments/1/retry", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/payments/{id}': {
      delete: {
        summary: 'Delete payment',
        description:
          "Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description:
              "Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Payments'],
        operationId: 'deleteApiV1PaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/payments/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/payments/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      put: {
        summary: 'Update payment',
        description: "Update a payment's metadata.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/putApiV1Payments',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: "Update a payment's metadata.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
        },
        tags: ['Payments'],
        operationId: 'putApiV1PaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { payment: { metadata: { job_id: '123' } } }.to_json\nresponse = HTTParty.put(\n  'https://sandbox.gigwage.com/api/v1/payments/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"payment": {"metadata": {"job_id": "123"}}});\nfetch("https://sandbox.gigwage.com/api/v1/payments/1", {\n  "method": "PUT",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show payment',
        description:
          'Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description:
              'Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
        },
        tags: ['Payments'],
        operationId: 'getApiV1PaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/payments/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/payments/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/line_items/{id}': {
      put: {
        summary: 'Update line item',
        description: "Update a line item's metadata.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/putApiV1LineItems',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: "Update a line item's metadata.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LineItemEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Line item not found',
          },
        },
        tags: ['Line Items'],
        operationId: 'putApiV1LineItemsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { line_item: { metadata: { job_id: '123' } } }.to_json\nresponse = HTTParty.put(\n  'https://sandbox.gigwage.com/api/v1/line_items/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"line_item": {"metadata": {"job_id": "123"}}});\nfetch("https://sandbox.gigwage.com/api/v1/line_items/1", {\n  "method": "PUT",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/transfers': {
      get: {
        summary: 'List transfers',
        description: 'Get a list of all transfers.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get a list of all transfers.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TransferTransactionEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Transfers'],
        operationId: 'getApiV1Transfers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/transfers',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/transfers", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      post: {
        summary: 'Create transfer',
        description: 'Create a transfer transaction.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1Transfers',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Create a transfer transaction.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransferTransactionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Transfers'],
        operationId: 'postApiV1Transfers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { transfer: { \n  amount: 10.25, \n  direction: 'fund', \n  nonce: 'abc123' \n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/transfers',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"transfer": {\n  "amount": 10.25, \n  "direction": "fund", \n  "nonce": "abc123"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/transfers", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/transfers/{id}': {
      delete: {
        summary: 'Delete transfer',
        description: 'Attempt to cancel a transfer.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Attempt to cancel a transfer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransferTransactionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Transfers'],
        operationId: 'deleteApiV1TransfersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/transfers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/transfers/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show transfer',
        description: 'Get details of an existing transfer.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get details of an existing transfer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransferTransactionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Transfers'],
        operationId: 'getApiV1TransfersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/transfers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/transfers/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/api_keys': {
      post: {
        summary: 'Create API key',
        description:
          "Create a new API key. Note: This is the only time you'll get the secret.",
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ApiKeys',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              "Create a new API key. Note: This is the only time you'll get the secret.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiKeyEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['API Keys'],
        operationId: 'postApiV1ApiKeys',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { api_key: { name: 'Production' } }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/api_keys',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"api_key": {"name": "Production"}});\nfetch("https://sandbox.gigwage.com/api/v1/api_keys", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List API keys',
        description: 'Get a list of all API keys.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get a list of all API keys.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ApiKeyEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['API Keys'],
        operationId: 'getApiV1ApiKeys',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/api_keys',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/api_keys", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/api_keys/{id}': {
      delete: {
        summary: 'Revoke API key',
        description:
          'Revoke an API key. Note: The API key currently in use cannot be revoked.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'API Key',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '204': {
            description:
              'Revoke an API key. Note: The API key currently in use cannot be revoked.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiKeyEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '402': {
            description: 'Not Found',
          },
        },
        tags: ['API Keys'],
        operationId: 'deleteApiV1ApiKeysId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/api_keys/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/api_keys/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show API key',
        description: 'Get details of an existing API key.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'API Key',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get details of an existing API key.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiKeyEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '402': {
            description: 'Not Found',
          },
        },
        tags: ['API Keys'],
        operationId: 'getApiV1ApiKeysId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/api_keys/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/api_keys/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/subscriptions': {
      post: {
        summary: 'Create subscription',
        description:
          'Subscribe to webhooks of the chosen type. Please note that multiple consecutive failures to deliver webhooks will deactivate this subscription, and it will need to be reactivated. See PUT below.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1Subscriptions',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              'Subscribe to webhooks of the chosen type. Please note that multiple consecutive failures to deliver webhooks will deactivate this subscription, and it will need to be reactivated. See PUT below.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookSubscriptionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Subscriptions'],
        operationId: 'postApiV1Subscriptions',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { subscription: {\n  webhook_type: 'payment',\n  url: 'https://example.org/hook'\n} } .to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/subscriptions',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"subscription": {\n  "webhook_type": "payment",\n  "url": "https://example.org/hook"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/subscriptions", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List subscriptions',
        description: 'Returns a list of all subscriptions.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of all subscriptions.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/WebhookSubscriptionEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Subscriptions'],
        operationId: 'getApiV1Subscriptions',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/subscriptions',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/subscriptions", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/subscriptions/{id}': {
      delete: {
        summary: 'Delete subscription',
        description: 'Permanently remove a subscription.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Permanently remove a subscription.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookSubscriptionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Subscriptions'],
        operationId: 'deleteApiV1SubscriptionsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/subscriptions/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/subscriptions/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      patch: {
        summary: 'Update subscription URL',
        description: 'Change the URL where webhooks are sent.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1Subscriptions',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Change the URL where webhooks are sent.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookSubscriptionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Subscriptions'],
        operationId: 'patchApiV1SubscriptionsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { subscription: {\n  url: 'https://example.org/hook'\n} }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/subscriptions/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"subscription": {\n  "url": "https://example.org/hook"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/subscriptions/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      put: {
        summary: 'Reactivate subscription',
        description: 'Reactivate an inactive subscription.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Reactivate an inactive subscription.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookSubscriptionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Subscriptions'],
        operationId: 'putApiV1SubscriptionsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.put(\n  'https://sandbox.gigwage.com/api/v1/subscriptions/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/subscriptions/1", {\n  "method": "PUT",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show subscription',
        description: 'Get the details of a subscription.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get the details of a subscription.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookSubscriptionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Subscriptions'],
        operationId: 'getApiV1SubscriptionsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/subscriptions/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/subscriptions/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/subscriptions/{id}/deactivate': {
      delete: {
        summary: 'Deactivate subscription',
        description: 'Deactivate a subscription.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Deactivate a subscription.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookSubscriptionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Subscriptions'],
        operationId: 'deleteApiV1SubscriptionsIdDeactivate',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/subscriptions/1/deactivate',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/subscriptions/1/deactivate", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/batches': {
      post: {
        summary: 'Create batch',
        description: 'Creates a new batch of payments.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1Batches',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new batch of payments.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BatchEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Batches'],
        operationId: 'postApiV1Batches',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { 'batch': { \n  nonce: 'abc123', \n  payments: [{\n    contractor_id: 234,\n    line_items: [{\n      amount: 10.25\n    }]\n  }] \n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/1099s/1/submit',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"batch": {\n  "nonce": "abc123", \n  "payments": [{\n    "contractor_id": 234,\n    "line_items": [{\n      "amount": 10.25\n    }]\n  }]\n}});\nfetch("https://sandbox.gigwage.com/api/v1/1099s/1/submit", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List batches',
        description: 'Returns a list of batches, sorted newest-first.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of batches, sorted newest-first.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/BatchEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Batches'],
        operationId: 'getApiV1Batches',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/batches',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/batches", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/batches/{id}/payments': {
      get: {
        summary: 'Show batch payments',
        description: 'Returns the payments from a single batch.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the payments from a single batch.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BatchEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Batches'],
        operationId: 'getApiV1BatchesIdPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/batches/1/payments',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/batches/1/payments", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/batches/{id}': {
      get: {
        summary: 'Show batch',
        description: 'Returns the details of a single batch.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details of a single batch.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BatchEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Batches'],
        operationId: 'getApiV1BatchesId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/batches/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/batches/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/balance': {
      get: {
        summary: 'Show balance',
        description:
          'Returns the current and available balance for the account.',
        responses: {
          '200': {
            description:
              'Returns the current and available balance for the account.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SubaccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Balances'],
        operationId: 'getApiV1Balance',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/balance',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/balance", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/1099s': {
      post: {
        summary: 'Create 1099',
        description: 'Create a 1099 for a contractor.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV11099s',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Create a 1099 for a contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['1099s'],
        operationId: 'postApiV11099s',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { '1099': { contractor_id: 123, type: 'NEC', box1: 10.99 } }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/1099s/1/submit',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"1099": {"contractor_id": "123", "type": "NEC", "box1": 10.99}});\nfetch("https://sandbox.gigwage.com/api/v1/1099s/1/submit", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List 1099s',
        description: 'Returns a list of 1099s, sorted newest-first.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of 1099s, sorted newest-first.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Ten99Entity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['1099s'],
        operationId: 'getApiV11099s',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/1099s',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/1099s", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/1099s/{id}': {
      patch: {
        summary: 'Update 1099',
        description: 'Update a 1099',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV11099s',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Update a 1099',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['1099s'],
        operationId: 'patchApiV11099sId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { '1099': { contractor_id: 123, type: 'K' } }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/1099s/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"1099": {"contractor_id": "123", "type": "K"}});\nfetch("https://sandbox.gigwage.com/api/v1/1099s/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      delete: {
        summary: 'Delete 1099',
        description: 'Delete a 1099.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Delete a 1099.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['1099s'],
        operationId: 'deleteApiV11099sId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/1099s/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/1099s/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show 1099',
        description: 'Get details of a 1099.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get details of a 1099.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['1099s'],
        operationId: 'getApiV11099sId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/1099s/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/1099s/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/1099s/{id}/retrieve': {
      get: {
        summary: 'Get 1099 PDF URL',
        description:
          'Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description:
              'Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour.',
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['1099s'],
        operationId: 'getApiV11099sIdRetrieve',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/1099s/1/retrieve',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/1099s/1/retrieve", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/1099s/{id}/submit': {
      post: {
        summary: 'Submit 1099 to IRS',
        description: 'Submit 1099 to the IRS.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Submit 1099 to the IRS.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['1099s'],
        operationId: 'postApiV11099sIdSubmit',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/1099s/1/submit',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/1099s/1/submit", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/1099s/{id}/approve': {
      post: {
        summary: 'Approve 1099',
        description: 'Mark 1099 as ready to submit to the IRS.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Mark 1099 as ready to submit to the IRS.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['1099s'],
        operationId: 'postApiV11099sIdApprove',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/1099s/1/approve',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/1099s/1/approve", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/webhooks': {
      get: {
        summary: 'List webhooks',
        description: 'List all webhooks',
        parameters: [
          {
            in: 'query',
            name: 'contractor_id',
            description: 'Show webhooks only for the specified contractor',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: '1099_id',
            description: 'Show webhooks only for the specified 1099',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'payment_id',
            description: 'Show webhooks only for the specified payment',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'tin_check_id',
            description: 'Show webhooks only for the specified TIN check',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'List all webhooks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/WebhookEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Object not found',
          },
        },
        tags: ['Webhooks'],
        operationId: 'getApiV1Webhooks',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/webhooks',\n  headers: headers_hash,\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/webhooks", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/webhooks/{id}': {
      get: {
        summary: 'Show webhook',
        description: 'Get webhook details',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'contractor_id',
            description: 'Show webhook only for the specified contractor',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: '1099_id',
            description: 'Show webhook only for the specified 1099',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'payment_id',
            description: 'Show webhook only for the specified payment',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'tin_check_id',
            description: 'Show webhook only for the specified TIN check',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get webhook details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WebhookEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Object not found',
          },
        },
        tags: ['Webhooks'],
        operationId: 'getApiV1WebhooksId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/webhooks/1',\n  headers: headers_hash,\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/webhooks/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/ledger': {
      get: {
        summary: 'List transactions',
        description: 'List transactions.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'size',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              minimum: 0,
              maximum: 200,
              default: 20,
            },
          },
        ],
        responses: {
          '200': {
            description: 'List transactions.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/LedgerEntity',
                  },
                },
              },
            },
          },
          '403': {
            description: 'Forbidden',
          },
        },
        tags: ['Transactions'],
        operationId: 'getApiV1Ledger',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/ledger?size=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/ledger?size=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/customers': {
      post: {
        summary: 'Create customer',
        description: 'Creates a new customer.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1Customers',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new customer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Customers'],
        operationId: 'postApiV1Customers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { customer: {\n  name: 'John Smith',\n  email: 'jsmith@gigwage.com',\n  phone_number: '555333222',\n  address1: '300 Post St',\n  state: 'CA',\n  zip: '94108',\n  city: 'San Francisco',\n  authorization: 'base64string',\n  account_number: '555111222',\n  routing_number: '992992929',\n  account_type: 'savings'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/customers',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"customer": {\n  "name": \'John Smith\',\n  "email": \'jsmith@gigwage.com\',\n  "phone_number": \'555333222\',\n  "address1": \'300 Post St\',\n  "state": \'CA\',\n  "zip": \'94108\',\n  "city": \'San Francisco\',\n  "authorization": \'base64string\',\n  "account_number": \'555111222\',\n  "routing_number": \'992992929\',\n  "account_type": \'savings\'\n}});\nfetch("https://sandbox.gigwage.com/api/v1/customers", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List customers',
        description: 'List customers.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'List customers.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/CustomerEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Customers'],
        operationId: 'getApiV1Customers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/customers?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/customers?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/customers/{id}': {
      patch: {
        summary: 'Update a customer',
        description: 'Updates an existing customer',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1Customers',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Updates an existing customer',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Customers'],
        operationId: 'patchApiV1CustomersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { customer: {\n  name: 'John Smith',\n  email: 'jsmith@gigwage.com',\n  phone_number: '555333222',\n  address1: '300 Post St',\n  state: 'CA',\n  zip: '94108',\n  city: 'San Francisco',\n  authorization: 'base64string',\n  account_number: '555111222',\n  routing_number: '992992929',\n  account_type: 'savings'\n} }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/customer/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"customer": {\n  "name": \'John Smith\',\n  "email": \'jsmith@gigwage.com\',\n  "phone_number": \'555333222\',\n  "address1": \'300 Post St\',\n  "state": \'CA\',\n  "zip": \'94108\',\n  "city": \'San Francisco\',\n  "authorization": \'base64string\',\n  "account_number": \'555111222\',\n  "routing_number": \'992992929\',\n  "account_type": \'savings\'\n}});\nfetch("https://sandbox.gigwage.com/api/v1/customers/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      delete: {
        summary: 'Delete a customer',
        description:
          'Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description:
              'Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Customers'],
        operationId: 'deleteApiV1CustomersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/customers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/customers/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Return a customer',
        description: 'Returns the details for a given customer.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details for a given customer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Customers'],
        operationId: 'getApiV1CustomersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/customers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/customers/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/ar_payments': {
      post: {
        summary: 'Create Accounts Receivable Payment',
        description: 'Creates a new Accounts Receivable Payment.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1ArPayments',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new Accounts Receivable Payment.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArPaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['AccountsReceivablePayments'],
        operationId: 'postApiV1ArPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: 'require \'httparty\'\nbody = { ar_payment: {\n  customer_id: "111",\n  amount: "777.25",\n  reason: "any reason for this Accounts Receivable payment made",\n  nonce: "1234"\n} }.to_json\nresponse = HTTParty.post(\n  \'https://sandbox.gigwage.com/api/v1/contractors\',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n',
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"ar_payment": {\n  "customer_id": "111",\n  "amount": "777.25",\n  "reason": "any reason for this Accounts Receivable payment made",\n  "nonce": "1234"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/ar_payments", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List Accounts Receivable payments',
        description: 'List Accounts Receivable payments.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
        ],
        responses: {
          '200': {
            description: 'List Accounts Receivable payments.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ArPaymentEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['AccountsReceivablePayments'],
        operationId: 'getApiV1ArPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/ar_payments?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/ar_payments?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/ar_payments/{id}': {
      get: {
        summary: 'Return an Accounts Receivable Payment',
        description: 'Returns the details for Accounts Receivable Payment',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details for Accounts Receivable Payment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArPaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['AccountsReceivablePayments'],
        operationId: 'getApiV1ArPaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/ar_payments/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/ar_payments/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/find_by': {
      get: {
        summary: 'Find contractor uniquely',
        description: 'Find a contractor by email, external_id or id.',
        parameters: [
          {
            in: 'query',
            name: 'email',
            description: 'Contractor email address',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'external_id',
            description: 'Customer assigned ID',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'id',
            description: 'Contractor ID',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Find a contractor by email, external_id or id.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'getApiV1BusinessesBusinessIdContractorsFindBy',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/find_by?email=karen@example.com',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/find_by?email=karen@example.com", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors': {
      post: {
        summary: 'Create contractor',
        description: 'Creates a new contractor.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdContractors',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'postApiV1BusinessesBusinessIdContractors',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: {\n  first_name: 'John',\n  last_name: 'Smith',\n  email: 'jsmith@gigwage.com'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {\n  "first_name": "John",\n  "last_name": "Smith",\n  "email": "jsmith@gigwage.com"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List contractors',
        description: 'List contractors.',
        parameters: [
          {
            in: 'query',
            name: 'q',
            description: 'Search query to find contractors',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List contractors.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/BusinessRelationshipEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'getApiV1BusinessesBusinessIdContractors',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}/invitations': {
      post: {
        summary: 'Invite a contractor',
        description:
          'Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description:
              'Provides invitation information for the contractor to allow you to send the contractoran onboarding email. If the contractor has an outstanding, unaccepted invitation, the old invitation will be invalidated.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ContractorInvitationEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'postApiV1BusinessesBusinessIdContractorsIdInvitations',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/invitations',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/invitations", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}': {
      patch: {
        summary: 'Update a contractor',
        description:
          'Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1BusinessesBusinessIdContractors',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description:
              'Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'patchApiV1BusinessesBusinessIdContractorsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: { first_name: 'Karen' } }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {"first_name": "Karen"}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      delete: {
        summary: 'Delete a contractor',
        description:
          "Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s ",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description:
              "Delete contractor record. Note: You can only destroy new contractors that aren't associated with other businesses or that have payments or 1099s ",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'deleteApiV1BusinessesBusinessIdContractorsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Return a contractor',
        description: 'Returns the details for a given contractor.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'full',
            description:
              'set 1 to return full information of contractor (including Address, phone number, and birthday)',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'include_ssn',
            description: 'set 1 to return security number of contractor',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details for a given contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'getApiV1BusinessesBusinessIdContractorsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}/1099s': {
      get: {
        summary: 'List all 1099s for a contractor',
        description: 'List all 1099s for a contractor',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'query',
            name: 'year',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List all 1099s for a contractor',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Ten99Entity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'getApiV1BusinessesBusinessIdContractorsId1099s',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/1099s',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/1099s", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}/tin_check': {
      post: {
        summary: 'Create a TIN check',
        description:
          "Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description:
              "Verify a contractor's TIN is valid. Note: TIN checks are automatically run on POST and PATCH W9 endpoints",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'postApiV1BusinessesBusinessIdContractorsIdTinCheck',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/tin_check',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/tin_check", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}/w9': {
      patch: {
        summary: 'Update W-9 information',
        description: 'Update W9 information for a contractor.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1BusinessesBusinessIdContractorsIdW9',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Update W9 information for a contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'patchApiV1BusinessesBusinessIdContractorsIdW9',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: { address1: '100 Main st' } }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/w9',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {"address1": "100 Main st"}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/w9", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show W-9 information',
        description: 'Get W9 information for a contractor.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'include_ssn',
            description: 'set true to include social security',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get W9 information for a contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'getApiV1BusinessesBusinessIdContractorsIdW9',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/w9',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/w9", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      post: {
        summary: 'Submit W-9 information',
        description:
          "Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdContractorsIdW9',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              "Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/W9Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'postApiV1BusinessesBusinessIdContractorsIdW9',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: {\n  address1: '100 Main st',\n  city: 'Austin',\n  state: 'TX',\n  zip: '78701',\n  tax_classification: 'single_member_llc'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/w9',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {\n  "address1": "100 Main st",\n  "city": "Austin",\n  "state": "TX",\n  "zip": "78701",\n  "tax_classification": "single_member_llc"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/w9", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}/kyc': {
      post: {
        summary: 'Submit KYC information',
        description:
          'Submit KYC (know your customer) information for a contractor',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdContractorsIdKyc',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              'Submit KYC (know your customer) information for a contractor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'postApiV1BusinessesBusinessIdContractorsIdKyc',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { contractor: {\n  social_security: '111-22-3333',\n  phone_number: '222-333-4444',\n  birthdate: '01/01/1990',\n  tax_classification: 'single_member_llc'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/kyc',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"contractor": {\n  "social_security": "111-22-3333",\n  "phone_number": "222-333-4444",\n  "birthdate": "1990-01-31",\n  "tax_classification": "single_member_llc"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/kyc", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{id}/invite': {
      post: {
        summary: 'Send invite to contractor',
        description:
          'Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description:
              'Delivers a secure onboarding email invitation to an existing contractor who has never been paid. If the contractor has an outstanding unaccepted invitation, the old invitation will be invalidated.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BusinessRelationshipEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId: 'postApiV1BusinessesBusinessIdContractorsIdInvite',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/invite',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/invite", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{contractor_id}/accounts': {
      post: {
        summary: 'Add account to contractor',
        description: 'Add a bank account to an existing contractor.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdContractorsContractorIdAccounts',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Add a bank account to an existing contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId:
          'postApiV1BusinessesBusinessIdContractorsContractorIdAccounts',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { account: { \n  account_number: '123', \n  routing_number: '456', \n  name: 'Schwab Checking', \n  account_type: 'checking' \n} }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"account": {\n  "account_number": \'123\', \n  "routing_number": \'456\', \n  "name": \'Schwab Checking\', \n  "account_type": \'checking\' \n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body \n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List contractor accounts',
        description: 'List all accounts for the contractor.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List all accounts for the contractor.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AccountEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId:
          'getApiV1BusinessesBusinessIdContractorsContractorIdAccounts',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{contractor_id}/accounts/{id}':
      {
        delete: {
          summary: 'Deactivate account',
          description: "Deactivate contractor's bank account.",
          parameters: [
            {
              in: 'path',
              name: 'id',
              description: 'Account ID',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
            {
              in: 'path',
              name: 'business_id',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
            {
              in: 'path',
              name: 'contractor_id',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '204': {
              description: "Deactivate contractor's bank account.",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AccountEntity',
                  },
                },
              },
            },
            '400': {
              description: 'Bad Request',
            },
          },
          tags: ['Partnerships', 'Contractors'],
          operationId:
            'deleteApiV1BusinessesBusinessIdContractorsContractorIdAccountsId',
          'x-readme': {
            'samples-languages': ['ruby', 'javascript'],
            'explorer-enabled': false,
            'code-samples': [
              {
                language: 'ruby',
                code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts/1',\n  headers: headers_hash\n)\nputs response.body\n",
              },
              {
                language: 'javascript',
                code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
              },
            ],
          },
        },
        get: {
          summary: 'Get account detail',
          description: 'Get details of an existing bank account.',
          parameters: [
            {
              in: 'path',
              name: 'id',
              description: 'Account ID',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
            {
              in: 'path',
              name: 'business_id',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
            {
              in: 'path',
              name: 'contractor_id',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Get details of an existing bank account.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AccountEntity',
                  },
                },
              },
            },
            '400': {
              description: 'Bad Request',
            },
          },
          tags: ['Partnerships', 'Contractors'],
          operationId:
            'getApiV1BusinessesBusinessIdContractorsContractorIdAccountsId',
          'x-readme': {
            'samples-languages': ['ruby', 'javascript'],
            'explorer-enabled': false,
            'code-samples': [
              {
                language: 'ruby',
                code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts/1',\n  headers: headers_hash\n)\nputs response.body\n",
              },
              {
                language: 'javascript',
                code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/accounts/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
              },
            ],
          },
        },
      },
    '/api/v1/businesses/{business_id}/contractors/{contractor_id}/cards': {
      post: {
        summary: 'Add contractor debit card',
        description: 'Add debit card to contractor',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'contractor_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdContractorsContractorIdCards',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Add debit card to contractor',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Contractors'],
        operationId:
          'postApiV1BusinessesBusinessIdContractorsContractorIdCards',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/cards',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/cards", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/contractors/{contractor_id}/identity_document':
      {
        post: {
          summary: "Create contractor's identity document",
          description: 'Upload identity document',
          parameters: [
            {
              in: 'path',
              name: 'contractor_id',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
            {
              in: 'path',
              name: 'business_id',
              required: true,
              schema: {
                type: 'integer',
                format: 'int32',
              },
            },
          ],
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/postApiV1BusinessesBusinessIdContractorsContractorIdIdentityDocument',
                },
              },
            },
            required: true,
          },
          responses: {
            '201': {
              description: 'Upload identity document',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AccountEntity',
                  },
                },
              },
            },
            '400': {
              description: 'Bad Request',
            },
          },
          tags: ['Partnerships', 'Contractors'],
          operationId:
            'postApiV1BusinessesBusinessIdContractorsContractorIdIdentityDocument',
          'x-readme': {
            'samples-languages': ['ruby', 'javascript'],
            'explorer-enabled': false,
            'code-samples': [
              {
                language: 'ruby',
                code: 'require \'httparty\'\nbody = { identity_document: { \n  subtype: \'driver_license\', \n  front: File.new("front.jpg", "rb"), \n  back: File.new("back.jpg", "rb") \n} }.to_json\nresponse = HTTParty.post(\n  \'https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/identity_document\',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n',
              },
              {
                language: 'javascript',
                code: 'let body = JSON.stringify({"identity_document": {\n  "subtype": "driver_license" \n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/contractors/1/identity_document", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
              },
            ],
          },
        },
      },
    '/api/v1/businesses/{business_id}/payments': {
      post: {
        summary: 'Send payment',
        description:
          'Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdPayments',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description:
              'Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Payments'],
        operationId: 'postApiV1BusinessesBusinessIdPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { payment: {\n  contractor_id: 123,\n  nonce: 'abc123',\n  line_items: { amount: 10.25 }\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/payments',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"payment": {\n  "contractor_id": "123",\n  "nonce": "abc123",\n  "line_items": {"amount": 10.25}\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/payments", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List sent payments',
        description: 'Returns a list of payments, sorted newest first.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'query',
            name: 'contractor_id',
            description: 'Filter results by contractor_id',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'query',
            name: 'includes',
            description:
              'Include associated object. for example `includes=contractor`',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of payments, sorted newest first.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/PaymentEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Payments'],
        operationId: 'getApiV1BusinessesBusinessIdPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/payments?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/payments?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/payments/{id}/retry': {
      post: {
        summary: 'Retry payment',
        description: 'Retry a canceled or returned payment.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Retry a canceled or returned payment.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
        },
        tags: ['Partnerships', 'Payments'],
        operationId: 'postApiV1BusinessesBusinessIdPaymentsIdRetry',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/payments/1/retry',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/payments/1/retry", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/payments/{id}': {
      delete: {
        summary: 'Delete payment',
        description:
          "Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description:
              "Attempts to cancel a payment. Once the debit from the payer's account has been finalized cancelling is not possible.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Payments'],
        operationId: 'deleteApiV1BusinessesBusinessIdPaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/payments/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/payments/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      put: {
        summary: 'Update payment',
        description: "Update a payment's metadata.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/putApiV1BusinessesBusinessIdPayments',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: "Update a payment's metadata.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
        },
        tags: ['Partnerships', 'Payments'],
        operationId: 'putApiV1BusinessesBusinessIdPaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { payment: { metadata: { job_id: '123' } } }.to_json\nresponse = HTTParty.put(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/payments/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"payment": {"metadata": {"job_id": "123"}}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/payments/1", {\n  "method": "PUT",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show payment',
        description:
          'Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description:
              'Returns the details for a single payment, including an array of line item details and the id of the contractor associated with the payment.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Contractor not found',
          },
        },
        tags: ['Partnerships', 'Payments'],
        operationId: 'getApiV1BusinessesBusinessIdPaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/payments/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/payments/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/line_items/{id}': {
      put: {
        summary: 'Update line item',
        description: "Update a line item's metadata.",
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/putApiV1BusinessesBusinessIdLineItems',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: "Update a line item's metadata.",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LineItemEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Line item not found',
          },
        },
        tags: ['Partnerships', 'Line Items'],
        operationId: 'putApiV1BusinessesBusinessIdLineItemsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { line_item: { metadata: { job_id: '123' } } }.to_json\nresponse = HTTParty.put(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/line_items/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"line_item": {"metadata": {"job_id": "123"}}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/line_items/1", {\n  "method": "PUT",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/transfers': {
      get: {
        summary: 'List transfers',
        description: 'Get a list of all transfers.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get a list of all transfers.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TransferTransactionEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Transfers'],
        operationId: 'getApiV1BusinessesBusinessIdTransfers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/transfers',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/transfers", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      post: {
        summary: 'Create transfer',
        description: 'Create a transfer transaction.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdTransfers',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Create a transfer transaction.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransferTransactionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Transfers'],
        operationId: 'postApiV1BusinessesBusinessIdTransfers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { transfer: { \n  amount: 10.25, \n  direction: 'fund', \n  nonce: 'abc123' \n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/transfers',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"transfer": {\n  "amount": 10.25, \n  "direction": "fund", \n  "nonce": "abc123"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/transfers", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/transfers/{id}': {
      delete: {
        summary: 'Delete transfer',
        description: 'Attempt to cancel a transfer.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Attempt to cancel a transfer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransferTransactionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Transfers'],
        operationId: 'deleteApiV1BusinessesBusinessIdTransfersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/transfers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/transfers/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show transfer',
        description: 'Get details of an existing transfer.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get details of an existing transfer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TransferTransactionEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Transfers'],
        operationId: 'getApiV1BusinessesBusinessIdTransfersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/transfers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/transfers/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/batches': {
      post: {
        summary: 'Create batch',
        description: 'Creates a new batch of payments.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdBatches',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new batch of payments.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BatchEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Batches'],
        operationId: 'postApiV1BusinessesBusinessIdBatches',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { 'batch': { \n  nonce: 'abc123', \n  payments: [{\n    contractor_id: 234,\n    line_items: [{\n      amount: 10.25\n    }]\n  }] \n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/submit',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"batch": {\n  "nonce": "abc123", \n  "payments": [{\n    "contractor_id": 234,\n    "line_items": [{\n      "amount": 10.25\n    }]\n  }]\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/submit", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List batches',
        description: 'Returns a list of batches, sorted newest-first.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of batches, sorted newest-first.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/BatchEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Batches'],
        operationId: 'getApiV1BusinessesBusinessIdBatches',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/batches',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/batches", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/batches/{id}/payments': {
      get: {
        summary: 'Show batch payments',
        description: 'Returns the payments from a single batch.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the payments from a single batch.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BatchEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Batches'],
        operationId: 'getApiV1BusinessesBusinessIdBatchesIdPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/batches/1/payments',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/batches/1/payments", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/batches/{id}': {
      get: {
        summary: 'Show batch',
        description: 'Returns the details of a single batch.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details of a single batch.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BatchEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Batches'],
        operationId: 'getApiV1BusinessesBusinessIdBatchesId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/batches/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/batches/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/balance': {
      get: {
        summary: 'Show balance',
        description:
          'Returns the current and available balance for the account.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description:
              'Returns the current and available balance for the account.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SubaccountEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Balances'],
        operationId: 'getApiV1BusinessesBusinessIdBalance',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/balance',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/balance", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/1099s': {
      post: {
        summary: 'Create 1099',
        description: 'Create a 1099 for a contractor.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessId1099s',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Create a 1099 for a contractor.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'postApiV1BusinessesBusinessId1099s',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { '1099': { contractor_id: 123, type: 'NEC', box1: 10.99 } }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/submit',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"1099": {"contractor_id": "123", "type": "NEC", "box1": 10.99}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/submit", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List 1099s',
        description: 'Returns a list of 1099s, sorted newest-first.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns a list of 1099s, sorted newest-first.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Ten99Entity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'getApiV1BusinessesBusinessId1099s',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/1099s/{id}': {
      patch: {
        summary: 'Update 1099',
        description: 'Update a 1099',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1BusinessesBusinessId1099s',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Update a 1099',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'patchApiV1BusinessesBusinessId1099sId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { '1099': { contractor_id: 123, type: 'K' } }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"1099": {"contractor_id": "123", "type": "K"}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      delete: {
        summary: 'Delete 1099',
        description: 'Delete a 1099.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description: 'Delete a 1099.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'deleteApiV1BusinessesBusinessId1099sId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Show 1099',
        description: 'Get details of a 1099.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Get details of a 1099.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'getApiV1BusinessesBusinessId1099sId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/1099s/{id}/retrieve': {
      get: {
        summary: 'Get 1099 PDF URL',
        description:
          'Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description:
              'Returns the URL to a PDF of a submitted 1099. The URL expires in 1 hour.',
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'getApiV1BusinessesBusinessId1099sIdRetrieve',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/retrieve',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/retrieve", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/1099s/{id}/submit': {
      post: {
        summary: 'Submit 1099 to IRS',
        description: 'Submit 1099 to the IRS.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Submit 1099 to the IRS.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'postApiV1BusinessesBusinessId1099sIdSubmit',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/submit',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/submit", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/1099s/{id}/approve': {
      post: {
        summary: 'Approve 1099',
        description: 'Mark 1099 as ready to submit to the IRS.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '201': {
            description: 'Mark 1099 as ready to submit to the IRS.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Ten99Entity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', '1099s'],
        operationId: 'postApiV1BusinessesBusinessId1099sIdApprove',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/approve',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/1099s/1/approve", {\n  "method": "POST",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/customers': {
      post: {
        summary: 'Create customer',
        description: 'Creates a new customer.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdCustomers',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new customer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'Customers'],
        operationId: 'postApiV1BusinessesBusinessIdCustomers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { customer: {\n  name: 'John Smith',\n  email: 'jsmith@gigwage.com',\n  phone_number: '555333222',\n  address1: '300 Post St',\n  state: 'CA',\n  zip: '94108',\n  city: 'San Francisco',\n  authorization: 'base64string',\n  account_number: '555111222',\n  routing_number: '992992929',\n  account_type: 'savings'\n} }.to_json\nresponse = HTTParty.post(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/customers',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"customer": {\n  "name": \'John Smith\',\n  "email": \'jsmith@gigwage.com\',\n  "phone_number": \'555333222\',\n  "address1": \'300 Post St\',\n  "state": \'CA\',\n  "zip": \'94108\',\n  "city": \'San Francisco\',\n  "authorization": \'base64string\',\n  "account_number": \'555111222\',\n  "routing_number": \'992992929\',\n  "account_type": \'savings\'\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/customers", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List customers',
        description: 'List customers.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List customers.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/CustomerEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Customers'],
        operationId: 'getApiV1BusinessesBusinessIdCustomers',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/customers?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/customers?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/customers/{id}': {
      patch: {
        summary: 'Update a customer',
        description: 'Updates an existing customer',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/patchApiV1BusinessesBusinessIdCustomers',
              },
            },
          },
          required: true,
        },
        responses: {
          '200': {
            description: 'Updates an existing customer',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Customers'],
        operationId: 'patchApiV1BusinessesBusinessIdCustomersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nbody = { customer: {\n  name: 'John Smith',\n  email: 'jsmith@gigwage.com',\n  phone_number: '555333222',\n  address1: '300 Post St',\n  state: 'CA',\n  zip: '94108',\n  city: 'San Francisco',\n  authorization: 'base64string',\n  account_number: '555111222',\n  routing_number: '992992929',\n  account_type: 'savings'\n} }.to_json\nresponse = HTTParty.patch(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/customer/1',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"customer": {\n  "name": \'John Smith\',\n  "email": \'jsmith@gigwage.com\',\n  "phone_number": \'555333222\',\n  "address1": \'300 Post St\',\n  "state": \'CA\',\n  "zip": \'94108\',\n  "city": \'San Francisco\',\n  "authorization": \'base64string\',\n  "account_number": \'555111222\',\n  "routing_number": \'992992929\',\n  "account_type": \'savings\'\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/customers/1", {\n  "method": "PATCH",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      delete: {
        summary: 'Delete a customer',
        description:
          'Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '204': {
            description:
              'Delete customer record. Note: You can only destroy customer that not associated with any Accounts Receivable Payments',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'Customers'],
        operationId: 'deleteApiV1BusinessesBusinessIdCustomersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.delete(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/customers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/customers/1", {\n  "method": "DELETE",\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'Return a customer',
        description: 'Returns the details for a given customer.',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details for a given customer.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CustomerEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'Customers'],
        operationId: 'getApiV1BusinessesBusinessIdCustomersId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/customers/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/customers/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/ar_payments': {
      post: {
        summary: 'Create Accounts Receivable Payment',
        description: 'Creates a new Accounts Receivable Payment.',
        parameters: [
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/postApiV1BusinessesBusinessIdArPayments',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'Creates a new Accounts Receivable Payment.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArPaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '422': {
            description: 'Validation Errors',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RecordError',
                },
              },
            },
          },
        },
        tags: ['Partnerships', 'AccountsReceivablePayments'],
        operationId: 'postApiV1BusinessesBusinessIdArPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: 'require \'httparty\'\nbody = { ar_payment: {\n  customer_id: "111",\n  amount: "777.25",\n  reason: "any reason for this Accounts Receivable payment made",\n  nonce: "1234"\n} }.to_json\nresponse = HTTParty.post(\n  \'https://sandbox.gigwage.com/api/v1/businesses/230/contractors\',\n  headers: headers_hash,\n  body: body\n)\nputs response.body\n',
            },
            {
              language: 'javascript',
              code: 'let body = JSON.stringify({"ar_payment": {\n  "customer_id": "111",\n  "amount": "777.25",\n  "reason": "any reason for this Accounts Receivable payment made",\n  "nonce": "1234"\n}});\nfetch("https://sandbox.gigwage.com/api/v1/businesses/230/ar_payments", {\n  "method": "POST",\n  "headers": headers,\n  "body": body\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
      get: {
        summary: 'List Accounts Receivable payments',
        description: 'List Accounts Receivable payments.',
        parameters: [
          {
            in: 'query',
            name: 'page',
            description: 'Page offset to fetch.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 1,
            },
          },
          {
            in: 'query',
            name: 'per_page',
            description: 'Number of results to return per page.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 200,
            },
          },
          {
            in: 'query',
            name: 'offset',
            description: 'Pad a number of results.',
            required: false,
            schema: {
              type: 'integer',
              format: 'int32',
              default: 0,
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'List Accounts Receivable payments.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/ArPaymentEntity',
                  },
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
        },
        tags: ['Partnerships', 'AccountsReceivablePayments'],
        operationId: 'getApiV1BusinessesBusinessIdArPayments',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/ar_payments?per_page=10&page=1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/ar_payments?per_page=10&page=1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
    '/api/v1/businesses/{business_id}/ar_payments/{id}': {
      get: {
        summary: 'Return an Accounts Receivable Payment',
        description: 'Returns the details for Accounts Receivable Payment',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          {
            in: 'path',
            name: 'business_id',
            required: true,
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Returns the details for Accounts Receivable Payment',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ArPaymentEntity',
                },
              },
            },
          },
          '400': {
            description: 'Bad Request',
          },
          '404': {
            description: 'Not Found',
          },
        },
        tags: ['Partnerships', 'AccountsReceivablePayments'],
        operationId: 'getApiV1BusinessesBusinessIdArPaymentsId',
        'x-readme': {
          'samples-languages': ['ruby', 'javascript'],
          'explorer-enabled': false,
          'code-samples': [
            {
              language: 'ruby',
              code: "require 'httparty'\nresponse = HTTParty.get(\n  'https://sandbox.gigwage.com/api/v1/businesses/230/ar_payments/1',\n  headers: headers_hash\n)\nputs response.body\n",
            },
            {
              language: 'javascript',
              code: 'fetch("https://sandbox.gigwage.com/api/v1/businesses/230/ar_payments/1", {\n  "headers": headers\n}).then((response) => {\n  console.log(response.body)\n})\n',
            },
          ],
        },
      },
    },
  },
  servers: [
    {
      url: '//sandbox.gigwage.com',
    },
  ],
  components: {
    securitySchemes: {
      api_key: {
        type: 'apiKey',
        name: 'X-Gw-Api-Key',
        in: 'header',
      },
      api_secret: {
        type: 'apiKey',
        name: 'X-Gw-Api-Secret',
        in: 'header',
      },
      timestamp: {
        type: 'apiKey',
        name: 'X-Gw-Timestamp',
        in: 'header',
      },
      signature: {
        type: 'apiKey',
        name: 'X-Gw-Signature',
        in: 'header',
      },
    },
    schemas: {
      BusinessRelationshipEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The contractor's unique identifier",
          },
          email: {
            type: 'string',
            example: 'contractor@example.com',
            description: "The contractor's email address",
          },
          first_name: {
            type: 'string',
            example: 'John',
            description: "The contractor's first name",
          },
          last_name: {
            type: 'string',
            example: 'Smith',
            description: "The contractor's last name",
          },
          external_id: {
            type: 'string',
            example: 'abc123',
            description:
              'Optional customer-supplied unique identifier for this contractor',
          },
          has_ach: {
            type: 'boolean',
            example: true,
            description:
              'The contractor has connected an ACH account for receiving payments',
          },
          has_debit: {
            type: 'boolean',
            example: true,
            description:
              'The contractor has a debit card for receiving payments',
          },
          invited_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.561Z',
            description:
              'When the contractor was sent an invitation to onboard',
          },
          invitation_accepted_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.561Z',
            description: 'When the contractor accepted the invitation',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.561Z',
            description: 'When the contractor record was created',
          },
          phone_number: {
            type: 'string',
            example: '222-333-4444',
            description: "The contractor's phone number",
          },
          birthdate: {
            type: 'string',
            format: 'date',
            example: '12/31/2021',
            description: "The contractor's birthdate",
          },
          address1: {
            type: 'string',
            example: '123 Main st',
            description: "The contractor's 1st address line",
          },
          address2: {
            type: 'string',
            example: 'Suite 100',
            description: "The contractor's 2nd address line",
          },
          city: {
            type: 'string',
            example: 'New York',
            description: "The contractor's city",
          },
          state: {
            type: 'string',
            example: 'NY',
            description: "The contractor's state",
          },
          zip: {
            type: 'string',
            example: '10010',
            description: "The contractor's zip code",
          },
          social_security: {
            type: 'string',
            example: '222-33-4444',
            description: "The contractor's social security number",
          },
          errors: {
            type: 'array',
            items: {
              type: 'string',
              example: 'state is missing',
            },
            description: 'Error messages generated by system',
          },
        },
        description: 'BusinessRelationshipEntity model',
      },
      postApiV1Contractors: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              first_name: {
                type: 'string',
                description: "Contractor's first name",
              },
              last_name: {
                type: 'string',
                description: "Contractor's last name",
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
              send_invite: {
                type: 'boolean',
                description: 'Send email invitation when set to TRUE',
                default: false,
              },
            },
            required: ['email', 'first_name', 'last_name'],
          },
        },
        required: ['contractor'],
        description: 'Creates a new contractor.',
      },
      RecordError: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Required field is missing',
            description: 'Summary error messages',
          },
          messages: {
            type: 'array',
            items: {
              type: 'string',
              example: ['First name is missing', 'Last name is missing'],
            },
            description: 'Detail per error',
          },
        },
        description: 'RecordError model',
      },
      ContractorInvitationEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The contractor's unique identifier",
          },
          email: {
            type: 'string',
            example: 'contractor@example.com',
            description: "The contractor's email address",
          },
          first_name: {
            type: 'string',
            example: 'John',
            description: "The contractor's first name",
          },
          last_name: {
            type: 'string',
            example: 'Smith',
            description: "The contractor's last name",
          },
          token: {
            type: 'string',
            example: '1234567890',
            description: "The contractor's invitation token",
          },
          url: {
            type: 'string',
            example: 'https://gigwage.com/invite/1234567',
            description: "The contractor's invitation url",
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.722Z',
            description:
              'When the contractor was sent an invitation to onboard',
          },
        },
        description: 'ContractorInvitationEntity model',
      },
      patchApiV1Contractors: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-12345",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Required if address exists. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
            },
          },
        },
        required: ['contractor'],
        description:
          'Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed.',
      },
      Ten99Entity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 42,
            description: "The 1099's unique identifier",
          },
          contractor_id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: 'The ID of the contractor the 1099 was issued for',
          },
          year: {
            type: 'integer',
            format: 'int32',
            example: 2020,
            description: 'The tax year covered by this 1099',
          },
          status: {
            type: 'string',
            example: 'submitted',
            description: 'The status of the 1099',
          },
          type: {
            type: 'string',
            example: 'Ten99Nec',
            description: 'The 1099 subtype',
          },
          validation_errors: {
            type: 'array',
            example: 'First name is missing',
            description: 'Validation errors',
            items: {},
          },
          account_number: {
            type: 'string',
            example: 'abc123',
            description: 'Account Number',
          },
          corrected: {
            type: 'integer',
            format: 'int32',
            example: 234,
            description: 'Id of a 1099 corrected by this one',
          },
          correction: {
            type: 'integer',
            format: 'int32',
            example: 987,
            description: "Id of this 1099's correction, if it has one",
          },
          second_tin: {
            type: 'string',
          },
          box1: {
            type: 'string',
          },
          box2: {
            type: 'string',
          },
          box4: {
            type: 'string',
          },
          box5a: {
            type: 'string',
          },
          box5b: {
            type: 'string',
          },
          box6a: {
            type: 'string',
          },
          box6b: {
            type: 'string',
          },
          box7a: {
            type: 'string',
          },
          box7b: {
            type: 'string',
          },
          box1a: {
            type: 'string',
          },
          box1b: {
            type: 'string',
          },
          box3: {
            type: 'string',
          },
          box5c: {
            type: 'string',
          },
          box5d: {
            type: 'string',
          },
          box5e: {
            type: 'string',
          },
          box5f: {
            type: 'string',
          },
          box5g: {
            type: 'string',
          },
          box5h: {
            type: 'string',
          },
          box5i: {
            type: 'string',
          },
          box5j: {
            type: 'string',
          },
          box5k: {
            type: 'string',
          },
          box5l: {
            type: 'string',
          },
          box8a: {
            type: 'string',
          },
          box8b: {
            type: 'string',
          },
          box5: {
            type: 'string',
          },
          box6: {
            type: 'string',
          },
          box7: {
            type: 'string',
          },
          box8: {
            type: 'string',
          },
          box9: {
            type: 'string',
          },
          box10: {
            type: 'string',
          },
          box11: {
            type: 'string',
          },
          box12: {
            type: 'string',
          },
          box13: {
            type: 'string',
          },
          box14: {
            type: 'string',
          },
          box15a: {
            type: 'string',
          },
          box15b: {
            type: 'string',
          },
          box16aStateNo: {
            type: 'string',
          },
          box16aState: {
            type: 'string',
          },
          box16bStateNo: {
            type: 'string',
          },
          box16bState: {
            type: 'string',
          },
          box17a: {
            type: 'string',
          },
          box17b: {
            type: 'string',
          },
        },
        description: 'Ten99Entity model',
      },
      W9Entity: {
        type: 'object',
        properties: {
          first_name: {
            type: 'string',
            example: 'John',
            description: 'First name',
          },
          last_name: {
            type: 'string',
            example: 'Smith',
            description: 'Last name',
          },
          email: {
            type: 'string',
            example: 'entity@example.com',
            description: 'Email',
          },
          social_security: {
            type: 'string',
            example: '111-22-3333',
            description: 'Social security number.',
          },
          phone_number: {
            type: 'string',
            example: '222-333-4444',
            description: 'Phone number',
          },
          birthdate: {
            type: 'string',
            format: 'date',
            example: '12/31/1990',
            description: 'Birthdate',
          },
          address1: {
            type: 'string',
            example: '123 Main st',
            description: '1st address line',
          },
          address2: {
            type: 'string',
            example: 'Suite 100',
            description: '2nd address line',
          },
          city: {
            type: 'string',
            example: 'New York',
            description: 'City',
          },
          state: {
            type: 'string',
            example: 'NY',
            description: 'State',
          },
          zip: {
            type: 'string',
            example: '10010',
            description: 'Zip code',
          },
          tax_classification: {
            type: 'string',
            example: 'single_member_llc',
            description: 'Federal tax classification',
          },
          llc_classification: {
            type: 'string',
            example: 'C',
            description: 'Tax classification for LLC',
          },
          other_classification: {
            type: 'string',
            example: 'Sole Proprietor',
            description: 'Other Classification for LLC',
          },
          business_name: {
            type: 'string',
            example: 'Business Company Enterprises',
            description: 'Vendor business name',
          },
          ein: {
            type: 'string',
            example: '11-222222',
            description: "Vendor's EIN",
          },
          dba: {
            type: 'string',
            example: 'BCE',
            description: "Vendor's DBA",
          },
          exempt_payee_code: {
            type: 'integer',
            format: 'int32',
            example: 5,
            description: 'Exempt payee code',
          },
          fatca_reporting_exemption_code: {
            type: 'string',
            example: 'E',
            description: 'Exemption from FACTA reporting code',
          },
          tin_check_status: {
            type: 'string',
            example: 'pending',
            description: 'Results of instant TIN check',
          },
          tin_check_reason: {
            type: 'string',
            example: 'TIN and Name combination does not match IRS record',
            description: 'Reason for TIN check results if applicable',
          },
          vendor: {
            type: 'boolean',
            example: true,
            description: 'Vendor or regular contractor?',
          },
          paper_1099: {
            type: 'boolean',
            example: true,
            description: 'Contractor prefers to receive a paper 1099',
          },
        },
        description: 'W9Entity model',
      },
      patchApiV1ContractorsIdW9: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-1234",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              tax_classification: {
                type: 'string',
                description:
                  "Contractor's federal tax classification is required",
                enum: [
                  'single_member_llc',
                  'c_corporation',
                  's_corporation',
                  'partnership',
                  'trust_estate',
                  'limited_liability_company',
                  'other',
                ],
              },
              llc_classification: {
                type: 'string',
                description:
                  "Contractor's tax classification for LLC is required if federal tax classification is Limited Liability Company",
                enum: ['C', 'S', 'P'],
              },
              other_classification: {
                type: 'string',
                description:
                  'Other Classification for LLC is required if Federal Tax Classification is Other',
              },
              vendor: {
                type: 'boolean',
                description: 'True when contractor is vendor',
              },
              business_name: {
                type: 'string',
                description: 'Vendor business name. Required for vendors',
              },
              ein: {
                type: 'string',
                description:
                  "Vendor's EIN. Required for vendors. Example: 00-0000000",
              },
              dba: {
                type: 'string',
                description: "Vendor's DBA",
              },
              exempt_payee_code: {
                type: 'integer',
                format: 'int32',
                description: 'Exempt payee code',
                minimum: 1,
                maximum: 13,
              },
              fatca_reporting_exemption_code: {
                type: 'string',
                description: 'Exemption from FATCA reporting code',
              },
              paper_1099: {
                type: 'boolean',
                description: 'Paper or Digital 1099',
              },
              allow_tin_skip: {
                type: 'boolean',
                description:
                  "Allow skip TIN check when nine zeros are passed - '0000000000'",
                default: false,
              },
            },
          },
        },
        required: ['contractor'],
        description: 'Update W9 information for a contractor.',
      },
      postApiV1ContractorsIdW9: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-1234",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              tax_classification: {
                type: 'string',
                description:
                  "Contractor's federal tax classification is required",
                enum: [
                  'single_member_llc',
                  'c_corporation',
                  's_corporation',
                  'partnership',
                  'trust_estate',
                  'limited_liability_company',
                  'other',
                ],
              },
              llc_classification: {
                type: 'string',
                description:
                  "Contractor's tax classification for LLC is required if federal tax classification is Limited Liability Company",
                enum: ['C', 'S', 'P'],
              },
              other_classification: {
                type: 'string',
                description:
                  'Other Classification for LLC is required if Federal Tax Classification is Other',
              },
              business_name: {
                type: 'string',
                description: 'Vendor business name. Required for vendors',
              },
              ein: {
                type: 'string',
                description:
                  "Vendor's EIN. Required for vendors. Example: 00-0000000",
              },
              dba: {
                type: 'string',
                description: "Vendor's DBA",
              },
              exempt_payee_code: {
                type: 'integer',
                format: 'int32',
                description: 'Exempt payee code',
                minimum: 1,
                maximum: 13,
              },
              fatca_reporting_exemption_code: {
                type: 'string',
                description: 'Exemption from FATCA reporting code',
              },
              paper_1099: {
                type: 'boolean',
                description: 'Paper or Digital 1099',
              },
              allow_tin_skip: {
                type: 'boolean',
                description:
                  "Allow skip TIN check when nine zeros are passed - '0000000000'",
                default: false,
              },
            },
            required: [
              'address1',
              'city',
              'zip',
              'state',
              'tax_classification',
            ],
          },
        },
        required: ['contractor'],
        description:
          "Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint",
      },
      postApiV1ContractorsIdKyc: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-1234. Required for non-vendors",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              vendor: {
                type: 'boolean',
                description:
                  'Update contractor with KYC details and become a Vendor',
              },
              business_name: {
                type: 'string',
                description: 'Vendor business name. Required for vendors',
              },
              ein: {
                type: 'string',
                description:
                  "Vendor's EIN. Required for vendors. Example: 00-0000000",
              },
              business_formed_on: {
                type: 'string',
                description: "Vendor's formation date. Required for vendors",
              },
              industry: {
                type: 'string',
                description: "Vendor's Industry. Required for vendors",
              },
              entity: {
                type: 'string',
                description: "Vendor's Entity. Required for vendors",
              },
            },
            required: [
              'phone_number',
              'birthdate',
              'address1',
              'city',
              'zip',
              'state',
            ],
          },
        },
        required: ['contractor'],
        description:
          'Submit KYC (know your customer) information for a contractor',
      },
      postApiV1ContractorsContractorIdAccounts: {
        type: 'object',
        properties: {
          account: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                description: 'Bank account number',
              },
              routing_number: {
                type: 'string',
                description: 'Routing number',
              },
              name: {
                type: 'string',
                description: "Bank account's nickname",
              },
              account_type: {
                type: 'string',
                description: 'Account type. `checking` or `savings`',
              },
            },
            required: [
              'account_number',
              'routing_number',
              'name',
              'account_type',
            ],
          },
        },
        required: ['account'],
        description: 'Add a bank account to an existing contractor.',
      },
      AccountEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 42,
            description: "The account's unique identifier",
          },
          routing_number: {
            type: 'string',
            example: '10012345',
            description: 'Bank routing number',
          },
          name: {
            type: 'string',
            example: 'Personal checking',
            description: 'Account nickname',
          },
          account_type: {
            type: 'string',
            example: 'checking',
            description:
              'Checking or savings for bank accounts, card type for debit cards',
          },
          last4: {
            type: 'string',
            example: '1234',
            description: 'Last 4 digits of the account number',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.739Z',
            description: 'When the bank account record was created',
          },
          deactivated_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.739Z',
            description: 'When the bank account record was deactivated',
          },
        },
        description: 'AccountEntity model',
      },
      postApiV1ContractorsContractorIdCards: {
        type: 'object',
        properties: {
          card: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'A name for this account',
              },
              card_number: {
                type: 'string',
                description: 'Card number',
              },
              exp_date: {
                type: 'string',
                description: 'Expiration date (yyyymm)',
              },
            },
            required: ['name', 'card_number', 'exp_date'],
          },
        },
        required: ['card'],
        description: 'Add debit card to contractor',
      },
      postApiV1ContractorsContractorIdIdentityDocument: {
        type: 'object',
        properties: {
          identity_document: {
            type: 'object',
            properties: {
              subtype: {
                type: 'string',
                description:
                  'The document type. Can be passport or driver_license',
                enum: ['driver_license', 'passport'],
              },
              front: {
                type: 'string',
                description: 'The front page of document file (Image or PDF)',
              },
              back: {
                type: 'string',
                description: 'The back page of document file (Image or PDF)',
              },
            },
            required: ['subtype', 'front', 'back'],
          },
        },
        required: ['identity_document'],
        description: 'Upload identity document',
      },
      postApiV1Payments: {
        type: 'object',
        properties: {
          payment: {
            type: 'object',
            properties: {
              contractor_id: {
                type: 'integer',
                format: 'int32',
              },
              external_id: {
                type: 'string',
              },
              interchange: {
                type: 'string',
                enum: [true, false, 'true', 'false', null],
                default: null,
              },
              debit_card: {
                type: 'string',
                enum: [true, false, 'true', 'false', null],
                default: null,
              },
              line_items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    amount: {
                      type: 'number',
                      format: 'float',
                    },
                    job_id: {
                      type: 'string',
                    },
                    external_id: {
                      type: 'string',
                    },
                    reason: {
                      type: 'string',
                    },
                    reimbursement: {
                      type: 'boolean',
                      default: false,
                    },
                    metadata: {
                      type: 'object',
                    },
                  },
                  required: ['amount'],
                },
              },
              metadata: {
                type: 'object',
              },
              nonce: {
                type: 'string',
              },
            },
            required: ['contractor_id', 'line_items', 'nonce'],
          },
        },
        required: ['payment'],
        description:
          'Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours.',
      },
      PaymentEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 424542,
            description: "The payments's unique identifier",
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 409.4,
            description: 'The total payment amount excluding fees',
          },
          line_items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/LineItemEntity',
            },
          },
          contractor_id: {
            type: 'integer',
            format: 'int32',
            example: 21488,
          },
          contractor: {
            $ref: '#/components/schemas/ContractorEntity',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2022-12-04T00:04:07.726Z',
            description: 'When the payment was created',
          },
          completed_at: {
            type: 'string',
            format: 'date-time',
            example: '2022-12-07T00:04:07.726Z',
            description:
              'When the payment was completed, if applicable. This is an estimation provided by the receiving bank.',
          },
          status: {
            type: 'string',
            example: 'pending',
            description: 'The current status of the payment',
          },
          external_id: {
            type: 'string',
            example: 'abc123',
            description:
              'Optional customer-supplied unique identifier for this payment',
          },
          metadata: {
            type: 'string',
            example: '{"contact_phone_number": "222-333-4444"}',
            description: 'Payment metadata JSON',
          },
          sender_fee: {
            type: 'number',
            format: 'float',
            example: 0.49,
            description: 'The total fee charged to sender',
          },
          recipient_fee: {
            type: 'number',
            format: 'float',
            example: 0.5,
            description: 'The total fee charged to recipient',
          },
          net_deposit_amount: {
            type: 'number',
            format: 'float',
            example: 408.9,
            description: 'The amount deposited, after fees',
          },
        },
        description: 'PaymentEntity model',
      },
      LineItemEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The line_item's unique identifier",
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 10.99,
            description: 'The amount of the line item in dollars',
          },
          reason: {
            type: 'string',
            example: 'Payment for 10/30/21',
            description: 'The user-supplied note for this line item',
          },
          reimbursement: {
            type: 'boolean',
            example: false,
            description:
              "Whether this line item represents a reimbursement for a contractor's expense",
          },
          job_id: {
            type: 'string',
            example: 'abc123',
            description: 'Optional customer-supplied association with a job',
          },
          external_id: {
            type: 'string',
            example: 'def456',
            description:
              'Optional customer-supplied unique identifier for this line item',
          },
          metadata: {
            type: 'string',
            example: '{"YTD payments": 100}',
            description: 'Line item metadata',
          },
        },
        description: 'LineItemEntity model',
      },
      ContractorEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The contractor's unique identifier",
          },
          email: {
            type: 'string',
            example: 'contractor@example.com',
            description: "The contractor's email address",
          },
          first_name: {
            type: 'string',
            example: 'John',
            description: "The contractor's first name",
          },
          last_name: {
            type: 'string',
            example: 'Smith',
            description: "The contractor's last name",
          },
          has_ach: {
            type: 'boolean',
            example: true,
            description:
              'The contractor has connected an ACH account for receiving payments',
          },
          has_debit: {
            type: 'boolean',
            example: true,
            description:
              'The contractor has a debit card for receiving payments',
          },
          invited_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.725Z',
            description:
              'When the contractor was sent an invitation to onboard',
          },
          invitation_accepted_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.725Z',
            description: 'When the contractor accepted the invitation',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.726Z',
            description: 'When the contractor record was created',
          },
          phone_number: {
            type: 'string',
            example: '222-333-4444',
            description: "The contractor's phone number",
          },
          birthdate: {
            type: 'string',
            format: 'date',
            example: '12/31/2021',
            description: "The contractor's birthdate",
          },
          address1: {
            type: 'string',
            example: '123 Main st',
            description: "The contractor's 1st address line",
          },
          address2: {
            type: 'string',
            example: 'Suite 100',
            description: "The contractor's 2nd address line",
          },
          city: {
            type: 'string',
            example: 'New York',
            description: "The contractor's city",
          },
          state: {
            type: 'string',
            example: 'NY',
            description: "The contractor's state",
          },
          zip: {
            type: 'string',
            example: '10010',
            description: "The contractor's zip code",
          },
          social_security: {
            type: 'string',
            example: '222-33-4444',
            description: "The contractor's social security number",
          },
        },
      },
      putApiV1Payments: {
        type: 'object',
        properties: {
          payment: {
            type: 'object',
            properties: {
              metadata: {
                type: 'object',
              },
            },
          },
        },
        required: ['payment'],
        description: "Update a payment's metadata.",
      },
      putApiV1LineItems: {
        type: 'object',
        properties: {
          line_item: {
            type: 'object',
            properties: {
              metadata: {
                type: 'object',
              },
            },
          },
        },
        required: ['line_item'],
        description: "Update a line item's metadata.",
      },
      TransferTransactionEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 42,
            description: "The transfer's unique identifier",
          },
          direction: {
            type: 'string',
            example: 'fund',
            description: 'Fund or Withdraw',
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 10.99,
            description: 'The amount of the transfer',
          },
          status: {
            type: 'string',
            example: 'SETTLED',
            description: 'The current status of the transfer',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.910Z',
            description: 'When the transfer was created',
          },
        },
        description: 'TransferTransactionEntity model',
      },
      postApiV1Transfers: {
        type: 'object',
        properties: {
          transfer: {
            type: 'object',
            properties: {
              amount: {
                type: 'number',
                format: 'double',
              },
              direction: {
                type: 'string',
                enum: ['fund', 'withdraw'],
              },
              nonce: {
                type: 'string',
              },
            },
            required: ['amount', 'direction', 'nonce'],
          },
        },
        required: ['transfer'],
        description: 'Create a transfer transaction.',
      },
      postApiV1ApiKeys: {
        type: 'object',
        properties: {
          api_key: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'API Key name',
              },
              test_key: {
                type: 'boolean',
                description:
                  'Create a key for simplified sandbox authentication',
              },
            },
          },
        },
        required: ['api_key'],
        description:
          "Create a new API key. Note: This is the only time you'll get the secret.",
      },
      ApiKeyEntity: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Production',
            description: 'Name',
          },
          key: {
            type: 'string',
            example: 'abcdef1234',
            description: 'Key',
          },
          secret: {
            type: 'string',
            example: 'abcdef1234',
            description: 'Secret',
          },
          revoked_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.988Z',
            description: 'When the api key was revoked',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:07.988Z',
            description: 'When the api key was created',
          },
        },
        description: 'ApiKeyEntity model',
      },
      postApiV1Subscriptions: {
        type: 'object',
        properties: {
          subscription: {
            type: 'object',
            properties: {
              webhook_type: {
                type: 'string',
                description:
                  'Webhook type, can be payment, tin_check, partner_sign_up, 1099',
              },
              url: {
                type: 'string',
                description: 'URL that the webhook will be sent to',
              },
            },
            required: ['webhook_type', 'url'],
          },
        },
        required: ['subscription'],
        description:
          'Subscribe to webhooks of the chosen type. Please note that multiple consecutive failures to deliver webhooks will deactivate this subscription, and it will need to be reactivated. See PUT below.',
      },
      WebhookSubscriptionEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The subscription's unique identifier",
          },
          webhook_type: {
            type: 'string',
            example: 'emitted',
            description: 'Webhook type',
          },
          url: {
            type: 'string',
            example: 'https://example.org/hook',
            description: 'URL to deliver webhooks to',
          },
          deactivated_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:08.062Z',
            description: 'When the subscription was deactivated',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:08.062Z',
            description: 'When the subscription was created',
          },
        },
        description: 'WebhookSubscriptionEntity model',
      },
      patchApiV1Subscriptions: {
        type: 'object',
        properties: {
          subscription: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL that the webhook will be sent to',
              },
            },
            required: ['url'],
          },
        },
        required: ['subscription'],
        description: 'Change the URL where webhooks are sent.',
      },
      postApiV1Batches: {
        type: 'object',
        properties: {
          batch: {
            type: 'object',
            properties: {
              nonce: {
                type: 'string',
              },
              notes: {
                type: 'string',
              },
              payments: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    contractor_id: {
                      type: 'integer',
                      format: 'int32',
                    },
                    external_id: {
                      type: 'string',
                    },
                    interchange: {
                      type: 'string',
                      enum: [true, false, 'true', 'false', null],
                      default: null,
                    },
                    debit_card: {
                      type: 'string',
                      enum: [true, false, 'true', 'false', null],
                      default: null,
                    },
                    line_items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          amount: {
                            type: 'number',
                            format: 'float',
                          },
                          job_id: {
                            type: 'string',
                          },
                          external_id: {
                            type: 'string',
                          },
                          reason: {
                            type: 'string',
                          },
                          reimbursement: {
                            type: 'boolean',
                            default: false,
                          },
                          metadata: {
                            type: 'object',
                          },
                        },
                        required: ['amount'],
                      },
                    },
                    metadata: {
                      type: 'object',
                    },
                  },
                  required: ['contractor_id', 'line_items'],
                },
              },
            },
            required: ['nonce', 'payments'],
          },
        },
        required: ['batch'],
        description: 'Creates a new batch of payments.',
      },
      BatchEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The batch's unique identifier",
          },
          payments: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/PaymentEntity',
            },
          },
          payments_count: {
            type: 'integer',
            format: 'int32',
            example: 21,
            description: 'Total payments in batch',
          },
          notes: {
            type: 'string',
            example: 'This is my note',
            description: 'Notes of batch',
          },
          created_at: {
            type: 'string',
            example: '2023-01-04T00:04:08.076Z',
            description: 'Date when batch was created',
          },
        },
        description: 'BatchEntity model',
      },
      SubaccountEntity: {
        type: 'object',
        properties: {
          current_balance: {
            type: 'number',
            format: 'double',
            example: 100,
            description: 'The subaccount current balance',
          },
          available_balance: {
            type: 'number',
            format: 'double',
            example: 85,
            description: 'The subaccount available balance',
          },
        },
        description: 'SubaccountEntity model',
      },
      postApiV11099s: {
        type: 'object',
        properties: {
          '1099': {
            type: 'object',
            properties: {
              contractor_id: {
                type: 'integer',
                format: 'int32',
              },
              type: {
                type: 'string',
                enum: ['K', 'NEC', 'MISC'],
              },
              box1: {
                type: 'string',
                description: 'Box 1 (decimal) - Type NEC only',
              },
              box1a: {
                type: 'string',
                description: 'Box 1a (decimal) - Type K only',
              },
              box1b: {
                type: 'string',
                description: 'Box 1b (decimal) - Type K only',
              },
              box2: {
                type: 'boolean',
                description: 'Box 2 (boolean for NEC, string for K)',
              },
              box3: {
                type: 'string',
                description: 'Box 3 (decimal) - Type K only',
              },
              box4: {
                type: 'string',
                description: 'Box 4 (decimal)',
              },
              box5a: {
                type: 'string',
                description: 'Box 5a (decimal)',
              },
              box5b: {
                type: 'string',
                description: 'Box 5b (decimal)',
              },
              box5c: {
                type: 'string',
                description: 'Box 5c (decimal) - Type K only',
              },
              box5d: {
                type: 'string',
                description: 'Box 5d (decimal) - Type K only',
              },
              box5e: {
                type: 'string',
                description: 'Box 5e (decimal) - Type K only',
              },
              box5f: {
                type: 'string',
                description: 'Box 5f (decimal) - Type K only',
              },
              box5g: {
                type: 'string',
                description: 'Box 5g (decimal) - Type K only',
              },
              box5h: {
                type: 'string',
                description: 'Box 5h (decimal) - Type K only',
              },
              box5i: {
                type: 'string',
                description: 'Box 5i (decimal) - Type K only',
              },
              box5j: {
                type: 'string',
                description: 'Box 5j (decimal) - Type K only',
              },
              box5k: {
                type: 'string',
                description: 'Box 5k (decimal) - Type K only',
              },
              box5l: {
                type: 'string',
                description: 'Box 5l (decimal) - Type K only',
              },
              box6a: {
                type: 'string',
                description: 'Box 6a (string)',
              },
              box6b: {
                type: 'string',
                description: 'Box 6b (string)',
              },
              box7a: {
                type: 'string',
                description: 'Box 7a (decimal) - Type NEC only',
              },
              box7b: {
                type: 'string',
                description: 'Box 7b (decimal) - Type NEC only',
              },
              box8a: {
                type: 'string',
                description: 'Box 8a (decimal) - Type K only',
              },
              box8b: {
                type: 'string',
                description: 'Box 8b (decimal) - Type K only',
              },
            },
            required: ['contractor_id', 'type'],
          },
        },
        required: ['1099'],
        description: 'Create a 1099 for a contractor.',
      },
      patchApiV11099s: {
        type: 'object',
        properties: {
          '1099': {
            type: 'object',
            properties: {
              contractor_id: {
                type: 'integer',
                format: 'int32',
              },
              type: {
                type: 'string',
                enum: ['K', 'NEC'],
              },
              box1a: {
                type: 'string',
                description: 'Box 1a (decimal) - Type K only',
              },
              box1b: {
                type: 'string',
                description: 'Box 1b (decimal) - Type K only',
              },
              box2: {
                type: 'boolean',
                description: 'Box 2 (boolean) - Type NEC only',
              },
              box3: {
                type: 'string',
                description: 'Box 3 (decimal) - Type K only',
              },
              box4: {
                type: 'string',
                description: 'Box 4 (decimal)',
              },
              box5a: {
                type: 'string',
                description: 'Box 5a (decimal)',
              },
              box5b: {
                type: 'string',
                description: 'Box 5b (decimal)',
              },
              box5c: {
                type: 'string',
                description: 'Box 5c (decimal) - Type K only',
              },
              box5d: {
                type: 'string',
                description: 'Box 5d (decimal) - Type K only',
              },
              box5e: {
                type: 'string',
                description: 'Box 5e (decimal) - Type K only',
              },
              box5f: {
                type: 'string',
                description: 'Box 5f (decimal) - Type K only',
              },
              box5g: {
                type: 'string',
                description: 'Box 5g (decimal) - Type K only',
              },
              box5h: {
                type: 'string',
                description: 'Box 5h (decimal) - Type K only',
              },
              box5i: {
                type: 'string',
                description: 'Box 5i (decimal) - Type K only',
              },
              box5j: {
                type: 'string',
                description: 'Box 5j (decimal) - Type K only',
              },
              box5k: {
                type: 'string',
                description: 'Box 5k (decimal) - Type K only',
              },
              box5l: {
                type: 'string',
                description: 'Box 5l (decimal) - Type K only',
              },
              box6a: {
                type: 'string',
                description: 'Box 6a (string)',
              },
              box6b: {
                type: 'string',
                description: 'Box 6b (string)',
              },
              box7a: {
                type: 'string',
                description: 'Box 7a (decimal) - Type NEC only',
              },
              box7b: {
                type: 'string',
                description: 'Box 7b (decimal) - Type NEC only',
              },
              box8a: {
                type: 'string',
                description: 'Box 8a (decimal) - Type K only',
              },
              box8b: {
                type: 'string',
                description: 'Box 8b (decimal) - Type K only',
              },
            },
            required: ['contractor_id', 'type'],
          },
        },
        required: ['1099'],
        description: 'Update a 1099',
      },
      WebhookEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The webhook's unique identifier",
          },
          object_id: {
            type: 'integer',
            format: 'int32',
            example: 234,
            description: "The object's unique identifier",
          },
          object_type: {
            type: 'string',
            example: 'ACH-US',
            description: "The object's type",
          },
          payload: {
            type: 'string',
            example: '{"some_data": "some_value"}',
            description: 'Data / payload sent to the subscription URL',
          },
          url: {
            type: 'string',
            example: 'https://example.org/webhook',
            description: 'URL the webhook was sent to',
          },
          sent_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:08.119Z',
            description: 'When the webhook was sent',
          },
        },
        description: 'WebhookEntity model',
      },
      LedgerEntity: {
        type: 'object',
        properties: {
          current_balance: {
            type: 'number',
            format: 'float',
            example: 132125.2,
            description: 'Current balance',
          },
          available_balance: {
            type: 'number',
            format: 'float',
            example: 124510.99,
            description: 'Available balance',
          },
          transactions: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/TransactionEntity',
            },
          },
        },
        description: 'LedgerEntity model',
      },
      TransactionEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 42,
            description: "The transaction's unique identifier",
          },
          incoming: {
            type: 'number',
            format: 'float',
            example: 9912.23,
            description: 'The amount of incoming transaction',
          },
          outgoing: {
            type: 'number',
            format: 'float',
            example: 12315.25,
            description: 'The amount of outgoing transaction',
          },
          status: {
            type: 'string',
            example: 'Settled',
            description: 'The current status of the transaction',
          },
          description: {
            type: 'string',
            example: 'Payment to Contractor One',
            description: 'Description of transaction',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:08.128Z',
            description: 'When the transaction was created',
          },
        },
      },
      postApiV1Customers: {
        type: 'object',
        properties: {
          customer: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Customer email address',
              },
              name: {
                type: 'string',
                description: "Customer's full name",
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
              phone_number: {
                type: 'string',
                description:
                  "Customer's phone number. Example: 123-123-1234 or 1231231234",
              },
              account_number: {
                type: 'string',
                description: "Customer's account number. Example: 1231231234",
              },
              routing_number: {
                type: 'string',
                description: "Customer's bank routing number. Example: 9923123",
              },
              account_type: {
                type: 'string',
                description: 'The account type. Can be checking or savings',
                enum: ['checking', 'savings'],
              },
              authorization: {
                type: 'string',
                description: 'The authorization document file (Image or PDF)',
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
            },
            required: [
              'email',
              'name',
              'phone_number',
              'account_number',
              'routing_number',
              'account_type',
              'authorization',
              'address1',
              'city',
              'zip',
              'state',
            ],
          },
        },
        required: ['customer'],
        description: 'Creates a new customer.',
      },
      CustomerEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 123,
            description: "The customer's unique identifier",
          },
          email: {
            type: 'string',
            example: 'customer@example.com',
            description: "The customer's email address",
          },
          name: {
            type: 'string',
            example: 'John',
            description: "The customer's full name",
          },
          external_id: {
            type: 'string',
            example: 'abc123',
            description:
              'Optional customer-supplied unique identifier for this customer',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2023-01-04T00:04:08.135Z',
            description: 'When the customer record was created',
          },
          phone_number: {
            type: 'string',
            example: '222-333-4444',
            description: "The customer's phone number",
          },
          deleted_at: {
            type: 'string',
            example: '2023-01-04T00:04:08.135Z',
            description: 'When the customer record was deleted',
          },
          address1: {
            type: 'string',
            example: '123 Main st',
            description: "The customer's 1st address line",
          },
          address2: {
            type: 'string',
            example: 'Suite 100',
            description: "The customer's 2nd address line",
          },
          city: {
            type: 'string',
            example: 'New York',
            description: "The customer's city",
          },
          state: {
            type: 'string',
            example: 'NY',
            description: "The customer's state",
          },
          zip: {
            type: 'string',
            example: '10010',
            description: "The customer's zip code",
          },
        },
        description: 'CustomerEntity model',
      },
      patchApiV1Customers: {
        type: 'object',
        properties: {
          customer: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Customer email address',
              },
              name: {
                type: 'string',
                description: "Customer's full name",
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
              phone_number: {
                type: 'string',
                description:
                  "Customer's phone number. Example: 123-123-1234 or 1231231234",
              },
              account_number: {
                type: 'string',
                description: "Customer's account number. Example: 1231231234",
              },
              routing_number: {
                type: 'string',
                description: "Customer's bank routing number. Example: 9923123",
              },
              account_type: {
                type: 'string',
                description: 'The account type. Can be checking or savings',
                enum: ['checking', 'savings'],
              },
              authorization: {
                type: 'string',
                description: 'The authorization document file (Image or PDF)',
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
            },
          },
        },
        required: ['customer'],
        description: 'Updates an existing customer',
      },
      postApiV1ArPayments: {
        type: 'object',
        properties: {
          ar_payment: {
            type: 'object',
            properties: {
              customer_id: {
                type: 'integer',
                format: 'int32',
              },
              amount: {
                type: 'number',
                format: 'float',
              },
              reason: {
                type: 'string',
              },
              nonce: {
                type: 'string',
              },
            },
            required: ['customer_id', 'amount', 'nonce'],
          },
        },
        required: ['ar_payment'],
        description: 'Creates a new Accounts Receivable Payment.',
      },
      ArPaymentEntity: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            format: 'int32',
            example: 424542,
            description: "The Accounts Receivable payments's unique identifier",
          },
          amount: {
            type: 'number',
            format: 'float',
            example: 409.4,
            description:
              'The total Accounts Receivable payment amount excluding fees',
          },
          reason: {
            type: 'string',
            example: 'For service fee charge',
            description:
              'Reason or description for this Accounts Receivable Payment',
          },
          customer_id: {
            type: 'integer',
            format: 'int32',
            example: 21488,
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            example: '2022-12-04T00:04:08.144Z',
            description: 'When the Accounts Receivable payment was created',
          },
          completed_at: {
            type: 'string',
            format: 'date-time',
            example: '2022-12-07T00:04:08.144Z',
            description:
              'When the Accounts Receivable payment was completed, if applicable',
          },
          status: {
            type: 'string',
            example: 'pending',
            description: 'The current status of the payment',
          },
          external_id: {
            type: 'string',
            example: 'abc123',
            description:
              'Optional customer-supplied unique identifier for this payment',
          },
          customer: {
            $ref: '#/components/schemas/CustomerEntity',
          },
        },
        description: 'ArPaymentEntity model',
      },
      postApiV1BusinessesBusinessIdContractors: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              first_name: {
                type: 'string',
                description: "Contractor's first name",
              },
              last_name: {
                type: 'string',
                description: "Contractor's last name",
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
              send_invite: {
                type: 'boolean',
                description: 'Send email invitation when set to TRUE',
                default: false,
              },
            },
            required: ['email', 'first_name', 'last_name'],
          },
        },
        required: ['contractor'],
        description: 'Creates a new contractor.',
      },
      patchApiV1BusinessesBusinessIdContractors: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-12345",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Required if address exists. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
            },
          },
        },
        required: ['contractor'],
        description:
          'Updates an existing contractor. If the contractor has already registered, changes to the email address will not affect email delivery. Emails will be delivered to the address managed by the contractor. Any supported attributes not supplied in the request will not be changed.',
      },
      patchApiV1BusinessesBusinessIdContractorsIdW9: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-1234",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              tax_classification: {
                type: 'string',
                description:
                  "Contractor's federal tax classification is required",
                enum: [
                  'single_member_llc',
                  'c_corporation',
                  's_corporation',
                  'partnership',
                  'trust_estate',
                  'limited_liability_company',
                  'other',
                ],
              },
              llc_classification: {
                type: 'string',
                description:
                  "Contractor's tax classification for LLC is required if federal tax classification is Limited Liability Company",
                enum: ['C', 'S', 'P'],
              },
              other_classification: {
                type: 'string',
                description:
                  'Other Classification for LLC is required if Federal Tax Classification is Other',
              },
              vendor: {
                type: 'boolean',
                description: 'True when contractor is vendor',
              },
              business_name: {
                type: 'string',
                description: 'Vendor business name. Required for vendors',
              },
              ein: {
                type: 'string',
                description:
                  "Vendor's EIN. Required for vendors. Example: 00-0000000",
              },
              dba: {
                type: 'string',
                description: "Vendor's DBA",
              },
              exempt_payee_code: {
                type: 'integer',
                format: 'int32',
                description: 'Exempt payee code',
                minimum: 1,
                maximum: 13,
              },
              fatca_reporting_exemption_code: {
                type: 'string',
                description: 'Exemption from FATCA reporting code',
              },
              paper_1099: {
                type: 'boolean',
                description: 'Paper or Digital 1099',
              },
              allow_tin_skip: {
                type: 'boolean',
                description:
                  "Allow skip TIN check when nine zeros are passed - '0000000000'",
                default: false,
              },
            },
          },
        },
        required: ['contractor'],
        description: 'Update W9 information for a contractor.',
      },
      postApiV1BusinessesBusinessIdContractorsIdW9: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-1234",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              tax_classification: {
                type: 'string',
                description:
                  "Contractor's federal tax classification is required",
                enum: [
                  'single_member_llc',
                  'c_corporation',
                  's_corporation',
                  'partnership',
                  'trust_estate',
                  'limited_liability_company',
                  'other',
                ],
              },
              llc_classification: {
                type: 'string',
                description:
                  "Contractor's tax classification for LLC is required if federal tax classification is Limited Liability Company",
                enum: ['C', 'S', 'P'],
              },
              other_classification: {
                type: 'string',
                description:
                  'Other Classification for LLC is required if Federal Tax Classification is Other',
              },
              business_name: {
                type: 'string',
                description: 'Vendor business name. Required for vendors',
              },
              ein: {
                type: 'string',
                description:
                  "Vendor's EIN. Required for vendors. Example: 00-0000000",
              },
              dba: {
                type: 'string',
                description: "Vendor's DBA",
              },
              exempt_payee_code: {
                type: 'integer',
                format: 'int32',
                description: 'Exempt payee code',
                minimum: 1,
                maximum: 13,
              },
              fatca_reporting_exemption_code: {
                type: 'string',
                description: 'Exemption from FATCA reporting code',
              },
              paper_1099: {
                type: 'boolean',
                description: 'Paper or Digital 1099',
              },
              allow_tin_skip: {
                type: 'boolean',
                description:
                  "Allow skip TIN check when nine zeros are passed - '0000000000'",
                default: false,
              },
            },
            required: [
              'address1',
              'city',
              'zip',
              'state',
              'tax_classification',
            ],
          },
        },
        required: ['contractor'],
        description:
          "Submit W9 information for a contractor you only want to create a 1099 for. This will also trigger an instant TIN check for the contractor. This contractor won't be able to accept payments, if you need them to receive payments use the KYC endpoint",
      },
      postApiV1BusinessesBusinessIdContractorsIdKyc: {
        type: 'object',
        properties: {
          contractor: {
            type: 'object',
            properties: {
              first_name: {
                type: 'string',
              },
              last_name: {
                type: 'string',
              },
              email: {
                type: 'string',
                description: 'Contractor email address',
              },
              social_security: {
                type: 'string',
                description:
                  "Contractor's social security number. For example: 123-12-1234. Required for non-vendors",
              },
              phone_number: {
                type: 'string',
                description:
                  "Contractor's phone number. Example: 123-123-1234 or 1231231234",
              },
              birthdate: {
                type: 'string',
                format: 'date',
                description: "Contractor's birthdate. Format: YYYY-MM-DD",
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
              vendor: {
                type: 'boolean',
                description:
                  'Update contractor with KYC details and become a Vendor',
              },
              business_name: {
                type: 'string',
                description: 'Vendor business name. Required for vendors',
              },
              ein: {
                type: 'string',
                description:
                  "Vendor's EIN. Required for vendors. Example: 00-0000000",
              },
              business_formed_on: {
                type: 'string',
                description: "Vendor's formation date. Required for vendors",
              },
              industry: {
                type: 'string',
                description: "Vendor's Industry. Required for vendors",
              },
              entity: {
                type: 'string',
                description: "Vendor's Entity. Required for vendors",
              },
            },
            required: [
              'phone_number',
              'birthdate',
              'address1',
              'city',
              'zip',
              'state',
            ],
          },
        },
        required: ['contractor'],
        description:
          'Submit KYC (know your customer) information for a contractor',
      },
      postApiV1BusinessesBusinessIdContractorsContractorIdAccounts: {
        type: 'object',
        properties: {
          account: {
            type: 'object',
            properties: {
              account_number: {
                type: 'string',
                description: 'Bank account number',
              },
              routing_number: {
                type: 'string',
                description: 'Routing number',
              },
              name: {
                type: 'string',
                description: "Bank account's nickname",
              },
              account_type: {
                type: 'string',
                description: 'Account type. `checking` or `savings`',
              },
            },
            required: [
              'account_number',
              'routing_number',
              'name',
              'account_type',
            ],
          },
        },
        required: ['account'],
        description: 'Add a bank account to an existing contractor.',
      },
      postApiV1BusinessesBusinessIdContractorsContractorIdCards: {
        type: 'object',
        properties: {
          card: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'A name for this account',
              },
              card_number: {
                type: 'string',
                description: 'Card number',
              },
              exp_date: {
                type: 'string',
                description: 'Expiration date (yyyymm)',
              },
            },
            required: ['name', 'card_number', 'exp_date'],
          },
        },
        required: ['card'],
        description: 'Add debit card to contractor',
      },
      postApiV1BusinessesBusinessIdContractorsContractorIdIdentityDocument: {
        type: 'object',
        properties: {
          identity_document: {
            type: 'object',
            properties: {
              subtype: {
                type: 'string',
                description:
                  'The document type. Can be passport or driver_license',
                enum: ['driver_license', 'passport'],
              },
              front: {
                type: 'string',
                description: 'The front page of document file (Image or PDF)',
              },
              back: {
                type: 'string',
                description: 'The back page of document file (Image or PDF)',
              },
            },
            required: ['subtype', 'front', 'back'],
          },
        },
        required: ['identity_document'],
        description: 'Upload identity document',
      },
      postApiV1BusinessesBusinessIdPayments: {
        type: 'object',
        properties: {
          payment: {
            type: 'object',
            properties: {
              contractor_id: {
                type: 'integer',
                format: 'int32',
              },
              external_id: {
                type: 'string',
              },
              interchange: {
                type: 'string',
                enum: [true, false, 'true', 'false', null],
                default: null,
              },
              debit_card: {
                type: 'string',
                enum: [true, false, 'true', 'false', null],
                default: null,
              },
              line_items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    amount: {
                      type: 'number',
                      format: 'float',
                    },
                    job_id: {
                      type: 'string',
                    },
                    external_id: {
                      type: 'string',
                    },
                    reason: {
                      type: 'string',
                    },
                    reimbursement: {
                      type: 'boolean',
                      default: false,
                    },
                    metadata: {
                      type: 'object',
                    },
                  },
                  required: ['amount'],
                },
              },
              metadata: {
                type: 'object',
              },
              nonce: {
                type: 'string',
              },
            },
            required: ['contractor_id', 'line_items', 'nonce'],
          },
        },
        required: ['payment'],
        description:
          'Sends a new payment to a contractor. Note: Payments sent on the sandbox environment typically settle within 5-10 minutes regardless of their type but can sometimes take longer. Please contact support if it takes more than 4 hours.',
      },
      putApiV1BusinessesBusinessIdPayments: {
        type: 'object',
        properties: {
          payment: {
            type: 'object',
            properties: {
              metadata: {
                type: 'object',
              },
            },
          },
        },
        required: ['payment'],
        description: "Update a payment's metadata.",
      },
      putApiV1BusinessesBusinessIdLineItems: {
        type: 'object',
        properties: {
          line_item: {
            type: 'object',
            properties: {
              metadata: {
                type: 'object',
              },
            },
          },
        },
        required: ['line_item'],
        description: "Update a line item's metadata.",
      },
      postApiV1BusinessesBusinessIdTransfers: {
        type: 'object',
        properties: {
          transfer: {
            type: 'object',
            properties: {
              amount: {
                type: 'number',
                format: 'double',
              },
              direction: {
                type: 'string',
                enum: ['fund', 'withdraw'],
              },
              nonce: {
                type: 'string',
              },
            },
            required: ['amount', 'direction', 'nonce'],
          },
        },
        required: ['transfer'],
        description: 'Create a transfer transaction.',
      },
      postApiV1BusinessesBusinessIdBatches: {
        type: 'object',
        properties: {
          batch: {
            type: 'object',
            properties: {
              nonce: {
                type: 'string',
              },
              notes: {
                type: 'string',
              },
              payments: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    contractor_id: {
                      type: 'integer',
                      format: 'int32',
                    },
                    external_id: {
                      type: 'string',
                    },
                    interchange: {
                      type: 'string',
                      enum: [true, false, 'true', 'false', null],
                      default: null,
                    },
                    debit_card: {
                      type: 'string',
                      enum: [true, false, 'true', 'false', null],
                      default: null,
                    },
                    line_items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          amount: {
                            type: 'number',
                            format: 'float',
                          },
                          job_id: {
                            type: 'string',
                          },
                          external_id: {
                            type: 'string',
                          },
                          reason: {
                            type: 'string',
                          },
                          reimbursement: {
                            type: 'boolean',
                            default: false,
                          },
                          metadata: {
                            type: 'object',
                          },
                        },
                        required: ['amount'],
                      },
                    },
                    metadata: {
                      type: 'object',
                    },
                  },
                  required: ['contractor_id', 'line_items'],
                },
              },
            },
            required: ['nonce', 'payments'],
          },
        },
        required: ['batch'],
        description: 'Creates a new batch of payments.',
      },
      postApiV1BusinessesBusinessId1099s: {
        type: 'object',
        properties: {
          '1099': {
            type: 'object',
            properties: {
              contractor_id: {
                type: 'integer',
                format: 'int32',
              },
              type: {
                type: 'string',
                enum: ['K', 'NEC', 'MISC'],
              },
              box1: {
                type: 'string',
                description: 'Box 1 (decimal) - Type NEC only',
              },
              box1a: {
                type: 'string',
                description: 'Box 1a (decimal) - Type K only',
              },
              box1b: {
                type: 'string',
                description: 'Box 1b (decimal) - Type K only',
              },
              box2: {
                type: 'boolean',
                description: 'Box 2 (boolean for NEC, string for K)',
              },
              box3: {
                type: 'string',
                description: 'Box 3 (decimal) - Type K only',
              },
              box4: {
                type: 'string',
                description: 'Box 4 (decimal)',
              },
              box5a: {
                type: 'string',
                description: 'Box 5a (decimal)',
              },
              box5b: {
                type: 'string',
                description: 'Box 5b (decimal)',
              },
              box5c: {
                type: 'string',
                description: 'Box 5c (decimal) - Type K only',
              },
              box5d: {
                type: 'string',
                description: 'Box 5d (decimal) - Type K only',
              },
              box5e: {
                type: 'string',
                description: 'Box 5e (decimal) - Type K only',
              },
              box5f: {
                type: 'string',
                description: 'Box 5f (decimal) - Type K only',
              },
              box5g: {
                type: 'string',
                description: 'Box 5g (decimal) - Type K only',
              },
              box5h: {
                type: 'string',
                description: 'Box 5h (decimal) - Type K only',
              },
              box5i: {
                type: 'string',
                description: 'Box 5i (decimal) - Type K only',
              },
              box5j: {
                type: 'string',
                description: 'Box 5j (decimal) - Type K only',
              },
              box5k: {
                type: 'string',
                description: 'Box 5k (decimal) - Type K only',
              },
              box5l: {
                type: 'string',
                description: 'Box 5l (decimal) - Type K only',
              },
              box6a: {
                type: 'string',
                description: 'Box 6a (string)',
              },
              box6b: {
                type: 'string',
                description: 'Box 6b (string)',
              },
              box7a: {
                type: 'string',
                description: 'Box 7a (decimal) - Type NEC only',
              },
              box7b: {
                type: 'string',
                description: 'Box 7b (decimal) - Type NEC only',
              },
              box8a: {
                type: 'string',
                description: 'Box 8a (decimal) - Type K only',
              },
              box8b: {
                type: 'string',
                description: 'Box 8b (decimal) - Type K only',
              },
            },
            required: ['contractor_id', 'type'],
          },
        },
        required: ['1099'],
        description: 'Create a 1099 for a contractor.',
      },
      patchApiV1BusinessesBusinessId1099s: {
        type: 'object',
        properties: {
          '1099': {
            type: 'object',
            properties: {
              contractor_id: {
                type: 'integer',
                format: 'int32',
              },
              type: {
                type: 'string',
                enum: ['K', 'NEC'],
              },
              box1a: {
                type: 'string',
                description: 'Box 1a (decimal) - Type K only',
              },
              box1b: {
                type: 'string',
                description: 'Box 1b (decimal) - Type K only',
              },
              box2: {
                type: 'boolean',
                description: 'Box 2 (boolean) - Type NEC only',
              },
              box3: {
                type: 'string',
                description: 'Box 3 (decimal) - Type K only',
              },
              box4: {
                type: 'string',
                description: 'Box 4 (decimal)',
              },
              box5a: {
                type: 'string',
                description: 'Box 5a (decimal)',
              },
              box5b: {
                type: 'string',
                description: 'Box 5b (decimal)',
              },
              box5c: {
                type: 'string',
                description: 'Box 5c (decimal) - Type K only',
              },
              box5d: {
                type: 'string',
                description: 'Box 5d (decimal) - Type K only',
              },
              box5e: {
                type: 'string',
                description: 'Box 5e (decimal) - Type K only',
              },
              box5f: {
                type: 'string',
                description: 'Box 5f (decimal) - Type K only',
              },
              box5g: {
                type: 'string',
                description: 'Box 5g (decimal) - Type K only',
              },
              box5h: {
                type: 'string',
                description: 'Box 5h (decimal) - Type K only',
              },
              box5i: {
                type: 'string',
                description: 'Box 5i (decimal) - Type K only',
              },
              box5j: {
                type: 'string',
                description: 'Box 5j (decimal) - Type K only',
              },
              box5k: {
                type: 'string',
                description: 'Box 5k (decimal) - Type K only',
              },
              box5l: {
                type: 'string',
                description: 'Box 5l (decimal) - Type K only',
              },
              box6a: {
                type: 'string',
                description: 'Box 6a (string)',
              },
              box6b: {
                type: 'string',
                description: 'Box 6b (string)',
              },
              box7a: {
                type: 'string',
                description: 'Box 7a (decimal) - Type NEC only',
              },
              box7b: {
                type: 'string',
                description: 'Box 7b (decimal) - Type NEC only',
              },
              box8a: {
                type: 'string',
                description: 'Box 8a (decimal) - Type K only',
              },
              box8b: {
                type: 'string',
                description: 'Box 8b (decimal) - Type K only',
              },
            },
            required: ['contractor_id', 'type'],
          },
        },
        required: ['1099'],
        description: 'Update a 1099',
      },
      postApiV1BusinessesBusinessIdCustomers: {
        type: 'object',
        properties: {
          customer: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Customer email address',
              },
              name: {
                type: 'string',
                description: "Customer's full name",
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
              phone_number: {
                type: 'string',
                description:
                  "Customer's phone number. Example: 123-123-1234 or 1231231234",
              },
              account_number: {
                type: 'string',
                description: "Customer's account number. Example: 1231231234",
              },
              routing_number: {
                type: 'string',
                description: "Customer's bank routing number. Example: 9923123",
              },
              account_type: {
                type: 'string',
                description: 'The account type. Can be checking or savings',
                enum: ['checking', 'savings'],
              },
              authorization: {
                type: 'string',
                description: 'The authorization document file (Image or PDF)',
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
            },
            required: [
              'email',
              'name',
              'phone_number',
              'account_number',
              'routing_number',
              'account_type',
              'authorization',
              'address1',
              'city',
              'zip',
              'state',
            ],
          },
        },
        required: ['customer'],
        description: 'Creates a new customer.',
      },
      patchApiV1BusinessesBusinessIdCustomers: {
        type: 'object',
        properties: {
          customer: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Customer email address',
              },
              name: {
                type: 'string',
                description: "Customer's full name",
              },
              external_id: {
                type: 'string',
                description: 'Customer assigned ID',
              },
              phone_number: {
                type: 'string',
                description:
                  "Customer's phone number. Example: 123-123-1234 or 1231231234",
              },
              account_number: {
                type: 'string',
                description: "Customer's account number. Example: 1231231234",
              },
              routing_number: {
                type: 'string',
                description: "Customer's bank routing number. Example: 9923123",
              },
              account_type: {
                type: 'string',
                description: 'The account type. Can be checking or savings',
                enum: ['checking', 'savings'],
              },
              authorization: {
                type: 'string',
                description: 'The authorization document file (Image or PDF)',
              },
              address1: {
                type: 'string',
                description: 'Line address 1',
              },
              address2: {
                type: 'string',
                description: 'Line address 2',
              },
              city: {
                type: 'string',
                description: 'City',
              },
              zip: {
                type: 'string',
                description: 'Zip code',
              },
              state: {
                type: 'string',
                description: 'State, 2 characters US State Code (ISO 3166-2)',
              },
            },
          },
        },
        required: ['customer'],
        description: 'Updates an existing customer',
      },
      postApiV1BusinessesBusinessIdArPayments: {
        type: 'object',
        properties: {
          ar_payment: {
            type: 'object',
            properties: {
              customer_id: {
                type: 'integer',
                format: 'int32',
              },
              amount: {
                type: 'number',
                format: 'float',
              },
              reason: {
                type: 'string',
              },
              nonce: {
                type: 'string',
              },
            },
            required: ['customer_id', 'amount', 'nonce'],
          },
        },
        required: ['ar_payment'],
        description: 'Creates a new Accounts Receivable Payment.',
      },
    },
  },
  'x-readme': {
    'explorer-enabled': true,
    'proxy-enabled': true,
    'samples-enabled': true,
  },
  _id: '62462087c07128001ac29447',
};
