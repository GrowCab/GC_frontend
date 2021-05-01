import { arc, pie } from 'd3-shape'
import { ExpectedMeasure, Measure } from './Api_spec/generated-types'
import React from 'react'
import { interpolateBlues, PieArcDatum } from 'd3'


export const DisplayDials = ({
                               expected_measures,
                               current_measure,
                             }: { expected_measures: ExpectedMeasure[], current_measure: Measure | undefined }) => {

  const svgHeight = 300
  const svgWidth = 300

  const pieHelper = pie<ExpectedMeasure>().value((d) => d.end_hour * 100 + d.end_minute)
  const outerRadius = svgHeight / 2 * 0.95
  const innerRadius = svgHeight / 2 * 0.60
  const arcGenerator = arc<PieArcDatum<ExpectedMeasure>>()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius)
    .padAngle(0.04)

  const translateHelper = `translate(${svgWidth / 2}, ${svgHeight / 2})`
  const t = new Date()
  const arrowAngle = (((t.getHours() * 60 + t.getMinutes()) / 1440) * 360 * Math.PI / 180) - Math.PI / 2

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={translateHelper}>
        {pieHelper(expected_measures).map((datum, i) => {
          const [x, y] = arcGenerator.centroid(datum)
          return (
            <g key={'arc-' + datum.data.unit_id + '-' + i}>
              <path d={arcGenerator(datum) || ''} fill={interpolateBlues(datum.data.expected_value / 75)} />
              <text textAnchor={'middle'} fill={'#000000'}
                    transform={`translate(${x}, ${y})`}>
                {
                  String(datum.data.expected_value) + ' ' + (
                    (datum.data.unit?.description === 'hum') ? '%' : datum.data.unit?.description || ''
                  )
                }
              </text>
            </g>
          )
        })}
      </g>
      <text transform={translateHelper} textAnchor={'middle'}>
        {((current_measure?.current_value || '') + ' ' + (current_measure?.sensor_unit?.unit?.description)) || ''}
      </text>
      <line transform={translateHelper}
            x1={0.25 * innerRadius * Math.cos(arrowAngle)}
            y1={0.25 * innerRadius * Math.sin(arrowAngle)}
            x2={outerRadius * Math.cos(arrowAngle)}
            y2={outerRadius * Math.sin(arrowAngle)}
            stroke='black' />
    </svg>
  )
}