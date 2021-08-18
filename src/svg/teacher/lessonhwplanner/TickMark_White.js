import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TickMarkWhite(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 14.462 10.097"
      {...props}
    >
      <Path
        data-name="Path 3293"
        d="M13.676.825a1.042 1.042 0 00-1.473-.039l-6.65 6.307-3.172-3.257A1.042 1.042 0 00.889 5.29l3.889 3.993a1.042 1.042 0 001.463.029l7.4-7.014a1.042 1.042 0 00.035-1.473z"
        fill="#fff"
        stroke="#fff"
      />
    </Svg>
  )
}

export default TickMarkWhite
