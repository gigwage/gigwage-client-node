const { createGigwageClient } = require("@gigwage/client");


describe("node-js-cjs-test", () => {
  it('should import', async () => {
    
    const client = createGigwageClient({
      apiKey:  "key",
      apiSecret: "secret",
      apiEnvironment: "sandbox",
    });
    Object.keys(client).includes('get')
  });

});
