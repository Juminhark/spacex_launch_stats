# apollo-graphql-spacex

update 2020-04-24

- [SpaceX-API](https://github.com/r-spacex/SpaceX-API)
- [GraphQL](https://graphql.org/)
- [Apollo Server : v2](<(https://www.apollographql.com/docs/apollo-server/)>)
- [Apollo Client (React) : v3.0 beta](https://www.apollographql.com/docs/react/v3.0-beta/get-started/)

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
```

- [axios](https://www.npmjs.com/package/axios)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [nodemon](https://www.npmjs.com/package/nodemon)
- babel

```sh
// dependencies
npm i axios concurrently

// devDependencies
npm i -D nodemon @babel/core @babel/node @babel/preset-env
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

// .babelrc
{
  "presets": ["@babel/preset-env"]
}

// without babel
const ApolloServer = require('apollo-server')

// with babel
import { ApolloServer } from 'apollo-server';

// axios : 외부 api 사용
axios.get('https://api.spacexdata.com/v3/launches').then((res) => res.data);
```

### Step 3 : Define your GraphQL schema

Every GraphQL server (including Apollo Server) uses a schema to define the structure of data that clients can query.

```ts
// schema.js
import { gql } from 'apollo-server';

export const typeDefs = gql`
  # Rocket Type
  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  }

  # Launch Type
  type Launch {
    flight_number: Int
    mission_name: String
    launch_year: String
    launch_date_local: String
    launch_success: Boolean
    rocket: Rocket
  }

  type Query {
    launches: [Launch]
    lauch(flight_number: Int): Launch
  }
`;
```

### Step 4 : Define your data set

Now that we've defined the structure of our data, we can define the data itself. Apollo Server can fetch data from any source you connect to (including a database, a REST API, a static object storage service, or even another GraphQL server).

이번 예제에서는 data를 query에서 reslover를 통해 외부 rest api에 axios 가 요청하여 가져온다.

### Step 5 : Define your resolver

We've defined our data set, but Apollo Server doesn't know that it should use that data set when it's executing a query. To fix this, we create a resolver.

```ts
// schema.js
import axios from 'axios';

export const resolvers = {
  Query: {
    launches: () => {
      return axios
        .get('https://api.spacexdata.com/v3/launches')
        .then((res) => res.data);
    },
    lauch: (_, { flight_number }) => {
      return axios
        .get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
        .then((res) => res.data);
    },
    rockets: () => {
      return axios
        .get('https://api.spacexdata.com/v3/rockets')
        .then((res) => res.data);
    },
    rocket: (_, { id }) => {
      return axios
        .get(`https://api.spacexdata.com/v3/rocket/${id}`)
        .then((res) => res.data);
    },
  },
};
```

### Step 6 : Create an instance of ApolloServer

We've defined our schema, data set, and resolver. Now we just need to provide this information to Apollo Server when we initialize it.

```ts
// server.js
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './schema';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

### Step 7 : Start the Server

```sh
// node server.js
npm start

// nodemon server.js
npm run server

// client 완성 후
npm run dev
```

## [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)

Visually explore Apollo Server

- ctrl + space : 목록보기
- ctrl + enter : 실행

`doc` , `schema` : 현재 api에서 정의된 내용들을 확인 가능.

query `[name]` { `[query]` } 형식으로 `[name]`에 `[query]` 저장됨을 이용.

```ts
// example "Lauches"
query Lauches{
  launches {
    flight_number
    mission_name
    rocket {
      rocket_id
    }
  }
}
// example "Rockets"
query Rockets{
  rockets {
    rocket_id
    rocket_name
    rocket_type
  }
}
```

### [Deploying with Heroku](https://www.apollographql.com/docs/apollo-server/deployment/heroku/)

<hr />

## create client

```sh
// init
npx create-react-app client

// client로 이동.
cd client

// vsc client
code .
```

### Reference

- [`velog.io/@gwak2837 - 서버-클라이언트 풀스택 웹 개발`](https://velog.io/@gwak2837/Apollo-%EC%84%9C%EB%B2%84%EB%A1%9C-GraphQL-API-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-1)

- [나중에 반영해볼거 - Hook up your data sources](https://www.apollographql.com/docs/tutorial/data-source/)
