import * as React from "react"
import Svg, { Path } from "react-native-svg"

function More(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 5.761 21"
      {...props}
    >
      <Path
        data-name="more"
        d="M2.881 15.739A2.381 2.381 0 11.5 18.119a2.383 2.383 0 012.381-2.38zm0-7.619A2.381 2.381 0 11.5 10.5a2.383 2.383 0 012.381-2.381zm0-7.62A2.381 2.381 0 11.5 2.881 2.383 2.383 0 012.881.5z"
        fill="#fff"
        stroke="rgba(0,0,0,0)"
      />
    </Svg>
  )
}

export default More
