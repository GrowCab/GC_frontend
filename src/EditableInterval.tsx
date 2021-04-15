import { ExpectedMeasure } from './Api_spec/generated-types'
import React from 'react'

function getTimeString(hour: number, minute: number) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
}

export const EditableInterval = ({ time_change, value_change, expected_measure, idx, expected_measures }:
                                   {
                                     time_change?: (id: number | undefined, new_value: String) => void,
                                     value_change?: (id: number | undefined, new_value: number) => void,
                                     expected_measure: ExpectedMeasure,
                                     idx: number,
                                     expected_measures: ExpectedMeasure[]
                                   }) => {

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