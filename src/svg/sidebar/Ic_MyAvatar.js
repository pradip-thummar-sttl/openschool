import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function Ic_MyAvatar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      {...props}
    >
      <G data-name="My Avatar" transform="translate(-57.206 -423)">
        <Circle
          data-name="Ellipse 262"
          cx={12.5}
          cy={12.5}
          r={12.5}
          transform="translate(57.206 423)"
          fill="#d7a0ff"
        />
        <Path
          data-name="Path 3218"
          d="M76.593 437.201a7.026 7.026 0 01-7.193 6.845 7.026 7.026 0 01-7.194-6.845z"
          fill="#6d2cff"
          stroke="#6d2cff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          data-name="Path 3220"
          d="M64.053 441.704a7.51 7.51 0 014.852-1.775 7.509 7.509 0 014.9 1.82 6.389 6.389 0 01-4.859 2.375 6.4 6.4 0 01-4.893-2.42z"
          fill="#fff"
        />
        <Circle
          data-name="Ellipse 263"
          cx={2}
          cy={2}
          r={2}
          transform="translate(62.206 430.139)"
          fill="#6d2cff"
        />
        <Circle
          data-name="Ellipse 264"
          cx={2}
          cy={2}
          r={2}
          transform="translate(72.858 430.139)"
          fill="#6d2cff"
        />
      </G>
    </Svg>
  )
}

export default Ic_MyAvatar
