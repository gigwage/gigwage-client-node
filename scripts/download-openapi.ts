import { writeFileSync } from 'fs';
import path from 'path';

import axios from 'axios';
import type { OpenAPI3 } from 'openapi-typescript';

/** takes openapi object with tags/components etc. */

type SchemaResponseType = { oasDefinition: OpenAPI3 };

const downloadOpenApi = async () => {
  const {
    data: { oasDefinition },
  } = await axios.get<SchemaResponseType>(
    'https://developers.gigwage.com/reference/postapiv1contractors?json=on',
    {
      headers: {
        'x-requested-with': 'XMLHttpRequest',
        // accept: 'application/json',
        accept: '*/*',
        cookie:
          'ekfls=2d3c7bdb-a84a-4c1a-97af-7e88a897522f; __cf_bm=Z7nv6lfshwdTlO10MGUaQ4zTx57RiI6AWxm4PdPgNPc-1685070271-0-AetmurAwTT+bx16Peb2oz+RcjpR6yG5aKkWNQmSL+613dZHR1wAK2SbblWl0EBKCw43KojBiXISBlV+GfKkIGW3E0qAixFy7rEGLhY3eWwzW',
        referer:
          'https://developers.gigwage.com/reference/postapiv1contractors',
      },
    },
  );
  writeFileSync(
    path.resolve(__dirname, './openapi.json'),
    JSON.stringify(oasDefinition, null, 2),
  );
};

downloadOpenApi();
export default {};
