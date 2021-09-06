import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CloseIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 10.94 10.944"
      {...props}
    >
      <Path
        d="M10.77 9.498l-1.276 1.274a.6.6 0 01-.847 0L5.47 7.591l-3.177 3.181a.6.6 0 01-.848 0L.17 9.498a.6.6 0 010-.848l3.182-3.178L.175 2.296a.6.6 0 010-.848L1.447.172a.6.6 0 01.848 0L5.47 3.355 8.648.172a.6.6 0 01.847 0l1.275 1.275a.6.6 0 010 .849L7.589 5.472 10.77 8.65a.605.605 0 010 .848z"
        fill="#9598ac"
      />
    </Svg>
  )
}

export default CloseIcon
