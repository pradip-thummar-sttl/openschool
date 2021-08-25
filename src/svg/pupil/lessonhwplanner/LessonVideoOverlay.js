import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function LessonVideoOverlay(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 217 58"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          y1={0.924}
          x2={0.5}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#21232c" stopOpacity={0} />
          <Stop offset={1} stopColor="#2a2e43" />
        </LinearGradient>
      </Defs>
      <Path
        d="M6 0h205a6 6 0 016 6v52H0V6a6 6 0 016-6z"
        opacity={0.6}
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default LessonVideoOverlay
