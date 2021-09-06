import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Marked(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 16.54 18.125"
      {...props}
    >
      <G data-name="Path 937" fill="#bc8bfd" strokeLinejoin="round">
        <Path d="M8.27 17.625c-.237 0-.47-.065-.673-.186L1.135 13.56A1.315 1.315 0 01.5 12.44V1.808A1.31 1.31 0 011.808.5h12.924a1.31 1.31 0 011.308 1.308V12.44c0 .457-.243.886-.635 1.121l-6.462 3.877a1.308 1.308 0 01-.673.187z" />
        <Path d="M1.808 1A.808.808 0 001 1.808V12.44c0 .283.149.546.392.692l6.462 3.878a.808.808 0 00.832 0l6.462-3.878a.808.808 0 00.392-.692V1.808A.808.808 0 0014.732 1H1.808m0-1h12.924a1.81 1.81 0 011.808 1.808V12.44c0 .631-.336 1.225-.878 1.55L9.2 17.867a1.808 1.808 0 01-1.86 0L.878 13.99A1.817 1.817 0 010 12.44V1.808A1.81 1.81 0 011.808 0z" />
      </G>
      <Path
        data-name="Path 1106"
        d="M5.739 11.743a1.2 1.2 0 001.7 0l5.962-5.962a1.202 1.202 0 00-1.7-1.7L6.587 9.195 4.945 7.553a1.202 1.202 0 00-1.7 1.7z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Marked
