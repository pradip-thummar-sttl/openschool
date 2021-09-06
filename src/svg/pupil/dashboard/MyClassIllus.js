import * as React from "react"
import Svg, { G, LinearGradient, Stop, Path } from "react-native-svg"

function MyClassIllus(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 311 80.9" {...props}>
      <G transform="translate(-59.748 -75)">
        <LinearGradient
          id="prefix__a"
          gradientUnits="userSpaceOnUse"
          x1={179.853}
          y1={137.566}
          x2={179.853}
          y2={136.734}
          gradientTransform="matrix(303.4542 0 0 -78.6915 -54365.535 10915.725)"
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
          d="M363.2 75c4.2 0 7.6 3.4 7.6 7.6 0 4.2-3.4 7.6-7.6 7.6-4.2 0-7.6-3.4-7.6-7.6 0-4.2 3.4-7.6 7.6-7.6z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#e9d6ff"
        />
        <LinearGradient
          id="prefix__b"
          gradientUnits="userSpaceOnUse"
          x1={176.198}
          y1={138.282}
          x2={176.198}
          y2={137.282}
          gradientTransform="matrix(29.632 0 0 -29.632 -5002.66 4179.754)"
        >
          <Stop offset={0} stopColor="#fff0af" />
          <Stop offset={1} stopColor="#ffea74" />
        </LinearGradient>
        <Path
          d="M218.5 82.2c8.2 0 14.8 6.6 14.8 14.8 0 8.2-6.6 14.8-14.8 14.8-8.2 0-14.8-6.6-14.8-14.8-.1-8.2 6.6-14.8 14.8-14.8-.1 0 0 0 0 0z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="url(#prefix__b)"
        />
      </G>
    </Svg>
  )
}

export default MyClassIllus
