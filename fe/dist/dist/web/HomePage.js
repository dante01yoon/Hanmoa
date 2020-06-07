(window["__LOADABLE_LOADED_CHUNKS__"] = window["__LOADABLE_LOADED_CHUNKS__"] || []).push([["HomePage"],{

/***/ "./src/asset/adobe.jpg":
/*!*****************************!*\
  !*** ./src/asset/adobe.jpg ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"ca2f7fccd9970e786ebb1172d3d304cc.jpg\");\n\n//# sourceURL=webpack:///./src/asset/adobe.jpg?");

/***/ }),

/***/ "./src/asset/netflix.jpg":
/*!*******************************!*\
  !*** ./src/asset/netflix.jpg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"579b7161eec96a7d853f3ca8c8969812.jpg\");\n\n//# sourceURL=webpack:///./src/asset/netflix.jpg?");

/***/ }),

/***/ "./src/asset/netflix_phone.jpg":
/*!*************************************!*\
  !*** ./src/asset/netflix_phone.jpg ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"8521fef91ad62d462c9be9127cb383f5.jpg\");\n\n//# sourceURL=webpack:///./src/asset/netflix_phone.jpg?");

/***/ }),

/***/ "./src/components/carousel/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/carousel/index.tsx ***!
  \*******************************************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n/* harmony import */ var _indicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indicator */ \"./src/components/carousel/indicator.tsx\");\n/* harmony import */ var _utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/carousel/windowResize */ \"./src/utils/carousel/windowResize.ts\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _templateObject3() {\n  var data = _taggedTemplateLiteral([\" \\n  display: flex;\\n  width: \", \"px; \\n  transform: translateX(-\", \"px);\\n  transition: transform ease-out \", \"s;\\n  overflow:hidden;\\n\"]);\n\n  _templateObject3 = function _templateObject3() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject2() {\n  var data = _taggedTemplateLiteral([\" \\n  width: 100%;\\n  overflow: hidden;\\n  position:relative;\\n  margin: 0 auto;\\n\"]);\n\n  _templateObject2 = function _templateObject2() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject() {\n  var data = _taggedTemplateLiteral([\"\\n  height:100%;\\n  bottom: 0;\\n  position: absolute;\\n  background-color: \", \";\\n  cursor: pointer;\\n  opacity: 0;\\n  transition: all 0.5s ease;\\n  &:hover {\\n    opacity:0.5; \\n  }\\n  &:first-child{\\n    left:0;\\n  }\\n  &:last-child{\\n    right: 0;\\n  }\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\n\n\n\n/***\r\n * @component\r\n *  carousel slides are in these structures\r\n * <SliderContainer />  <- outmost container that wrapped whole container. Must has width same as parent.\r\n * <Slider /> <- As name quoted, when next and prev button clicked, this component's state changes and give animiation effect\r\n * <Slide /> <- actual content component. div box contain images as background-image css.\r\n */\n\nvar Button = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].button.withConfig({\n  displayName: \"Button\",\n  componentId: \"sc-9akxng\"\n})(_templateObject(), function (p) {\n  return p.theme.colors.transparent;\n}); // parent covering Slider\n\nvar SliderContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div.withConfig({\n  displayName: \"SliderContainer\",\n  componentId: \"sc-qtx5up\"\n})(_templateObject2());\nvar Slider = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div.withConfig({\n  displayName: \"Slider\",\n  componentId: \"sc-14dtdkn\"\n})(_templateObject3(), function (p) {\n  return p.parentWidth;\n}, function (p) {\n  return p.translation;\n}, function (p) {\n  return p.transition;\n});\nvar Carousel = function Carousel(_ref) {\n  var children = _ref.children;\n  var parentRef = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    activeIndex: 0,\n    translate: 0,\n    transition: 0.25\n  }),\n      _useState2 = _slicedToArray(_useState, 2),\n      state = _useState2[0],\n      setState = _useState2[1];\n\n  var parentWidth = Object(_utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(parentRef);\n  var activeIndex = state.activeIndex,\n      translate = state.translate,\n      transition = state.transition;\n  var total = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.count(children);\n\n  var nextSlide = function nextSlide() {\n    if (activeIndex < total - 1) {\n      setState({\n        transition: 0.5,\n        translate: (activeIndex + 1) * parentWidth,\n        activeIndex: activeIndex + 1\n      });\n    } else if (activeIndex === total - 1) {\n      setState({\n        transition: 0,\n        translate: 0,\n        activeIndex: 0\n      });\n    }\n  };\n\n  var prevSlide = function prevSlide() {\n    if (activeIndex > 0) {\n      setState({\n        transition: 0.5,\n        translate: (activeIndex - 1) * parentWidth,\n        activeIndex: activeIndex - 1\n      });\n    } else if (activeIndex === 0) {\n      setState({\n        transition: 0,\n        translate: (total - 1) * parentWidth,\n        activeIndex: total - 1\n      });\n    }\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SliderContainer, {\n    ref: parentRef\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Slider, {\n    translation: translate,\n    transition: transition,\n    parentWidth: parentWidth * total\n  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_indicator__WEBPACK_IMPORTED_MODULE_2__[\"Indicator\"], {\n    now: activeIndex + 1,\n    total: total\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, {\n    onClick: prevSlide\n  }, \"left\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, {\n    onClick: nextSlide\n  }, \"right\"));\n};\n\n//# sourceURL=webpack:///./src/components/carousel/index.tsx?");

