import React from 'react'
import './App.css'
import { GetChamberSchedule, GetSensors } from './Api_spec/generated-types'

const App = () => {

  return <div className='App'>
    <header className='App-header'>
      <p>Sensors list:</p>
      <GetSensors children={
        (sensors, action) => (
          <div>
            {sensors?.map((sensor, idx) => (
              <p>{sensor.description}</p>
            ))}
          </div>
        )}/>
    </header>
    <div> Chamber 1 schedule:
      <GetChamberSchedule chamber_id={1} children={(configuration, action) => (
          <div> Intervals:
            {configuration?.expected_measure?.map((expected_measure, idx, expected_measures) => (
              <div id={'interval-' + idx} key={expected_measure.id}>
                   {idx===0 ?
                     '0'.padStart(4,'0') :
                     String(expected_measures[idx-1].end_hour * 100 + expected_measures[idx-1].end_minute).padStart(4, '0')}
                   -{String(expected_measure.end_hour * 100 + expected_measure.end_minute).padStart(4, '0')}
                   <span>=</span>{expected_measure.expected_value}{expected_measure.unit?.description}
                 </div>)
            )}
          </div>
        )}/>
    </div>
  </div>

}

export default App
