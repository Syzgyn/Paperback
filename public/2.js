(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ "./resources/js/Components/SettingsConnectors/ConnectorAddModal.js":
/*!*************************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorAddModal.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _ConnectorAddModalContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConnectorAddModalContent */ "./resources/js/Components/SettingsConnectors/ConnectorAddModalContent.js");
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






var ConnectorAddModal = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorAddModal, _Component);

  var _super = _createSuper(ConnectorAddModal);

  function ConnectorAddModal() {
    _classCallCheck(this, ConnectorAddModal);

    return _super.apply(this, arguments);
  }

  _createClass(ConnectorAddModal, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
        isOpen: this.props.isOpen,
        toggle: this.props.toggleModal,
        className: "settingsItemModal",
        size: "xl"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], {
        toggle: this.props.toggleModal
      }, "Add Connector"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorAddModalContent__WEBPACK_IMPORTED_MODULE_3__["default"], {
        schema: this.props.schema,
        onModalClose: this.props.onModalClose
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        color: "secondary",
        onClick: this.props.toggleModal
      }, "Close")));
    }
  }]);

  return ConnectorAddModal;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorAddModal.propTypes = {
  toggleModal: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  schema: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  onModalClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorAddModal);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorAddModalContent.js":
/*!********************************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorAddModalContent.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ConnectorAddModalItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ConnectorAddModalItem */ "./resources/js/Components/SettingsConnectors/ConnectorAddModalItem.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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





var ConnectorAddModalContent = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorAddModalContent, _Component);

  var _super = _createSuper(ConnectorAddModalContent);

  function ConnectorAddModalContent() {
    var _this;

    _classCallCheck(this, ConnectorAddModalContent);

    _this = _super.call(this);
    _this.onConnectorSelect = _this.onConnectorSelect.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConnectorAddModalContent, [{
    key: "onConnectorSelect",
    value: function onConnectorSelect(modelType) {
      this.props.onModalClose(true, modelType);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var schema = this.props.schema;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Usenet"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "settings-item-list"
      }, schema.filter(function (item) {
        return item.protocol == "usenet";
      }).map(function (item) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorAddModalItem__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({
          key: item.name
        }, item, {
          onConnectorSelect: _this2.onConnectorSelect
        }));
      })));
    }
  }]);

  return ConnectorAddModalContent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorAddModalContent.propTypes = {
  schema: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  onModalClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorAddModalContent);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorAddModalItem.js":
/*!*****************************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorAddModalItem.js ***!
  \*****************************************************************************/
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





var ConnectorAddModalItem = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorAddModalItem, _Component);

  var _super = _createSuper(ConnectorAddModalItem);

  function ConnectorAddModalItem() {
    var _this;

    _classCallCheck(this, ConnectorAddModalItem);

    _this = _super.call(this);
    _this.selectConnector = _this.selectConnector.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConnectorAddModalItem, [{
    key: "selectConnector",
    value: function selectConnector() {
      this.props.onConnectorSelect(this.props.type);
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.name;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
        onClick: this.selectConnector,
        className: "settings-connector-item shadow p-3 m-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["CardTitle"], null, name));
    }
  }]);

  return ConnectorAddModalItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorAddModalItem.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onConnectorSelect: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorAddModalItem);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorBadge.js":
/*!**********************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorBadge.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");




function ConnectorBadge(props) {
  var text = props.text,
      enabled = props.enabled;
  var color = enabled ? "success" : "danger";

  if (enabled === undefined) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Badge"], {
    color: color
  }, text);
}

ConnectorBadge.propTypes = {
  text: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  enabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorBadge);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorEditModal.js":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorEditModal.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _ConnectorEditModalContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConnectorEditModalContent */ "./resources/js/Components/SettingsConnectors/ConnectorEditModalContent.js");
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
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








