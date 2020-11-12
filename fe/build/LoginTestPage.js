exports.ids = [2];
exports.modules = {

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127);
/* harmony import */ var _skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(308);



const StyledFigure = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].figure`
    display:inline-block;
    margin: 16px 24px;
    width:296px;
    border: 1px solid ${p => p.theme.colors.gray_300};
    border-radius:8px;
`;
const StyledP = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].p`
    margin: 16px;
    display: block; 
    content:"";
    width: 264px;
    height: 136px;
    background-color: ${p => p.theme.colors.gray_200}; 
    border-radius: 8px;
    ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])("64px")}
`;
const StyledFigCaption = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].figcaption`
    padding:16px;
    width: 296px;
    height: 128px;
`;
const StyledFirstUl = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].ul`
    height: 24px;
    display: flex;
    margin-bottom: 16px;
    
    & > li:first-child{
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 152px;
        margin-left: 32px;
        margin-right: 16px;
        ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])("40px")}
    }
    & > li:nth-child(2){
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 40px;
        margin-left: 16px;
        margin-right: 32px;
        ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])()}
    }
`;
const StyledLi = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].li`
    
`;
const StyledSecondUl = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].ul`
    height: 40px;
    display: flex;
    margin-top: 16px;
     & > li:first-child{
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 136px;
        margin-left: 32px;
        margin-right: 32px;
        ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])()}
    }
    & > li:nth-child(2){
        background-color: ${p => p.theme.colors.gray_200}; 
        width: 64px;
        margin-left: 32px;
        margin-right: 32px;
        ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])()}
    }
`;

const HomeCard = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledFigure, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledP, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledFigCaption, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledFirstUl, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLi, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLi, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledSecondUl, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLi, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLi, null))));
};

/* harmony default export */ __webpack_exports__["default"] = (HomeCard);

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DummySkeletonColor", function() { return DummySkeletonColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skeletonLoading", function() { return skeletonLoading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSkeleteonAnimation", function() { return createSkeleteonAnimation; });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(127);

const DummySkeletonColor = "#eee";
const skeletonLoading = styled_components__WEBPACK_IMPORTED_MODULE_0__["keyframes"]`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(264px);
  }
`;

const createSkeleteonAnimation = (width = "24px", height = "100%") => styled_components__WEBPACK_IMPORTED_MODULE_0__["css"]`
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${width};
    height: ${height};
    background: linear-gradient(
      to right,
      ${p => p.theme.colors.gray_100},
      ${p => p.theme.colors.gray_white},
      ${p => p.theme.colors.gray_100}
    );
    animation: ${skeletonLoading} 1.5s infinite linear;
  }
  overflow: hidden;
  position: relative;
`;



/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127);
/* harmony import */ var _skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(308);



const StyledUl = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].ul`
  display: inline-block;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid ${p => p.theme.colors.gray_300};
  border-radius: 8px;

  & > li {
    &:first-child {
      float: left;

      & + li {
        float: right;
        max-width: 240px;

        & > h3 {
          margin-bottom: 32px;
        }
      }
    }
  }
`;
const StyledLi = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].li`
  margin: 0 8px;
`;
const StyledImageBox = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].p`
  display: inline-block;
  width: 48px;
  height: 48px;
  background-color: ${_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["DummySkeletonColor"]};
  border-radius: 50%;
  ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])()}
`;
const StyledName = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].h3`
  width: 72px;
  height: 16px;
  margin: 16px 8px;
  background-color: ${_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["DummySkeletonColor"]};
  ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])()}
`;
const StyledChatContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div``;
const StyledChatContentBox = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  height: 56px;
  width: 160px;
  background-color: ${_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["DummySkeletonColor"]};
  margin: 8px 0;
  ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])("30px")}
`;
const StyledDate = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  width: 32px;
  height: 16px;
  background-color: ${_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["DummySkeletonColor"]};
  ${Object(_skeletonAnimation__WEBPACK_IMPORTED_MODULE_2__["createSkeleteonAnimation"])()}
`;

const renderSkeletonChatBox = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledChatContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledName, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledChatContentBox, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledDate, null));
};

const SkeletonCard = ({}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledUl, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLi, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledImageBox, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledLi, null, renderSkeletonChatBox()));
};

/* harmony default export */ __webpack_exports__["default"] = (SkeletonCard);

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_login_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(456);
/* harmony import */ var _components_skeleton_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(307);
/* harmony import */ var _components_skeleton_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(452);
/* harmony import */ var _components_form_inputField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(458);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(127);






const StyledSelf = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].section`
  max-width: 500px;
`;
const StyledArticle = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].article`
  margin: 0 auto;
  padding: 16px;
`;
const StyledTitle = styled_components__WEBPACK_IMPORTED_MODULE_5__["default"].h2``;
const StyledLoginForm = Object(styled_components__WEBPACK_IMPORTED_MODULE_5__["default"])(_components_login_form__WEBPACK_IMPORTED_MODULE_0__["default"])`
  margin: 0 auto;
  padding: 24px;
`;

