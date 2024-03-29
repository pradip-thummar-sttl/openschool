import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Logout(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 26 25.99"
      {...props}
    >
      <G data-name="Group 1708">
        <G data-name="Group 1705">
          <Path
            data-name="Path 3543"
            d="M9.277 0c-.005 1.03-.005 2.061-.01 3.091 0 .127.01.254.01.381v19.045c0 1.066-.015 2.132-.021 3.193 0 .091.01.183.015.279h-.154c-.02-.02-.036-.056-.061-.061l-4.938-1.782c-.912-.33-1.824-.67-2.741-.995-.456-.162-.917-.3-1.378-.457V3.3a.509.509 0 00.123-.015c.937-.335 1.875-.675 2.812-1.01Q5.477 1.361 8.016.437C8.385.3 8.749.148 9.116 0h.161z"
            fill="#f37474"
          />
        </G>
        <G data-name="Group 1706" fill="#727682">
          <Path
            data-name="Path 3544"
            d="M9.158 3.12v19.7h7.633v-7.607h-4.539V10.72h4.533v-7.6z"
          />
          <Path
            data-name="Path 3545"
            d="M9.158 3.12h7.628v7.6h-4.533v4.489h4.539v7.607H9.158z"
          />
        </G>
        <G data-name="Group 1707">
          <Path
            data-name="Path 3546"
            d="M26.002 13.026q-1.183.937-2.372 1.875c-.789.625-1.588 1.245-2.377 1.87-.707.558-1.4 1.127-2.105 1.685-.277.22-.553.43-.866.671v-3.842h-6.18v-4.636h6.157V6.797c.318.241.594.451.866.666q.968.761 1.936 1.532c.62.492 1.229.994 1.849 1.486q1.537 1.222 3.084 2.433a.908.908 0 01.008.112z"
            fill="#65bff6"
          />
        </G>
      </G>
    </Svg>
  )
}

export default Logout
