import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Bronze(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 37.7 36.154"
      {...props}
    >
      <Path
        data-name="bronze-unselected"
        d="M36.085 14.022a2.451 2.451 0 00-2.144-1.522l-8.969-1.3-4.012-8.131A2.45 2.45 0 0018.85 1.5a2.451 2.451 0 00-2.111 1.569L12.728 11.2l-8.97 1.3a2.45 2.45 0 00-2.144 1.522 2.451 2.451 0 00.84 2.492l6.49 6.326-1.532 8.934a2.581 2.581 0 00.453 2.2 1.942 1.942 0 001.516.679 3.127 3.127 0 001.447-.4l8.022-4.218 8.023 4.218a3.13 3.13 0 001.447.4h0a1.942 1.942 0 001.516-.679 2.58 2.58 0 00.452-2.2l-1.532-8.933 6.49-6.326a2.45 2.45 0 00.839-2.493z"
        fill="none"
        stroke="#e9aa6e"
        strokeWidth={3}
      />
    </Svg>
  )
}

export default Bronze
