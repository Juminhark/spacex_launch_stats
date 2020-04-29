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

### Route-based code splitting

라우트에서 코드분할.

웹 페이즈를 불러오는 시간은 페이지 전환에 어느 정도 발생하며 대부분 페이지를
한번에 랜더링 ㅏ기 떄문에 사용자가 페이지를 렌더링하는 동안 다른 요소와 상호작용하지 않는다.

```ts
// src/App.js
import React from 'react';
import Router from 'Router';

function App() {
  return <Router />;
}

export default App;
```

```sh
yarn add react-router-dom
```

```ts
// Router.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Launches = lazy(() => import('./components/Launches'));
const Launch = lazy(() => import('./components/Launch'));

export default () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...?</div>}>
        <Switch>
          <div className='container'>
            <Route exact path='/' component={Launches} />
            <Route exact path='/launch/:flight_number' component={Launch} />
          </div>
        </Switch>
      </Suspense>
    </Router>
  );
};
```

React.lazy 는 동적 import() 를 호출하는 함수를 인자로 가집니다.

lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야 하며, Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠를 보여줄 수 있게 해줍니다.

나의 Suspense 컴포넌트로 여러 lazy 컴포넌트를 감쌀 수도 있습니다.

### Request data

```ts
// components/Launches.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const LAUNCHES_QUERY = gql`
  query LauchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h4 className='display-4 my-3'>Launches</h4>
      {data.launches.map(({ flight_number, mission_name }) => (
        <div key={flight_number}>
          {flight_number}: {mission_name}
        </div>
      ))}
    </div>
  );
};
```

### React date format

[`moment issue`](https://github.com/moment/moment/issues/4945)

```sh
yarn add moment react-moment
```

```ts
// components/LauncheItem.js
import Moment from 'react-moment';

<Moment foramt='YYYY-MM-DD HH:mm'>{launch_date_local}</Moment>;
```

### Request data with parameter

- playground 를 통해 data 확인

```ts
// playground : http://locallhost:4000/
query LaunchQuery ($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }

// QUERY VARIABLES
{
  "flight_number" : 1
}
```

- step 1 : parameter 생성

```ts
// LaunchItem.js
// Link를 통해 페이지 이동
<Link to={`/launch/${flight_number}`} className='btn btn-secondary'>
  Launch Details
</Link>

// Router.js
// `/launch/${flight_number}` 에 해당하는 uri 통해 접근하게되면
// 아래 Route로 :flight_number parameter 값을 가진 정해진 component로 이동
<Route exact path='/launch/:flight_number' component={Launch} />
```

- step 2 : parameter 사용

```ts
// Launch.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

// useParams() 을 통해 parameter 값을 저장하고
// parameter 값을 포함한 query로 데이터를 받아와 사용한다.
const Launch = () => {
  const { flight_number } = useParams();
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: Number(flight_number) },
  });

  if (loading) return <p>Loading...!</p>;
  if (error) return <p>Error :(</p>;

  const {
    launch: {
      mission_name,
      launch_year,
      launch_success,
      launch_date_local,
      rocket: { rocket_id, rocket_name, rocket_type },
    },
  } = data;

  const mission_stats = launch_success ? 'text-success' : 'text-danger';

  return (
    <div>
      <h1 className='display-4 my-3'>
        <span className='text-dark'>Mission : </span>
        <span className={mission_stats}>{mission_name}</span>
      </h1>
      <h4 className='mb-3'>Launch Details</h4>
      <ul className='list-group'>
        <li className='list-group-item'>Flight_number : {flight_number}</li>
        <li className='list-group-item'>Launch Year : {launch_year}</li>
        <li className='list-group-item'>
          Launch Date Local : {launch_date_local}
        </li>
        <li className='list-group-item'>
          Launch Successful :{' '}
          <span className={mission_stats}>{launch_success ? 'yes' : 'no'}</span>
        </li>
      </ul>

      <h4 className='my-3'>Rocket Details</h4>
      <ul className='list-group'>
        <li className='list-group-item'>Rocket ID : {rocket_id}</li>
        <li className='list-group-item'>Rocket Name : {rocket_name}</li>
        <li className='list-group-item'>Rocket Type : {rocket_type}</li>
      </ul>
      <hr />
      <Link to='/' className='btn btn-secondary'>
        Back
      </Link>
    </div>
  );
};

export default Launch;
```
