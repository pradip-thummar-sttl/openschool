import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Download(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 16.252 16.214"
      {...props}
    >
      <G
        data-name="download (7)"
        fill="none"
        stroke="#50a7f0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      >
        <Path
          data-name="Path 715"
          d="M15.352 11.212v2.735a1.5 1.5 0 01-1.606 1.365H2.506A1.5 1.5 0 01.9 13.947v-2.735"
        />
        <Path data-name="Path 716" d="M3.635 6.802l4.491 3.419 4.491-3.419" />
        <Path data-name="Line 162" d="M8.107 9.084V.9" />
      </G>
    </Svg>
  )
}

export default Download
