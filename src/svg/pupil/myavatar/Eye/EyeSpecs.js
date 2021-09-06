import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function EyeSpecs(props) {
  return (
    <Svg
      id="prefix__eyes"
      xmlns="http://www.w3.org/2000/svg"
      width={680}
      height={1040}
      viewBox="0 0 680 1040"
      {...props}
    >
      <Defs></Defs>
      <G id="prefix__glasses">
        <G id="prefix__eyes_copy" data-name="eyes copy">
          <G id="prefix__eye-left">
            <Circle
              id="prefix__eye-white"
              className="prefix__cls-1"
              cx={279.531}
              cy={289.828}
              r={52}
            />
            <Circle
              id="prefix__eye-ball"
              cx={279.219}
              cy={289.625}
              r={30.063}
            />
            <Path
              id="prefix__eye-shine"
              className="prefix__cls-2"
              d="M293.039 261.658a15.163 15.163 0 11-15.177 15.163 15.17 15.17 0 0115.177-15.163z"
            />
          </G>
          <G id="prefix__eye-right">
            <Circle
              id="prefix__eye-white-2"
              data-name="eye-white"
              className="prefix__cls-1"
              cx={399.547}
              cy={289.828}
              r={51.984}
            />
            <Circle
              id="prefix__eye-ball-2"
              data-name="eye-ball"
              cx={399.219}
              cy={289.625}
              r={30.063}
            />
            <Path
              id="prefix__eye-shine-2"
              data-name="eye-shine"
              className="prefix__cls-2"
              d="M413.044 261.658a15.163 15.163 0 11-15.177 15.163 15.17 15.17 0 0115.177-15.163z"
            />
          </G>
        </G>
        <Circle
          cx={266.75}
          cy={287.594}
          r={55.781}
          fill="none"
          stroke="#000"
          strokeWidth={8}
        />
        <Path
          id="prefix__Ellipse_4_copy"
          data-name="Ellipse 4 copy"
          className="prefix__cls-4"
          d="M411.931 231.836a55.757 55.757 0 11-55.784 55.757 55.771 55.771 0 0155.784-55.757z"
        />
        <Path className="prefix__cls-4" d="M354.211 287.452h-28.168" />
      </G>
    </Svg>
  )
}

export default EyeSpecs