var ConnectorEditModal = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorEditModal, _Component);

  var _super = _createSuper(ConnectorEditModal);

  function ConnectorEditModal() {
    var _this;

    _classCallCheck(this, ConnectorEditModal);

    _this = _super.call(this);
    _this.state = {
      testSuccess: false
    };
    _this.formRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.onClickTest = _this.onClickTest.bind(_assertThisInitialized(_this));
    _this.onClickSave = _this.onClickSave.bind(_assertThisInitialized(_this));
    _this.onClickDelete = _this.onClickDelete.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConnectorEditModal, [{
    key: "prepareData",
    value: function prepareData() {
      var data = this.formRef.current.values;

      if (this.props.item !== undefined) {
        data.type = this.props.item.schema.type;
      } else {
        data.type = this.props.implementation.type;
      }

      return data;
    }
  }, {
    key: "onClickTest",
    value: function onClickTest() {
      var _this2 = this;

      this.setState({
        testSuccess: false
      });
      var data = this.prepareData();
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(this.props.url + '/test', data).then(function (response) {
        if (response.data.result) {
          _this2.setState({
            testSuccess: true
          });
        }
      });
    }
  }, {
    key: "onClickSave",
    value: function onClickSave() {
      var data = this.prepareData();
      var url = this.props.url;
      var method = 'post';
      var item = this.props.item;

      if (item) {
        url += '/' + item.id;
        method = 'put';
      }

      axios__WEBPACK_IMPORTED_MODULE_1___default.a[method](url, data).then(this.props.toggleModal(true));
    }
  }, {
    key: "onClickDelete",
    value: function onClickDelete() {
      axios__WEBPACK_IMPORTED_MODULE_1___default.a["delete"](this.props.url + "/" + this.props.item.id).then(this.props.toggleModal(true));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          toggleModal = _this$props.toggleModal,
          implementation = _this$props.implementation,
          item = _this$props.item;
      var name = item ? item.schema.type : implementation ? implementation.type : "";
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
        isOpen: this.props.isOpen,
        toggle: toggleModal,
        className: "itemModal",
        size: "xl"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalHeader"], {
        toggle: this.props.toggleModal
      }, "Edit - " + name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorEditModalContent__WEBPACK_IMPORTED_MODULE_4__["default"], {
        item: item,
        implementation: implementation,
        toggleModal: toggleModal,
        formRef: this.formRef
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["ModalFooter"], null, item ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        color: "danger mr-auto",
        onClick: this.onClickDelete
      }, "Delete") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        color: "secondary mr-auto",
        onClick: toggleModal
      }, "Close"), this.state.testSuccess ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Test Successful") : "", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        color: "secondary",
        onClick: this.onClickTest
      }, "Test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        color: "secondary",
        onClick: toggleModal
      }, "Cancel"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        color: "primary",
        onClick: this.onClickSave
      }, "Save")));
    }
  }]);

  return ConnectorEditModal;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorEditModal.propTypes = {
  url: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  toggleModal: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  implementation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  existingConnector: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  item: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    schema: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
      type: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
    }),
    id: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
  })
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorEditModal);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorEditModalContent.js":
/*!*********************************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorEditModalContent.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
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






var ConnectorEditModalContent = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorEditModalContent, _Component);

  var _super = _createSuper(ConnectorEditModalContent);

  function ConnectorEditModalContent() {
    _classCallCheck(this, ConnectorEditModalContent);

    return _super.apply(this, arguments);
  }

  _createClass(ConnectorEditModalContent, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          formRef = _this$props.formRef,
          item = _this$props.item;
      var schema = null;

      if (item) {
        schema = this.props.item.schema;
      } else {
        schema = this.props.implementation;
      }

      var _schema = schema,
          fields = _schema.fields,
          initialValues = _schema.initialValues;
      console.log(initialValues);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
        initialValues: initialValues,
        innerRef: formRef
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Form"], {
        id: "editForm",
        className: "horizontal-form"
      }, fields.map(function (field) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["FormGroup"], {
          className: "row",
          key: field.name
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Label"], {
          className: "col-sm-3"
        }, field.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "col-sm-5"
        }, console.log(field.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Field"], {
          type: field.type,
          name: field.name,
          className: "form-control"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["ErrorMessage"], {
          name: field.name
        })));
      })));
    }
  }]);

  return ConnectorEditModalContent;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorEditModalContent.propTypes = {
  implementation: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  item: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  formRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorEditModalContent);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorEmptyItem.js":
/*!**************************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorEmptyItem.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
/* harmony import */ var _ConnectorEditModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConnectorEditModal */ "./resources/js/Components/SettingsConnectors/ConnectorEditModal.js");
/* harmony import */ var _ConnectorAddModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConnectorAddModal */ "./resources/js/Components/SettingsConnectors/ConnectorAddModal.js");
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









