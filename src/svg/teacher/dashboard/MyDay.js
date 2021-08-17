import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function MyDay(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 31 31"
      {...props}
    >
      <G
        transform="translate(2 2.237)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Circle
          data-name="Ellipse 267"
          cx={5.5}
          cy={5.5}
          r={5.5}
          transform="translate(8 7.763)"
          strokeWidth={3.4}
        />
        <Path data-name="Line 215" strokeWidth={4} d="M14 1.763v-2" />
        <Path
          data-name="Line 216"
          strokeWidth={4}
          d="M4.805 4.813l-.792-.792"
        />
        <Path data-name="Line 217" strokeWidth={4} d="M1 13.763H0" />
        <Path
          data-name="Line 218"
          strokeWidth={4}
          d="M4.805 21.701l-.792.792"
        />
        <Path data-name="Line 219" strokeWidth={4} d="M14 25.763v1" />
        <Path
          data-name="Line 220"
          strokeWidth={4}
          d="M21.692 21.701l.792.792"
        />
        <Path data-name="Line 221" strokeWidth={4} d="M25 13.763h2" />
        <Path
          data-name="Line 222"
          strokeWidth={4}
          d="M21.692 4.813l.792-.792"
        />
      </G>
    </Svg>
  )
}

export default MyDay
