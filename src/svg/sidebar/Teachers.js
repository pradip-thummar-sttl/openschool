import * as React from "react"
import Svg, { G, Rect, Path, Circle } from "react-native-svg"

function Teachers(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={26} height={24} {...props}>
      <G transform="translate(.244 -2.767)">
        <Rect
          data-name="Rectangle 17975"
          width={26}
          height={20}
          rx={6}
          transform="translate(-.244 2.767)"
          fill="#8ce33a"
        />
        <Path
          data-name="Path 5195"
          d="M2.884 22.378a9.8 9.8 0 018.042-4.043h3.772a9.815 9.815 0 017.93 3.889 12.784 12.784 0 01-9.936 4.543 12.81 12.81 0 01-9.808-4.389z"
          fill="#00b754"
        />
        <Circle
          data-name="Ellipse 727"
          cx={4.502}
          cy={4.502}
          r={4.502}
          transform="translate(8.253 6.907)"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default Teachers
