(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

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

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorList.js":
/*!*********************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorList.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /opt/paperback/resources/js/Components/SettingsConnectors/ConnectorList.js: Unterminated string constant (6:30)\n\n\u001b[0m \u001b[90m 4 | \u001b[39m\u001b[36mimport\u001b[39m \u001b[33mConnectorItem\u001b[39m from \u001b[32m\"./ConnectorItem\"\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 5 | \u001b[39m\u001b[36mimport\u001b[39m \u001b[33mConnectorEmptyItem\u001b[39m from \u001b[32m\"./ConnectorEmptyItem\"\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 6 | \u001b[39m\u001b[36mimport\u001b[39m \u001b[33mConnectorAddModal\u001b[39m from \u001b[32m\"@/Components/S\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m   | \u001b[39m                              \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 7 | \u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 8 | \u001b[39m\u001b[36mconst\u001b[39m \u001b[33mConnectorList\u001b[39m \u001b[33m=\u001b[39m ({items\u001b[33m,\u001b[39m url}) \u001b[33m=>\u001b[39m ( \u001b[0m\n\u001b[0m \u001b[90m 9 | \u001b[39m    \u001b[33m<\u001b[39m\u001b[33mPageRow\u001b[39m className\u001b[33m=\u001b[39m\u001b[32m\"settings-connector-list\"\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n    at Object._raise (/opt/paperback/node_modules/@babel/parser/lib/index.js:746:17)\n    at Object.raiseWithData (/opt/paperback/node_modules/@babel/parser/lib/index.js:739:17)\n    at Object.raise (/opt/paperback/node_modules/@babel/parser/lib/index.js:733:17)\n    at Object.readString (/opt/paperback/node_modules/@babel/parser/lib/index.js:8423:20)\n    at Object.getTokenFromCode (/opt/paperback/node_modules/@babel/parser/lib/index.js:8071:14)\n    at Object.getTokenFromCode (/opt/paperback/node_modules/@babel/parser/lib/index.js:4670:18)\n    at Object.nextToken (/opt/paperback/node_modules/@babel/parser/lib/index.js:7598:12)\n    at Object.next (/opt/paperback/node_modules/@babel/parser/lib/index.js:7526:10)\n    at Object.eat (/opt/paperback/node_modules/@babel/parser/lib/index.js:7531:12)\n    at Object.eatContextual (/opt/paperback/node_modules/@babel/parser/lib/index.js:8769:44)\n    at Object.expectContextual (/opt/paperback/node_modules/@babel/parser/lib/index.js:8773:15)\n    at Object.parseImport (/opt/paperback/node_modules/@babel/parser/lib/index.js:12527:12)\n    at Object.parseStatementContent (/opt/paperback/node_modules/@babel/parser/lib/index.js:11254:27)\n    at Object.parseStatement (/opt/paperback/node_modules/@babel/parser/lib/index.js:11156:17)\n    at Object.parseBlockOrModuleBlockBody (/opt/paperback/node_modules/@babel/parser/lib/index.js:11731:25)\n    at Object.parseBlockBody (/opt/paperback/node_modules/@babel/parser/lib/index.js:11717:10)\n    at Object.parseTopLevel (/opt/paperback/node_modules/@babel/parser/lib/index.js:11087:10)\n    at Object.parse (/opt/paperback/node_modules/@babel/parser/lib/index.js:12768:10)\n    at parse (/opt/paperback/node_modules/@babel/parser/lib/index.js:12821:38)\n    at parser (/opt/paperback/node_modules/@babel/core/lib/parser/index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/opt/paperback/node_modules/@babel/core/lib/transformation/normalize-file.js:93:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/opt/paperback/node_modules/@babel/core/lib/transformation/index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (/opt/paperback/node_modules/@babel/core/lib/transform.js:27:41)\n    at transform.next (<anonymous>)\n    at step (/opt/paperback/node_modules/gensync/index.js:254:32)\n    at /opt/paperback/node_modules/gensync/index.js:266:13\n    at async.call.result.err.err (/opt/paperback/node_modules/gensync/index.js:216:11)");

/***/ }),