var ConnectorEmptyItem = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorEmptyItem, _Component);

  var _super = _createSuper(ConnectorEmptyItem);

  function ConnectorEmptyItem() {
    var _this;

    _classCallCheck(this, ConnectorEmptyItem);

    _this = _super.call(this);
    _this.state = {
      addModal: false,
      schema: [],
      implementation: null
    };
    _this.toggleAddModal = _this.toggleAddModal.bind(_assertThisInitialized(_this));
    _this.toggleEditModal = _this.toggleEditModal.bind(_assertThisInitialized(_this));
    _this.openAddModal = _this.openAddModal.bind(_assertThisInitialized(_this));
    _this.onAddModalClosed = _this.onAddModalClosed.bind(_assertThisInitialized(_this));
    _this.onEditModalClosed = _this.onEditModalClosed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConnectorEmptyItem, [{
    key: "toggleAddModal",
    value: function toggleAddModal() {
      this.setState({
        addModal: !this.state.addModal
      });
    }
  }, {
    key: "toggleEditModal",
    value: function toggleEditModal(refresh) {
      if (refresh) {
        this.props.refreshCallback();
      }

      this.setState({
        editModal: !this.state.editModal
      });
    }
  }, {
    key: "onAddModalClosed",
    value: function onAddModalClosed() {
      var itemSelected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var modelType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.setState({
        addModal: false,
        editModal: itemSelected,
        implementation: this.state.schema.find(function (item) {
          return item.type === modelType;
        })
      });
    }
  }, {
    key: "onEditModalClosed",
    value: function onEditModalClosed() {
      this.setState({
        editModal: false
      });
    }
  }, {
    key: "openAddModal",
    value: function openAddModal() {
      var _this2 = this;

      if (!this.state.schema.length) {
        axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(this.props.url + '/schema').then(function (response) {
          _this2.setState({
            schema: response.data
          }, _this2.toggleAddModal());
        });
      } else {
        this.toggleAddModal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          addModal = _this$state.addModal,
          editModal = _this$state.editModal,
          implementation = _this$state.implementation,
          schema = _this$state.schema;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["Card"], {
        onClick: this.openAddModal,
        className: "settings-connector-item add-item shadow p-3 m-3 text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_4__["Plus"], {
        size: 60
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorAddModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isOpen: addModal,
        toggleModal: this.toggleAddModal,
        schema: schema,
        onModalClose: this.onAddModalClosed,
        url: this.props.url
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorEditModal__WEBPACK_IMPORTED_MODULE_5__["default"], {
        isOpen: editModal,
        toggleModal: this.toggleEditModal,
        implementation: implementation,
        existingConnector: false,
        url: this.props.url
      }));
    }
  }]);

  return ConnectorEmptyItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorEmptyItem.propTypes = {
  refreshCallback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorEmptyItem);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorItem.js":
/*!*********************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorItem.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _ConnectorEditModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConnectorEditModal */ "./resources/js/Components/SettingsConnectors/ConnectorEditModal.js");
/* harmony import */ var _ConnectorBadge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConnectorBadge */ "./resources/js/Components/SettingsConnectors/ConnectorBadge.js");
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







