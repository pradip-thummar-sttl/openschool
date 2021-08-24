import * as React from "react"
import Svg, { G, Path, LinearGradient, Stop } from "react-native-svg"

function NewCalendar(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.3 91" {...props}>
      <G transform="rotate(8 -221.829 373.756)">
        <Path
          d="M-28 61c-23-19.7-25.6-54.3-5.8-77.3 19.7-23 54.3-25.6 77.3-5.8 1.3 1.1 2.6 2.4 3.8 3.6l8.3 59.4c.6 4.5-2.5 8.7-7 9.3L-28 61z"
          opacity={0.788}
          fill="#fee5ff"
        />
        <Path
          d="M35.2-8.7h-49c-.8 0-1.5.7-1.5 1.5V3.5l26.9 3.1 25.2-3.1V-7.2c-.1-.9-.8-1.5-1.6-1.5z"
          fill="#ffb4ee"
        />
        <LinearGradient
          id="prefix__a"
          gradientUnits="userSpaceOnUse"
          x1={-57.045}
          y1={-9.986}
          x2={-57.045}
          y2={-8.986}
          gradientTransform="matrix(55.132 7.7484 -6.0564 43.0935 3089.659 875)"
        >
          <Stop offset={0} stopColor="#e269ff" />
          <Stop offset={1} stopColor="#ffc4fb" />
        </LinearGradient>
        <Path
          d="M36.3 6.6s-3.1 37.1-8.9 37.5c-3.8.4-7.5.3-11.3-.1l-40-1.9c-.8-.1-.9-1.2.2-1.6 9.3-3.7 8.8-38.1 8.8-38.1l51.2 4.2z"
          opacity={0.604}
          fill="url(#prefix__a)"
        />
        <LinearGradient
          id="prefix__b"
          gradientUnits="userSpaceOnUse"
          x1={-56.68}
          y1={-10.902}
          x2={-56.68}
          y2={-9.902}
          gradientTransform="matrix(64.1079 .00002 0 32.339 3634.22 354.426)"
        >
          <Stop offset={0} stopColor="#fce0fa" />
          <Stop offset={1} stopColor="#fff5ff" />
        </LinearGradient>
        <Path
          d="M36.8 2.6S34 25.9 25.7 33c-.5.6-2.2.9-3 .9l-48-1.5c-.8 0-2.8-.1-1.5-1.5C-14.1 20.3-15.4 1.6-15.4 1.6l52.2 1z"
          fill="url(#prefix__b)"
        />
        <Path
          d="M36.8 2.6S34 25.9 25.7 33c-.5.6-2.2.9-3 .9l-48-1.5c-.8 0-2.8-.1-1.5-1.5C-14.1 20.3-15.4 1.6-15.4 1.6l52.2 1z"
          fill="#fff0fe"
        />
        <Path
          d="M24.4-4.2v-6.1c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v6.1c0 .8-.7 1.5-1.5 1.5s-1.5-.6-1.5-1.5zm-15.3 0v-6.1c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v6.1c0 .8-.7 1.5-1.5 1.5s-1.5-.6-1.5-1.5zm-15.3 0v-6.1c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v6.1c0 .8-.7 1.5-1.5 1.5-.9 0-1.5-.6-1.5-1.5z"
          fill="#c472ff"
        />
      </G>
    </Svg>
  )
}

export default NewCalendar
