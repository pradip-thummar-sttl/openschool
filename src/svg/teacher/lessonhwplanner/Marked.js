import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Marked(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18.43 20.221"
      {...props}
    >
      <G data-name="Group 1675">
        <G data-name="Path 937" fill="#bc8bfd" strokeLinejoin="round">
          <Path d="M9.215 19.721c-.256 0-.507-.07-.727-.201l-7.302-4.382A1.42 1.42 0 01.5 13.927V1.913C.5 1.134 1.134.5 1.913.5h14.605c.779 0 1.412.634 1.412 1.413v12.014c0 .493-.262.958-.686 1.211L9.942 19.52c-.22.132-.47.201-.727.201z" />
          <Path d="M1.913 1A.913.913 0 001 1.913v12.014c0 .32.168.618.443.783l7.303 4.381a.912.912 0 00.939 0l7.302-4.381a.913.913 0 00.443-.783V1.913A.913.913 0 0016.518 1H1.913m0-1h14.605c1.054 0 1.912.858 1.912 1.913v12.014c0 .668-.355 1.297-.928 1.64l-7.303 4.382a1.913 1.913 0 01-1.968 0L.93 15.567A1.923 1.923 0 010 13.927V1.913C0 .858.858 0 1.913 0z" />
        </G>
        <Path
          data-name="Path 1106"
          d="M6.739 12.743a1.2 1.2 0 001.7 0l5.962-5.962a1.202 1.202 0 00-1.7-1.7l-5.114 5.114-1.642-1.642a1.202 1.202 0 00-1.7 1.7z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default Marked
