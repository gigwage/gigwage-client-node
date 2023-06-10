import { GigWageHttpClient } from '../http-client';

export type EndpointConstructor = (
  httpClient: GigWageHttpClient,
) => (...arg: any[]) => any;

/**
 * Used to convert imported endpoint constructors
 * to the final callable functions.
 */
export const registerEndpoints = <
  Input extends Record<string, EndpointConstructor>,
  Returns = {
    [Key in keyof Input]: ReturnType<Input[Key]>;
  },
>(
  input: Input,
  httpClient: GigWageHttpClient,
): Returns =>
  Object.keys(input).reduce(
    (prev, key) => ({
      ...prev,
      [key]: input[key](httpClient),
    }),
    {} as Returns,
  );