/***/ }),

/***/ "./src/components/carousel/indicator.tsx":
/*!***********************************************!*\
  !*** ./src/components/carousel/indicator.tsx ***!
  \***********************************************/
/*! exports provided: Indicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Indicator\", function() { return Indicator; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nfunction _templateObject3() {\n  var data = _taggedTemplateLiteral([\"\\n  float:left;\\n  width: 24px;\\n  height: 8px;\\n  margin: 4px;\\n  border-radius: 16px;\\n  background-color: \", \";  \\n\"]);\n\n  _templateObject3 = function _templateObject3() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject2() {\n  var data = _taggedTemplateLiteral([\"\\n  height: 100%; \\n\"]);\n\n  _templateObject2 = function _templateObject2() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _templateObject() {\n  var data = _taggedTemplateLiteral([\"\\n  display: inline-block; \\n  border: 0;\\n  height: 24px;\\n  position:absolute;\\n  bottom: 32px;\\n  right: 40px;\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\n\nvar Container = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div.withConfig({\n  displayName: \"Container\",\n  componentId: \"sc-10j4ba6\"\n})(_templateObject());\nvar DotList = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ul.withConfig({\n  displayName: \"DotList\",\n  componentId: \"sc-1ni4uf8\"\n})(_templateObject2());\nvar Dot = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].li.withConfig({\n  displayName: \"Dot\",\n  componentId: \"sc-1x9ya5j\"\n})(_templateObject3(), function (p) {\n  return p.fill ? \"\".concat(p.theme.colors.gray_700) : \"\".concat(p.theme.colors.gray_200);\n});\nvar Indicator = function Indicator(_ref) {\n  var _ref$max = _ref.max,\n      max = _ref$max === void 0 ? 5 : _ref$max,\n      total = _ref.total,\n      _ref$now = _ref.now,\n      now = _ref$now === void 0 ? 1 : _ref$now;\n  var dotMax = max < total ? max : total;\n  var dotArray = new Array();\n\n  for (var i = 1; i <= dotMax; i++) {\n    if (i === now) dotArray.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {\n      key: i,\n      fill: true\n    }));else dotArray.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {\n      key: i\n    }));\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DotList, null, dotArray));\n};\n\n//# sourceURL=webpack:///./src/components/carousel/indicator.tsx?");

/***/ }),

/***/ "./src/components/carousel/slide.tsx":
/*!*******************************************!*\
  !*** ./src/components/carousel/slide.tsx ***!
  \*******************************************/
