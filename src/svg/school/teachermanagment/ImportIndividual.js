import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function ImportIndividual(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      {...props}
    >
      <G data-name="Group 2182" transform="translate(-155 300)">
        <Circle
          data-name="Ellipse 738"
          cx={43}
          cy={43}
          r={43}
          transform="translate(155 -300)"
          fill="#99edad"
        />
        <Path
          data-name="Path 5249"
          d="M215.287-276.559a9.286 9.286 0 019.289 9.288v44.079a43.009 43.009 0 01-53.408-.2v-35.1c9.727-9.433 13.91-12.607 18-18.06z"
          fill="#fff"
        />
        <Path
          data-name="Path 3941"
          d="M189.683-276.306a1.97 1.97 0 01.969.866c.165-.093.245.151.245.946v11.486a6.213 6.213 0 01-6.212 6.214h-11.479a1.967 1.967 0 01-1.392-3.358l15.729-15.727a1.964 1.964 0 012.141-.427z"
          fill="#00b754"
        />
        <Path
          data-name="Path 712"
          d="M197.988-230.2a12 12 0 1112-12 12 12 0 01-12 12z"
          fill="#d7ff86"
          stroke="#dffc95"
        />
        <Path
          data-name="Path 3223"
          d="M197.088-237.725v-6.724l-2.085 2.086a.908.908 0 01-1.287-.022.906.906 0 010-1.263l3.6-3.6a.909.909 0 01.683-.309.9.9 0 01.644.268h0l3.641 3.641a.91.91 0 010 1.287.911.911 0 01-.641.265.909.909 0 01-.644-.267l-2.087-2.088v6.725a.909.909 0 01-.909.911.911.911 0 01-.915-.91z"
          fill="#00b754"
          stroke="#00b754"
          strokeWidth={0.6}
        />
      </G>
    </Svg>
  )
}

export default ImportIndividual
