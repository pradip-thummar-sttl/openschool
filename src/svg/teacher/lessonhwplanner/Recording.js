import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function Recording(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18 18"
      {...props}
    >
      <Circle cx={9} cy={9} r={9} fill="#fad7ce" />
      <Circle
        data-name="start-recording-icon"
        cx={4.5}
        cy={4.5}
        r={4.5}
        transform="translate(4.5 4.5)"
        fill="#ff200d"
      />
    </Svg>
  )
}

export default Recording
