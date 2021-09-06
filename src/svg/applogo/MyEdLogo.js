import * as React from "react"
import Svg, { LinearGradient, Stop, Circle, G, Path } from "react-native-svg"

function MyEdLogo(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 72 72"
      {...props}
    >
      <LinearGradient
        id="prefix__a"
        gradientUnits="userSpaceOnUse"
        x1={54.018}
        y1={67.207}
        x2={17.982}
        y2={4.793}
      >
        <Stop offset={0} stopColor="#421b94" />
        <Stop offset={1} stopColor="#412dc2" />
      </LinearGradient>
      <Circle cx={36} cy={36} r={36} fill="url(#prefix__a)" />
      <G>
        <Path
          d="M12.8 31.8V18.4c0-.2 0-.4.1-.6.1-.4.4-.6.8-.5.2.1.4.1.6.2 6.8 3.4 13.7 6.8 20.5 10.3.9.4 1.7.4 2.6 0 5.4-2.7 10.7-5.4 16.1-8 1.5-.8 3-1.5 4.6-2.3.1-.1.3-.1.5-.2.4-.1.7.1.8.5 0 .2.1.5.1.7V45c0 .9-.4 1.6-1.3 2-5.6 2.6-10.9 5-16.2 7.4-.1 0-.2.1-.3.1-.6.2-1-.1-1-.7v-1-2.2c0-1 .3-1.8.9-2.6 1.7-2.1 3.4-4.1 5-6.2.5-.7.6-1.2.1-1.7-.7-.6-1.5-.7-2.1-.1-1.3 1.1-2.5 2.3-3.8 3.4-.8.7-1.5.7-2.3 0-2.8-2.7-5.7-5.4-8.5-8.1-.8-.7-1.7-1.1-2.8-1.2-1.7-.3-3.4-.6-5.2-.9-.3 0-.6-.1-.8.1-.2.2 0 .5.2.8 3 4.6 6 9.3 9 13.9.5.8.8 1.7.8 2.7v3c0 .9-.5 1.2-1.3.8-3.9-1.8-7.9-3.6-11.8-5.4-1.4-.6-2.8-1.3-4.3-1.9-.8-.4-1.2-1-1.2-1.9.2-4.6.2-9 .2-13.5z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default MyEdLogo
