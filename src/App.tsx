import React, { useEffect, useState } from 'react'
import './App.css'
import {
  Configuration,
  ExpectedMeasure,
  useGetChamberSchedule,
  useGetChamberStatus,
  useGetChamberUnits,
  usePutConfiguration,
} from './Api_spec/generated-types'
import { EditableInterval } from './EditableInterval'
import { DisplayDials } from './DisplayDials'
import { Button, Center, Heading, useDisclosure } from '@chakra-ui/react'
import { StoreConfigurationModal } from './StoreConfigurationModal'


const App: React.FC = () => {
  const {isOpen: saveModalIsOpen,onOpen: saveModalOnOpen,onClose: saveModalOnClose} = useDisclosure();
  const {data: chamberSchedule, refetch: chamberScheduleRefetch} = useGetChamberSchedule({ chamber_id: 1 })
  const [edited, setEdited] = useState<Boolean | undefined>(false)

  const [editableChamberSchedule, setEditableChamberSchedule] = useState<ExpectedMeasure[] | null>(null)
  const chamberUnits = useGetChamberUnits({ chamber_id: 1 })

  const resetEditable = () => {
    if (chamberSchedule?.expected_measure) {
      setEditableChamberSchedule([...chamberSchedule?.expected_measure])
      setEdited(false)
      saveModalOnClose()
    }
  }

  const putConfiguration = usePutConfiguration({})

  /***
   * Used for sending the new configuration over the network, must confirm the config was stored
   * and update the current local chamberSchedule + recreate the editableChamberSchedule
   */
  const storeNewConfiguration = async (e: any) => {
    e.preventDefault()
    if (!edited) {
      return
    }
    let newConfiguration: Configuration = {
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

    await putConfiguration.mutate(newConfiguration).then(async (r) => {
      console.log('Saving new configuration')
      setEditableChamberSchedule(r.expected_measure || [])
      await chamberScheduleRefetch()
      console.log('Saved new configuration')
    })

    saveModalOnClose()
    setEdited(false)
  }

  const handleDelInterval = (expected_measure: ExpectedMeasure) => {
    let newSchedule: ExpectedMeasure[] = []

    if (editableChamberSchedule)
      newSchedule = [...editableChamberSchedule]

    newSchedule = newSchedule.filter((expected) => (
      expected !== expected_measure
    ));

    isConfigChanged([...newSchedule])
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
      unit_id: expected_measure.unit_id,
      unit: expected_measure.unit,
      expected_value: expected_measure.expected_value,
      end_hour: Math.round(hour),
      end_minute: Math.round(min),
    }

    if (insertionPoint !== undefined && insertionPoint >= 0) {
      newSchedule.splice(insertionPoint, 0, newItem)
    }

    isConfigChanged([...newSchedule])
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
      isConfigChanged([...newSchedule])
    }
  }

  const handleTimeChange = (id: ExpectedMeasure | undefined, new_value: String) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
      if (expected === id) {
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
      isConfigChanged([...newSchedule])
    }
  }

  const { data: chamberStatus, refetch: refetchChamberStatus, error } = useGetChamberStatus({ chamber_id: 1 })

  useEffect(() => {
    // if (error) {
    // } else
    if (chamberStatus) {
      const timerId = window.setTimeout(() => refetchChamberStatus(), 30000)
      return () => window.clearTimeout(timerId)
    } else {
      return
    }
  }, [chamberStatus, refetchChamberStatus, error])

  // Load the editableChamberSchedule when the chamberSchedule has been reloaded
  useEffect(() => {
    if (chamberSchedule?.expected_measure) {
      const timerId = window.setTimeout(() => chamberScheduleRefetch(), 30000)
      if (!edited) {
        setEditableChamberSchedule(chamberSchedule.expected_measure)
      }
      return () => window.clearTimeout(timerId)
    } else {
      return
    }
  }, [edited, chamberSchedule?.expected_measure, chamberScheduleRefetch])

  useEffect( () => {
    if (!editableChamberSchedule) {
      if (chamberSchedule?.expected_measure)
        setEditableChamberSchedule([...chamberSchedule?.expected_measure]);
    }
  }, [editableChamberSchedule, chamberSchedule])

  const isConfigChanged = (newConfig: ExpectedMeasure[]) => {
    setEditableChamberSchedule([...newConfig]);
    if (!chamberSchedule?.expected_measure) {
      setEdited(false);
      return
    }

    if (chamberSchedule.expected_measure?.length !== newConfig.length) {
      setEdited(true);
      return
    }

    for (let idx=0; idx < chamberSchedule?.expected_measure?.length; idx++) {
      const csem = [chamberSchedule.expected_measure[idx].end_hour,
      chamberSchedule.expected_measure[idx].end_minute, chamberSchedule.expected_measure[idx].expected_value]
      const ecsem = [newConfig[idx].end_hour,
      newConfig[idx].end_minute, newConfig[idx].expected_value]
      if (JSON.stringify(csem) !== JSON.stringify(ecsem)){
        setEdited(true);
        return
      }
    }
    setEdited(false);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Heading>GrowCab</Heading>
      </header>
      <div>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly' }}>{
          chamberUnits.data?.map((unit, idx) => (
            (chamberSchedule?.expected_measure) ?
              <DisplayDials key={'dial-' + idx} expected_measures={
                chamberSchedule.expected_measure?.filter(
                  (expected_measure) => (expected_measure.unit_id === unit.id),
                )} current_measure={chamberStatus?.find((unit_measure) => (
                unit_measure.sensor_unit?.unit?.id === unit.id
              ))}
              /> :
              <p key={'ldial' + idx}>loading...</p>),
          )
        }
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly' }}>
          {
            (chamberUnits.loading || !editableChamberSchedule) ? <p>loading...</p> :
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
                          key={'editable_interval_component-'+expected_measure.unit_id+'-'+idx}
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
        <Center padding={5} h={"200px"}>
          <Button size={"lg"} color={!edited ? "gray" : "teal"}
                  disabled={!edited}
                  onClick={saveModalOnOpen}>Save changes</Button>
        </Center>
      </div>
      <StoreConfigurationModal open={saveModalIsOpen} onClose={saveModalOnClose} onSubmit={storeNewConfiguration}
                               onClick={resetEditable} />
    </div>
  )
}

export default App
