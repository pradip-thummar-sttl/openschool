import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function Calender(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 13.094 13.86"
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
          width={11.494}
          height={11.252}
          rx={2}
          transform="translate(0 1.008)"
        />
        <Path data-name="Line 157" d="M7.662 0v2.016" />
        <Path data-name="Line 158" d="M3.065 0v2.016" />
        <Path data-name="Line 159" d="M0 4.831h11.494" />
      </G>
    </Svg>
  )
}

export default Calender
