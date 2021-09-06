import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Attachment(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 10.267 17.598"
      {...props}
    >
      <Path
        data-name="attachment"
        d="M6.578 12.536V5.314a1.445 1.445 0 00-2.889 0v8.666a2.854 2.854 0 002.889 2.818 2.854 2.854 0 002.889-2.818V5.133a4.333 4.333 0 10-8.667 0v7.223"
        fill="none"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
    </Svg>
  )
}

export default Attachment
