import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function MicOn(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      {...props}
    >
      <G fill="none">
        <Path d="M0 0h24v24H0z" />
        <Path d="M0 0h24v24H0z" />
        <Path d="M0 0h24v24H0z" />
      </G>
      <Path fill="#000" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
      <Path fill="#000" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </Svg>
  )
}

export default MicOn
