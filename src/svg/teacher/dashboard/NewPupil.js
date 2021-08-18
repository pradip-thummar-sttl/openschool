import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function NewPupil(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 99.313 91.037"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#b0dbfa" />
          <Stop offset={1} stopColor="#90ccff" />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Path 3490"
        d="M13.654 91.037A54.831 54.831 0 1199.312 22.77v59.99a8.278 8.278 0 01-8.277 8.277z"
        fill="#d5efff"
        opacity={0.732}
      />
      <Path
        data-name="Path 3477"
        d="M57.215 48.793a10.967 10.967 0 1110.967-10.967 10.98 10.98 0 01-10.967 10.967z"
        fill="#7cbeff"
      />
      <Path
        data-name="Path 3491"
        d="M75.893 294.975H32.548A1.548 1.548 0 0131 293.427a23.222 23.222 0 1146.441 0 1.548 1.548 0 01-1.548 1.548z"
        transform="translate(2.995 -221.207)"
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default NewPupil
