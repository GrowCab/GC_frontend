import React from 'react'
import './App.css'
import { GetChamberSchedule, GetSensors, useGetChamberUnits } from './Api_spec/generated-types'
import ExpectedMeassureInterval from './ExpectedMeassureInterval'

const App = () => {
  const chamberUnits = useGetChamberUnits({chamber_id: 1}).data
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
          <div key={configuration?.id}>
            {
              chamberUnits?.map((unit) => {
                return (
                  <div>
                    <p>Unit {unit.description}</p>
                    {configuration?.expected_measure?.filter(
                      (expected_measure, idx, expected_measures) => (expected_measure.unit_id === unit.id))
                      .map(
                        (expected_measure, idx, expected_measures) =>
                          (
                            <ExpectedMeassureInterval expectedMeasure={expected_measure} idx={idx} expectedMeasures={expected_measures}/>
                          )
                      )
                    }
                  </div>
                )})
            }
          </div>
      }}/>
    </div>
    
  </div>

}

export default App
