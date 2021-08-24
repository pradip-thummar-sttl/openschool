import * as React from "react"
import Svg, { Path } from "react-native-svg"

function GoldStar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 38 36.354"
      {...props}
    >
      <Path
        d="M37.9 13.731a2.687 2.687 0 00-2.352-1.67l-9.835-1.429-4.4-8.912A2.687 2.687 0 0019 0a2.688 2.688 0 00-2.315 1.721l-4.4 8.912-9.833 1.428A2.687 2.687 0 00.1 13.731a2.687 2.687 0 00.921 2.733L8.139 23.4l-1.68 9.8a2.83 2.83 0 00.5 2.413 2.129 2.129 0 001.662.745 3.429 3.429 0 001.587-.436L19 31.292l8.8 4.625a3.433 3.433 0 001.586.437 2.129 2.129 0 001.662-.745 2.829 2.829 0 00.5-2.413l-1.68-9.8 7.116-6.937a2.687 2.687 0 00.916-2.728z"
        fill="#ffce00"
      />
    </Svg>
  )
}

export default GoldStar
