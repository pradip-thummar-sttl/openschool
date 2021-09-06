import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function StartNewCall(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 95.999 87.999"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          y1={1}
          x2={0.5}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#9cffac" />
          <Stop offset={1} stopColor="#00b59c" />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Path 3488"
        d="M13.198 87.999a53 53 0 1182.8-65.989v57.989a8 8 0 01-8 8z"
        fill="#deffe8"
      />
      <Path
        data-name="Path 3444"
        d="M154.917 152.338l-9.349-6.237a5.524 5.524 0 00-6.953.689l-2.461 2.461a17.008 17.008 0 01-12.987-13l2.458-2.46a5.531 5.531 0 00.689-6.958l-6.235-9.356a5.508 5.508 0 00-8.481-.84l-3.9 3.9a9.1 9.1 0 00-2.684 6.962c.294 5 2.454 15.056 13.647 26.253S139.9 167.116 144.9 167.41a9.106 9.106 0 006.96-2.687l3.9-3.9a5.515 5.515 0 00-.843-8.485z"
        transform="rotate(-91 44.786 133.614)"
        opacity={0.568}
        fill="url(#prefix__a)"
      />
      <Path
        data-name="Path 3486"
        d="M61.585 23.173l-6.073 9.456a5.524 5.524 0 00.81 6.94l2.504 2.418a17.008 17.008 0 01-12.771 13.212l-2.503-2.415a5.531 5.531 0 00-6.969-.567l-9.246 6.397a5.508 5.508 0 00-.691 8.494l3.967 3.832a9.1 9.1 0 007.008 2.562c4.994-.381 15.01-2.717 26.01-14.103s12.992-21.47 13.199-26.474a9.106 9.106 0 00-2.808-6.912l-3.968-3.831a5.515 5.515 0 00-8.469.99z"
        fill="#89ed98"
        opacity={0.612}
      />
    </Svg>
  )
}

export default StartNewCall
