(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./resources/js/AddComic/AddNewComic/AddNewComic.js":
/*!**********************************************************!*\
  !*** ./resources/js/AddComic/AddNewComic/AddNewComic.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ComicItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComicItem */ "./resources/js/AddComic/AddNewComic/ComicItem.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Search */ "./resources/js/AddComic/AddNewComic/Search.js");
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/Store/Slices/addComics */ "./resources/js/Store/Slices/addComics.js");









var AddNewComic = function AddNewComic() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(_Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_7__["addComicsSelector"]),
      isLoading = _useSelector.isLoading,
      isPopulated = _useSelector.isPopulated,
      items = _useSelector.items;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    return function () {
      dispatch(Object(_Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_7__["clearAddComics"])());
    };
  }, [dispatch]);

  function onSearchSubmit(value) {
    dispatch(Object(_Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_7__["searchComics"])(value));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Link"], {
    to: "/add/import",
    className: "btn btn-secondary"
  }, "Import"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Search__WEBPACK_IMPORTED_MODULE_2__["Search"], {
    searchCallback: onSearchSubmit
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_4__["default"], null, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__["default"], null) : isPopulated ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "comic-list"
  }, items.map(function (comic) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "comic-list-item pb-4",
      key: comic.cvid
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ComicItem__WEBPACK_IMPORTED_MODULE_1__["default"], comic));
  })) : ""));
};

/* harmony default export */ __webpack_exports__["default"] = (AddNewComic);

/***/ }),

/***/ "./resources/js/AddComic/AddNewComic/ComicItem.js":
/*!********************************************************!*\
  !*** ./resources/js/AddComic/AddNewComic/ComicItem.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_pluralize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-pluralize */ "./node_modules/react-pluralize/dist/index.js");
/* harmony import */ var react_pluralize__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_pluralize__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Components_ComicBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/ComicBadge */ "./resources/js/Components/ComicBadge.js");
/* harmony import */ var _AddComic_AddNewComic_ComicItemButtons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/AddComic/AddNewComic/ComicItemButtons */ "./resources/js/AddComic/AddNewComic/ComicItemButtons.js");







var ComicItem = function ComicItem(props) {
  var cvid = props.cvid,
      numIssues = props.numIssues,
      startYear = props.startYear,
      publisher = props.publisher,
      image = props.image,
      name = props.name,
      displayDescription = props.displayDescription,
      inLibrary = props.inLibrary,
      singleView = props.singleView,
      classes = props.classes;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row pb-5 " + classes
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-2 col-sm-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "cover-image",
    src: image
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-10 col-sm-9"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "h2 mr-2"
  }, name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "comic-year"
  }, "(", startYear, ")")), !singleView && publisher ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ComicBadge__WEBPACK_IMPORTED_MODULE_4__["default"], {
    color: "secondary"
  }, publisher) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "comic-description",
    dangerouslySetInnerHTML: {
      __html: dompurify__WEBPACK_IMPORTED_MODULE_2___default.a.sanitize(displayDescription, {
        ADD_ATTR: ["target"]
      })
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ComicBadge__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_pluralize__WEBPACK_IMPORTED_MODULE_3___default.a, {
    singular: "issue",
    count: numIssues
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-3 offset-md-7"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddComic_AddNewComic_ComicItemButtons__WEBPACK_IMPORTED_MODULE_5__["default"], {
    cvid: cvid,
    inLibrary: inLibrary
  })))));
};

ComicItem.propTypes = {
  cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
  }),
  numIssues: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  startYear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  publisher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  image: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  displayDescription: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inLibrary: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  singleView: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (ComicItem);

/***/ }),

/***/ "./resources/js/AddComic/AddNewComic/ComicItemButtons.js":
/*!***************************************************************!*\
  !*** ./resources/js/AddComic/AddNewComic/ComicItemButtons.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Store/Slices/addComics */ "./resources/js/Store/Slices/addComics.js");
/* harmony import */ var _Store_Slices_comics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Store/Slices/comics */ "./resources/js/Store/Slices/comics.js");








