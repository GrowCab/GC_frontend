import React, { useEffect, useState } from 'react'
import './App.css'
import {
  Configuration1,
  ExpectedMeasure,
  GetSensors,
  useGetChamberSchedule,
  useGetChamberStatus,
  useGetChamberUnits,
  usePutConfiguration,
} from './Api_spec/generated-types'
import { EditableInterval } from './EditableInterval'
import { ConfigurationStoreModal } from './ConfigurationStoreModal'
import { StatusDisplay } from './StatusDisplay'
import { DisplayDials } from './DisplayDials'


const App: React.FC = () => {
  const chamberSchedule = useGetChamberSchedule({ chamber_id: 1 }).data?.expected_measure
  const [edited, setEdited] = useState<Boolean>(false)

  const [editableChamberSchedule, setEditableChamberSchedule] = useState<ExpectedMeasure[] | null>(null)
  const chamberUnits = useGetChamberUnits({ chamber_id: 1 })

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const resetEditable = () => {
    if (chamberSchedule) {
      setEditableChamberSchedule([...chamberSchedule]);
      setEdited(false);
      closeModal();
    }
  }


  const putConfiguration = usePutConfiguration({})

  /***
   * Used for sending the new configuration over the network, must confirm the config was stored
   * and update the current local chamberSchedule + recreate the editableChamberSchedule
   */
  const storeNewConfiguration = (e: any) => {
    e.preventDefault();
    if (!edited) {
      return;
    }
    let newConfiguration: Configuration1 = {
      description: e.target.description.value,
      chamber_id: 1,
      expected_measure: []
    };
    editableChamberSchedule?.forEach((expected) => {
      if (newConfiguration.expected_measure)
        newConfiguration.expected_measure.push({
          unit_id: expected.unit_id,
          expected_value: expected.expected_value,
          end_hour: expected.end_hour,
          end_minute: expected.end_minute
        })
    });

    putConfiguration.mutate(newConfiguration).then(() => {
      console.log("Saving new configuration");
    });

    closeModal();
    setEdited(false);
  }

  const handleAddInterval = (expected_measure: ExpectedMeasure, minutes_since_start_of_day: number) => {
    let newSchedule: ExpectedMeasure[] = [];

    if (editableChamberSchedule)
      newSchedule = [...editableChamberSchedule]

    const hour = Math.floor(minutes_since_start_of_day / 60);
    const min = minutes_since_start_of_day - hour*60;

    const insertionPoint = editableChamberSchedule?.findIndex((expected) => {
      return expected.unit_id === expected_measure.unit_id &&
        hour*100+min < expected.end_hour*100+expected.end_minute;
    });

    const newItem: ExpectedMeasure = {
      configuration_id: expected_measure.configuration_id,
      unit_id: expected_measure.unit_id,
      unit: expected_measure.unit,
      expected_value: expected_measure.expected_value,
      end_hour: Math.round(hour),
      end_minute: Math.round(min)
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
        {
          chamberUnits.data?.map((unit) => (
            (editableChamberSchedule) ?
              <DisplayDials expected_measures={
                editableChamberSchedule?.filter(
                  (expected_measure) => (expected_measure.unit_id === unit.id)
                )} current_measure={data?.find((unit_measure) => (
                  unit_measure.sensor_unit?.unit?.id === unit.id
              ))}
              /> :
              <p>loading...</p>)
          )
        }
        <StatusDisplay sensor_status={data} expected_measures={chamberSchedule || []}/>
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
      <button disabled={!edited} onClick={openModal}>Save changes</button>
    </div>
      {
        isOpen && (<ConfigurationStoreModal submitAction={storeNewConfiguration} resetAction={resetEditable} closeAction={closeModal}/>)
      }
  </div>
  )

}

export default App
