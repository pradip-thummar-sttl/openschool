import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowNext(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 7.34 11.645"
      {...props}
    >
      <Path
        data-name="right-arrow"
        d="M7.063 5.15L2.19.284a.939.939 0 00-1.345 0L.278.845a.915.915 0 00-.277.673.957.957 0 00.277.68l3.633 3.625L.278 9.455a.915.915 0 00-.277.673.957.957 0 00.277.68l.568.561a.957.957 0 001.345 0L7.063 6.5a.957.957 0 00.277-.68.915.915 0 00-.277-.67z"
        fill="#9598ac"
      />
    </Svg>
  )
}

export default ArrowNext
