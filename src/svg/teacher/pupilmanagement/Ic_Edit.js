import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Ic_Edit(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 14.582 14.582"
      {...props}
    >
      <Path
        data-name="edit"
        d="M10.33 1.529a1.925 1.925 0 112.723 2.723L4.43 12.874l-3.63.912.908-3.63z"
        fill="none"
        stroke="#50a7f0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
    </Svg>
  )
}

export default Ic_Edit