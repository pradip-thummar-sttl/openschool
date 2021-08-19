import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BronzeFill(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 34.655 33.154"
      {...props}
    >
      <Path
        d="M34.563 12.522A2.451 2.451 0 0032.419 11L23.45 9.7l-4.012-8.131A2.45 2.45 0 0017.328 0a2.451 2.451 0 00-2.111 1.569L11.206 9.7 2.236 11a2.45 2.45 0 00-2.144 1.522 2.451 2.451 0 00.84 2.492l6.49 6.326-1.532 8.934a2.581 2.581 0 00.453 2.2 1.942 1.942 0 001.516.679 3.127 3.127 0 001.447-.4l8.022-4.218 8.023 4.218a3.13 3.13 0 001.447.4 1.942 1.942 0 001.516-.679 2.58 2.58 0 00.452-2.2l-1.532-8.933 6.49-6.326a2.45 2.45 0 00.839-2.493z"
        fill="#e9aa6e"
      />
    </Svg>
  )
}

export default BronzeFill
