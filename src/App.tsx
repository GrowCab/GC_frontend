import React, { useEffect, useState } from 'react'
import './App.css'
import { ExpectedMeasure, GetSensors, useGetChamberSchedule, useGetChamberUnits } from './Api_spec/generated-types'
import { EditableInterval } from './EditableInterval'

const App: React.FC = () => {
  const chamberSchedule = useGetChamberSchedule({ chamber_id: 1 }).data?.expected_measure

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

  // Setup sensor refreshing
  useEffect( () => {
    setInterval(() => {
      console.log("TODO: Load/Reload sensor data...");
    }, 1000);
  }, []);


  // Load the editableChamberSchedule when the chamberSchedule has been reloaded
  useEffect(() => {
    if (chamberSchedule) {
      setEditableChamberSchedule([...chamberSchedule])
    }
  }, [chamberSchedule])

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
          chamberSchedule?.filter((expected_measure) => (
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
