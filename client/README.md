## [`apollo client`](https://www.apollographql.com/docs/react/v3.0-beta/get-started/)

### init client

```sh
// react
npx create-react-app client

cd client

// apollo client
yarn add @apollo/client
```

### CSS

[`bootswatch`](https://bootswatch.com/) : free themes for bootstrap

- pakage (npm or yarn)

```sh
// client
npm install bootswatch

// or
yarn add bootswatch
```

- Add the following import to your top-level index.js (or App.js) file. Add it before any other .css imports.

```ts
import 'bootswatch/dist/[theme]/bootstrap.min.css';

// example App.js
import React from 'react';
import 'bootswatch/dist/slate/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <h1>SpaceX</h1>
    </div>
  );
}
```
