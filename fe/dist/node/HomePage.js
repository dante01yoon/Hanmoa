exports.ids = ["HomePage"];
exports.modules = {

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _indicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indicator */ \"./src/components/carousel/indicator.tsx\");\n/* harmony import */ var _utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/carousel/windowResize */ \"./src/utils/carousel/windowResize.ts\");\n\n\n\n\n/***\r\n * @component\r\n *  carousel slides are in these structures\r\n * <SliderContainer />  <- outmost container that wrapped whole container. Must has width same as parent.\r\n * <Slider /> <- As name quoted, when next and prev button clicked, this component's state changes and give animiation effect\r\n * <Slide /> <- actual content component. div box contain images as background-image css.\r\n */\n\nconst Button = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button.withConfig({\n  displayName: \"Button\",\n  componentId: \"sc-9akxng\"\n})`\n  position:absolute;\n  top: 0;\n  height:100%;\n  all: unset; \n  border: 1px solid ${p => p.theme.colors.cyan};\n  border-radius: 8px;\n  background-color: ${p => p.theme.colors.cyan};\n  cursor: pointer;\n  opacity: 1;\n  transition: all 0.4 ease-in;\n  &:hover {\n    opacity:1; \n  }\n  background-color: yellow;\n  &:first-child{\n    left:0;\n  }\n  &:last-child{\n    right: 0;\n  }\n`; // parent covering Slider\n\nconst SliderContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"SliderContainer\",\n  componentId: \"sc-qtx5up\"\n})` \n  width: 100%;\n  overflow: hidden;\n  position:relative;\n  margin: 0 auto;\n`; // <{\n//   transition: number,  \n//   parentWidth: number\n//   translate: number,\n// }>\n// actual moving Slider\n\nconst Slider = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"Slider\",\n  componentId: \"sc-14dtdkn\"\n})` \n  display: flex;\n  width: 3840px;\n  transform: translateX(-${p => p.translation}px);\n  transition: transform ease-out ${p => p.transition}s;\n  overflow:hidden;\n`;\nconst Carousel = ({\n  children\n}) => {\n  const parentRef = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  const [state, setState] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    activeIndex: 0,\n    translate: 0,\n    transition: 0.25\n  });\n  const [parentWidth, parentHeight] = Object(_utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(parentRef);\n  const {\n    activeIndex,\n    translate,\n    transition\n  } = state;\n  const total = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.count(children);\n  console.log(`total: ${total}, activeIndex: ${activeIndex}`); // 4 carousel slides  ... 0  1  2  3 \n\n  const nextSlide = () => {\n    if (activeIndex < total - 1) {\n      setState({ ...state,\n        translate: (activeIndex + 1) * parentWidth,\n        activeIndex: activeIndex + 1\n      });\n    } else if (activeIndex === total - 1) {\n      setState({ ...state,\n        translate: 0,\n        activeIndex: 0\n      });\n    }\n  };\n\n  const prevSlide = () => {\n    if (activeIndex > 0) {\n      setState({ ...state,\n        translate: (activeIndex - 1) * parentWidth,\n        activeIndex: activeIndex - 1\n      });\n    } else if (activeIndex === 0) {\n      setState({ ...state,\n        translate: (total - 1) * parentWidth,\n        activeIndex: total - 1\n      });\n    }\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    console.log('parentWidth: ', parentWidth);\n\n    if (parentRef.current) {\n      console.log(parentRef.current.offsetWidth);\n      Object(_utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(parentRef);\n    }\n  }, [activeIndex]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SliderContainer, {\n    ref: parentRef\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Slider, {\n    translation: translate,\n    transition: transition,\n    parentWidth: parentWidth * total\n  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_indicator__WEBPACK_IMPORTED_MODULE_2__[\"Indicator\"], {\n    now: 1,\n    total: total\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, {\n    onClick: prevSlide\n  }, \"left\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, {\n    onClick: nextSlide\n  }, \"right\"));\n};\n\n//# sourceURL=webpack:///./src/components/carousel/index.tsx?");

/***/ }),

/***/ "./src/components/carousel/indicator.tsx":
/*!***********************************************!*\
  !*** ./src/components/carousel/indicator.tsx ***!
  \***********************************************/
