import React, { useEffect, useState } from 'react'
import './App.css'
import {
  Configuration,
  ExpectedMeasure,
  useGetChamberSchedule,
  useGetChamberStatus,
  useGetChamberUnits,
  usePutConfiguration
} from './Api_spec/generated-types'
import { EditableInterval } from './EditableInterval'
import { DisplayDials } from './DisplayDials'
import { DisplayUnit } from './DisplayUnit'
import { Box, Button, Center, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import { StoreConfigurationModal } from './StoreConfigurationModal'
import { PowerOffModal } from './PowerOffModal'

const App: React.FC = () => {
  const { isOpen: saveModalIsOpen, onOpen: saveModalOnOpen, onClose: saveModalOnClose } = useDisclosure()
  const { isOpen: powerOffModalIsOpen, onOpen: powerOffModalOnOpen, onClose: powerOffModalOnClose } = useDisclosure()
  const { data: chamberSchedule, refetch: chamberScheduleRefetch } = useGetChamberSchedule({ chamber_id: 1 })
  const [edited, setEdited] = useState<boolean | undefined>(false)

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
    const newConfiguration: Configuration = {
      description: e.target.description.value,
      chamber_id: 1,
      expected_measure: []
    }
    editableChamberSchedule?.forEach((expected) => {
      if (newConfiguration.expected_measure) {
        newConfiguration.expected_measure.push({
          unit_id: expected.unit_id,
          expected_value: expected.expected_value,
          end_hour: expected.end_hour,
          end_minute: expected.end_minute
        })
      }
    })

    await putConfiguration.mutate(newConfiguration).then(async (r) => {
      console.log('Saving new configuration')
      setEditableChamberSchedule(r.expected_measure || [])
      await chamberScheduleRefetch()
      console.log('Saved new configuration')
    }, async (r) => {
      alert('Error saving the data. Make sure the intervals are in order')
      console.log('Error!')
      console.log(r)
    })

    saveModalOnClose()
    setEdited(false)
  }

  const isConfigChanged = (newConfig: ExpectedMeasure[]) => {
    setEditableChamberSchedule([...newConfig])
    if (!chamberSchedule?.expected_measure) {
      setEdited(false)
      return
    }

    if (chamberSchedule.expected_measure?.length !== newConfig.length) {
      setEdited(true)
      return
    }

    for (let idx = 0; idx < chamberSchedule?.expected_measure?.length; idx++) {
      const csem = [chamberSchedule.expected_measure[idx].end_hour,
        chamberSchedule.expected_measure[idx].end_minute, chamberSchedule.expected_measure[idx].expected_value]
      const ecsem = [newConfig[idx].end_hour,
        newConfig[idx].end_minute, newConfig[idx].expected_value]
      if (JSON.stringify(csem) !== JSON.stringify(ecsem)) {
        setEdited(true)
        return
      }
    }
    setEdited(false)
  }
  const handleDelInterval = (expected_measure: ExpectedMeasure) => {
    let newSchedule: ExpectedMeasure[] = []

    if (editableChamberSchedule) { newSchedule = [...editableChamberSchedule] }

    newSchedule = newSchedule.filter((expected) => (
      expected !== expected_measure
    ))

    isConfigChanged([...newSchedule])
  }

  const handleAddInterval = (expected_measure: ExpectedMeasure, minutes_since_start_of_day: number) => {
    let newSchedule: ExpectedMeasure[] = []

    if (editableChamberSchedule) { newSchedule = [...editableChamberSchedule] }

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
      end_minute: Math.round(min)
    }

    if (insertionPoint !== undefined && insertionPoint >= 0) {
      newSchedule.splice(insertionPoint, 0, newItem)
    }

    isConfigChanged([...newSchedule])
  }

  const handleValueChange = (changed_measure: ExpectedMeasure | undefined, new_value: number) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
      if (expected === changed_measure) {
        const updatedItem: ExpectedMeasure = {
          ...expected,
          expected_value: new_value
        }
        return updatedItem
      }
      return expected
    })
    if (newSchedule) {
      isConfigChanged([...newSchedule])
    }
  }

  const handleTimeChange = (changed_measure: ExpectedMeasure | undefined, new_value: string) => {
    const newSchedule = editableChamberSchedule?.map((expected) => {
      if (expected === changed_measure) {
        const updatedItem: ExpectedMeasure = {
          ...expected,
          end_minute: Number(new_value.slice(3, 5)),
          end_hour: Number(new_value.slice(0, 2))
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
      const timerId = window.setTimeout(() => refetchChamberStatus(), 5000)
      return () => window.clearTimeout(timerId)
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
    }
  }, [edited, chamberSchedule?.expected_measure, chamberScheduleRefetch])

  useEffect(() => {
    if (!editableChamberSchedule) {
      if (chamberSchedule?.expected_measure) { setEditableChamberSchedule([...chamberSchedule?.expected_measure]) }
    }
  }, [editableChamberSchedule, chamberSchedule])

  const rebootAction = () => {
    console.log('Reboot')
  }

  const powerOffAction = () => {
    console.log('Power Off')
  }

  return (
    <Box className='App'>
      <header className='App-header'>
        <Heading width={'90%'}>GrowCab</Heading>
        <Button onClick={powerOffModalOnOpen} colorScheme={'red'}><Text size={'4xl'}>⏻</Text></Button>
      </header>
      {
        (chamberUnits.data && chamberSchedule && chamberSchedule.expected_measure)
          ? (
            <Box>
              <Flex>
                <Flex alignItems={'stretch'} justifyContent={'space-evenly'} flexWrap={'wrap'}>{
                  chamberUnits.data.filter((unit) => unit.controllable).map((unit, idx) => (
                    <Flex alignItems={'center'} key={'unit_flex-' + idx} direction={'column'} flexFlow={'vertical'}
                          alignContent={'center'}>
                      <Text key={'text-' + idx} fontWeight={'bold'} fontSize={'2rem'}>{unit.label}</Text>
                      <DisplayDials key={'dial-' + idx} expected_measures={
                        chamberSchedule.expected_measure!.filter(
                          (expected_measure) => (expected_measure.unit_id === unit.id)
                        )} current_measure={chamberStatus?.sensor_measure?.find((unit_measure) => (
                          unit_measure.sensor_unit?.unit?.id === unit.id
                        ))}
                      />
                      {editableChamberSchedule?.filter((expected_measure) => (
                        expected_measure.unit_id === unit.id
                      )).map((expected_measure, emidx, expected_measures) => (
                        <EditableInterval
                          time_change={handleTimeChange}
                          value_change={handleValueChange}
                          add_interval={handleAddInterval}
                          del_interval={handleDelInterval}
                          expected_measure={expected_measure}
                          idx={emidx}
                          key={'editable_interval_component-' + expected_measure.unit_id + '-' + emidx}
                          expected_measures={expected_measures} />
                      ))}
                    </Flex>))
                  }
                </Flex>
                <Flex flexWrap={'wrap'} flexDirection={'column'} justifyContent={'start'} alignContent={'start'}>
                  {chamberUnits.data.filter((unit) => !unit.controllable).map((unit, idx) => (
                    <DisplayUnit key={'unit-' + idx}
                        current_measure={chamberStatus?.sensor_measure?.find((unit_measure) => (
                          unit_measure.sensor_unit?.unit?.id === unit.id
                        ))}
                        unit={unit}
                    />
                  )) }
                  <Text fontSize={'2xl'}>Last measurement:</Text>
                  <Text fontSize={'2xl'} paddingBottom={'2em'}>{chamberStatus?.timestamp?.replace('T', ' ').slice(0, 19)}</Text>
                </Flex>
              </Flex>
              <Center padding={5}>
                <Button size={'lg'} color={!edited ? 'gray' : 'teal'}
                        disabled={!edited}
                        onClick={saveModalOnOpen}>Save changes</Button>
              </Center>
            </Box>
            )
          : <p>loading...</p>
      }
      <StoreConfigurationModal open={saveModalIsOpen} onClose={saveModalOnClose} onSubmit={storeNewConfiguration}
                               onClick={resetEditable} />
      <PowerOffModal open={powerOffModalIsOpen} onClose={powerOffModalOnClose}
                     onReboot={rebootAction} onPowerOff={powerOffAction}/>
    </Box>
  )
}

export default App
