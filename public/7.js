(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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

/***/ "./resources/js/Wanted/WantedIssueControls.js":
/*!****************************************************!*\
  !*** ./resources/js/Wanted/WantedIssueControls.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");



var WantedIssueControls = function WantedIssueControls() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ButtonGroup"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    className: "border border-secondary",
    color: "light"
  }, "Search Selected"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    className: "border border-secondary",
    color: "light"
  }, "Search All Missing")));
};

/* harmony default export */ __webpack_exports__["default"] = (WantedIssueControls);

/***/ }),

/***/ "./resources/js/Wanted/WantedItem.js":
/*!*******************************************!*\
  !*** ./resources/js/Wanted/WantedItem.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Store/Slices/wanted */ "./resources/js/Store/Slices/wanted.js");






var WantedItem = function WantedItem(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "wanted-checkbox-cell"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    onChange: function onChange() {
      return dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_4__["selectItem"])(props.cvid));
    },
    checked: props.isSelected
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "wanted-comic-cell"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], {
    to: "/comic/" + props.comic_id
  }, props.comic_name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "wanted-issue-num-cell"
  }, props.issue_num), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "wanted-issue-name-cell"
  }, props.issue_name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "wanted-date-cell"
  }, props.release_date));
};

WantedItem.propTypes = {
  cvid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.integer,
  isSelected: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  comic_id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.integer,
  comic_name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  issue_num: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.integer,
  issue_name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  release_date: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (WantedItem);

/***/ }),

/***/ "./resources/js/Wanted/WantedList.js":
/*!*******************************************!*\
  !*** ./resources/js/Wanted/WantedList.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Wanted_WantedItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Wanted/WantedItem */ "./resources/js/Wanted/WantedItem.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Store/Slices/wanted */ "./resources/js/Store/Slices/wanted.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var WantedList = function WantedList() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__["wantedIssuesSelector"]),
      items = _useSelector.items,
      selectedItems = _useSelector.selectedItems;

  function getSortClick(key) {
    return function () {
      dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__["setSortKey"])(key));
    };
  }

  function selectAll(e) {
    if (e.target.checked) {
      var values = items.map(function (item) {
        return item.cvid;
      });
      dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__["selectItem"])(values));
    } else {
      dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__["selectItem"])([]));
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table wanted-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    onChange: selectAll
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    onClick: getSortClick("comic.name")
  }, "Comic Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    onClick: getSortClick("issue_num")
  }, "Issue"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    onClick: getSortClick("name")
  }, "Issue Name"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    onClick: getSortClick("release_date")
  }, "Release Date"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, items.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Wanted_WantedItem__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({}, item, {
      isSelected: selectedItems.indexOf(item.cvid) > -1,
      key: item.cvid
    }));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (WantedList);

/***/ }),

/***/ "./resources/js/Wanted/WantedPage.js":
/*!*******************************************!*\
  !*** ./resources/js/Wanted/WantedPage.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Store/Slices/wanted */ "./resources/js/Store/Slices/wanted.js");
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
/* harmony import */ var _Wanted_WantedList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Wanted/WantedList */ "./resources/js/Wanted/WantedList.js");
/* harmony import */ var _Wanted_WantedPageControls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/Wanted/WantedPageControls */ "./resources/js/Wanted/WantedPageControls.js");
/* harmony import */ var _Wanted_WantedIssueControls__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/Wanted/WantedIssueControls */ "./resources/js/Wanted/WantedIssueControls.js");









var WantedPage = function WantedPage() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__["wantedIssuesSelector"]),
      isLoading = _useSelector.isLoading,
      isPopulated = _useSelector.isPopulated;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_3__["fetchItems"])());
  }, [dispatch]);

  if (isLoading && !isPopulated) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_1__["default"], null);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Wanted_WantedIssueControls__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_4__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Wanted_WantedList__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Wanted_WantedPageControls__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (WantedPage);

/***/ }),

/***/ "./resources/js/Wanted/WantedPageControls.js":
/*!***************************************************!*\
  !*** ./resources/js/Wanted/WantedPageControls.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Store/Slices/wanted */ "./resources/js/Store/Slices/wanted.js");
/* harmony import */ var react_feather__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-feather */ "./node_modules/react-feather/dist/index.js");





var WantedPageControls = function WantedPageControls() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_2__["wantedIssuesSelector"]),
      page = _useSelector.page,
      totalPages = _useSelector.totalPages;

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row justify-content-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["SkipBack"], {
    className: "pagination-control",
    onClick: function onClick() {
      return dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_2__["setPage"])(1));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["Rewind"], {
    className: "pagination-control",
    onClick: function onClick() {
      return dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_2__["setPage"])(Math.max(page - 1, 1)));
    }
  }), page, " of ", totalPages, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["FastForward"], {
    className: "pagination-control",
    onClick: function onClick() {
      return dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_2__["setPage"])(Math.min(page + 1, totalPages)));
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_feather__WEBPACK_IMPORTED_MODULE_3__["SkipForward"], {
    className: "pagination-control",
    onClick: function onClick() {
      return dispatch(Object(_Store_Slices_wanted__WEBPACK_IMPORTED_MODULE_2__["setPage"])(totalPages));
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (WantedPageControls);

/***/ })

}]);
//# sourceMappingURL=7.js.map