/*! exports provided: Indicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Indicator\", function() { return Indicator; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Container = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"Container\",\n  componentId: \"sc-10j4ba6\"\n})`\n  display: inline-block; \n  height: 24px;\n  position:absolute;\n  bottom: 32px;\n  left: 50%;\n`;\nconst DotList = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.ul.withConfig({\n  displayName: \"DotList\",\n  componentId: \"sc-1ni4uf8\"\n})`\n  height: 100%; \n`;\nconst Dot = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.li.withConfig({\n  displayName: \"Dot\",\n  componentId: \"sc-1x9ya5j\"\n})`\n  float:left;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  ${p => p.fill ? styled_components__WEBPACK_IMPORTED_MODULE_1__[\"css\"]` background-color: ${p.theme.colors.cyan}` : null};  \n`;\nconst Indicator = ({\n  max = 5,\n  total,\n  now = 1\n}) => {\n  const dotMax = max < total ? max : total;\n  const dotArray = new Array();\n\n  for (let i = 1; i <= dotMax; i++) {\n    if (i === now) dotArray.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {\n      key: i,\n      fill: true\n    }));else dotArray.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {\n      key: i\n    }));\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DotList, null, dotArray));\n};\n\n//# sourceURL=webpack:///./src/components/carousel/indicator.tsx?");

/***/ }),

/***/ "./src/components/carousel/slide.tsx":
/*!*******************************************!*\
  !*** ./src/components/carousel/slide.tsx ***!
  \*******************************************/
/*! exports provided: Slide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Slide\", function() { return Slide; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Img = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"Img\",\n  componentId: \"sc-1d4n516\"\n})`\n  border: 1px solid black;\n  width: 100%;\n  height: 70vh;\n  background: url(${p => p.url}) no-repeat center;\n  background-size: cover;\n`;\nconst Slide = ({\n  url\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Img, {\n    url: url\n  });\n};\n\n//# sourceURL=webpack:///./src/components/carousel/slide.tsx?");

/***/ }),

/***/ "./src/pages/home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/carousel */ \"./src/components/carousel/index.tsx\");\n/* harmony import */ var _components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/carousel/slide */ \"./src/components/carousel/slide.tsx\");\n/* harmony import */ var _asset_adobe_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../asset/adobe.jpg */ \"./src/asset/adobe.jpg\");\n/* harmony import */ var _asset_netflix_phone_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../asset/netflix_phone.jpg */ \"./src/asset/netflix_phone.jpg\");\n/* harmony import */ var _asset_netflix_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../asset/netflix.jpg */ \"./src/asset/netflix.jpg\");\n\n\n\n\n\n\n\nconst HomePage = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel__WEBPACK_IMPORTED_MODULE_1__[\"Carousel\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__[\"Slide\"], {\n    url: _asset_netflix_jpg__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__[\"Slide\"], {\n    url: _asset_adobe_jpg__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_2__[\"Slide\"], {\n    url: _asset_netflix_phone_jpg__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);\n\n//# sourceURL=webpack:///./src/pages/home/index.tsx?");

/***/ }),

/***/ "./src/pages/login/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/login/index.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst LoginPage = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \"LoginPage\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginPage);\n\n//# sourceURL=webpack:///./src/pages/login/index.tsx?");

/***/ }),

/***/ "./src/pages/room/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/room/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst RoomPage = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \"RoomPage\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RoomPage);\n\n//# sourceURL=webpack:///./src/pages/room/index.tsx?");

/***/ }),

/***/ "./src/pages/signup/index.tsx":
/*!************************************!*\
  !*** ./src/pages/signup/index.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst SignUpPage = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, \"SignUpPage\");\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SignUpPage);\n\n//# sourceURL=webpack:///./src/pages/signup/index.tsx?");

/***/ }),

/***/ "./src/utils/carousel/windowResize.ts":
/*!********************************************!*\
  !*** ./src/utils/carousel/windowResize.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/***\r\n * @function resizeWindow\r\n * this function is custom hook for grab resizing innerWidth of element.\r\n *\r\n *\r\n */\n\nconst resizeWindow = ref => {\n  const [size, setSize] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])((() => {\n    const [elementWidth, elementHeight] = ref.current ? [ref.current.offsetWidth, ref.current.offsetHeight] : [0, 0];\n    return [elementWidth, elementHeight];\n  })()); // useLayoutEffect(() => {\n  //   const updateSize = () => {\n  //     setSize([elementWidth, elementHeight]);\n  //     console.log(`elementWidth: ${elementWidth}px`);\n  //   };\n  //   updateSize(); \n  //   window.addEventListener('resize', updateSize);\n  //   return () => window.removeEventListener('resize', updateSize);\n  // },[]);\n\n  return size;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (resizeWindow);\n\n//# sourceURL=webpack:///./src/utils/carousel/windowResize.ts?");

/***/ })

};;