import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WhiteCheck(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 14.644 12.898"
      fill="#fff"
      {...props}
    >
      <Path
        d="M.234 7.297a.952.952 0 00.1 1.343l4.7 4.029a.946.946 0 00.618.229h.085a.949.949 0 00.653-.344l8.039-9.784a.953.953 0 00-.131-1.341L12.825.216a.954.954 0 00-1.34.131l-6.187 7.53-2.486-2.13a.955.955 0 00-1.343.1z"
      />
    </Svg>
  )
}

export default WhiteCheck