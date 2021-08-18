import * as React from "react"
import Svg, { Circle, Rect, Path } from "react-native-svg"

function NewLesson(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 86 86"
      {...props}
    >
      <Circle data-name="Ellipse 383" cx={43} cy={43} r={43} fill="#a0daff" />
      <Rect
        data-name="Rectangle 17343"
        width={52}
        height={38}
        rx={2}
        transform="translate(17 22)"
        fill="#fff"
      />
      <Path
        data-name="Rectangle 17351"
        d="M19 22h25v38H19a2 2 0 01-2-2V24a2 2 0 012-2z"
        fill="#eff2f8"
      />
      <Rect
        data-name="Rectangle 17341"
        width={19}
        height={12}
        rx={1}
        transform="translate(21 31)"
        fill="#ffd626"
      />
      <Rect
        data-name="Rectangle 17344"
        width={19}
        height={2}
        rx={1}
        transform="translate(21 47)"
        fill="#c5cdde"
      />
      <Rect
        data-name="Rectangle 17345"
        width={19}
        height={2}
        rx={1}
        transform="translate(21 51)"
        fill="#c5cdde"
      />
      <Rect
        data-name="Rectangle 17342"
        width={18}
        height={20}
        rx={1}
        transform="translate(47 36)"
        fill="#e2ebf2"
      />
      <Path
        data-name="Path 3271"
        d="M57.276 22v8.215l3.813-2.241 3.119 2.241V22z"
        fill="#88baff"
        stroke="#87baff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default NewLesson
