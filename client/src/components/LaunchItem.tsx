import React from 'react'

import { Link } from 'react-router-dom'

interface ILaunch {
  launch_year: string;
  launch_success: string;
  launch_date_local: string;
  mission_name: string;
  flight_number: string;
}

interface IProps {
  data: ILaunch
}

const LaunchItem: React.FC<IProps> = ({ data }) => {

  return (
    <div className='card card-body mb-3'>
      <div className="row">
        <div className="col-md-9">
            <h4>
              Mission: <span style={{color: data.launch_success ? '#00ff7f' : '#f13030'}}>{data.mission_name}</span>
            </h4>
            <p>Date: {data.launch_date_local}</p>
        </div>
        <div className="col-md-3">
          <Link to={`/launch/${data.flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LaunchItem
