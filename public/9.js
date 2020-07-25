(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./resources/js/AddComic/Import/ImportComics/ImportComicTable.js":
/*!***********************************************************************!*\
  !*** ./resources/js/AddComic/Import/ImportComics/ImportComicTable.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Store/Slices/importComics */ "./resources/js/Store/Slices/importComics.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");







var ImportComicTable = function ImportComicTable(_ref) {
  var match = _ref.match;
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  var folderId = match.params.folderId;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_4__["fetchItems"])(folderId));
  }, [dispatch, folderId]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Checkbox"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Folder"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Monitor"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Series"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_5__["withRouter"])(ImportComicTable));

/***/ }),

/***/ "./resources/js/AddComic/Import/ImportComics/ImportComics.js":
/*!*******************************************************************!*\
  !*** ./resources/js/AddComic/Import/ImportComics/ImportComics.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/Components/Page/PageRow */ "./resources/js/Components/Page/PageRow.js");
/* harmony import */ var _AddComic_Import_ImportComics_ImportComicTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/AddComic/Import/ImportComics/ImportComicTable */ "./resources/js/AddComic/Import/ImportComics/ImportComicTable.js");




var Import = function Import(_ref) {
  var match = _ref.match;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddComic_Import_ImportComics_ImportComicTable__WEBPACK_IMPORTED_MODULE_2__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (Import);

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
//# sourceMappingURL=9.js.map