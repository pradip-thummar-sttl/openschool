import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function Ic_Calendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.664}
      height={18.801}
      viewBox="0 0 18.664 18.801"
      {...props}
    >
      <G
        data-name="calendar (8)"
        transform="translate(.8 .8)"
        fill="none"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      >
        <Rect
          data-name="Rectangle 16895"
          width={17.064}
          height={15.705}
          rx={2}
          transform="translate(0 1.496)"
        />
        <Path data-name="Line 157" d="M11.376 0v2.993" />
        <Path data-name="Line 158" d="M5.55 0v2.993" />
        <Path data-name="Line 159" d="M0 7.172h17.064" />
      </G>
    </Svg>
  )
}

export default Ic_Calendar