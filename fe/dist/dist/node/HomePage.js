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

/***/ "./src/components/card/index.tsx":
/*!***************************************!*\
  !*** ./src/components/card/index.tsx ***!
  \***************************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Card\", function() { return Card; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icon */ \"./src/components/icon/index.tsx\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ \"./src/components/card/style.tsx\");\n\n\n\nconst {\n  Container,\n  ImgBox,\n  ContentBox,\n  CategoryBox,\n  CategoryIcon,\n  Category,\n  MemberCount,\n  TitleBox,\n  Title,\n  TitleIcons,\n  IconBox\n} = _style__WEBPACK_IMPORTED_MODULE_2__;\nconst Card = ({\n  width,\n  height,\n  data\n}) => {\n  const {\n    imgUrl,\n    title,\n    description,\n    host,\n    members,\n    full,\n    current,\n    category,\n    url\n  } = data;\n  const extractedUrl = imgUrl !== null && imgUrl !== void 0 ? imgUrl : 'none';\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ImgBox, {\n    imgUrl: extractedUrl\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ContentBox, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CategoryBox, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CategoryIcon, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Category, null, category), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MemberCount, null, \" \", current, \" / \", full, \" \"), \"  \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MemberCount, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TitleBox, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Title, null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TitleIcons, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_icon__WEBPACK_IMPORTED_MODULE_1__[\"Icon\"], {\n    shape: 'share',\n    clickHandler: () => console.log('share')\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_icon__WEBPACK_IMPORTED_MODULE_1__[\"Icon\"], {\n    shape: 'heart',\n    clickHandler: () => console.log('heart')\n  })))));\n};\n\n//# sourceURL=webpack:///./src/components/card/index.tsx?");

/***/ }),

/***/ "./src/components/card/style.tsx":
/*!***************************************!*\
  !*** ./src/components/card/style.tsx ***!
  \***************************************/
/*! exports provided: Container, ImgBox, ContentBox, CategoryBox, CategoryIcon, Category, MemberCount, TitleBox, Title, TitleIcons, IconBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Container\", function() { return Container; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ImgBox\", function() { return ImgBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ContentBox\", function() { return ContentBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CategoryBox\", function() { return CategoryBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CategoryIcon\", function() { return CategoryIcon; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Category\", function() { return Category; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MemberCount\", function() { return MemberCount; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TitleBox\", function() { return TitleBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Title\", function() { return Title; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TitleIcons\", function() { return TitleIcons; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IconBox\", function() { return IconBox; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n\nconst Container = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"Container\",\n  componentId: \"sc-1w00tmi\"\n})`\n  width: ${p => p.width ? `${p.width}` : 296}px;\n  height: ${p => p.height ? `${p.height}` : 280}px;\n`;\nconst ImgBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"ImgBox\",\n  componentId: \"sc-138z0g9\"\n})`\n  width: 100%;\n  height: 58%;\n  background: url(${p => p.imgUrl}) no-repeat center;\n  background-size: cover;\n`;\nconst ContentBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"ContentBox\",\n  componentId: \"sc-z40wsd\"\n})`\n  width: 100%;\n  height: 42%; \n  margin: 0 auto;\n`;\nconst CategoryBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"CategoryBox\",\n  componentId: \"sc-g6bxnb\"\n})`\n  width: 248px;\n  height: 24px;\n  display:flex; \n`;\nconst CategoryIcon = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"CategoryIcon\",\n  componentId: \"sc-grtilq\"\n})`\n  width: 24px;\n  height: 100%;\n`;\nconst Category = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"Category\",\n  componentId: \"sc-1kpy6d2\"\n})`\n  width: 192px;\n  height: 100%:\n  line-clamps: 1; \n`;\nconst MemberCount = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"MemberCount\",\n  componentId: \"sc-d35us7\"\n})`\n  width: 32px; \n  height: 100%;\n`;\nconst TitleBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"TitleBox\",\n  componentId: \"sc-1sdc6e1\"\n})`\n  width: 248px;\n  height: 48px;\n  display: flex;\n`;\nconst Title = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"Title\",\n  componentId: \"sc-15rtnhy\"\n})`\n  width: 152px;\n  height: 100%;\n  line-clamps: 2;\n`;\nconst TitleIcons = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"TitleIcons\",\n  componentId: \"sc-tfizpi\"\n})`\n  width: 64px;\n  height: 100%;\n  display: flex;\n  justify-content: center; \n  align-items: center;\n`;\nconst IconBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"IconBox\",\n  componentId: \"sc-179n43w\"\n})`\n  width: 24px;\n  height: 24px;\n  background: url(${p => p.url}) no-repeat center;\n  background-size: cover; \n  cursor: pointer;\n`;\n\n//# sourceURL=webpack:///./src/components/card/style.tsx?");

/***/ }),

