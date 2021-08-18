import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Ic_Search(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 14.036 14.037"
      {...props}
    >
      <Path
        data-name="icon"
        d="M10.401 10.4l3 3zm-9.5-4a5.5 5.5 0 015.5-5.5 5.5 5.5 0 015.5 5.5 5.5 5.5 0 01-5.5 5.5 5.5 5.5 0 01-5.5-5.5z"
        fill="none"
        stroke="#50a7f0"
        strokeLinecap="round"
        strokeWidth={1.8}
      />
    </Svg>
  )
}

export default Ic_Search