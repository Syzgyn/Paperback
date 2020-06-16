(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./resources/js/Comic/Details/ComicDetails.js":
/*!****************************************************!*\
  !*** ./resources/js/Comic/Details/ComicDetails.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ComicItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ComicItem */ "./resources/js/Comic/Details/ComicItem.js");
/* harmony import */ var _IssueList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IssueList */ "./resources/js/Comic/Details/IssueList.js");
/* harmony import */ var _IssueModal_IssueModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IssueModal/IssueModal */ "./resources/js/Comic/Details/IssueModal/IssueModal.js");
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









var ComicDetails = /*#__PURE__*/function (_Component) {
  _inherits(ComicDetails, _Component);

  var _super = _createSuper(ComicDetails);

  function ComicDetails() {
    var _this;

    _classCallCheck(this, ComicDetails);

    _this = _super.call(this);
    _this.state = {
      comic: null,
      loading: true,
      modal: false,
      activeTab: "description",
      triggerEvent: null
    };
    _this.toggleModal = _this.toggleModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ComicDetails, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/api/comic/' + this.props.match.params.cvid).then(function (response) {
        _this2.setState({
          comic: response.data.data,
          loading: false
        });
      });
    }
  }, {
    key: "toggleModal",
    value: function toggleModal(issue) {
      var tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "description";
      var triggerEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.setState({
        modal: !this.state.modal,
        issue: issue,
        activeTab: tab,
        triggerEvent: triggerEvent
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          comic = _this$state.comic,
          loading = _this$state.loading,
          activeTab = _this$state.activeTab,
          triggerEvent = _this$state.triggerEvent;

      if (loading) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Loading...");
      }

      if (comic) {
        var issues = comic.issues; //TODO:  This works for now, but later convert to more like Sonarr

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ComicItem__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
          singleView: true,
          classes: "pb-3"
        }, comic)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueList__WEBPACK_IMPORTED_MODULE_5__["default"], {
          issues: issues,
          clickCallback: this.toggleModal
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueModal_IssueModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
          isOpen: this.state.modal,
          issue: this.state.issue,
          toggleModal: this.toggleModal,
          activeTab: activeTab,
          triggerEvent: triggerEvent
        }));
      }

      return "Something went wrong...";
    }
  }]);

  return ComicDetails;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ComicDetails.propTypes = {
  match: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    params: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
      cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
    })
  })
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(ComicDetails));

/***/ }),

/***/ "./resources/js/Comic/Details/ComicItem.js":
/*!*************************************************!*\
  !*** ./resources/js/Comic/Details/ComicItem.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_pluralize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-pluralize */ "./node_modules/react-pluralize/dist/index.js");
/* harmony import */ var react_pluralize__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_pluralize__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Components_ComicBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Components/ComicBadge */ "./resources/js/Components/ComicBadge.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
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










var ComicItemTemplate = /*#__PURE__*/function (_Component) {
  _inherits(ComicItemTemplate, _Component);

  var _super = _createSuper(ComicItemTemplate);

  function ComicItemTemplate(props) {
    var _this;

    _classCallCheck(this, ComicItemTemplate);

    _this = _super.call(this, props);
    _this.state = {
      addLoading: false,
      searchLoading: false
    };
    _this.addComic = _this.addComic.bind(_assertThisInitialized(_this));
    _this.addAndSearchComic = _this.addAndSearchComic.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ComicItemTemplate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $('[data-toggle="tooltip"]').tooltip();
    }
  }, {
    key: "addComic",
    value: function addComic() {
      var _this2 = this;

      this.setState({
        addLoading: true
      });
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/comic/', {
        cvid: this.props.cvid
      }).then(function (response) {
        _this2.setState({
          addLoading: false
        });

        _this2.props.history.push("/comic/" + response.data.data.cvid);
      });
    }
  }, {
    key: "addAndSearchComic",
    value: function addAndSearchComic() {
      var _this3 = this;

      this.setState({
        searchLoading: true
      });
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/comic/', {
        cvid: this.props.cvid,
        search: true
      }).then(function (response) {
        _this3.setState({
          searchLoading: false
        });

        _this3.props.history.push("/comic/" + response.data.data.cvid);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          cvid = _this$props.cvid,
          numIssues = _this$props.numIssues,
          startYear = _this$props.startYear,
          publisher = _this$props.publisher,
          image = _this$props.image,
          name = _this$props.name,
          description = _this$props.description,
          inLibrary = _this$props.inLibrary,
          singleView = _this$props.singleView,
          classes = _this$props.classes;
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
      }, "(", startYear, ")")), !singleView && publisher ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ComicBadge__WEBPACK_IMPORTED_MODULE_6__["default"], {
        variation: "secondary"
      }, publisher) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "comic-description",
        dangerouslySetInnerHTML: {
          __html: dompurify__WEBPACK_IMPORTED_MODULE_4___default.a.sanitize(description, {
            ADD_ATTR: ['target']
          })
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_ComicBadge__WEBPACK_IMPORTED_MODULE_6__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_pluralize__WEBPACK_IMPORTED_MODULE_5___default.a, {
        singular: 'issue',
        count: numIssues
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-md-3 offset-md-7"
      }, inLibrary ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
        to: "/comic/" + cvid
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "button",
        className: "btn btn-outline-secondary"
      }, "Already in Library")) : !singleView ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "btn-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this4.addComic();
        },
        type: "button",
        className: "btn btn-success",
        "data-toggle": "tooltip",
        "data-placement": "top",
        title: "Add"
      }, this.state.addLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_7__["Loader"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_7__["Plus"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick() {
          return _this4.addAndSearchComic();
        },
        type: "button",
        className: "btn btn-success",
        "data-toggle": "tooltip",
        "data-placement": "top",
        "data-html": "true",
        title: "Add and search<br>for missing issues"
      }, this.state.searchLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_7__["Loader"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_7__["Search"], null))) : ""))));
    }
  }]);

  return ComicItemTemplate;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ComicItemTemplate.propTypes = {
  cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  history: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    push: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
  }),
  numIssues: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  startYear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  publisher: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  image: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  inLibrary: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  singleView: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(ComicItemTemplate));

