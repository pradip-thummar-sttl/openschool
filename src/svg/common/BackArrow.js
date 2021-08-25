import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 20.188 17.794"
      {...props}
    >
      <Defs>
        <ClipPath id="prefix__a">
          <Path fill="none" d="M0 0h20.188v17.794H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Repeat Grid 19" clipPath="url(#prefix__a)">
        <Path
          data-name="Path 3308"
          d="M.657 7.847a1.561 1.561 0 000 2.208l6.817 6.976a1.561 1.561 0 102.208-2.208l-4.151-4.312h12.9a1.561 1.561 0 100-3.123h-12.9l4.151-4.417A1.561 1.561 0 107.474.763z"
          fill="#262626"
          stroke="#fff"
          strokeWidth={0.4}
        />
      </G>
    </Svg>
  )
}

export default BackArrow
