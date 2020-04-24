import React from 'react';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import logo from './logo.jpg';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <img
          src={logo}
          alt='SpaceX'
          style={{ width: 300, display: 'block', margin: 'auto' }}
        />
      </div>
    </ApolloProvider>
  );
}

export default App;
