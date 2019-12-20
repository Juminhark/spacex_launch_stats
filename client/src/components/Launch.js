import React from 'react'
import gql  from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

const LAUNCHES_QUERY = gql`
query LaunchQuery($flight_number: Int!){
  launch(flight_number: $flight_number) {
    flight_number
    mission_name
    launch_year
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
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {data.launch.flight_number}
        </li>
        <li className="list-group-item">
          Launch Year: {data.launch.launch_year}
        </li>
        <li className="list-group-item">
          Launch Successful: {data.launch.launch_success ? 'Yes' : 'No'}
        </li>
      </ul>
      
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {data.launch.rocket.rocket_id}</li>
        <li className="list-group-item">Rocket Name: {data.launch.rocket.rocket_name}</li>
        <li className="list-group-item">Rocket Type: {data.launch.rocket.rocket_type}</li>
      </ul>
      <hr/>
      <Link to="/" className="btn btn-secondary">Back</Link>
    </div>
  );
}

export default Launch