var ComicItemButtons = function ComicItemButtons(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_5__["addComicsSelector"]),
      isAdding = _useSelector.isAdding;

  var comics = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_Slices_comics__WEBPACK_IMPORTED_MODULE_6__["comicsSelector"]);
  var cvid = props.cvid;
  var inLibrary = comics.items.findIndex(function (comic) {
    return comic.cvid == cvid;
  }) > -1;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    $('[data-toggle="tooltip"]').tooltip();
    return function () {
      $('[data-toggle="tooltip"]').tooltip("hide");
    };
  });

  function clickAddComic() {
    dispatch(Object(_Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_5__["addComic"])(props.cvid));
  }

  function clickAddAndSearchComic() {
    dispatch(Object(_Store_Slices_addComics__WEBPACK_IMPORTED_MODULE_5__["addComicAndSearch"])(props.cvid));
  }

  if (inLibrary) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
      to: "/comic/" + cvid
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn btn-outline-secondary"
    }, "Already in Library"));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "btn-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: clickAddComic,
    type: "button",
    className: "btn btn-success",
    "data-toggle": "tooltip",
    "data-placement": "top",
    title: "Add",
    disabled: isAdding
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["Plus"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: clickAddAndSearchComic,
    type: "button",
    className: "btn btn-success",
    "data-toggle": "tooltip",
    "data-placement": "top",
    "data-html": "true",
    title: "Add and search<br>for missing issues",
    disabled: isAdding
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["Search"], null))));
};

ComicItemButtons.propTypes = {
  cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  inLibrary: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (ComicItemButtons);

/***/ }),

/***/ "./resources/js/AddComic/AddNewComic/Search.js":
/*!*****************************************************!*\
  !*** ./resources/js/AddComic/AddNewComic/Search.js ***!
  \*****************************************************/
/*! exports provided: Search */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return Search; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var Search = /*#__PURE__*/function (_Component) {
  _inherits(Search, _Component);

  var _super = _createSuper(Search);

  function Search() {
    var _this;

    _classCallCheck(this, Search);

    _this = _super.call(this);
    _this.state = {
      value: ""
    };
    _this.onValueChange = _this.onValueChange.bind(_assertThisInitialized(_this));
    _this.onFormSubmit = _this.onFormSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Search, [{
    key: "onValueChange",
    value: function onValueChange(event) {
      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: "onFormSubmit",
    value: function onFormSubmit(event) {
      event.preventDefault();
      var callback = this.props.searchCallback;
      callback(this.state.value);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row mb-5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: this.onFormSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "form-control",
        type: "text",
        autoComplete: "off",
        spellCheck: "false",
        placeholder: "Search for a Comic series",
        "aria-label": "Search",
        value: this.state.value,
        onChange: this.onValueChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "input-group-append"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-secondary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_2__["Search"], {
        className: "search-button"
      })))))));
    }
  }]);

  return Search;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Search.propTypes = {
  searchCallback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};


/***/ }),

/***/ "./resources/js/Components/ComicBadge.js":
/*!***********************************************!*\
  !*** ./resources/js/Components/ComicBadge.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ComicBadge = /*#__PURE__*/function (_Component) {
  _inherits(ComicBadge, _Component);

  var _super = _createSuper(ComicBadge);

  function ComicBadge() {
    _classCallCheck(this, ComicBadge);

    return _super.apply(this, arguments);
  }

  _createClass(ComicBadge, [{
    key: "render",
    value: function render() {
      var content = this.props.children;
      var color = this.props.color;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "comic-badge mr-2 badge badge-" + color
      }, content);
    }
  }]);

  return ComicBadge;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ComicBadge.defaultProps = {
  color: "primary"
};
ComicBadge.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (ComicBadge);

/***/ }),

/***/ "./resources/js/Components/Page/PageRow.js":
/*!*************************************************!*\
  !*** ./resources/js/Components/Page/PageRow.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



function PageRow(props) {
  var className = props.className;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row " + className
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-md-12"
  }, props.children));
}

PageRow.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
PageRow.defaultProps = {
  className: ""
};
/* harmony default export */ __webpack_exports__["default"] = (PageRow);

/***/ })

}]);
//# sourceMappingURL=4.js.map