const LoginTest = ({}) => {
  const customSubmit = e => {
    e.preventDefault();
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("section", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(StyledArticle, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(StyledLoginForm, {
    message: "Please Fill your Login form",
    onSubmit: customSubmit
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(StyledArticle, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_skeleton_card__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_skeleton_home__WEBPACK_IMPORTED_MODULE_1__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(StyledArticle, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_components_form_inputField__WEBPACK_IMPORTED_MODULE_3__["default"], {
    type: "file"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (LoginTest);

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_form_useContactForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(457);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(325);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(127);




const StyledFormList = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].ul`
  
`;
const StyledList = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].li`
 & > label {
   display: inline-block;
   width: 64px;
   margin-right: 8px;
 }

`; // ${p => `background: url(${src/asset/check.svg})`};

const StyledIcon = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].p`
  width: 64px;
  height: 64px; 
  ${p => `background: url(${'src/asset/check.svg'})`};
  background-size: cover;
  background-position: center; 
`;
const StyledInput = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].input`
  width: 160px;
  height:32px;
  ${p => p.focus ? `box-shadow: 0 0 24px 0 #bbb;` : ``}
  border: 0;
`;
const StyledButtonContainer = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    border-radius: 8px;
    margin: 8px;
    width: 72px;
    height: 32px;
    border: 1px solid ${p => p.theme.colors.gray700};
    background-color: transparent; 
    transition: all ease-in 0.2ms;  
    :hover {
      background-color: ${p => p.theme.colors.cyan};
      color: ${p => p.theme.colors.white};
      box-shadow: 
    }
  }
`;
const StyledSubmitButton = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button`

`;

const Form = ({
  message,
  onSubmit
}) => {
  const [focus, setFocus] = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])({
    email: false,
    password: false
  });
  const [focused, setFocused] = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])("none");
  const {
    initialValues,
    handleSubmit
  } = Object(_utils_form_useContactForm__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const inputRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  const formik = Object(formik__WEBPACK_IMPORTED_MODULE_1__["useFormik"])({
    initialValues,
    onSubmit: handleSubmit
  });

  const setFocusExtend = param => {
    const {
      email,
      password
    } = param;
    setFocus(param);

    if (email === true) {
      setFocused("email");
    } else {
      setFocused("password");
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setFocusExtend({
        email: true,
        password: false
      });
    }
  }, []);

  const renderField = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledList, {
      key: `_field::email`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
      htmlFor: "email"
    }, "\uC774\uBA54\uC77C"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledInput, {
      required: true,
      ref: inputRef,
      onChange: formik.handleChange,
      name: "email",
      value: formik.values.email,
      type: "email",
      focus: focused === "email",
      onClick: () => setFocused("email"),
      onKeyDown: () => setFocused("email")
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledList, {
      key: `_field::password`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("label", {
      htmlFor: "password"
    }, "\uBE44\uBC00\uBC88\uD638"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledInput, {
      required: true,
      onChange: formik.handleChange,
      name: "password",
      value: formik.values.password,
      type: "password",
      focus: focused === "password",
      onClick: () => setFocused("password"),
      onKeyDown: () => setFocused("password")
    })));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("article", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledFormList, null, renderField())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("article", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledButtonContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledSubmitButton, {
    type: "submit"
  }, " \uB4F1\uB85D "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StyledSubmitButton, {
    type: "button"
  }, " \uD68C\uC6D0\uAC00\uC785 "))));
};

/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// seems not good place for specific purpose 
const submitContactForm = params => {
  return new Promise((resolve, _) => setTimeout(() => {
    resolve(params);
  }, 1000));
};

const useContactForm = () => {
  const handleSubmit = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(formFields => {
    submitContactForm(formFields).then(params => {
      console.log(params);
    });
  }, []);
  const initialValues = {
    email: "",
    password: ""
  };
  return {
    initialValues,
    handleSubmit
  };
};

/* harmony default export */ __webpack_exports__["default"] = (useContactForm);

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputField", function() { return InputField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127);
/* harmony import */ var _components_thumb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(459);



const StyledContainer = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputField = ({
  type
}) => {
  const [file, setFile] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(new Blob());

  const handleReader = e => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setFile(e.currentTarget.files[0]);
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StyledContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
    onSubmit: () => {}
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "file",
    onChange: e => handleReader
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_thumb__WEBPACK_IMPORTED_MODULE_2__["default"], {
    file: file
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", null, "submit")));
};
/* harmony default export */ __webpack_exports__["default"] = (InputField);

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Thumb = ({
  file
}) => {
  const [isLoading, setIsLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [thumb, setThumb] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const fileRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(new Blob());

  const handleFileRead = file => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setThumb(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (fileRef.current !== file) {
      setIsLoading(true);
    }

    handleFileRead(file);
  });

  if (isLoading) {
    /*#__PURE__*/
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "...loading");
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: thumb,
    alt: thumb
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Thumb);

/***/ })

};;