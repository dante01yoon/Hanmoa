module.exports = {
  plugins: ["stylelint-order"],
  ignoreFiles: ["**/*.ts"],
  rules: {
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["after-same-name", "first-nested"],
        ignore: ["after-comment"],
        ignoreAtRules: ["keyframes"],
      },
    ],
    "block-no-empty": null,
    "block-closing-brace-space-before": "never-single-line",
    "block-opening-brace-space-after": "never-single-line",
    "declaration-colon-newline-after": null,
    "function-name-case": null,
    "number-leading-zero": "always",
    "order/order": ["custom-properties", "rules"],
    "order/properties-order": [
      "content",
      "display",
      {
        // 위치, x/y/z 좌표
        properties: [
          "position",
          "top",
          "right",
          "bottom",
          "left",
          "z-index",
          "transform",
          "transform-origin",
        ],
      },
      {
        // Flexbox
        properties: [
          "flex",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "order",
          "flex-flow",
          "flex-direction",
          "flex-wrap",
          "justify-content",
          "align-items",
          "align-self",
          "align-content",
        ],
      },
      {
        // floats
        properties: ["float", "clear"],
      },
      {
        // 배경/전경: 이미지 등의 배경이 전경에 영향을 미친다.
        properties: [
          "background",
          "background-color",
          "background-image",
          "background-size",
          "background-position",
          "background-repeat",
          "color",
        ],
      },
      {
        // 타이포그래피: 글씨 크기와 가독성이 dimension에 영향을 미친다.
        properties: [
          "font",
          "font-family",
          "font-variant",
          "font-size",
          "font-weight",
          "font-style",
          "text-transform",
          "text-shadow",
          "letter-spacing",
          "text-decoration",
          "vertical-align",
          "line-height",
          "white-space",
          "text-align",
          "text-indent",
        ],
      },
      {
        // list items
        properties: [
          "list-style",
          "list-style-type",
          "list-style-image",
          "list-style-position",
        ],
      },
      {
        // dimensions
        properties: [
          "box-sizing",
          "width",
          "min-width",
          "max-width",
          "height",
          "min-height",
          "max-height",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "border",
          "border-width",
          "border-style",
          "border-color",
          "border-top",
          "border-top-width",
          "border-top-style",
          "border-top-color",
          "border-right",
          "border-right-width",
          "border-right-style",
          "border-right-color",
          "border-bottom",
          "border-bottom-width",
          "border-bottom-style",
          "border-bottom-color",
          "border-left",
          "border-left-width",
          "border-left-style",
          "border-left-color",
          "border-radius",
          "border-top-left-radius",
          "border-top-right-radius",
          "border-bottom-right-radius",
          "border-bottom-left-radius",
          "outline",
          "outline-width",
          "outline-style",
          "outline-color",
          "box-shadow",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
        ],
      },
      {
        // overflows
        properties: ["overflow", "overflow-x", "overflow-y", "text-overflow"],
      },
      {
        // transparency
        properties: ["visibility", "opacity"],
      },
      {
        // 애니메이션: 스타일이 적용된 element에 keyframes를 적용
        properties: [
          "animation",
          "animation-name",
          "animation-duration",
          "animation-timing-function",
          "animation-delay",
          "animation-iteration-count",
          "animation-direction",
          "animation-fill-mode",
          "animation-play-state",
        ],
      },
      "cursor", // element와 상호작용 하는 시스템 인터페이스
      {
        // transitions: 다른 property에 추가되는 속성
        properties: [
          "transition",
          "transition-property",
          "transition-duration",
          "transition-timing-function",
          "transition-delay",
        ],
      },
    ],
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["label", "user-drag"],
      },
    ],
    "selector-type-no-unknown": null,
    "value-list-comma-newline-after": null,
    "value-keyword-case": null,
  },
}