import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function ParentZone(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 31 27.993"
      {...props}
    >
      <G data-name="Parent Zone" transform="translate(-102 -566.481)">
        <G
          data-name="Rectangle 17283"
          fill="#b0b7d0"
          stroke="#fff"
          strokeWidth={3}
        >
          <Path
            d="M111.5 575.474a9.5 9.5 0 019.5 9.5v9.5h-11.4a7.6 7.6 0 01-7.6-7.6v-1.9a9.5 9.5 0 019.5-9.5z"
            stroke="none"
          />
          <Path
            d="M111.5 576.974h0a8 8 0 018 8v6.588a1.412 1.412 0 01-1.412 1.412h-8.47a6.118 6.118 0 01-6.118-6.118v-1.882a8 8 0 018-8z"
            fill="none"
          />
        </G>
        <Circle
          data-name="Ellipse 260"
          cx={4.798}
          cy={4.798}
          r={4.798}
          transform="translate(106.731 566.481)"
          fill="#b0b7d0"
        />
        <G
          data-name="Rectangle 17281"
          fill="#6d769d"
          stroke="#fff"
          strokeWidth={3}
        >
          <Path
            d="M124 575.474a9 9 0 019 9v2a8 8 0 01-8 8h-10v-10a9 9 0 019-9z"
            stroke="none"
          />
          <Path
            d="M124 576.974h0a7.5 7.5 0 017.5 7.5v2a6.5 6.5 0 01-6.5 6.5h-7a1.5 1.5 0 01-1.5-1.5v-7a7.5 7.5 0 017.5-7.5z"
            fill="none"
          />
        </G>
        <Circle
          data-name="Ellipse 261"
          cx={4.798}
          cy={4.798}
          r={4.798}
          transform="translate(118.721 566.481)"
          fill="#6d769d"
        />
      </G>
    </Svg>
  )
}

export default ParentZone
