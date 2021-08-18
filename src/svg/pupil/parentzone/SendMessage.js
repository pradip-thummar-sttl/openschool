import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SendMessage(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 17.672 17.729"
      {...props}
    >
      <G
        data-name="send (1)"
        fill="none"
        stroke="#50a7f0"
        strokeLinecap="round"
        strokeWidth={1.6}
      >
        <Path data-name="Path 742" d="M16.541 1.131L8.573 9.203" />
        <Path
          data-name="Path 739"
          d="M16.8.929l-5.6 16-3.2-7.2-7.2-3.2z"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  )
}

export default SendMessage
