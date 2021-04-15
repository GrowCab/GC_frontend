import React, { useEffect, useState } from 'react'
import './App.css'
import { ExpectedMeasure, GetSensors, useGetChamberSchedule, useGetChamberUnits } from './Api_spec/generated-types'


function getTimeString(hour: number, minute: number) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
}

const EditableInterval = ({ time_change, value_change, expected_measure, idx, expected_measures }:
                            {
                              time_change?: (id: number | undefined, new_value: String) =>void,
                              value_change?:(id: number | undefined, new_value: number)=>void,
                              expected_measure: ExpectedMeasure,
                              idx: number,
                              expected_measures: ExpectedMeasure[] }) => {

  return (
    <div id={'interval-' + idx} key={idx}>
      {idx === 0 ? getTimeString(0, 0) :
        getTimeString(expected_measures[idx - 1].end_hour, expected_measures[idx - 1].end_minute)
      }
      -
      <input type='time'
             onChange={e => {
               if (time_change)
                 time_change(expected_measure.id, e.target.value)
             }}
             value={getTimeString(expected_measure.end_hour, expected_measure.end_minute)} />
      <span>=</span>
      <input type='text' onChange={e => {
        if (value_change)
          value_change(expected_measure.id, Number(e.target.value))
      }} value={expected_measure.expected_value} /> {expected_measure.unit?.description}
    </div>
  )
}

const App: React.FC = () => {
  const schedule = useGetChamberSchedule({ chamber_id: 1 }).data?.expected_measure

  const handleValueChange = (id: number|undefined, new_value: number) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
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

  const handleTimeChange = (id: number|undefined, new_value: String) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
      if (expected.id === id) {
        const updatedItem: ExpectedMeasure = {
          ...expected,
          end_minute: Number(new_value.slice(3,5)),
          end_hour: Number(new_value.slice(0, 2))
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
                    <EditableInterval time_change={handleTimeChange}
                                      value_change={handleValueChange}
                                      expected_measure={expected_measure}
                                      idx={idx}
                                      key={expected_measure.id}
                                      expected_measures={expected_measures}/>
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
