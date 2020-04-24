## [`apollo client`](https://www.apollographql.com/docs/react/v3.0-beta/get-started/)

### CSS

[`bootswatch`](https://bootswatch.com/) : free themes for bootstrap

- pakage (npm or yarn)

```sh
yarn add bootswatch
```

- Add the following import to your top-level index.js (or App.js) file. Add it before any other .css imports.

```ts
import 'bootswatch/dist/[theme]/bootstrap.min.css';

// example index.js css
import 'bootswatch/dist/cyborg/bootstrap.min.css';
```

### Installation

```sh
npm install @apollo/client

// or
yarn add @apollo/client
```

### Create a client

```ts
// graphql/client.js
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

export default client;
```

### Connect your client to React

```ts
// apollo graphql client
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
```

### Request data
