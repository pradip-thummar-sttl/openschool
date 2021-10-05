import * as React from "react"
import Svg, { G, Path, Rect } from "react-native-svg"

function Messaging(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 27.039 21.406"
      {...props}
    >
      <G transform="translate(-69.22 -3325.8)">
        <Path
          data-name="Rectangle 17976"
          d="M72.862 3332.443h19.99a2 2 0 012 2v7.763a5 5 0 01-5 5h-13.99a5 5 0 01-5-5v-7.763a2 2 0 012-2z"
          fill="#ffc14d"
        />
        <Path
          data-name="Rectangle 17984"
          d="M72.862 3332.443h19.99a2 2 0 012 2v1.381a4 4 0 01-4 4h-15.99a4 4 0 01-4-4v-1.381a2 2 0 012-2z"
          fill="#ea8330"
        />
        <Path
          data-name="Path 5210"
          d="M82.739 3332.886l-11.459.232.389-.368 8.753-6.3a3.856 3.856 0 012.226-.653h.193a3.845 3.845 0 012.222.653l8.965 6.3.389.368zm13.517-5.12v3.505a.54.54 0 010 .076zm-27.036 3.581v-3.427-.154 3.581z"
          fill="#ea8330"
        />
        <Rect
          data-name="Rectangle 17980"
          width={12.917}
          height={10.542}
          rx={2}
          transform="translate(76.398 3332.443)"
          fill="#fff"
        />
        <Path
          data-name="Path 5203"
          d="M72.342 3342.987a1.44 1.44 0 01-1.453-1.06 1.127 1.127 0 01-.023-.228v-7.683-.016a1.2 1.2 0 01.423-.883l.035.021a.608.608 0 01.58.041l9.364 5.526.064.038a2.86 2.86 0 001.53.474 2.471 2.471 0 001.406-.474l.064-.038 9.488-5.526a.607.607 0 01.58-.041l.036-.021a1.194 1.194 0 01.42.883v7.699a1.392 1.392 0 01-1.473 1.287z"
          fill="#ffc14d"
        />
      </G>
    </Svg>
  )
}

export default Messaging
