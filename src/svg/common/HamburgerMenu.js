import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HamburgerMenu(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 20 14.283"
      {...props}
    >
      <Path
        d="M1.428 14.283a1.428 1.428 0 010-2.857h17.144a1.428 1.428 0 110 2.857zm0-5.713a1.428 1.428 0 010-2.857h17.144a1.428 1.428 0 110 2.857zm0-5.713a1.428 1.428 0 010-2.857h17.144a1.428 1.428 0 110 2.857z"
        fill="#262626"
      />
    </Svg>
  )
}

export default HamburgerMenu
