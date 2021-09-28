import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Insights(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      {...props}
    >
      <Path
        data-name="Icon awesome-chart-bar"
        d="M21.667 16.667h2.5a.9.9 0 00.833-.834v-8.75a.9.9 0 00-.833-.833h-2.5a.9.9 0 00-.833.833v8.75a.9.9 0 00.833.834zm6.25 0h2.5a.9.9 0 00.833-.833v-15a.9.9 0 00-.833-.833h-2.5a.9.9 0 00-.833.833v15a.9.9 0 00.833.833zm-18.75 0h2.5a.9.9 0 00.833-.833V11.25a.9.9 0 00-.833-.833h-2.5a.9.9 0 00-.833.833v4.583a.9.9 0 00.833.833zm6.25 0h2.5a.9.9 0 00.833-.833V2.917a.9.9 0 00-.833-.833h-2.5a.9.9 0 00-.833.833v12.916a.9.9 0 00.833.834zm16.875 4.167H4.167V1.042A1.041 1.041 0 003.125 0H1.042A1.041 1.041 0 000 1.042v21.875A2.084 2.084 0 002.083 25h30.209a1.041 1.041 0 001.042-1.042v-2.083a1.041 1.041 0 00-1.042-1.042z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Insights
