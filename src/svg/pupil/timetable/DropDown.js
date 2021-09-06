import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DropDownArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 11.645 7.34"
      {...props}
    >
      <Path
        d="M6.495 7.063l4.866-4.873a.939.939 0 000-1.345L10.8.278a.915.915 0 00-.673-.277.957.957 0 00-.68.277L5.822 3.911 2.19.278a.916.916 0 00-.673-.277.957.957 0 00-.68.277L.276.846a.956.956 0 000 1.345l4.869 4.872a.957.957 0 00.68.277.915.915 0 00.67-.277z"
        fill="#9598ac"
      />
    </Svg>
  )
}

export default DropDownArrow