/***/ "./src/components/carousel/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/carousel/index.tsx ***!
  \*******************************************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _indicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./indicator */ \"./src/components/carousel/indicator.tsx\");\n/* harmony import */ var _utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/carousel/windowResize */ \"./src/utils/carousel/windowResize.ts\");\n\n\n\n\n/***\r\n * @component\r\n *  carousel slides are in these structures\r\n * <SliderContainer />  <- outmost container that wrapped whole container. Must has width same as parent.\r\n * <Slider /> <- As name quoted, when next and prev button clicked, this component's state changes and give animiation effect\r\n * <Slide /> <- actual content component. div box contain images as background-image css.\r\n */\n\nconst Button = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.button.withConfig({\n  displayName: \"Button\",\n  componentId: \"sc-9akxng\"\n})`\n  height:100%;\n  bottom: 0;\n  position: absolute;\n  background-color: ${p => p.theme.colors.transparent};\n  cursor: pointer;\n  opacity: 0;\n  transition: all 0.5s ease;\n  &:hover {\n    opacity:0.5; \n  }\n  &:first-child{\n    left:0;\n  }\n  &:last-child{\n    right: 0;\n  }\n`; // parent covering Slider\n\nconst SliderContainer = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"SliderContainer\",\n  componentId: \"sc-qtx5up\"\n})` \n  width: 100%;\n  overflow: hidden;\n  position:relative;\n  margin: 0 auto;\n`;\nconst Slider = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"Slider\",\n  componentId: \"sc-14dtdkn\"\n})` \n  display: flex;\n  width: ${p => p.parentWidth}px; \n  transform: translateX(-${p => p.translation}px);\n  transition: transform ease-out ${p => p.transition}s;\n  overflow:hidden;\n`;\nconst Carousel = ({\n  children\n}) => {\n  const parentRef = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useRef\"])(null);\n  const [state, setState] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    activeIndex: 0,\n    translate: 0,\n    transition: 0.25\n  });\n  const parentWidth = Object(_utils_carousel_windowResize__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(parentRef);\n  const {\n    activeIndex,\n    translate,\n    transition\n  } = state;\n  const total = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.count(children);\n\n  const nextSlide = () => {\n    if (activeIndex < total - 1) {\n      setState({\n        transition: 0.5,\n        translate: (activeIndex + 1) * parentWidth,\n        activeIndex: activeIndex + 1\n      });\n    } else if (activeIndex === total - 1) {\n      setState({\n        transition: 0,\n        translate: 0,\n        activeIndex: 0\n      });\n    }\n  };\n\n  const prevSlide = () => {\n    if (activeIndex > 0) {\n      setState({\n        transition: 0.5,\n        translate: (activeIndex - 1) * parentWidth,\n        activeIndex: activeIndex - 1\n      });\n    } else if (activeIndex === 0) {\n      setState({\n        transition: 0,\n        translate: (total - 1) * parentWidth,\n        activeIndex: total - 1\n      });\n    }\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SliderContainer, {\n    ref: parentRef\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Slider, {\n    translation: translate,\n    transition: transition,\n    parentWidth: parentWidth * total\n  }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_indicator__WEBPACK_IMPORTED_MODULE_2__[\"Indicator\"], {\n    now: activeIndex + 1,\n    total: total\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, {\n    onClick: prevSlide\n  }, \"left\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Button, {\n    onClick: nextSlide\n  }, \"right\"));\n};\n\n//# sourceURL=webpack:///./src/components/carousel/index.tsx?");

