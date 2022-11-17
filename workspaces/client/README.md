# @gigwage/client
Node client library for accessing the [Gig Wage API](https://developers.gigwage.com/#introduction).

## Installation

NPM
```bash
npm i @gigwage/client
```

Yarn
```bash
yarn add @gigwage/client
```

## Usage
Create a new Gig Wage client and use it to access APIs from [the documentation](https://developers.gigwage.com/#introduction). The client is used to automatically handle the complex API authentication.

```typescript
import { createGigwageClient } from "@gigwage/client";
// consider using `dotenv` to pull in environmental variables from a .env file
import "dotenv/config";


// Create a new client
const client = createGigwageClient({
  apiKey: process.env.GIGWAGE_API_KEY,
  apiSecret: process.env.GIGWAGE_SECRET,
});


// Call endpoints from the Gig Wage API using this client.
const response = await client.get("/api/v1/contractors")

// Pass the payload for the second argument for POST and PATCH methods.
const postResponse = await client.post("/api/v1/contractors",{/** new contractor payload*/})
```

### Accessing Response Data
`@gigwage/client` uses `axios` under the hood, so all HTTP method responses will return the same format as an `axios` response would.

```typescript
try{
  const response = await client.get("/api/v1/contractors")
 
  response.data.contractors // array of contractors

}catch(e){
  // error
}

```

### Using Typescript

Types are included with this package, but the individual API calls are to be included in a future release. For now, you can pass the expected response data type as a generic.

```typescript
const response = await client.get<{contractors:[]}>("/api/v1/contractors")

Array.isArray(response.data.contractors) // true
```