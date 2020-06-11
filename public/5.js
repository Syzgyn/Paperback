(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/AddComic/AddNewComic/AddNewComic.js":
/*!**********************************************************!*\
  !*** ./resources/js/AddComic/AddNewComic/AddNewComic.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ComicItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ComicItem */ "./resources/js/AddComic/AddNewComic/ComicItem.js");
/* harmony import */ var _Search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Search */ "./resources/js/AddComic/AddNewComic/Search.js");


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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






var AddNewComic = /*#__PURE__*/function (_Component) {
  _inherits(AddNewComic, _Component);

  var _super = _createSuper(AddNewComic);

  function AddNewComic() {
    var _this;

    _classCallCheck(this, AddNewComic);

    _this = _super.call(this);
    _this.state = {
      searchValue: "",
      loading: false,
      comics: []
    };
    _this.onSearchSubmit = _this.onSearchSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddNewComic, [{
    key: "onSearchSubmit",
    value: function onSearchSubmit(value) {
      var _this2 = this;

      var hasValue = !!value.trim();
      this.setState({
        searchValue: value
      }, function () {
        if (hasValue) {
          _this2.search(value);
        }
      });
    }
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(value) {
        var _this3 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  loading: true
                });
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/api/comic/search/', {
                  params: {
                    query: value
                  }
                }).then(function (response) {
                  _this3.setState({
                    comics: response.data.data,
                    loading: false
                  });
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function search(_x) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          comics = _this$state.comics,
          loading = _this$state.loading;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Search__WEBPACK_IMPORTED_MODULE_4__["Search"], {
        searchCallback: this.onSearchSubmit
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "col-12"
      }, loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Loading...") : comics ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        id: "comic-list"
      }, comics.map(function (comic) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
          className: "comic-list-item pb-4",
          key: comic.cvid
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ComicItem__WEBPACK_IMPORTED_MODULE_3__["default"], comic));
      })) : "")));
    }
  }]);

  return AddNewComic;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

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
          displayDescription = _this$props.displayDescription,
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
        color: "secondary"
      }, publisher) : null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "comic-description",
        dangerouslySetInnerHTML: {
          __html: dompurify__WEBPACK_IMPORTED_MODULE_4___default.a.sanitize(displayDescription, {
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
  color: 'primary'
};
ComicBadge.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node,
  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (ComicBadge);

/***/ })

}]);