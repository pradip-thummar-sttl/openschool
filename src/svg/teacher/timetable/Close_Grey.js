import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CloseGrey(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18.385 18.385"
      {...props}
    >
      <Path
        data-name="close-small"
        d="M4.595 11.82l2.627-2.628-2.626-2.626a1.393 1.393 0 111.97-1.97l2.626 2.626 2.626-2.626a1.393 1.393 0 111.97 1.97l-2.626 2.626 2.627 2.627a1.393 1.393 0 01-1.97 1.97l-2.627-2.627-2.627 2.627a1.393 1.393 0 01-1.97-1.97z"
        fill="#9598ac"
      />
    </Svg>
  )
}

export default CloseGrey
