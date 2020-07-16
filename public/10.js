(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

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

/***/ "./resources/js/Settings/Indexers/IndexerList.js":
/*!*******************************************************!*\
  !*** ./resources/js/Settings/Indexers/IndexerList.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: ENOENT: no such file or directory, open '/opt/paperback/resources/js/Settings/Indexers/IndexerList.js'");

/***/ }),

/***/ "./resources/js/Settings/Indexers/IndexerSettings.js":
/*!***********************************************************!*\
  !*** ./resources/js/Settings/Indexers/IndexerSettings.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Settings_SettingsMenuBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Settings/SettingsMenuBar */ "./resources/js/Settings/SettingsMenuBar.js");
/* harmony import */ var _Settings_SettingsToolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Settings/SettingsToolbar */ "./resources/js/Settings/SettingsToolbar.js");
/* harmony import */ var _Settings_Indexers_IndexerList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Settings/Indexers/IndexerList */ "./resources/js/Settings/Indexers/IndexerList.js");





var IndexerSettings = function IndexerSettings() {
  function onSavePress() {//TODO: General indexers settings
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_SettingsMenuBar__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_SettingsToolbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onSavePress: onSavePress
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Indexers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_Indexers_IndexerList__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (IndexerSettings);

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
//# sourceMappingURL=10.js.map