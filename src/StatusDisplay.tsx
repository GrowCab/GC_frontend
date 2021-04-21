import { ExpectedMeasure, Measure } from './Api_spec/generated-types'
import React, { createRef, useEffect } from 'react'
import * as d3 from "d3"

/**
 * Component to render the current chamber status (Sensor values) and the current configuration
 * (ExpectedMeasures)
 *
 * TODO: Pass in the ExpectedMeasures and add the rendering of the dials
 * @param sensor_status
 */
export const StatusDisplay = ({
                                sensor_status,
                                expected_measures,
                              }: { sensor_status: Measure[] | null, expected_measures: ExpectedMeasure[] }) => {

  const svgRef = createRef<SVGSVGElement>()

  useEffect(() => {
  })

  return (
    <div>
      {
        sensor_status?.map((status, idx) => (
          <p key={'status-' + idx}>{status.current_value} {status.sensor_unit?.unit?.description}</p>
        ))
      }
    </div>
  )

}