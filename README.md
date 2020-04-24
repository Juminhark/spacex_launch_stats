# apollo-graphql-spacex

update 2020-04-24

- [GraphQL](https://graphql.org/)
- [Apollo Server : v2](<(https://www.apollographql.com/docs/apollo-server/)>)
- [Apollo Client (React) : v3.0 beta](https://www.apollographql.com/docs/react/v3.0-beta/get-started/)

```sh
cd client
```

## [`Apollo Server : v2`](https://www.apollographql.com/docs/apollo-server/)

Apollo Server is an [`open-source`](https://github.com/apollographql/apollo-server), spec-compliant GraphQL server that's compatible with any Graphql client, including [`Apollo Client`](https://www.apollographql.com/docs/react/).

### Step 1: Init

Initialize a new Node.js project with npm(or yarn)

```sh
npm init

// entry point : (index.js) server.js
```

### Step 2 : Install dependencies

Applications that run Apollo Server require two top-level dependencies

- [`apollo-server`](https://www.npmjs.com/package/apollo-server)

- [`graphql`](https://www.npmjs.com/package/graphql)

```sh
npm i apollo-server graphql

// dependencies
npm i axios concurrently

// devDependencies
npm i -D nodemon
```

```ts
// package.json
 "scripts": {
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
}
// npm start : node server.js
// npm run server : nodemon이 server.js의 변화를 감지하여 server를 다시시작.
// npm run client : client 실행
// npm run dev : npm run server && npm run client
```

### Step 3 : Define your GraphQL schema

Every GraphQL server (including Apollo Server) uses a schema to define the structure of data that clients can query.

```ts
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
```

## GraphiQL

http://localhost:5000/graphql
