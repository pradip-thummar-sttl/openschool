import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PlayBlue(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18 18"
      {...props}
    >
      <Path
        data-name="play-icon"
        d="M9 0a9 9 0 109 9 9.01 9.01 0 00-9-9zm3.578 9.315l-5.25 3.375a.375.375 0 01-.578-.315v-6.75a.375.375 0 01.578-.315l5.25 3.375a.375.375 0 010 .631z"
        fill="#50a7f0"
      />
    </Svg>
  )
}

export default PlayBlue
