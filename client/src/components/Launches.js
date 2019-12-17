import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LAUNCHES_QUERY = gql`
    {
        launches {
            flight_number
            mission_name
            launch_data_local
            launch_success
        }
    }
`;

function Launches() {
    
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    if(loading) return <h4>Loading...</h4>
    if(error) return console.log(error);
    console.log(data);

    return <h1>test</h1>

}

export default Launches;
