import { ExpectedMeasure } from './Api_spec/generated-types'
import React from 'react'
import { Button, Input, InputGroup } from '@chakra-ui/react'

function getTimeString (hour: number, minute: number) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
}

export const EditableInterval = ({ add_interval, del_interval, time_change, value_change, expected_measure, idx, expected_measures }:
                                   {
                                     add_interval?: (id: ExpectedMeasure, mid_minutes: number) => void,
                                     del_interval?: (id: ExpectedMeasure) => void,
                                     time_change?: (id: ExpectedMeasure | undefined, new_value: string) => void,
                                     value_change?: (id: ExpectedMeasure | undefined, new_value: number) => void,
                                     expected_measure: ExpectedMeasure,
                                     idx: number,
                                     expected_measures: ExpectedMeasure[]
                                   }) => {
  const start_min = (idx === 0) ? 0 : expected_measures[idx - 1].end_minute
  const start_hour = (idx === 0) ? 0 : expected_measures[idx - 1].end_hour

  return (
    <div id={'interval-' + idx} key={expected_measure.id}>
      <InputGroup padding={2} alignItems={'center'}>
      <Input
        disabled={true}
        value={idx === 0
          ? getTimeString(0, 0)
          : getTimeString(expected_measures[idx - 1].end_hour, expected_measures[idx - 1].end_minute)} />
      <Input m={1}
        type='time'
             onChange={e => {
               if (time_change) { time_change(expected_measure, e.target.value) }
             }}
             value={getTimeString(expected_measure.end_hour, expected_measure.end_minute)} />
        <Input m={1}
          type='text' onChange={e => {
            if (value_change) { value_change(expected_measure, Number(e.target.value)) }
          }} value={expected_measure.expected_value} />{expected_measure.unit?.description}
        <Button
          m={1}
          colorScheme={'teal'}
          disabled={
            (expected_measure.end_hour * 100 + expected_measure.end_minute -
            start_hour * 100 + start_min < 15)
          }
          onClick={() => {
            const mid_minutes = Math.round((start_hour * 60) + start_min) +
            Math.round(((expected_measure.end_hour - start_hour) * 60 + (expected_measure.end_minute - start_min)) / 2)
            if (add_interval) { add_interval(expected_measure, mid_minutes) }
          }}>+</Button>
        <Button
          colorScheme={'red'}
          disabled={idx === expected_measures.length - 1} onClick={() => {
            if (del_interval) { del_interval(expected_measure) }
          }}>-</Button>
      </InputGroup>
    </div>
  )
}
