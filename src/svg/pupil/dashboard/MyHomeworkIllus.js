import * as React from "react"
import Svg, { G, LinearGradient, Stop, Path } from "react-native-svg"

function MyHomeworkIllus(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 311 80.9" {...props}>
      <G transform="translate(-59.748 -75)">
        <LinearGradient
          id="prefix__a"
          gradientUnits="userSpaceOnUse"
          x1={359.205}
          y1={-10.922}
          x2={359.205}
          y2={-10.09}
          gradientTransform="matrix(303.4542 0 0 78.6915 -108790.82 949.904)"
        >
          <Stop offset={0} stopColor="#d3edff" />
          <Stop offset={1} stopColor="#edf7ff" />
        </LinearGradient>
        <Path
          d="M363.2 155.7l-303.5.3c1.4-6.1-.9 1.3 2.2-.4-10.4-.1 17.8-13.8 33.4-21.7 38.4-19.5 53.8-14.6 68.6-10.9 15.4 3.9 41.5 9.2 58.6 3.9 15-4.6 18.2-4.7 43.9-20.6s96.8-41.1 96.8 49.4z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="url(#prefix__a)"
        />
        <Path
          d="M217.9 83c8.1 0 14.6 6.5 14.6 14.6s-6.5 14.6-14.6 14.6-14.6-6.5-14.6-14.6S209.8 83 217.9 83z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#e9d6ff"
        />
        <LinearGradient
          id="prefix__b"
          gradientUnits="userSpaceOnUse"
          x1={356.783}
          y1={-12.459}
          x2={356.783}
          y2={-11.944}
          gradientTransform="translate(-10208.953 444.49) scale(29.632)"
        >
          <Stop offset={0} stopColor="#fff0af" />
          <Stop offset={1} stopColor="#ffea74" />
        </LinearGradient>
        <Path
          d="M363.2 75.3c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6-4.2 0-7.6-3.4-7.6-7.6-.1-4.2 3.4-7.6 7.6-7.6z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="url(#prefix__b)"
        />
      </G>
    </Svg>
  )
}

export default MyHomeworkIllus