import React, { useEffect, useState } from 'react'
import './App.css'
import { ExpectedMeasure, GetSensors, useGetChamberSchedule, useGetChamberUnits } from './Api_spec/generated-types'


function getTimeString(hour: number, minute: number) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
}

const EditableInterval = ({ value_change, expected_measure, idx, expected_measures }:
                            {value_change:any, expected_measure: ExpectedMeasure, idx: number, expected_measures: ExpectedMeasure[] }) => {

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
        console.log(expected_measure.id)
        value_change(expected_measure.id, Number(e.target.value))
        setExpectedValue(Number(e.target.value))
      }} value={expected_value} /> {expected_measure.unit?.description}
    </div>
  )
}

const App: React.FC = () => {
  const schedule = useGetChamberSchedule({ chamber_id: 1 }).data?.expected_measure

  const handleValueChange = (id: number, new_value: number) => {
    const newSchedule = schedule?.map((expected) => {
      if (expected.id === id) {
        const updatedItem: ExpectedMeasure = {
          ...expected,
          expected_value: new_value
        }
        return updatedItem;
      }
      return expected;
    });
    if (newSchedule)
      setEditableChamberSchedule([...newSchedule]);
  }

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
                    <EditableInterval value_change={handleValueChange} expected_measure={expected_measure} idx={idx} key={expected_measure.id}
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
            <EditableInterval value_change={() => (1)} expected_measure={expected_measure} idx={idx} key={expected_measure.id}
                              expected_measures={expected_measures} />
          ))
        ))}
    </div>
  </div>

}

export default App
