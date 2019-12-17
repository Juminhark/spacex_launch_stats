import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Launches from './components/Launches';
import './App.css';
import logo from './spacex.png';

const client = new ApolloClient({
  uri: 'https://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img 
          src={logo} 
          alt="SpaceX" 
          style={{width: 300, display:'block', margin:'auto'}} 
        />
        <Launches />
      </div>
    </ApolloProvider>
  );
}

export default App;
