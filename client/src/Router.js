import React, { Suspense, lazy } from 'react';
import Logo from './logo.jpg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Launches = lazy(() => import('./components/Launches'));
const Launch = lazy(() => import('./components/Launch'));

export default () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...?</div>}>
        <Switch>
          <React.Fragment>
            <div className='container'>
              <img
                src={Logo}
                alt='SpaceX'
                style={{ width: 300, display: 'block', margin: 'auto' }}
              />
              <Route exact path='/' component={Launches} />
              <Route exact path='/launch/:flight_number' component={Launch} />
            </div>
          </React.Fragment>
        </Switch>
      </Suspense>
    </Router>
  );
};
