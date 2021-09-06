import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FilterBlue(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 15.206 13.366"
      {...props}
    >
      <Path
        data-name="filter (5)"
        d="M14.306.9H.9l5.162 6.184v3.864l3.081 1.519V7.084z"
        fill="none"
        stroke="#50a7f0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
    </Svg>
  )
}

export default FilterBlue
