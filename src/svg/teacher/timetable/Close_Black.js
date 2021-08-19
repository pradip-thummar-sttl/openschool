import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CloseBlack(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 22.628 22.628"
      {...props}
    >
      <Path
        data-name="close-icon"
        d="M5.555 14.984l3.774-3.774-3.588-3.718a1.393 1.393 0 010-1.92 1.276 1.276 0 011.853 0l3.62 3.753 3.77-3.77a1.333 1.333 0 111.885 1.887l-3.803 3.802 3.785 3.927a1.393 1.393 0 01.001 1.918 1.277 1.277 0 01-1.853 0l-3.818-3.96-3.74 3.74a1.333 1.333 0 01-1.886-1.885z"
        fill="#262626"
      />
    </Svg>
  )
}

export default CloseBlack
