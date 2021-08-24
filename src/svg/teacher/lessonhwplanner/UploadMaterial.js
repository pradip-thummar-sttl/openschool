import * as React from "react"
import Svg, { G, Rect, Path, Text, TSpan } from "react-native-svg"

function UploadMaterial(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 336.5 49"
      {...props}
    >
      <G transform="translate(.5 .5)">
        <Rect
          data-name="Rectangle 17316"
          width={335.5}
          height={48}
          rx={6}
          fill="none"
          stroke="#57abf0"
          strokeDasharray="3 3"
        />
        <Path
          data-name="Path 3296"
          d="M21.952 34.906a11.494 11.494 0 01-7.083-3.8 11.506 11.506 0 01-2.868-7.6 11.52 11.52 0 0111.508-11.505 11.519 11.519 0 0111.508 11.505 11.507 11.507 0 01-2.879 7.6 11.506 11.506 0 01-7.092 3.8V21.459L28.589 25a1.541 1.541 0 001.1.453 1.552 1.552 0 001.091-.448 1.557 1.557 0 000-2.187l-6.185-6.182a1.551 1.551 0 00-1.095-.453 1.551 1.551 0 00-1.159.527l-6.117 6.108a1.537 1.537 0 000 2.146 1.538 1.538 0 001.112.472A1.545 1.545 0 0018.414 25l3.541-3.541v13.447z"
          fill="#50a7f0"
        />
        <Text
          data-name="178,080"
          transform="translate(167.501 28.454)"
          fill="#262626"
          fontSize={12}
          fontFamily="Poppins-Bold, Poppins"
          fontWeight={700}
          letterSpacing=".032em"
        >
          <TSpan x={-57.984} y={0}>
            {"UPLOAD MATERIAL"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default UploadMaterial