/***/ }),

/***/ "./resources/js/Comic/Details/IssueItem.js":
/*!*************************************************!*\
  !*** ./resources/js/Comic/Details/IssueItem.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _IssueStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IssueStatus */ "./resources/js/Comic/Details/IssueStatus.js");
/* harmony import */ var _IssueSearchButtons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./IssueSearchButtons */ "./resources/js/Comic/Details/IssueSearchButtons.js");
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






var IssueItem = /*#__PURE__*/function (_Component) {
  _inherits(IssueItem, _Component);

  var _super = _createSuper(IssueItem);

  function IssueItem() {
    var _this;

    _classCallCheck(this, IssueItem);

    _this = _super.call(this);
    _this.clickName = _this.clickName.bind(_assertThisInitialized(_this));
    _this.onSearchClick = _this.onSearchClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueItem, [{
    key: "clickName",
    value: function clickName() {
      this.props.clickCallback(this.props.issue);
    }
  }, {
    key: "onSearchClick",
    value: function onSearchClick(type) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.props.clickCallback(this.props.issue, type, trigger);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          clickCallback = _this$props.clickCallback,
          issue = _this$props.issue;
      var issue_num = issue.issue_num,
          displayName = issue.displayName,
          status = issue.status,
          release_date = issue.release_date,
          cvid = issue.cvid;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "issue-number-cell"
      }, issue_num), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "issue-name-cell"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "btn-link cursor-pointer",
        onClick: this.clickName
      }, displayName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "issue-release-date-cell"
      }, release_date), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "issue-status-cell"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueStatus__WEBPACK_IMPORTED_MODULE_2__["default"], {
        status: status,
        cvid: cvid
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "issue-search-cell"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueSearchButtons__WEBPACK_IMPORTED_MODULE_3__["default"], {
        cvid: cvid,
        clickCallback: this.onSearchClick
      })));
    }
  }]);

  return IssueItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

IssueItem.propTypes = {
  issue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    issue_num: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    displayName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    status: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    release_date: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
  }),
  clickCallback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (IssueItem);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueList.js":
/*!*************************************************!*\
  !*** ./resources/js/Comic/Details/IssueList.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _IssueItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IssueItem */ "./resources/js/Comic/Details/IssueItem.js");
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





var IssueList = /*#__PURE__*/function (_Component) {
  _inherits(IssueList, _Component);

  var _super = _createSuper(IssueList);

  function IssueList() {
    _classCallCheck(this, IssueList);

    return _super.apply(this, arguments);
  }

  _createClass(IssueList, [{
    key: "render",
    value: function render() {
      var _this = this;

      var issues = this.props.issues;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Release Date"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, issues.map(function (issue) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
          key: issue.cvid,
          clickCallback: _this.props.clickCallback,
          issue: issue
        });
      })));
    }
  }]);

  return IssueList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