/***/ }),

/***/ "./src/components/carousel/indicator.tsx":
/*!***********************************************!*\
  !*** ./src/components/carousel/indicator.tsx ***!
  \***********************************************/
/*! exports provided: Indicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Indicator\", function() { return Indicator; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Container = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"Container\",\n  componentId: \"sc-10j4ba6\"\n})`\n  display: inline-block; \n  border: 0;\n  height: 24px;\n  position:absolute;\n  bottom: 32px;\n  right: 40px;\n`;\nconst DotList = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.ul.withConfig({\n  displayName: \"DotList\",\n  componentId: \"sc-1ni4uf8\"\n})`\n  height: 100%; \n`;\nconst Dot = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.li.withConfig({\n  displayName: \"Dot\",\n  componentId: \"sc-1x9ya5j\"\n})`\n  float:left;\n  width: 24px;\n  height: 8px;\n  margin: 4px;\n  border-radius: 16px;\n  background-color: ${p => p.fill ? `${p.theme.colors.gray_700}` : `${p.theme.colors.gray_200}`};  \n`;\nconst Indicator = ({\n  max = 5,\n  total,\n  now = 1\n}) => {\n  const dotMax = max < total ? max : total;\n  const dotArray = new Array();\n\n  for (let i = 1; i <= dotMax; i++) {\n    if (i === now) dotArray.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {\n      key: i,\n      fill: true\n    }));else dotArray.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Dot, {\n      key: i\n    }));\n  }\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DotList, null, dotArray));\n};\n\n//# sourceURL=webpack:///./src/components/carousel/indicator.tsx?");

/***/ }),

/***/ "./src/components/carousel/slide.tsx":
/*!*******************************************!*\
  !*** ./src/components/carousel/slide.tsx ***!
  \*******************************************/
/*! exports provided: Slide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Slide\", function() { return Slide; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Img = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div.withConfig({\n  displayName: \"Img\",\n  componentId: \"sc-1d4n516\"\n})`\n  width: 100%;\n  height: 60vh;\n  max-height: 400px;\n  background: url(${p => p.url}) no-repeat center;\n  background-size: cover;\n`;\nconst Slide = ({\n  url\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Img, {\n    url: url\n  });\n};\n\n//# sourceURL=webpack:///./src/components/carousel/slide.tsx?");

/***/ }),

/***/ "./src/components/icon/chart.ts":
/*!**************************************!*\
  !*** ./src/components/icon/chart.ts ***!
  \**************************************/
/*! exports provided: iconMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"iconMap\", function() { return iconMap; });\nconst iconMap = {\n  heart: \"M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181\",\n  cart: \"M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z\",\n  blank: \"M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z\",\n  music: `M453.858,105.116v-91.6c0-4.3-2.1-8.4-5.5-10.9c-3.5-2.5-8-3.3-12.1-2l-272.9,86.7c-5.6,1.8-9.4,7-9.4,12.9v91.7v0.1v175.3\n  c-14.3-9.9-32.6-15.3-51.8-15.3c-20.3,0-39.6,6.1-54.3,17.1c-15.8,11.9-24.5,28-24.5,45.5s8.7,33.6,24.5,45.5\n  c14.7,11,33.9,17.1,54.3,17.1s39.6-6.1,54.3-17.1c15.8-11.9,24.5-28,24.5-45.5v-212.8l245.9-78.2v156.6\n  c-14.3-9.9-32.6-15.3-51.8-15.3c-20.3,0-39.6,6.1-54.3,17.1c-15.8,11.9-24.5,28-24.5,45.5s8.7,33.6,24.5,45.5\n  c14.7,11,33.9,17.1,54.3,17.1s39.6-6.1,54.3-17.1c15.8-11.9,24.5-28,24.5-45.5v-222.3\n  C453.858,105.116,453.858,105.116,453.858,105.116z M102.158,450.216c-28.1,0-51.8-16.3-51.8-35.6c0-19.3,23.7-35.6,51.8-35.6\n  s51.8,16.3,51.8,35.6C153.958,434.016,130.258,450.216,102.158,450.216z M180.958,173.416v-63.4l245.9-78.1v63.4L180.958,173.416z\n   M375.158,363.116c-28.1,0-51.8-16.3-51.8-35.6c0-19.3,23.7-35.6,51.8-35.6s51.8,16.3,51.8,35.6\n  C426.858,346.816,403.158,363.116,375.158,363.116z`,\n  search: `M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3\n  s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4\n  C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3\n  s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z`,\n  share: `M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8\n  c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5\n  l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9\n  l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1\n  c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8\n  c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5\n  c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z`\n};\n\n//# sourceURL=webpack:///./src/components/icon/chart.ts?");

/***/ }),