var ConnectorItem = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorItem, _Component);

  var _super = _createSuper(ConnectorItem);

  function ConnectorItem() {
    var _this;

    _classCallCheck(this, ConnectorItem);

    _this = _super.call(this);
    _this.state = {
      editModal: false,
      schema: {}
    };
    _this.toggleEditModal = _this.toggleEditModal.bind(_assertThisInitialized(_this));
    _this.openEditModal = _this.openEditModal.bind(_assertThisInitialized(_this));
    _this.onEditModalClosed = _this.onEditModalClosed.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConnectorItem, [{
    key: "toggleEditModal",
    value: function toggleEditModal() {
      var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (refresh) {
        this.props.refreshCallback();
      }

      this.setState({
        editModal: !this.state.editModal
      });
    }
  }, {
    key: "onEditModalClosed",
    value: function onEditModalClosed() {
      this.setState({
        editModal: false
      });
    }
  }, {
    key: "openEditModal",
    value: function openEditModal() {
      this.toggleEditModal();
    }
  }, {
    key: "render",
    value: function render() {
      var editModal = this.state.editModal;
      var _this$props$item = this.props.item,
          name = _this$props$item.name,
          enableRss = _this$props$item.enableRss,
          enableSearch = _this$props$item.enableSearch,
          enable = _this$props$item.enable;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Card"], {
        onClick: this.openEditModal,
        className: "settings-connector-item shadow p-3 m-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["CardTitle"], null, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["CardText"], {
        className: "mt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorBadge__WEBPACK_IMPORTED_MODULE_4__["default"], {
        enabled: enableRss,
        text: "RSS"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorBadge__WEBPACK_IMPORTED_MODULE_4__["default"], {
        enabled: enableSearch,
        text: "Search"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorBadge__WEBPACK_IMPORTED_MODULE_4__["default"], {
        enabled: enable,
        text: "Enabled"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorEditModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
        isOpen: editModal,
        toggleModal: this.toggleEditModal,
        item: this.props.item,
        url: this.props.url
      }));
    }
  }]);

  return ConnectorItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorItem.propTypes = {
  url: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  item: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  refreshCallback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorItem);

/***/ }),

/***/ "./resources/js/Components/SettingsConnectors/ConnectorList.js":
/*!*********************************************************************!*\
  !*** ./resources/js/Components/SettingsConnectors/ConnectorList.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
/* harmony import */ var _ConnectorItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConnectorItem */ "./resources/js/Components/SettingsConnectors/ConnectorItem.js");
/* harmony import */ var _ConnectorEmptyItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConnectorEmptyItem */ "./resources/js/Components/SettingsConnectors/ConnectorEmptyItem.js");
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









var ConnectorList = /*#__PURE__*/function (_Component) {
  _inherits(ConnectorList, _Component);

  var _super = _createSuper(ConnectorList);

  function ConnectorList() {
    var _this;

    _classCallCheck(this, ConnectorList);

    _this = _super.call(this);
    _this.state = {
      items: [],
      loading: true
    };
    _this.getItems = _this.getItems.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ConnectorList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getItems();
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var _this2 = this;

      setTimeout(function () {
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(_this2.props.url).then(function (response) {
          _this2.setState({
            items: response.data.data,
            loading: false
          });
        });
      }, 100);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.state.loading) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_4__["default"], null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_3__["default"], {
        className: "settings-connector-list"
      }, this.state.items.map(function (item) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
          key: item.id,
          item: item,
          refreshCallback: _this3.getItems,
          url: _this3.props.url
        });
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConnectorEmptyItem__WEBPACK_IMPORTED_MODULE_6__["default"], {
        refreshCallback: this.getItems,
        url: this.props.url
      }));
    }
  }]);

  return ConnectorList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ConnectorList.propTypes = {
  url: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ConnectorList);

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
    to: '/settings/general',
    text: 'General'
  }, {
    to: '/settings/indexers',
    text: 'Indexers'
  }, {
    to: '/settings/downloaders',
    text: 'Download Clients'
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