IssueList.propTypes = {
  issues: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  clickCallback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (IssueList);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueModal/DescriptionTab.js":
/*!*****************************************************************!*\
  !*** ./resources/js/Comic/Details/IssueModal/DescriptionTab.js ***!
  \*****************************************************************/
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
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
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






var DescriptionTab = /*#__PURE__*/function (_Component) {
  _inherits(DescriptionTab, _Component);

  var _super = _createSuper(DescriptionTab);

  function DescriptionTab() {
    _classCallCheck(this, DescriptionTab);

    return _super.apply(this, arguments);
  }

  _createClass(DescriptionTab, [{
    key: "render",
    value: function render() {
      var description = this.props.description;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_3__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: dompurify__WEBPACK_IMPORTED_MODULE_2___default.a.sanitize(description, {
            ADD_ATTR: ['target']
          })
        }
      }));
    }
  }]);

  return DescriptionTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (DescriptionTab);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueModal/IssueModal.js":
/*!*************************************************************!*\
  !*** ./resources/js/Comic/Details/IssueModal/IssueModal.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _IssueModalMenuBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IssueModalMenuBar */ "./resources/js/Comic/Details/IssueModal/IssueModalMenuBar.js");
/* harmony import */ var _DescriptionTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DescriptionTab */ "./resources/js/Comic/Details/IssueModal/DescriptionTab.js");
/* harmony import */ var _SearchTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchTab */ "./resources/js/Comic/Details/IssueModal/SearchTab.js");
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









var IssueModal = /*#__PURE__*/function (_Component) {
  _inherits(IssueModal, _Component);

  var _super = _createSuper(IssueModal);

  function IssueModal(props) {
    var _this;

    _classCallCheck(this, IssueModal);

    _this = _super.call(this, props);
    _this.state = {
      issue: {
        name: "",
        description: ""
      },
      modal: false,
      activeTab: props.activeTab
    };
    _this.close = _this.close.bind(_assertThisInitialized(_this));
    _this.onNavButtonClick = _this.onNavButtonClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueModal, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.activeTab !== this.props.activeTab) {
        this.setState({
          activeTab: this.props.activeTab
        });
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.props.toggleModal();
    }
  }, {
    key: "onNavButtonClick",
    value: function onNavButtonClick(event) {
      event.preventDefault();
      this.setState({
        activeTab: event.target.dataset.tabname
      });
    }
  }, {
    key: "getContent",
    value: function getContent() {
      switch (this.state.activeTab) {
        case "description":
          var description = this.props.issue ? this.props.issue.description : "";
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DescriptionTab__WEBPACK_IMPORTED_MODULE_5__["default"], {
            description: description
          });

        case "search":
          var triggerEvent = this.props.triggerEvent;
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SearchTab__WEBPACK_IMPORTED_MODULE_6__["default"], {
            triggerEvent: triggerEvent
          });

        default:
          return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var name = this.props.issue ? this.props.issue.displayName : "";
      var description = this.props.issue ? this.props.issue.description : "";
      var activeTab = this.state.activeTab;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
        isOpen: this.props.isOpen,
        toggle: this.props.toggleModal,
        className: "issueModal",
        size: "lg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalHeader"], {
        toggle: this.props.toggleModal
      }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalBody"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_IssueModalMenuBar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        activeTab: activeTab,
        onClickCallback: this.onNavButtonClick
      }), this.getContent()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["ModalFooter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        color: "secondary",
        onClick: this.close
      }, "Close")));
    }
  }]);

  return IssueModal;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

