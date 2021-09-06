import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TickMarkGreen(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 15.141 11.595"
      {...props}
    >
      <Path
        data-name="Icon ionic-ios-checkmark"
        d="M15.066 1.357L13.829.084a.266.266 0 00-.2-.084.255.255 0 00-.2.084L4.851 8.725 1.73 5.604a.272.272 0 00-.394 0L.084 6.856a.28.28 0 000 .4l3.938 3.938a1.245 1.245 0 00.823.4 1.3 1.3 0 00.816-.387h.005l9.4-9.45a.3.3 0 000-.4z"
        fill="#00a36b"
      />
    </Svg>
  )
}

export default TickMarkGreen
