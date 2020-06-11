(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./resources/js/Comic/Index/ComicIndex.js":
/*!************************************************!*\
  !*** ./resources/js/Comic/Index/ComicIndex.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_ComicItemTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/ComicItemTemplate */ "./resources/js/Components/ComicItemTemplate.js");
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
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






var ComicList = /*#__PURE__*/function (_Component) {
  _inherits(ComicList, _Component);

  var _super = _createSuper(ComicList);

  function ComicList() {
    var _this;

    _classCallCheck(this, ComicList);

    _this = _super.call(this);
    _this.state = {
      comics: [],
      isPopulated: false
    };
    return _this;
  }

  _createClass(ComicList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/api/comic/').then(function (response) {
        _this2.setState({
          comics: response.data.data,
          isPopulated: true
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          comics = _this$state.comics,
          isPopulated = _this$state.isPopulated;

      if (!isPopulated) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_3__["default"], null);
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "col-md-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "comic-list"
      }, comics.map(function (comic) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Components_ComicItemTemplate__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, comic, {
          key: comic.cvid,
          indexView: true
        }));
      }))));
    }
  }]);

  return ComicList;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ComicList);

/***/ })

}]);