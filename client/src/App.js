import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';

import MissionKey from './components/MissionKey';
import './App.css';
import logo from './spacex.png';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
  

});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="container">
        <img 
          src={logo} 
          alt="SpaceX" 
          style={{width: 300, display:'block', margin:'auto'}} 
        />
        <h1 className="display-4 my-3">Launches</h1>
        <Route exact path="/" component={MissionKey} />
        
        <Route exact path="/" component={Launches} />
        <Route exact path="/launch/:flight_number" component={Launch} />
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
