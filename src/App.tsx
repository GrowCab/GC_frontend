import React from 'react'
import './App.css'
import { GetChamberSchedule, GetSensors } from './Api_spec/generated-types'
import ExpectedMeassureInterval from './ExpectedMeassureInterval'

const App = () => {

  return <div className='App'>
    <header className='App-header'>
      <p>Sensors list:</p>
      <GetSensors children={
        (sensors, action) => {
          return (action.loading) ? <p>loading...</p> :
            <div>
              {sensors?.map((sensor, idx) => (
                <p key={sensor.id}>{sensor.description}</p>
              ))}
            </div>
        }
      }/>
    </header>
    <div> Chamber 1 schedule:
      <GetChamberSchedule chamber_id={1} children={(configuration, action) => {
        return (action.loading) ? <p>loading...</p> :
          <div key={configuration?.id}> Intervals:
            {configuration?.expected_measure?.map((expected_measure, idx, expected_measures) => (
              //<ExpectedMeassureInterval expectedMeasure={expected_measure} idx={idx}  expectedMeasures={expected_measures} />
              <ExpectedMeassureInterval  expectedMeasure={expected_measure} idx={idx}  expectedMeasures={expected_measures} />
              )
            )}
          </div>
      }}/>
    </div>
    
  </div>

}

export default App
