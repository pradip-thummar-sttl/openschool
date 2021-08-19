import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"

function NewCalendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 124.377 118.383"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#e269ff" />
          <Stop offset={1} stopColor="#ffc4fb" />
        </LinearGradient>
        <LinearGradient
          id="prefix__b"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fce0fa" />
          <Stop offset={1} stopColor="#fff5ff" />
        </LinearGradient>
      </Defs>
      <G data-name="illus">
        <Path
          data-name="Path 3489"
          d="M26.194 104.698a54.818 54.818 0 1185.639-68.25v59.975a8.278 8.278 0 01-8.277 8.275z"
          fill="#fee5ff"
          opacity={0.788}
        />
        <Path
          data-name="Path 3458"
          d="M98.435 44.419l-48.557-6.824a1.527 1.527 0 00-1.724 1.299l-1.486 10.578 26.17 6.76 25.409.489 1.486-10.578a1.527 1.527 0 00-1.298-1.724z"
          fill="#ffb4ee"
        />
        <Path
          data-name="Path 3459"
          d="M55.306 0s2.057 37.128-3.561 38.331a55.228 55.228 0 01-11.2 1.5L.707 43.517c-.842 0-1.039-1.05 0-1.617C9.4 36.947 4.065 2.922 4.065 2.922z"
          transform="rotate(16 -136.22 179.822)"
          opacity={0.604}
          fill="url(#prefix__a)"
        />
        <Path
          data-name="Path 3476"
          d="M51.127 149.147s-2.846 23.339-11.1 30.38c-.472.632-2.163.92-3.005.92l-48.045-1.487c-.842 0-2.831-.083-1.526-1.526C.185 166.83-1.113 148.108-1.113 148.108z"
          transform="rotate(8 741.614 441.127)"
          fill="url(#prefix__b)"
        />
        <Path
          data-name="Path 3484"
          d="M98.483 55.891s-6.067 22.716-15.22 28.54c-.556.56-2.27.61-3.104.493l-47.37-8.16c-.835-.117-2.793-.476-1.3-1.723 14.086-8.729 15.407-27.449 15.407-27.449z"
          fill="#fff0fe"
        />
        <Path
          data-name="Path 3474"
          d="M87.122 47.45l.849-6.04a1.525 1.525 0 113.019.424l-.849 6.04a1.525 1.525 0 11-3.02-.424zm-15.115-2.124l.85-6.04a1.526 1.526 0 013.023.424l-.85 6.04a1.526 1.526 0 01-3.023-.424zm-15.211-2.138l.849-6.04a1.527 1.527 0 013.024.424l-.849 6.041a1.527 1.527 0 01-3.024-.425z"
          fill="#c472ff"
        />
      </G>
    </Svg>
  )
}

export default NewCalendar
