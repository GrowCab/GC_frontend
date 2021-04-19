import { ExpectedMeasure } from './Api_spec/generated-types'
import React from 'react'

function getTimeString(hour: number, minute: number) {
  return String(hour).padStart(2, '0') + ':' + String(minute).padStart(2, '0')
}

export const EditableInterval = ({ add_interval, time_change, value_change, expected_measure, idx, expected_measures }:
                                   {
                                     add_interval?: (id: ExpectedMeasure, mid_minutes: number) => void,
                                     time_change?: (id: number | undefined, new_value: String) => void,
                                     value_change?: (id: number | undefined, new_value: number) => void,
                                     expected_measure: ExpectedMeasure,
                                     idx: number,
                                     expected_measures: ExpectedMeasure[]
                                   }) => {

  const start_min = (idx===0) ? 0 : expected_measures[idx - 1].end_minute;
  const start_hour = (idx===0) ? 0 : expected_measures[idx - 1].end_hour;

  return (
    <div id={'interval-' + idx} key={expected_measure.id}>
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
      <button
        disabled={
          ( expected_measure.end_hour*100+expected_measure.end_minute -
          start_hour*100+start_min < 15)
        }
        onClick={e => {
        const mid_minutes = Math.round((start_hour * 60) + start_min) +
          Math.round(((expected_measure.end_hour - start_hour) * 60 + (expected_measure.end_minute - start_min))/2);
        if (add_interval)
          add_interval(expected_measure, mid_minutes)
      }}>+</button>
    </div>
  )
}