/***/ "./resources/js/Settings/Downloaders/DownloaderList.js":
/*!*************************************************************!*\
  !*** ./resources/js/Settings/Downloaders/DownloaderList.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
/* harmony import */ var _Store_Slices_Settings_settingsConnectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Store/Slices/Settings/settingsConnectors */ "./resources/js/Store/Slices/Settings/settingsConnectors.js");
/* harmony import */ var _Components_SettingsConnectors_ConnectorList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/SettingsConnectors/ConnectorList */ "./resources/js/Components/SettingsConnectors/ConnectorList.js");






var DownloaderList = function DownloaderList() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_Slices_Settings_settingsConnectors__WEBPACK_IMPORTED_MODULE_3__["settingsItemsSelector"]),
      isLoading = _useSelector.isLoading,
      isPopulated = _useSelector.isPopulated,
      items = _useSelector.items;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (!isPopulated) {
      dispatch(Object(_Store_Slices_Settings_settingsConnectors__WEBPACK_IMPORTED_MODULE_3__["fetchItems"])());
    }
  }, [dispatch, isPopulated]);

  if (isLoading || !isPopulated) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__["default"], null);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_SettingsConnectors_ConnectorList__WEBPACK_IMPORTED_MODULE_4__["default"], {
    items: items,
    url: "/api/downloader"
  });
};

/* harmony default export */ __webpack_exports__["default"] = (DownloaderList);

/***/ }),

/***/ "./resources/js/Settings/Downloaders/DownloaderSettings.js":
/*!*****************************************************************!*\
  !*** ./resources/js/Settings/Downloaders/DownloaderSettings.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Settings_SettingsMenuBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Settings/SettingsMenuBar */ "./resources/js/Settings/SettingsMenuBar.js");
/* harmony import */ var _Settings_SettingsToolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Settings/SettingsToolbar */ "./resources/js/Settings/SettingsToolbar.js");
/* harmony import */ var _Settings_Downloaders_DownloaderList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Settings/Downloaders/DownloaderList */ "./resources/js/Settings/Downloaders/DownloaderList.js");





var DownloaderSettings = function DownloaderSettings() {
  function onSavePress() {//TODO: General downloader settings
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_SettingsMenuBar__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_SettingsToolbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onSavePress: onSavePress
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Downloaders"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_Downloaders_DownloaderList__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (DownloaderSettings);

/***/ }),

/***/ "./resources/js/Settings/SettingsMenuBar.js":
/*!**************************************************!*\
  !*** ./resources/js/Settings/SettingsMenuBar.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");




function SettingsMenuBar() {
  var links = [{
    to: "/settings/general",
    text: "General"
  }, {
    to: "/settings/indexers",
    text: "Indexers"
  }, {
    to: "/settings/downloaders",
    text: "Download Clients"
  }];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "nav nav-tabs"
  }, links.map(function (link, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
      to: link.to,
      className: "nav-link"
    }, link.text));
  })));
}

SettingsMenuBar.propTypes = {};
/* harmony default export */ __webpack_exports__["default"] = (SettingsMenuBar);

/***/ }),

/***/ "./resources/js/Settings/SettingsToolbar.js":
/*!**************************************************!*\
  !*** ./resources/js/Settings/SettingsToolbar.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
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





var SettingsToolbar = /*#__PURE__*/function (_Component) {
  _inherits(SettingsToolbar, _Component);

  var _super = _createSuper(SettingsToolbar);

  function SettingsToolbar() {
    var _this;

    _classCallCheck(this, SettingsToolbar);

    _this = _super.call(this);
    _this.saveSettings = _this.saveSettings.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SettingsToolbar, [{
    key: "saveSettings",
    value: function saveSettings(event) {
      event.preventDefault();
      var onSavePress = this.props.onSavePress;
      onSavePress();
    }
  }, {
    key: "render",
    value: function render() {
      var onSavePress = this.props.onSavePress;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-1 offset-11"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: onSavePress
      }, "Save")));
    }
  }]);

  return SettingsToolbar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

SettingsToolbar.propTypes = {
  onSavePress: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (SettingsToolbar);

/***/ })

}]);
//# sourceMappingURL=9.js.map