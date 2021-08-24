import { Measure, Unit } from './Api_spec/generated-types'
import React from 'react'
// import { interpolateBlues, PieArcDatum } from 'd3'

export const DisplayUnit = ({
  current_measure,
  unit
}: { current_measure: Measure | undefined, unit: Unit}
) => {
  const svgHeight = 110
  const svgWidth = 300
  const translateHelper = `translate(${svgWidth / 2}, ${svgHeight / 2})`
  return (
    <svg width={svgWidth} height={svgHeight}>
      <text fontWeight={'bold'} fontSize={'1.5rem'} transform={translateHelper} textAnchor={'middle'}>
        {unit.label}: {((current_measure?.current_value.toFixed(0) || '') + ' ' + (current_measure?.sensor_unit?.unit?.description)) || ''}
      </text>
    </svg>
  )
}
