import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Notification(props) {
  return (
    <Svg
      data-name="bell (3)"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 17.789 20.7"
      {...props}
    >
      <Path
        data-name="bell (3)"
        d="M16.981 16.01h-.809v-5.66A7.29 7.29 0 0011 3.383a2.345 2.345 0 10-4.2 0 7.29 7.29 0 00-5.183 6.967v5.66H.809a.809.809 0 000 1.617h4.128a3.888 3.888 0 003.8 3.073h.323a3.888 3.888 0 003.8-3.073h4.128a.809.809 0 000-1.617zM8.167 2.345a.728.728 0 11.728.728.729.729 0 01-.728-.728zm.889 16.738h-.323a2.268 2.268 0 01-2.115-1.456h4.553a2.268 2.268 0 01-2.115 1.456zM3.234 16.01v-5.66a5.66 5.66 0 0111.321 0v5.66zm0 0"
        fill="#262626"
      />
    </Svg>
  )
}

export default Notification
