import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function CalendarTop(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 42 42"
      {...props}
    >
      <G fill="none">
        <G stroke="#dcdce2" strokeMiterlimit={10} transform="translate(1 1)">
          <Rect width={40} height={40} rx={8} stroke="none" />
          <Rect x={-0.5} y={-0.5} width={41} height={41} rx={8.5} />
        </G>
        <G
          data-name="calendar (8)"
          transform="translate(12.54 12.559)"
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
      </G>
    </Svg>
  )
}

export default CalendarTop
