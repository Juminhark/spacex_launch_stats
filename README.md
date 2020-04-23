# apollo-graphql-spacex

[`Traversy Media - graphql with react & apollo`](https://www.youtube.com/watch?v=SEMTj8w04Z8&list=PLillGF-RfqbZrjw48EXLdM4dsOhURCLZx)

## init server

```sh
npm init

// entry point : (index.js) server.js

// dependencies
npm i graphql express-graphql express axios

// devDependencies
npm i -D nodemon
```

```ts
"scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  }
// npm start : node server.js
// npm run server : nodemon이 server.js의 변화를 감지하여 server를 다시시작.
```

## client

```sh
// client, server 동시구동
npm i concurrently

// init client
npx create-react-app client

cd client

npm install apollo-boost @apollo/react-hooks graphql
```

```ts
 "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
// npm run client : client 실행
// npm run dev : npm run server && npm run client
```

## GraphiQL

http://localhost:5000/graphql
