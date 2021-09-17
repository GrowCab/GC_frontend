import { SensorMeasure, Unit } from './Api_spec/generated-types'
import React from 'react'
import { Text } from '@chakra-ui/react'

export const DisplayUnit = ({
  current_measure,
  unit
}: { current_measure: SensorMeasure | undefined, unit: Unit}
) => {
  return (
      <Text fontSize={'2xl'} paddingBottom={'1em'}>{unit.label + ':'} {current_measure?.current_value.toFixed(0) || '' + ' ' + current_measure?.sensor_unit?.unit?.description || ''}</Text>
  )
}
