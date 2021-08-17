import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function Efforts(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 8 8"
      {...props}
    >
      <Circle data-name="Ellipse 49" cx={4} cy={4} r={4} fill="#fb2" />
    </Svg>
  )
}

export default Efforts
