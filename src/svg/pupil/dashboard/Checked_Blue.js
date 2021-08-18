import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function CheckedBlue(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18.2 18.2"
      {...props}
    >
      <G
        data-name="Rectangle 16994"
        fill="#50a7f0"
        stroke="#50a7f0"
        strokeWidth={1.6}
        transform="translate(1.6 1.6)"
      >
        <Rect width={15} height={15} rx={4} stroke="none" />
        <Rect
          x={-0.8}
          y={-0.8}
          width={16.6}
          height={16.6}
          rx={4.8}
          fill="none"
        />
      </G>
      <Path
        d="M3.456 9.822a.792.792 0 00-.18.568.784.784 0 00.262.534l3.731 3.306a.736.736 0 00.491.188h.068a.746.746 0 00.518-.282l6.381-8.03a.8.8 0 00.168-.573.788.788 0 00-.273-.528l-1.168-.992a.74.74 0 00-1.064.108l-4.911 6.177L5.507 8.55a.741.741 0 00-1.066.085z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CheckedBlue