/***/ "./src/components/icon/index.tsx":
/*!***************************************!*\
  !*** ./src/components/icon/index.tsx ***!
  \***************************************/
/*! exports provided: IconBox, Icon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IconBox\", function() { return IconBox; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Icon\", function() { return Icon; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chart */ \"./src/components/icon/chart.ts\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst IconBox = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div.withConfig({\n  displayName: \"IconBox\",\n  componentId: \"sc-1uoau0t\"\n})`\n  cursor:pointer;\n  width: ${p => p.size}px;\n  height:${p => p.size}px;\n  display:flex; \n  align-items: center;\n  & svg{\n      display:block;\n      background-color: ${p => {\n  const {\n    color\n  } = p;\n  return styled_components__WEBPACK_IMPORTED_MODULE_2__[\"css\"]`${color}`;\n}};\n      & > path {\n      }\n  }\n      \n`;\nconst Icon = ({\n  color = '#000000',\n  size = 24,\n  shape,\n  clickHandler\n}) => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconBox, {\n    onClick: clickHandler\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n    width: size,\n    height: size,\n    fill: color\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n    d: _chart__WEBPACK_IMPORTED_MODULE_1__[\"iconMap\"][shape]\n  })));\n};\n\n//# sourceURL=webpack:///./src/components/icon/index.tsx?");

/***/ }),

/***/ "./src/pages/home/dummy.ts":
/*!*********************************!*\
  !*** ./src/pages/home/dummy.ts ***!
  \*********************************/
/*! exports provided: singleDummy, dummyData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"singleDummy\", function() { return singleDummy; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dummyData\", function() { return dummyData; });\nconst singleDummy = {\n  id: 1,\n  title: 'test',\n  description: 'this is test room',\n  host: {\n    id: 1,\n    name: 'jay',\n    createdAt: '123123123',\n    modifiedAt: '123123',\n    recentCreation: '123123',\n    hostAt: [1],\n    joinAt: [1, 2] // 내가 현재 참여중인 방의 id\n\n  },\n  author: {\n    id: 2,\n    name: 'dante',\n    createdAt: '123123123',\n    modifiedAt: '123123',\n    recentCreation: '123123',\n    hostAt: [1],\n    joinAt: [1, 2] // 내가 현재 참여중인 방의 id\n\n  },\n  createdAt: 'some day',\n  modifiedAt: 'some day',\n  members: [{\n    id: 1,\n    name: 'jay',\n    createdAt: '123123123',\n    modifiedAt: '123123',\n    recentCreation: '123123',\n    hostAt: [1, 2],\n    joinAt: [1, 2] // 내가 현재 참여중인 방의 id\n\n  }],\n  full: 4,\n  current: 3,\n  category: '넷플릭스',\n  imgUrl: 'some image url',\n  url: 'some imageurl',\n  block: true // 방 입장 가능여부  \n\n};\nconst dummyData = () => {\n  let dummyArray = new Array(10).fill(0);\n  return dummyArray.map((_, index) => Object.assign(singleDummy, {\n    id: index\n  }));\n};\n\n//# sourceURL=webpack:///./src/pages/home/dummy.ts?");

/***/ }),

