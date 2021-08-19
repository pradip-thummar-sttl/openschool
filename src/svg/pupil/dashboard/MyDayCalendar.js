import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"

function MyDayCalendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 99.5 80.13"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.364}
          y1={1}
          x2={0.428}
          y2={0.031}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#ffdd81" />
          <Stop offset={1} stopColor="#ffd650" />
        </LinearGradient>
        <LinearGradient
          id="prefix__b"
          x1={0.762}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#e2e9f4" />
          <Stop offset={1} stopColor="#f0f5fd" />
        </LinearGradient>
      </Defs>
      <G data-name="Group 1588">
        <Path
          data-name="Path 3278"
          d="M7.37 1h84.76a3.793 3.793 0 013.685 3.892L92.13 69.109A3.793 3.793 0 0188.444 73H3.685A3.793 3.793 0 010 69.109L3.685 4.892A3.793 3.793 0 017.37 1z"
          transform="translate(3.685 7.13)"
          fill="url(#prefix__a)"
        />
        <G data-name="Group 1566">
          <Path
            data-name="Path 3272"
            d="M9.867-.215h75.415A3.219 3.219 0 0188.5 3l-3.648 55.07a3.219 3.219 0 01-3.219 3.219H6.219A3.219 3.219 0 013 58.074L6.648 3A3.219 3.219 0 019.867-.215z"
            transform="translate(5.301 10.595)"
            fill="url(#prefix__b)"
          />
          <G data-name="Group 1565">
            <Path
              data-name="Path 3277"
              d="M10.33 10.38h80.254a3.05 3.05 0 013.216 2.847s-2.789 14.686-4.88 26.681a194.872 194.872 0 01-5.22 22.024 3.05 3.05 0 01-3.219 2.847H3.219A3.05 3.05 0 010 61.932a174.292 174.292 0 005.073-22.937 239.676 239.676 0 002.038-25.768 3.05 3.05 0 013.219-2.847z"
              fill="#fff"
            />
          </G>
        </G>
        <G
          data-name="Group 1585"
          fill="none"
          stroke="#daadff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        >
          <Path
            data-name="Path 3282"
            d="M20.28 13.043c-5.059-3.285-4.989-7.913-1.251-10.618s7.677 1.594 8.171 5.186"
          />
          <Path
            data-name="Path 3285"
            d="M50.237 13.043c-5.059-3.285-4.989-7.913-1.251-10.618s7.677 1.594 8.171 5.186"
          />
          <Path
            data-name="Path 3283"
            d="M35.259 13.043C30.2 9.758 30.27 5.13 34.008 2.425s7.677 1.594 8.171 5.186"
          />
          <Path
            data-name="Path 3284"
            d="M65.216 13.043c-5.059-3.285-4.989-7.913-1.251-10.618s7.677 1.594 8.171 5.186"
          />
          <Path
            data-name="Path 3286"
            d="M80.194 13.043c-5.059-3.285-4.989-7.913-1.251-10.618s7.677 1.594 8.171 5.186"
          />
        </G>
      </G>
    </Svg>
  )
}

export default MyDayCalendar
