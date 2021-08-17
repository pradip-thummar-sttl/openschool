import * as React from "react"
import Svg, { G, Circle, Path, Rect, Ellipse } from "react-native-svg"
import PupilManagement from "../../screens/teacher/pupilmanagement/PupilManagement"

function Pupil(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={128}
      height={128}
      viewBox="0 0 128 128"
      {...props}
    >
      <G
        data-name="pupil"
        transform="translate(2 2)"
        fill="#ffd719"
        stroke="#fff"
        strokeWidth={2}
      >
        <Circle cx={62} cy={62} r={62} stroke="none" />
        <Circle cx={62} cy={62} r={63} fill="none" />
      </G>
      <G transform="translate(-327.959 -313.607)">
        <Path
          data-name="Rectangle 17717"
          fill="#003446"
          d="M368.003 356.378h52.009v24.004h-52.009z"
        />
        <Path
          data-name="Rectangle 17715"
          fill="#ffb100"
          d="M376.205 409.018h33.051v6.78h-33.051z"
        />
        <Path
          data-name="Intersection 104"
          d="M354.279 428.1a49.609 49.609 0 016.373-6.216 49.362 49.362 0 0114.4-8.176 49.336 49.336 0 0116.9-2.96 49.316 49.316 0 0116.9 2.96 49.392 49.392 0 0114.408 8.176 49.723 49.723 0 016.369 6.215 62.722 62.722 0 01-37.68 12.506 62.722 62.722 0 01-37.67-12.505z"
          fill="#17a9ea"
        />
        <G data-name="Group 1887" transform="translate(355.934 354.088)">
          <Circle
            data-name="Ellipse 507"
            cx={8.947}
            cy={8.947}
            r={8.947}
            transform="translate(54.158 19.434)"
            fill="#d14034"
          />
          <Path
            data-name="Path 4268"
            d="M26.373 66.185V50.674a23.355 23.355 0 01-11.149-14.225 8.946 8.946 0 11-1.083-13.659 23.584 23.584 0 0147.155.794v4.508a23.739 23.739 0 01-.353 4.089 23.323 23.323 0 01-14.412 19.707v14.3z"
            fill="#d06444"
          />
          <Rect
            data-name="Rectangle 17600"
            width={13.076}
            height={6.194}
            rx={3.097}
            transform="rotate(-12.04 53.608 -95.07)"
            fill="#262626"
          />
          <Rect
            data-name="Rectangle 17677"
            width={13.076}
            height={6.194}
            rx={3.097}
            transform="rotate(2 -171.094 1214.609)"
            fill="#262626"
          />
          <Path
            data-name="Path 3691"
            d="M34.977 35.06a4.722 4.722 0 004.71 2.36c2.462-.079 3.852-1.584 4.42-1.273s.26 1.814-1.529 2.773a7.052 7.052 0 01-6.01.262 5.645 5.645 0 01-3.018-2.55c-.812-1.207.27-3.228 1.427-1.572z"
            fill="#262626"
          />
          <G data-name="Group 1824">
            <G data-name="Group 1822" transform="translate(22.346 16.413)">
              <Circle
                data-name="Ellipse 498"
                cx={7.627}
                cy={7.627}
                r={7.627}
                fill="#fff"
              />
              <Ellipse
                data-name="Ellipse 500"
                cx={3.814}
                cy={4.237}
                rx={3.814}
                ry={4.237}
                transform="translate(1.084 1)"
                fill="#262626"
              />
            </G>
            <G data-name="Group 1823" transform="translate(40.143 16.413)">
              <Circle
                data-name="Ellipse 498"
                cx={7.627}
                cy={7.627}
                r={7.627}
                fill="#fff"
              />
              <Circle
                data-name="Ellipse 500"
                cx={4.237}
                cy={4.237}
                r={4.237}
                transform="translate(1.237 1)"
                fill="#262626"
              />
            </G>
          </G>
        </G>
        <G data-name="Group 1857">
          <Path
            data-name="Path 4099"
            d="M379.813 410.75l12.139 8.824 12.528-8.824h-24.667"
            fill="#fff"
          />
          <Path
            data-name="Rectangle 17678"
            fill="#d06444"
            d="M379.849 399.017h24.576v11.864h-24.576z"
          />
        </G>
        <Rect
          data-name="Rectangle 17679"
          width={9.322}
          height={23.5}
          rx={4.661}
          transform="rotate(-58 559.302 -125.843)"
          fill="#ffb100"
        />
        <Rect
          data-name="Rectangle 17680"
          width={9.322}
          height={23.925}
          rx={4.661}
          transform="rotate(-122 315.768 104.608)"
          fill="#ffb100"
        />
        <Path
          data-name="Rectangle 17668"
          d="M384.003 339.375h20.009a16 16 0 0116 16v8h-52.009v-8a16 16 0 0116-16z"
          fill="#8ce33a"
        />
        <Path
          data-name="Rectangle 17669"
          d="M394.006 346.376a10 10 0 0110 10h-20a10 10 0 0110-10z"
          fill="#008b56"
        />
        <Path
          data-name="Rectangle 17670"
          fill="#00b754"
          d="M368.003 359.378h65.011v5.001h-65.011z"
        />
        <Path
          data-name="Rectangle 17671"
          d="M401.006 344.376h8v5a7 7 0 01-7 7h-13a12 12 0 0112-12z"
          fill="#262626"
        />
      </G>
    </Svg>
  )
}

export default Pupil;
