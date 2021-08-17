import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function MyPupils(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 28 28"
      {...props}
    >
      <G
        transform="translate(-1.5 -1.628)"
        fill="none"
        stroke="#fff"
        strokeWidth={3}
      >
        <Circle
          data-name="Ellipse 269"
          cx={12.5}
          cy={12.5}
          r={12.5}
          transform="translate(3 3.128)"
          strokeMiterlimit={10}
        />
        <Circle
          data-name="Ellipse 270"
          cx={4.5}
          cy={4.5}
          r={4.5}
          transform="translate(11 8.128)"
          strokeMiterlimit={10}
        />
        <Path
          data-name="Path 3239"
          d="M6.82 24.82c1.64-2.46 4.951-4.009 8.569-4.009s6.929 1.549 8.569 4.009"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default MyPupils
