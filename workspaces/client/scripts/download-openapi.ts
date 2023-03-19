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
        accept: 'application/json',
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
