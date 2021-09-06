import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function BodyOrange(props) {
  return (
    <Svg
      id="prefix__MAIN-AVATAR"
      xmlns="http://www.w3.org/2000/svg"
      width={680}
      height={1040}
      viewBox="0 0 680 1040"
      {...props}
    >
      <Defs></Defs>
      <G id="prefix__MAIN-ORANGE">
        <Path
          id="prefix__BG"
          d="M-.015 0h679.921v1040H-.015V0z"
          fillRule="evenodd"
          fill="#fff"
        />
        <G id="prefix__legs">
          <Path
            id="prefix__leg-right"
            className="prefix__cls-2"
            d="M462.034 768.275a25.482 25.482 0 01-.262 3.614v107.1h-50.646V768.275v-.147l-16.5-142.458 50.312-5.781 16.582 143.132h-.036a25.369 25.369 0 01.55 5.254z"
          />
          <Path
            id="prefix__sock-right"
            className="prefix__cls-3"
            d="M411.465 879.189h50.929v56.822h-50.929v-56.822z"
          />
          <Path
            id="prefix__leg-left"
            className="prefix__cls-2"
            d="M224.119 633.791h50.928v272.572h-50.928V633.791z"
          />
          <Path
            id="prefix__sock-left"
            className="prefix__cls-3"
            d="M224.119 879.189h50.928v56.822h-50.928v-56.822z"
          />
        </G>
        <G id="prefix__shoes">
          <Path
            id="prefix__shoe-left"
            className="prefix__cls-4"
            d="M274.646 935.818V1040h-119.99c-6.861 0-10.289-66.69 69.468-61.036v-43.146h50.522z"
          />
          <Path
            id="prefix__shoe-right"
            className="prefix__cls-4"
            d="M411.346 935.818V1040h119.99c6.861 0 10.42-66.69-69.336-61.036v-43.146h-50.654z"
          />
        </G>
        <Path
          id="prefix__body"
          className="prefix__cls-2"
          d="M339.821 142.523c151.136 0 273.655 121.564 273.655 271.52S490.957 685.562 339.821 685.562 66.165 564 66.165 414.043s122.52-271.52 273.656-271.52z"
        />
        <G id="prefix__arm-left">
          <Path
            className="prefix__cls-2"
            d="M67.294 419.117l68.416 3.157-21.051 252.563-43.155 2.1z"
          />
          <Path
            className="prefix__cls-2"
            d="M96.768 668.974c21.51 0 38.947 18.039 38.947 40.291s-17.437 40.291-38.947 40.291-38.947-18.039-38.947-40.291 17.437-40.291 38.947-40.291z"
          />
        </G>
        <G id="prefix__arm-right">
          <Path
            className="prefix__cls-2"
            d="M613.567 419.117l-68.416 3.157L566.2 674.837l43.154 2.1z"
          />
          <Path
            className="prefix__cls-2"
            d="M584.092 668.974c21.51 0 38.947 18.039 38.947 40.291s-17.437 40.291-38.947 40.291-38.947-18.039-38.947-40.291 17.437-40.291 38.947-40.291z"
          />
        </G>
      </G>
    </Svg>
  )
}

export default BodyOrange
