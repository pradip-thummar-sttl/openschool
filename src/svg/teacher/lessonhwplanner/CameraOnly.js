import * as React from "react"
import Svg, { Circle, Rect, Path } from "react-native-svg"

function CameraOnly(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 86 86"
      {...props}
    >
      <Circle data-name="Ellipse 380" cx={43} cy={43} r={43} fill="#97e3af" />
      <Circle data-name="Ellipse 408" cx={43} cy={43} r={43} fill="#99edad" />
      <Rect
        data-name="Rectangle 17346"
        width={52}
        height={38}
        rx={2}
        transform="translate(17 22)"
        fill="#00b569"
      />
      <Path
        data-name="Path 3266"
        d="M28.724 60q-.653-.534-1.264-1.116c2.579-5.106 8.382-8.664 15.126-8.664 6.836 0 12.705 3.658 15.23 8.875q-.506.469-1.04.906zm5.742-21.907a8.059 8.059 0 018.059-8.059 8.059 8.059 0 018.059 8.059 8.059 8.059 0 01-8.059 8.06 8.059 8.059 0 01-8.059-8.059z"
        fill="#ffe265"
      />
    </Svg>
  )
}

export default CameraOnly
