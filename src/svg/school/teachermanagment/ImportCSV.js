import * as React from "react"
import Svg, { G, Circle, Path, Text, TSpan } from "react-native-svg"

function ImportCSV(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      {...props}
    >
      <G data-name="Group 2181" transform="translate(-155 300)">
        <Circle
          data-name="Ellipse 738"
          cx={43}
          cy={43}
          r={43}
          transform="translate(155 -300)"
          fill="#ffe265"
        />
        <Path
          data-name="Path 5250"
          d="M215.287-276.559a9.286 9.286 0 019.289 9.288v44.079a43.009 43.009 0 01-53.408-.2v-35.1c9.727-9.433 13.91-12.607 18-18.06z"
          fill="#ffb100"
        />
        <Path
          data-name="Path 3941"
          d="M189.683-276.306a1.97 1.97 0 01.969.866c.165-.093.245.151.245.946v11.486a6.213 6.213 0 01-6.212 6.214h-11.479a1.967 1.967 0 01-1.392-3.358l15.729-15.727a1.964 1.964 0 012.141-.427z"
          fill="#fff"
        />
        <Text
          transform="translate(197.873 -236.884)"
          fill="#d06444"
          fontSize={15}
        >
          <TSpan x={-11.957} y={0}>
            {"CSV"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default ImportCSV
