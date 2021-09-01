import * as React from "react"
import Svg, { Defs, G, Path, SvgCss } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style */

const xml = `<svg id="eyes" xmlns="http://www.w3.org/2000/svg" width="680" height="1040" viewBox="0 0 680 1040">
  <defs>
    <style>
      .cls-1 {
        fill: #fff;
      }

      .cls-1, .cls-2 {
        fill-rule: evenodd;
      }
    </style>
  </defs>
  <g id="sleepy-eyes">
    <g id="eye-right_copy" data-name="eye-right copy">
      <path id="Ellipse_3_copy" data-name="Ellipse 3 copy" class="cls-1" d="M330.585,291.742a51.513,51.513,0,0,1-102.985.027C244.552,291.88,316.616,291.822,330.585,291.742Z"/>
      <path id="Ellipse_3_copy_3" data-name="Ellipse 3 copy 3" class="cls-2" d="M307.876,291.8a29.457,29.457,0,0,1-58.829.023C266.691,291.839,290.216,291.827,307.876,291.8Z"/>
    </g>
    <g id="eye-right">
      <path id="Ellipse_3_copy-2" data-name="Ellipse 3 copy" class="cls-1" d="M450.585,291.742a51.513,51.513,0,0,1-102.985.027C364.552,291.88,436.616,291.822,450.585,291.742Z"/>
      <path id="Ellipse_3_copy_3-2" data-name="Ellipse 3 copy 3" class="cls-2" d="M427.876,291.8a29.457,29.457,0,0,1-58.829.023C386.691,291.839,410.216,291.827,427.876,291.8Z"/>
    </g>
    <path id="Rounded_Rectangle_1_copy_3" data-name="Rounded Rectangle 1 copy 3" class="cls-2" d="M443.374,220.638l-86.347-.166a9.019,9.019,0,0,0-.034,18.037l86.346,0.165A9.018,9.018,0,1,0,443.374,220.638Z"/>
    <path id="Rounded_Rectangle_1_copy_4" data-name="Rounded Rectangle 1 copy 4" class="cls-2" d="M322.374,220.638l-86.347-.166a9.019,9.019,0,0,0-.034,18.037l86.346,0.165A9.018,9.018,0,1,0,322.374,220.638Z"/>
  </g>
</svg>`;

export default () => <SvgCss xml={xml} width="100%" height="100%" />;