/*! exports provided: Slide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Slide\", function() { return Slide; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\nfunction _templateObject() {\n  var data = _taggedTemplateLiteral([\"\\n  width: 100%;\\n  height: 60vh;\\n  max-height: 400px;\\n  background: url(\", \") no-repeat center;\\n  background-size: cover;\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\n\n\nvar Img = styled_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"].div.withConfig({\n  displayName: \"Img\",\n  componentId: \"sc-1d4n516\"\n})(_templateObject(), function (p) {\n  return p.url;\n});\nvar Slide = function Slide(_ref) {\n  var url = _ref.url;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Img, {\n    url: url\n  });\n};\n\n//# sourceURL=webpack:///./src/components/carousel/slide.tsx?");

/***/ }),

/***/ "./src/pages/home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/carousel */ \"./src/components/carousel/index.tsx\");\n/* harmony import */ var _components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/carousel/slide */ \"./src/components/carousel/slide.tsx\");\n/* harmony import */ var _asset_adobe_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../asset/adobe.jpg */ \"./src/asset/adobe.jpg\");\n/* harmony import */ var _asset_netflix_phone_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../asset/netflix_phone.jpg */ \"./src/asset/netflix_phone.jpg\");\n/* harmony import */ var _asset_netflix_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../asset/netflix.jpg */ \"./src/asset/netflix.jpg\");\n\n\n\n\n\n\n\nvar HomePage = function HomePage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__[\"Slide\"], {\n    url: _asset_netflix_jpg__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__[\"Slide\"], {\n    url: _asset_adobe_jpg__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__[\"Slide\"], {\n    url: _asset_netflix_phone_jpg__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);\n\n//# sourceURL=webpack:///./src/pages/home/index.tsx?");

/***/ }),

/***/ "./src/pages/login/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/login/index.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar LoginPage = function LoginPage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \"LoginPage\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginPage);\n\n//# sourceURL=webpack:///./src/pages/login/index.tsx?");

/***/ }),

/***/ "./src/pages/room/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/room/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar RoomPage = function RoomPage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \"RoomPage\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RoomPage);\n\n//# sourceURL=webpack:///./src/pages/room/index.tsx?");

/***/ }),

/***/ "./src/pages/signup/index.tsx":
/*!************************************!*\
  !*** ./src/pages/signup/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar SignUpPage = function SignUpPage() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \"SignUpPage\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SignUpPage);\n\n//# sourceURL=webpack:///./src/pages/signup/index.tsx?");

/***/ }),

/***/ "./src/utils/carousel/windowResize.ts":
/*!********************************************!*\
  !*** ./src/utils/carousel/windowResize.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n/***\r\n * @function resizeWindow\r\n * this function is custom hook for grab resizing innerWidth of element.\r\n *\r\n *\r\n */\n\nvar useResize = function useResize(ref) {\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(function () {\n    var _ref = ref.current ? [ref.current.offsetWidth, ref.current.offsetHeight] : [0, 0],\n        _ref2 = _slicedToArray(_ref, 2),\n        elementWidth = _ref2[0],\n        elementHeight = _ref2[1];\n\n    return [elementWidth, elementHeight];\n  }()),\n      _useState2 = _slicedToArray(_useState, 2),\n      size = _useState2[0],\n      setSize = _useState2[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useLayoutEffect\"])(function () {\n    var updateSize = function updateSize() {\n      console.log('ref: ', [ref.current.offsetWidth, ref.current.offsetHeight]);\n      setSize([ref.current.offsetWidth, ref.current.offsetHeight]);\n    };\n\n    updateSize();\n    window.addEventListener('resize', updateSize);\n    return function () {\n      return window.removeEventListener('resize', updateSize);\n    };\n  }, []);\n  return size[0];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useResize);\n\n//# sourceURL=webpack:///./src/utils/carousel/windowResize.ts?");

/***/ })

}]);