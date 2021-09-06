import * as React from "react"
import Svg, { Defs, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

function HairRed(props) {
  return (
    <Svg
      id="prefix__bun-red"
      xmlns="http://www.w3.org/2000/svg"
      width={396.563}
      height={149.375}
      viewBox="0 0 396.563 149.375"
      {...props}
    >
      <Defs></Defs>
      <Path
        className="prefix__cls-1"
        d="M475.741 78.812a62.094 62.094 0 11-62.094 62.094 62.094 62.094 0 0162.094-62.094z"
        transform="translate(-142.406 -78.813)"
      />
      <Circle
        id="prefix__Ellipse_1426_copy"
        data-name="Ellipse 1426 copy"
        cx={67.688}
        cy={62.094}
        fill="#fb2051"
        r={62.094}
      />
      <Path
        id="prefix__body_copy_16"
        data-name="body copy 16"
        className="prefix__cls-1"
        d="M142.4 227.04a273.661 273.661 0 01198.287-84.517c1.7 0 3.4.034 5.1.064.071.139.151.272.217.413-.004 0-75.662 96.625-203.604 84.04z"
        transform="translate(-142.406 -78.813)"
      />
      <Path
        id="prefix__body_copy_17"
        data-name="body copy 17"
        className="prefix__cls-1"
        d="M335.375 143c.066-.141.146-.274.217-.413 1.7-.03 3.392-.064 5.1-.064a273.66 273.66 0 01198.282 84.517C411.033 239.625 335.375 143 335.375 143z"
        transform="translate(-142.406 -78.813)"
      />
    </Svg>
  )
}

export default HairRed
