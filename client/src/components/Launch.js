import React from 'react'
import gql  from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const LAUNCHES_QUERY = gql`
query LaunchQuery($flight_number: Int!){
  launch(flight_number: $flight_number) {
    flight_number
    mission_name
    launch_date_local
    launch_success
    rocket {
      rocket_id
      rocket_name
      rocket_type
    }
  }
}
`;

function Launch({match}) {
  
  const { loading, error, data } = useQuery(LAUNCHES_QUERY, {
    variables: {
      flight_number: parseInt(match.params.flight_number)
    }
  });
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(  `${error.message}`</p>;

  return (
    <div>
      <h1 className="dislay-4 my-3">
        <span className="text-dark">Mission:</span>{data.launch.mission_name}
      </h1>

    </div>
  );
}

export default Launch
