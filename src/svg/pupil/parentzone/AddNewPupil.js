import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function AddNewPupil(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 124 124"
      {...props}
    >
      <G data-name="Group 1667">
        <G fill="#d6f5fe" stroke="#fff" strokeWidth={4}>
          <Circle cx={62} cy={62} r={62} stroke="none" />
          <Circle cx={62} cy={62} r={60} fill="none" />
        </G>
        <Path
          data-name="Path 3328"
          d="M60.968 78.001a2.6 2.6 0 01-2.6-2.594V65.63h-9.777a2.6 2.6 0 01-2.594-2.6v-2.067a2.6 2.6 0 012.594-2.594h9.777v-9.768a2.6 2.6 0 012.6-2.6h2.066a2.594 2.594 0 012.594 2.6v9.777h9.779a2.6 2.6 0 012.594 2.594v2.067a2.6 2.6 0 01-2.594 2.6h-9.779v9.777a2.593 2.593 0 01-2.594 2.594z"
          fill="#50a7f0"
        />
      </G>
    </Svg>
  )
}

export default AddNewPupil
