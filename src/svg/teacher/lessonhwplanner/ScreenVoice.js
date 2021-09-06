import * as React from "react"
import Svg, { Circle, Rect, Path } from "react-native-svg"

function ScreenVoice(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 86 86"
      {...props}
    >
      <Circle data-name="Ellipse 380" cx={43} cy={43} r={43} fill="#ffe265" />
      <Rect
        data-name="Rectangle 17343"
        width={52}
        height={38}
        rx={2}
        transform="translate(17 22)"
        fill="#fff"
      />
      <Rect
        data-name="Rectangle 17341"
        width={21}
        height={12}
        rx={1}
        transform="translate(21 31)"
        fill="#ffb100"
      />
      <Path
        data-name="Path 3499"
        d="M22 53a1 1 0 110-2h19a1 1 0 110 2zm0-4a1 1 0 110-2h19a1 1 0 110 2z"
        fill="#d5dbea"
      />
      <Rect
        data-name="Rectangle 17342"
        width={21}
        height={12}
        rx={1}
        transform="translate(44 31)"
        fill="#fc2"
      />
      <Circle
        data-name="Ellipse 381"
        cx={10.5}
        cy={10.5}
        r={10.5}
        transform="translate(54 47)"
        fill="#00b476"
      />
      <Path
        data-name="Path 3264"
        d="M63.958 65.49v-1.566a5.037 5.037 0 01-4.525-4.452.507.507 0 01.448-.559.513.513 0 01.559.448 4.05 4.05 0 004.025 3.6 4.05 4.05 0 004.025-3.6.511.511 0 01.558-.448.507.507 0 01.448.559 5.035 5.035 0 01-4.525 4.453v1.566a.506.506 0 01-.506.506.506.506 0 01-.507-.507zm-2.015-7.5v-2.984a2.68 2.68 0 012.526-2.81 2.68 2.68 0 012.526 2.81v2.984a2.617 2.617 0 01-2.526 2.738 2.616 2.616 0 01-2.526-2.735z"
        fill="#a1f4b1"
        stroke="#a1f4b1"
        strokeWidth={0.4}
      />
    </Svg>
  )
}

export default ScreenVoice
