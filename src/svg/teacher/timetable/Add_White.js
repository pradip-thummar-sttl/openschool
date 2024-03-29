import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AddWhite(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 12.4 12.4"
      {...props}
    >
      <Path
        data-name="add"
        d="M4.914 10.915V7.486H1.486a1.286 1.286 0 110-2.571h3.428V1.486a1.286 1.286 0 112.571 0v3.428h3.429a1.286 1.286 0 010 2.571H7.486v3.429a1.286 1.286 0 01-2.571 0z"
        fill={ props?.fill ? "#008000" : '#fff'}
        stroke="#fff"
        strokeWidth={0.4}
      />
    </Svg>
  )
}

export default AddWhite
