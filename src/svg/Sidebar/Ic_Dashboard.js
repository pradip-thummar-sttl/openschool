import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"

function Ic_Dashboard(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 26 25"
      {...props}
    >
      <G>
        <Path
          data-name="Path 3163"
          d="M20 25H4a4 4 0 01-4-4V5a4 4 0 014-4h9v8a4 4 0 004 4h7v8a4 4 0 01-4 4z"
          fill="#5093ff"
        />
        <Rect
          data-name="Rectangle 17273"
          width={11}
          height={11}
          rx={3}
          transform="translate(15)"
          fill="#7bd1ff"
        />
        <Path
          data-name="Path 3146"
          d="M5.758 20.658a1.1 1.1 0 01-1.155-1.05V9.467a1.106 1.106 0 011.155-1.049h.407a1.1 1.1 0 011.152 1.049v10.141a1.1 1.1 0 01-1.152 1.05zm5.446-.045a1.109 1.109 0 01-1.156-1.052v-4.485a1.11 1.11 0 011.156-1.054h.406a1.107 1.107 0 011.155 1.054v4.485a1.106 1.106 0 01-1.155 1.052z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default Ic_Dashboard