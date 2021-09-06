import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function Notification(props) {
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
        data-name="bell (3)"
        d="M28.981 26.51h-.809v-5.66A7.29 7.29 0 0023 13.883a2.345 2.345 0 10-4.2 0 7.29 7.29 0 00-5.183 6.967v5.66h-.808a.809.809 0 000 1.617h4.128a3.888 3.888 0 003.8 3.073h.323a3.888 3.888 0 003.8-3.073h4.128a.809.809 0 000-1.617zm-8.814-13.665a.728.728 0 11.728.728.729.729 0 01-.728-.728zm.889 16.738h-.323a2.268 2.268 0 01-2.115-1.456h4.553a2.268 2.268 0 01-2.115 1.456zm-5.822-3.073v-5.66a5.66 5.66 0 0111.321 0v5.66zm0 0"
        fill="#262626"
      />
    </Svg>
  )
}

export default Notification
