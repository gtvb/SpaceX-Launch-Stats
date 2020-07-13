import React from 'react';

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'

interface IQuery {
  launch: {
     flight_number: string;
     mission_name: string;
     launch_year: string;
     launch_success: boolean;
     launch_date_local: string;
     rocket: {
       rocket_id: string;
       rocket_name: string;
       rocket_type: string;
     }
  }
}


const LaunchDetails: React.FC = () => {

  let { flight_number }: any = useParams()
  flight_number = parseInt(flight_number)

  const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
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
`;

  const { data, error, loading } = useQuery<IQuery>(LAUNCH_QUERY, {
    variables: { flight_number }
  })  

  if(loading) return <h3>Loading...</h3>
  if(error) return <h3>Error :(</h3>

  return (
   <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {data?.launch.mission_name}
      </h1>

      <h4 className="mb-3">Launch Details</h4>
        <ul className="list-group">
          <li className="list-group-item">
            Flight Number: {data?.launch.flight_number}
          </li>
          <li className="list-group-item">
            Launch Year: {data?.launch.launch_year}
          </li>
          <li className="list-group-item">
            Launch Successful: {data?.launch.launch_success ? 'True' : 'False'} 
          </li>
        </ul>

        <h4 className="my-3">Rocket Details</h4>
          <ul className="list-group">
            <li className="list-group-item">Rocket ID: {data?.launch.rocket.rocket_id}</li>
            <li className="list-group-item">
              Rocket Name: {data?.launch.rocket.rocket_name}
            </li>
            <li className="list-group-item">
              Rocket Type: {data?.launch.rocket.rocket_type}
            </li>
          </ul>
          <hr />
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
      </div>
  );
}

export default LaunchDetails;