import React from 'react'

import LaunchItem from './LaunchItem'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import MissionKey from './MissionKey'

const LAUNCHES_QUERY = gql`
  {
    launches {
      launch_year
      launch_success
      launch_date_local
      mission_name
      flight_number
    }
  }
`
interface ILaunch {
  launch_year: string;
  launch_success: string;
  launch_date_local: string;
  mission_name: string;
  flight_number: string;
}

export default function Launches() {

  const { loading, error, data } = useQuery(LAUNCHES_QUERY)

  if(loading) return <h3>Loading...</h3>
  if(error) return <h1>Error...</h1>

  return (
    <div>
      <h1 className="display-4 my-4">Launches</h1>

      <MissionKey />

      {data.launches.map((launch: ILaunch) => (
         <LaunchItem key={launch.flight_number} data={launch} />
      ))}
    </div>
  )
}