/***/ "./src/pages/home/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/index.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ \"./src/pages/home/style.tsx\");\n/* harmony import */ var _components_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/carousel */ \"./src/components/carousel/index.tsx\");\n/* harmony import */ var _components_carousel_slide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/carousel/slide */ \"./src/components/carousel/slide.tsx\");\n/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/card */ \"./src/components/card/index.tsx\");\n/* harmony import */ var _dummy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dummy */ \"./src/pages/home/dummy.ts\");\n/* harmony import */ var _asset_adobe_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../asset/adobe.jpg */ \"./src/asset/adobe.jpg\");\n/* harmony import */ var _asset_netflix_phone_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../asset/netflix_phone.jpg */ \"./src/asset/netflix_phone.jpg\");\n/* harmony import */ var _asset_netflix_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../asset/netflix.jpg */ \"./src/asset/netflix.jpg\");\n\n\n\n\n\n\n\n\n\nconst {\n  RoomContainer\n} = _style__WEBPACK_IMPORTED_MODULE_1__;\n\nconst HomePage = () => {\n  const [array, setArray] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])([]);\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useEffect\"])(() => {\n    setArray(Object(_dummy__WEBPACK_IMPORTED_MODULE_5__[\"dummyData\"])());\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel__WEBPACK_IMPORTED_MODULE_2__[\"Carousel\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_3__[\"Slide\"], {\n    url: _asset_netflix_jpg__WEBPACK_IMPORTED_MODULE_8__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_3__[\"Slide\"], {\n    url: _asset_adobe_jpg__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_carousel_slide__WEBPACK_IMPORTED_MODULE_3__[\"Slide\"], {\n    url: _asset_netflix_phone_jpg__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RoomContainer, null, array.length > 0 ? array.map(value => {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_card__WEBPACK_IMPORTED_MODULE_4__[\"Card\"], {\n      data: value,\n      key: value.id\n    });\n  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, \" ... loading \"))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (HomePage);\n\n//# sourceURL=webpack:///./src/pages/home/index.tsx?");

/***/ }),

/***/ "./src/pages/home/style.tsx":
/*!**********************************!*\
  !*** ./src/pages/home/style.tsx ***!
  \**********************************/
/*! exports provided: RoomContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RoomContainer\", function() { return RoomContainer; });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n\nconst RoomContainer = styled_components__WEBPACK_IMPORTED_MODULE_0___default.a.div.withConfig({\n  displayName: \"RoomContainer\",\n  componentId: \"sc-18pievi\"\n})`\n  height: 100vh;\n  display: flex;\n  flex: 1 0 33%;\n`;\n\n//# sourceURL=webpack:///./src/pages/home/style.tsx?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n/***\r\n * @function resizeWindow\r\n * this function is custom hook for grab resizing innerWidth of element.\r\n *\r\n *\r\n */\n\nconst useResize = ref => {\n  const [size, setSize] = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])((() => {\n    const [elementWidth, elementHeight] = ref.current ? [ref.current.offsetWidth, ref.current.offsetHeight] : [0, 0];\n    return [elementWidth, elementHeight];\n  })());\n  Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useLayoutEffect\"])(() => {\n    const updateSize = () => {\n      console.log('ref: ', [ref.current.offsetWidth, ref.current.offsetHeight]);\n      setSize([ref.current.offsetWidth, ref.current.offsetHeight]);\n    };\n\n    updateSize();\n    window.addEventListener('resize', updateSize);\n    return () => window.removeEventListener('resize', updateSize);\n  }, []);\n  return size[0];\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useResize);\n\n//# sourceURL=webpack:///./src/utils/carousel/windowResize.ts?");

/***/ })

};;