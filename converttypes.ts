import fs from 'fs';
import path from 'path';

const textContent = fs.readFileSync(
  path.resolve(__dirname, './convertme.txt'),
  { encoding: 'utf-8' },
);

const split = textContent.split('\n\n');

const typeConversion: Record<string, string> = {
  string: 'string',
  boolean: 'boolean',
  'date-time': 'number',
  date: 'number',
  'array of strings': 'string[]',
  int32: 'number',
};

const extracted = split.map(item => {
  const isRequired = item.includes('required');

  const [name, apiType, description] = item
    .split('\n')
    .filter(item => item !== 'required');

  const finalApiType = typeConversion[apiType];

  if (!finalApiType)
    throw new Error(`Type ${apiType} not found ${JSON.stringify(item)}`);

  return {
    name,
    apiType: finalApiType,
    description,
    isRequired,
  };
});

const code = `
export type Name = {${extracted
  .map(
    item => `
  /** ${item.description} */
  ${item.name}${item.isRequired ? '' : '?'}: ${item.apiType};
`,
  )
  .join('')}}
`;
console.log(code);
// console.log(JSON.stringify(extracted, null, 4));
