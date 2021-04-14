import React, { useEffect, useState } from 'react'
import './App.css'
import { ExpectedMeasure, GetSensors, useGetChamberSchedule, useGetChamberUnits } from './Api_spec/generated-types'


function getTimeString(hour: number, minute: number) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
}

const EditableInterval = ({ expected_measure, idx, expected_measures }:
                            { expected_measure: ExpectedMeasure, idx: number, expected_measures: ExpectedMeasure[] }) => {

  const [expected_value, setExpectedValue] = React.useState(expected_measure.expected_value)
  const [end_hour, setEndHour] = React.useState(getTimeString(expected_measure.end_hour, expected_measure.end_minute))

  return (
    <div id={'interval-' + idx} key={idx}>
      {idx === 0 ? getTimeString(0, 0) :
        getTimeString(expected_measures[idx - 1].end_hour, expected_measures[idx - 1].end_minute)
      }
      -
      <input type='time'
             onChange={e => {
               setEndHour(e.target.value)
             }}
             value={end_hour} />
      <span>=</span>
      <input type='text' onChange={e => {
        setExpectedValue(Number(e.target.value))
      }} value={expected_value} /> {expected_measure.unit?.description}
    </div>
  )
}

const App: React.FC = () => {
  const schedule = useGetChamberSchedule({ chamber_id: 1 }).data?.expected_measure

  useEffect(() => {
    if (schedule) {
      setEditableChamberSchedule([...schedule])
    }
  }, [schedule])

  const [editableChamberSchedule, setEditableChamberSchedule] = useState<ExpectedMeasure[] | null>(null)
  const chamberUnits = useGetChamberUnits({ chamber_id: 1 })

  return <div className='App'>
    <header className='App-header'>
      <p>Sensors list:</p>
      <GetSensors children={
        (sensors, action) => {
          return (action.loading) ? <p>loading...</p> :
            <div>
              {sensors?.map((sensor, idx) => (
                <p key={'sensor-' + idx}>{sensor.description}</p>
              ))}
            </div>
        }
      } />
    </header>
    <div> <h1>Chamber 1 schedule:</h1>
      <h2>Editable schedule:</h2>
      {
        (chamberUnits.loading) ? <p>loading...</p> :
          (
            chamberUnits.data?.map((unit) => (
                editableChamberSchedule?.filter((expected_measure) => (
                    expected_measure.unit_id === unit.id
                  ),
                ).map((expected_measure, idx, expected_measures) => (
                    <EditableInterval expected_measure={expected_measure} idx={idx} key={expected_measure.id}
                                      expected_measures={expected_measures} />
                  ),
                )
              ),
            )
          )}

      <h2>Non-editable schedule:</h2>
      {(chamberUnits.loading) ? <p>loading...</p> :
        chamberUnits.data?.map((unit) => (
          schedule?.filter((expected_measure) => (
            expected_measure.unit_id === unit.id
          )).map((expected_measure, idx, expected_measures) => (
            <EditableInterval expected_measure={expected_measure} idx={idx} key={expected_measure.id}
                              expected_measures={expected_measures} />
          ))
        ))}
    </div>
  </div>

}

export default App
