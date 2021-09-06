import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function EraseIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 17.125 16.536"
      {...props}
    >
      <G
        data-name="Component 354 \u2013 1"
        fill="none"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
      >
        <Path data-name="Line 230" d="M5.795 5.923l5.535 5.535" />
        <Path
          data-name="Path 3249"
          d="M15.944 15.406H4.205l-3.024-3.024a1.3 1.3 0 010-1.845l9.224-9.226a1.3 1.3 0 011.845 0l3.69 3.69a1.3 1.3 0 010 1.845l-8.56 8.56"
        />
      </G>
    </Svg>
  )
}

export default EraseIcon
