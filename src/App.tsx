import React, { useEffect, useState } from 'react'
import './App.css'
import {
  ExpectedMeasure,
  GetSensors, Measure,
  useGetChamberSchedule, useGetChamberStatus,
  useGetChamberUnits,
} from './Api_spec/generated-types'
import { EditableInterval } from './EditableInterval'

const StatusDisplay = ({ sensor_status }: { sensor_status: Measure[] | null }) => (
  <div>
    {sensor_status?.map((status, idx) => (
      <p key={'status-'+idx}>{status.current_value} {status.sensor_unit?.unit?.description}</p>
    ))}
  </div>
)


const App: React.FC = () => {
  const chamberSchedule = useGetChamberSchedule({ chamber_id: 1 }).data?.expected_measure
  const [edited, setEdited] = useState<Boolean>(false)

  const [editableChamberSchedule, setEditableChamberSchedule] = useState<ExpectedMeasure[] | null>(null)
  const chamberUnits = useGetChamberUnits({ chamber_id: 1 })

  // const storeNewConfiguration = () => {
    // Remove unneeded parts of the editableChamberSchedule object
    // Submit store request over API
  // }

  const handleAddInterval = (expected_measure: ExpectedMeasure, mid_minutes: number) => {
    let newSchedule: ExpectedMeasure[] = [];
    if (editableChamberSchedule)
      newSchedule = [...editableChamberSchedule]

    const mid_hour = Math.floor(mid_minutes / 60);
    const mid_min = mid_minutes - mid_hour*60;

    const insertionPoint = editableChamberSchedule?.findIndex((expected) => {
      return expected.unit_id === expected_measure.unit_id &&
        mid_hour*100+mid_min < expected.end_hour*100+expected.end_minute;
    });

    const newItem: ExpectedMeasure = {
      configuration_id: expected_measure.configuration_id,
      unit_id: expected_measure.unit_id,
      unit: expected_measure.unit,
      expected_value: expected_measure.expected_value,
      end_hour: Math.round(mid_hour),
      end_minute: Math.round(mid_min)
    }

    if (insertionPoint !== undefined && insertionPoint >= 0) {
      newSchedule.splice(insertionPoint, 0, newItem);
    }

    setEditableChamberSchedule([...newSchedule]);
    setEdited(true);
  }

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
    if (newSchedule) {
      setEditableChamberSchedule([...newSchedule]);
      setEdited(true);
    }
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
    if (newSchedule) {
      setEditableChamberSchedule([...newSchedule]);
      setEdited(true);
    }
  }

  const { data, refetch, error } = useGetChamberStatus({chamber_id: 1})

  useEffect(() => {
  // if (error) {
  // } else
  if (data) {
    const timerId = window.setTimeout(() => refetch(), 1000);
    return () => window.clearTimeout(timerId);
  } else {
    return;
  }
}, [data, refetch, error]);

  // Load the editableChamberSchedule when the chamberSchedule has been reloaded
  useEffect(() => {
    if (chamberSchedule) {
      setEditableChamberSchedule([...chamberSchedule])
    }
  }, [chamberSchedule])

  return (
    <div className='App'>
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
      <div>
        <h1>Chamber 1 status:</h1>
        <StatusDisplay sensor_status={data}/>
      </div>
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
                    <EditableInterval
                      time_change={handleTimeChange}
                      value_change={handleValueChange}
                      add_interval={handleAddInterval}
                      expected_measure={expected_measure}
                      idx={idx}
                      key={idx}
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
            <EditableInterval expected_measure={expected_measure} idx={idx} key={idx}
                              expected_measures={expected_measures} />
          ))
        ))}
      <button disabled={!edited} /*onClick={storeNewConfiguration}*/>Save changes</button>
    </div>
  </div>
  )

}

export default App
