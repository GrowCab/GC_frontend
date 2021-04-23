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
import { DisplayDials } from './DisplayDials'


const App: React.FC = () => {
  const chamberSchedule = useGetChamberSchedule({ chamber_id: 1 })
  const [edited, setEdited] = useState<Boolean>(false)

  const [editableChamberSchedule, setEditableChamberSchedule] = useState<ExpectedMeasure[] | null>(null)
  const chamberUnits = useGetChamberUnits({ chamber_id: 1 })

  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const resetEditable = () => {
    if (chamberSchedule.data?.expected_measure) {
      setEditableChamberSchedule([...chamberSchedule.data?.expected_measure])
      setEdited(false)
      closeModal()
    }
  }


  const putConfiguration = usePutConfiguration({})

  /***
   * Used for sending the new configuration over the network, must confirm the config was stored
   * and update the current local chamberSchedule + recreate the editableChamberSchedule
   */
  const storeNewConfiguration = (e: any) => {
    e.preventDefault()
    if (!edited) {
      return
    }
    let newConfiguration: Configuration1 = {
      description: e.target.description.value,
      chamber_id: 1,
      expected_measure: [],
    }
    editableChamberSchedule?.forEach((expected) => {
      if (newConfiguration.expected_measure)
        newConfiguration.expected_measure.push({
          unit_id: expected.unit_id,
          expected_value: expected.expected_value,
          end_hour: expected.end_hour,
          end_minute: expected.end_minute,
        })
    })

    putConfiguration.mutate(newConfiguration).then(() => {
      console.log('Saving new configuration')
    })

    closeModal()
    setEdited(false)
  }

  const handleDelInterval = (expected_measure: ExpectedMeasure) => {
    let newSchedule: ExpectedMeasure[] = []

    if (editableChamberSchedule)
      newSchedule = [...editableChamberSchedule]

    newSchedule = newSchedule.filter((expected) => (
      expected !== expected_measure
    ));

    setEditableChamberSchedule([...newSchedule])
    setEdited(true)
  }

  const handleAddInterval = (expected_measure: ExpectedMeasure, minutes_since_start_of_day: number) => {
    let newSchedule: ExpectedMeasure[] = []

    if (editableChamberSchedule)
      newSchedule = [...editableChamberSchedule]

    const hour = Math.floor(minutes_since_start_of_day / 60)
    const min = minutes_since_start_of_day - hour * 60

    const insertionPoint = editableChamberSchedule?.findIndex((expected) => {
      return expected.unit_id === expected_measure.unit_id &&
        hour * 100 + min < expected.end_hour * 100 + expected.end_minute
    })

    const newItem: ExpectedMeasure = {
      configuration_id: expected_measure.configuration_id,
      unit_id: expected_measure.unit_id,
      unit: expected_measure.unit,
      expected_value: expected_measure.expected_value,
      end_hour: Math.round(hour),
      end_minute: Math.round(min),
    }

    if (insertionPoint !== undefined && insertionPoint >= 0) {
      newSchedule.splice(insertionPoint, 0, newItem)
    }

    setEditableChamberSchedule([...newSchedule])
    setEdited(true)
  }

  const handleValueChange = (id: ExpectedMeasure | undefined, new_value: number) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
      if (expected === id) {
        const updatedItem: ExpectedMeasure = {
          ...expected,
          expected_value: new_value,
        }
        return updatedItem
      }
      return expected
    })
    if (newSchedule) {
      setEditableChamberSchedule([...newSchedule])
      setEdited(true)
    }
  }

  const handleTimeChange = (id: number | undefined, new_value: String) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
      if (expected.id === id) {
        const updatedItem: ExpectedMeasure = {
          ...expected,
          end_minute: Number(new_value.slice(3, 5)),
          end_hour: Number(new_value.slice(0, 2)),
        }
        return updatedItem
      }
      return expected
    })
    if (newSchedule) {
      setEditableChamberSchedule([...newSchedule])
      setEdited(true)
    }
  }

  const { data, refetch, error } = useGetChamberStatus({ chamber_id: 1 })

  useEffect(() => {
    // if (error) {
    // } else
    if (data) {
      const timerId = window.setTimeout(() => refetch(), 1000)
      return () => window.clearTimeout(timerId)
    } else {
      return
    }
  }, [data, refetch, error])

  // Load the editableChamberSchedule when the chamberSchedule has been reloaded
  useEffect(() => {
    if (chamberSchedule.data?.expected_measure) {
      const timerId = window.setTimeout(() => chamberSchedule.refetch(), 1000)
      if (!edited) {
        setEditableChamberSchedule(chamberSchedule.data.expected_measure)
      }
      return () => window.clearTimeout(timerId)
    } else {
      return
    }
  }, [chamberSchedule.data])

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>GrowCab</h1>
      </header>
      <div>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly' }}>{
          chamberUnits.data?.map((unit, idx) => (
            (chamberSchedule.data?.expected_measure) ?
              <DisplayDials key={'dial-' + idx} expected_measures={
                chamberSchedule.data.expected_measure?.filter(
                  (expected_measure) => (expected_measure.unit_id === unit.id),
                )} current_measure={data?.find((unit_measure) => (
                unit_measure.sensor_unit?.unit?.id === unit.id
              ))}
              /> :
              <p key={'ldial' + idx}>loading...</p>),
          )
        }
        </div>
      </div>
      <div>
        {/*<h1>Chamber 1 schedule:</h1>*/}
        {/*<h2>Editable schedule:</h2>*/}
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly' }}>
          {
            (chamberUnits.loading) ? <p>loading...</p> :
              (
                chamberUnits.data?.map((unit, idx) => {
                    const intervals = (
                      editableChamberSchedule?.filter((expected_measure) => (
                        expected_measure.unit_id === unit.id
                      )).map((expected_measure, idx, expected_measures) => (
                        <EditableInterval
                          time_change={handleTimeChange}
                          value_change={handleValueChange}
                          add_interval={handleAddInterval}
                          del_interval={handleDelInterval}
                          expected_measure={expected_measure}
                          idx={idx}
                          key={expected_measure.id}
                          expected_measures={expected_measures} />
                      ))
                    )
                    return (
                      <div key={'editable_interval-' + idx}>
                        {intervals}
                      </div>
                    )
                  }
                ))
          }
        </div>
        <button disabled={!edited} onClick={openModal}>Save changes</button>
      </div>
      {
        isOpen && (<ConfigurationStoreModal submitAction={storeNewConfiguration} resetAction={resetEditable}
                                            closeAction={closeModal} />)
      }
    </div>
  )
}

export default App
