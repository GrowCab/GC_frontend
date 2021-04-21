import { arc, pie } from 'd3-shape'
import { ExpectedMeasure } from './Api_spec/generated-types'
import React from 'react'
import { interpolateBlues, PieArcDatum } from 'd3'


export const DisplayDials = ({ expected_measures }: {expected_measures: ExpectedMeasure[]}) => {

  const svgHeight = 300
  const svgWidth = 300

  const pieHelper = pie<ExpectedMeasure>().value((d) => d.end_hour*100+d.end_minute)
    .sort(null
      /*(a, b) => (a.end_hour*100+a.end_minute - b.end_hour*100+b.end_minute)*/
  )

  const arcGenerator = arc<PieArcDatum<ExpectedMeasure>>()
    .outerRadius(svgHeight/2 * 0.95)
    .innerRadius(svgHeight/2 * 0.60)
    .padAngle(0.04)

  const translateHelper = `translate(${svgWidth/2}, ${svgHeight/2})`

  return (
    <div>
      <svg width={svgWidth} height={svgHeight}>
        <g transform={translateHelper}>
          {pieHelper(expected_measures).map((datum, i) => {
            const [x, y] = arcGenerator.centroid(datum);
            return (
              <g>
              <text textAnchor={"middle"} alignmentBaseline={"middle"} fill={"#fffff"}
                    d={String(datum.data.expected_value) + " " + (datum.data.unit?.description|| "")}
                    // x={x}
                    // y={y}
                    transform={`translate(${x}, ${y})`}/>
              <path d={arcGenerator(datum) || ""} fill={interpolateBlues(datum.data.expected_value)}/>
              </g>
            )
          })}
          {pieHelper(expected_measures).map((d, i) => (
            <g>
              <path d={arcGenerator(d) || ""} fill={interpolateBlues(d.data.expected_value)}/>
              <text d={d.data.expected_value + (d.data.unit?.description || "")} fill={"white"}/>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}