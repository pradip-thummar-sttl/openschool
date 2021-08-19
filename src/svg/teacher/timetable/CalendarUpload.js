import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function CalendarUpload(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 42 42"
      {...props}
    >
      <G
        fill="none"
        stroke="#dcdce2"
        strokeMiterlimit={10}
        transform="translate(1 1)"
      >
        <Rect width={40} height={40} rx={8} stroke="none" />
        <Rect x={-0.5} y={-0.5} width={41} height={41} rx={8.5} />
      </G>
      <Path
        data-name="Path 3230"
        d="M14.391 30.088a2.253 2.253 0 01-2.251-2.25v-11.25a2.253 2.253 0 012.251-2.25h.75v-1.5a.751.751 0 01.751-.75h.749a.75.75 0 01.75.75v1.5h7.5v-1.5a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v1.5h.75a2.253 2.253 0 012.25 2.25v11.25a2.253 2.253 0 01-2.25 2.25zm-.751-2.25a.751.751 0 00.751.75h13.5a.751.751 0 00.75-.75v-8.22h-15zm6.75-.75v-3h-1.687a.563.563 0 01-.413-.945l2.438-2.625a.564.564 0 01.825 0l2.437 2.625a.562.562 0 01-.412.945H21.89v3a.75.75 0 11-1.5 0z"
        fill="#262626"
      />
    </Svg>
  )
}

export default CalendarUpload
