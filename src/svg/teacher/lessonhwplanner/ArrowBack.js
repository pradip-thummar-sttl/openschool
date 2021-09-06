import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 19.615 17.084"
      {...props}
    >
      <Path
        d="M9.28.327a1.163 1.163 0 01.009 1.637l-5.4 5.418h14.578a1.157 1.157 0 010 2.313H3.888l5.409 5.418a1.171 1.171 0 01-.008 1.635 1.152 1.152 0 01-1.628-.009L.329 9.357a1.3 1.3 0 01-.24-.365A1.1 1.1 0 010 8.547a1.16 1.16 0 01.329-.81L7.66.352A1.133 1.133 0 019.28.327z"
        fill="#262626"
      />
    </Svg>
  )
}

export default BackArrow
