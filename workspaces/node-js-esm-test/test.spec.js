import { createGigwageClient } from "@gigwage/client";


describe("node-js-esm-test", () => {
  it('should import', async () => {
    
    const client = createGigwageClient({
      apiKey:  "key",
      apiSecret: "secret",
      apiEnvironment: "sandbox",
    });
    Object.keys(client).includes('get')
  });

});