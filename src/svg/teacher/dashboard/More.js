import * as React from "react"
import Svg, { Path } from "react-native-svg"

function More(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 18.715 4.775"
      {...props}
    >
      <Path
        data-name="Path 3269"
        d="M14.64 4.075a2.388 2.388 0 010-3.376 2.387 2.387 0 013.376 0 2.387 2.387 0 010 3.376 2.378 2.378 0 01-1.688.7 2.38 2.38 0 01-1.688-.7zm-6.97 0a2.388 2.388 0 010-3.376 2.388 2.388 0 013.377 0 2.388 2.388 0 010 3.376 2.38 2.38 0 01-1.688.7 2.38 2.38 0 01-1.69-.7zm-6.97 0A2.387 2.387 0 01.7.699a2.387 2.387 0 013.376 0 2.388 2.388 0 010 3.376 2.38 2.38 0 01-1.688.7 2.378 2.378 0 01-1.688-.7z"
        fill="#262626"
      />
    </Svg>
  )
}

export default More

