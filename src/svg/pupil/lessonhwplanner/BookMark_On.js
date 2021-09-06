import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BookMarkOn(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 16.11 18.677"
      {...props}
    >
      <Path
        data-name="bookmark-on"
        d="M14.897.7H1.212a.485.485 0 00-.512.453v15.9a.9.9 0 00.556.806 1.137 1.137 0 001.065-.07l5.734-3.633 5.734 3.633a1.139 1.139 0 001.065.069.9.9 0 00.556-.805v-15.9A.485.485 0 0014.897.7zm0 0"
        fill="#00a36b"
        stroke="#00a36b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
      />
    </Svg>
  )
}

export default BookMarkOn
