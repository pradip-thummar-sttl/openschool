import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Circle
} from "react-native-svg"

function AvtarBg(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 444.073 306.873"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="a"
          x1={0.798}
          y1={-0.331}
          x2={0.5}
          y2={1.098}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#c193ff" />
          <Stop offset={1} stopColor="#e0c6ff" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fff4c6" />
          <Stop offset={1} stopColor="#ffea76" />
        </LinearGradient>
      </Defs>
      <G data-name="Group 2" transform="translate(-13.301 78.98)">
        <Path
          data-name="Shape 440 1"
          d="M611.048 649.056H171.52c0-9.26-1.015 8.2-1.015-1.055-16.346-.148 28.013-21.292 52.471-33.425 60.306-29.916 84.649-22.406 107.805-16.715 24.149 5.934 65.162 14.082 92.123 5.931 23.59-7.133 31.384-9.6 62.778-34.955s125.366-58.909 125.366 80.219z"
          transform="translate(-153.674 -422.909)"
          fill="#e4f2fc"
          fillRule="evenodd"
        />
        <Circle
          data-name="Ellipse 179"
          cx={15.994}
          cy={15.994}
          r={15.994}
          transform="translate(314.503 -78.98)"
          fill="url(#a)"
        />
        <Circle
          data-name="Ellipse 3 copy"
          cx={8.605}
          cy={8.605}
          r={8.605}
          transform="translate(57.53 107.225)"
          fill="#a8d7ff"
        />
        <Path
          data-name="Ellipse 3 copy 2"
          d="M444.6 256.781a19.6 19.6 0 11-19.6 19.6 19.6 19.6 0 0119.6-19.6z"
          transform="translate(-189.026 -179.697)"
          fill="#fff0af"
          fillRule="evenodd"
        />
        <Path
          data-name="Ellipse 3 copy 2"
          d="M439.816 256.781A14.816 14.816 0 11425 271.6a14.816 14.816 0 0114.816-14.819z"
          transform="translate(-351.364 -277.609)"
          fillRule="evenodd"
          fill="url(#b)"
        />
      </G>
    </Svg>
  )
}

export default AvtarBg
