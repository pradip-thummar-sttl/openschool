import * as React from "react"
import Svg, { Path } from "react-native-svg"

function UploadCal(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18 18"
      {...props}
    >
      <Path
        data-name="Path 3230"
        d="M2.251 18A2.253 2.253 0 010 15.75V4.5a2.253 2.253 0 012.251-2.25h.75V.75A.751.751 0 013.752 0h.749a.75.75 0 01.75.75v1.5h7.5V.75a.75.75 0 01.75-.75h.75a.75.75 0 01.75.75v1.5h.75a2.253 2.253 0 012.25 2.25v11.25a2.253 2.253 0 01-2.25 2.25zM1.5 15.75a.751.751 0 00.751.75h13.5a.751.751 0 00.75-.75V7.53h-15zM8.25 15v-3H6.563a.563.563 0 01-.413-.945L8.588 8.43a.564.564 0 01.825 0l2.437 2.625a.562.562 0 01-.412.945H9.75v3a.75.75 0 11-1.5 0z"
        fill="#262626"
      />
    </Svg>
  )
}

export default UploadCal