import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TickMarkGrey(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={9.688}
      viewBox="0 0 11 9.688"
      {...props}
    >
      <Path
        data-name="check-icon"
        d="M.173 5.481A.715.715 0 00.251 6.49l3.53 3.026a.711.711 0 00.464.172h.064a.713.713 0 00.49-.258l6.035-7.352a.716.716 0 00-.1-1.008l-1.1-.912a.717.717 0 00-1.007.1L3.98 5.917l-1.867-1.6a.717.717 0 00-1.009.078z"
        fill="#b4b7c3"
      />
    </Svg>
  )
}

export default TickMarkGrey
