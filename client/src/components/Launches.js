import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql  from 'graphql-tag';
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
  query {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

function Launches() {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(  `${error.message}`</p>;

    return (
      <ul>
        {
          data.launches.map( launch => (
            <LaunchItem key={launch.flight_number} launch={launch} />
          ))
        }
      </ul>
    );
}

export default Launches
