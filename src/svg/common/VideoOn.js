import * as React from "react"
import Svg, { Path } from "react-native-svg"

function VideoOn(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path fill="#000" d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z" />
    </Svg>
  )
}

export default VideoOn