IssueModal.propTypes = {
  toggleModal: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isOpen: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  issue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    displayName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  })
};
/* harmony default export */ __webpack_exports__["default"] = (IssueModal);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueModal/IssueModalMenuBar.js":
/*!********************************************************************!*\
  !*** ./resources/js/Comic/Details/IssueModal/IssueModalMenuBar.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");



function IssueModalMenuBar(props) {
  var links = [{
    text: 'Description',
    tabName: 'description'
  }, {
    text: 'Search',
    tabName: 'search'
  }];
  var activeTab = props.activeTab,
      onClickCallback = props.onClickCallback;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "nav nav-tabs",
    role: "tablist"
  }, links.map(function (link, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      "data-tabname": link.tabName,
      onClick: onClickCallback,
      className: "nav-link" + (link.tabName === activeTab ? " active" : "")
    }, link.text));
  })));
}

IssueModalMenuBar.propTypes = {};
/* harmony default export */ __webpack_exports__["default"] = (IssueModalMenuBar);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueModal/SearchTab.js":
/*!************************************************************!*\
  !*** ./resources/js/Comic/Details/IssueModal/SearchTab.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
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






var SearchTab = /*#__PURE__*/function (_Component) {
  _inherits(SearchTab, _Component);

  var _super = _createSuper(SearchTab);

  function SearchTab(props) {
    var _this;

    _classCallCheck(this, SearchTab);

    _this = _super.call(this, props);
    _this.state = {
      triggerEvent: _this.props.triggerEvent
    };
    _this.onManualClick = _this.onManualClick.bind(_assertThisInitialized(_this));
    _this.onAutomaticClick = _this.onAutomaticClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchTab, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      console.log("state", prevState, this.state, "props", prevProps, this.props);

      if (prevProps.triggerEvent !== this.props.triggerEvent) {
        this.setState({
          triggerEvent: this.props.triggerEvent
        });
      }
    }
  }, {
    key: "onManualClick",
    value: function onManualClick() {
      this.setState({
        triggerEvent: "manual"
      });
    }
  }, {
    key: "onAutomaticClick",
    value: function onAutomaticClick() {
      this.setState({
        triggerEvent: "automatic"
      });
    }
  }, {
    key: "defaultButtons",
    value: function defaultButtons() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: this.onAutomaticClick,
        color: "secondary"
      }, "Automatic Search"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: this.onManualClick,
        color: "primary"
      }, "Manual Search"));
    }
  }, {
    key: "results",
    value: function results() {
      return this.props.triggerEvent;
    }
  }, {
    key: "render",
    value: function render() {
      var triggerEvent = this.state.triggerEvent;
      console.log(this.state);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_3__["default"], null, !triggerEvent ? this.defaultButtons() : this.results());
    }
  }]);

  return SearchTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SearchTab);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueSearchButtons.js":
/*!**********************************************************!*\
  !*** ./resources/js/Comic/Details/IssueSearchButtons.js ***!
  \**********************************************************/
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
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
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







var IssueSearchButtons = /*#__PURE__*/function (_Component) {
  _inherits(IssueSearchButtons, _Component);

  var _super = _createSuper(IssueSearchButtons);

  function IssueSearchButtons() {
    var _this;

    _classCallCheck(this, IssueSearchButtons);

    _this = _super.call(this);
    _this.onAutoClick = _this.onAutoClick.bind(_assertThisInitialized(_this));
    _this.onManualClick = _this.onManualClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(IssueSearchButtons, [{
    key: "onAutoClick",
    value: function onAutoClick() {
      this.props.clickCallback('search', 'automatic');
    }
  }, {
    key: "onManualClick",
    value: function onManualClick() {
      this.props.clickCallback('search', 'manual');
    }
  }, {
    key: "render",
    value: function render() {
      var cvid = this.props.cvid;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["Search"], {
        onClick: this.onAutoClick,
        id: "btn-auto-" + cvid
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["User"], {
        onClick: this.onManualClick,
        id: "btn-manual-" + cvid
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["UncontrolledTooltip"], {
        placement: "top",
        target: "btn-auto-" + cvid
      }, "Automatic Search"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["UncontrolledTooltip"], {
        placement: "top",
        target: "btn-manual-" + cvid
      }, "Manual Search"));
    }
  }]);

  return IssueSearchButtons;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

IssueSearchButtons.propTypes = {
  cvid: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,
  clickCallback: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (IssueSearchButtons);

/***/ }),

/***/ "./resources/js/Comic/Details/IssueStatus.js":
/*!***************************************************!*\
  !*** ./resources/js/Comic/Details/IssueStatus.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
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






var IssueStatus = /*#__PURE__*/function (_Component) {
  _inherits(IssueStatus, _Component);

  var _super = _createSuper(IssueStatus);

  function IssueStatus() {
    _classCallCheck(this, IssueStatus);

    return _super.apply(this, arguments);
  }

  _createClass(IssueStatus, [{
    key: "renderMissing",
    value: function renderMissing() {
      var id = "status-" + this.props.cvid;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_2__["AlertTriangle"], {
        id: id
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["UncontrolledTooltip"], {
        placement: "top",
        target: id
      }, "Issue missing from disk"));
    }
  }, {
    key: "renderDownloaded",
    value: function renderDownloaded() {
      var id = "status-" + this.props.cvid;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        id: id
      }, "Downloaded"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_3__["UncontrolledTooltip"], {
        placement: "top",
        target: id
      }, "Issue Downloaded"));
    }
  }, {
    key: "render",
    value: function render() {
      switch (this.props.status) {
        case null:
        case 'missing':
          return this.renderMissing();

        case 'downloaded':
          return this.renderDownloaded();

        default:
          return "Unknown...";
      }
    }
  }]);

  return IssueStatus;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

IssueStatus.propTypes = {
  cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,
  status: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (IssueStatus);

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
  color: 'primary'
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