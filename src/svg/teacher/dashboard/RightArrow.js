import * as React from "react"
import Svg, { Path } from "react-native-svg"

function RightArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 7.979 12"
      {...props}
    >
      <Path
        d="M.292 1.463a.775.775 0 010-1.212 1.116 1.116 0 011.411 0l5.984 5.143a.773.773 0 01.03 1.185l-5.486 5.143a1.115 1.115 0 01-1.409.053.775.775 0 01-.061-1.211l4.84-4.538z"
        fill="#262626"
      />
    </Svg>
  )
}

export default RightArrow
