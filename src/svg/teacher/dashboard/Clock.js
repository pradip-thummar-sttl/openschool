import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function Clock(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 13.6 13.6"
      {...props}
    >
      <G
        data-name="clock (2)"
        transform="translate(.8 .8)"
        fill="none"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      >
        <Circle data-name="Ellipse 104" cx={6} cy={6} r={6} />
        <Path data-name="Path 703" d="M5.776 2.106v3.982l2.655 1.327" />
      </G>
    </Svg>
  )
}

export default Clock
