(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/AddComic/Import/ImportComics/ImportComicFooter.js":
/*!************************************************************************!*\
  !*** ./resources/js/AddComic/Import/ImportComics/ImportComicFooter.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Store/Slices/importComics */ "./resources/js/Store/Slices/importComics.js");





var ImportComicFooter = function ImportComicFooter(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useDispatch"])();
  var count = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_3__["importComicsCheckedCountSelector"]);

  function importComics(e) {
    e.preventDefault();
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_3__["importSelectedDirs"])());
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    disabled: props.checkedCount == 0,
    className: "btn btn-primary",
    onClick: importComics
  }, "Import ", count, " Comics"));
};

ImportComicFooter.propTypes = {
  checkedCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (ImportComicFooter);

/***/ }),

/***/ "./resources/js/AddComic/Import/ImportComics/ImportComicRow.js":
/*!*********************************************************************!*\
  !*** ./resources/js/AddComic/Import/ImportComics/ImportComicRow.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AddComic_Import_ImportComics_ImportComicSearchResults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/AddComic/Import/ImportComics/ImportComicSearchResults */ "./resources/js/AddComic/Import/ImportComics/ImportComicSearchResults.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Store/Slices/importComics */ "./resources/js/Store/Slices/importComics.js");






var ImportTableRow = function ImportTableRow(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();

  function toggleChecked() {
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_4__["toggleCheckbox"])(props.id));
  }

  function changeMonitor(e) {
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_4__["setMonitored"])({
      id: props.id,
      monitored: e.target.value
    }));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    checked: props.checked,
    disabled: props.items.length == 0,
    onChange: toggleChecked
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, props.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, props.comicCount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    defaultValue: "all",
    className: "custom-select",
    onChange: changeMonitor
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "all"
  }, "All Issues"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "future"
  }, "Future Issues"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "missing"
  }, "Missing Issues"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "existing"
  }, "Existing Issues"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "none"
  }, "None"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddComic_Import_ImportComics_ImportComicSearchResults__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: props.id
  })));
};

ImportTableRow.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  items: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  comicCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (ImportTableRow);

/***/ }),

/***/ "./resources/js/AddComic/Import/ImportComics/ImportComicSearchResults.js":
/*!*******************************************************************************!*\
  !*** ./resources/js/AddComic/Import/ImportComics/ImportComicSearchResults.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Store/Slices/importComics */ "./resources/js/Store/Slices/importComics.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");





var ImportComicSearchResults = function ImportComicSearchResults(props) {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useDispatch"])();
  var selector = Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_2__["importComicsItemSelectorFactory"])(props.id);

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(selector),
      isLoading = _useSelector.isLoading,
      isPopulated = _useSelector.isPopulated,
      items = _useSelector.items;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_2__["fetchSearchResults"])(props.id));
  }, [dispatch, props.id]);

  function changeMatch(e) {
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_2__["setMatchId"])({
      id: props.id,
      matchId: e.target.value
    }));
  } //TODO: Replace with more dynamic dropdown (search, extended limits, etc)


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "custom-select",
    defaultValue: "temp",
    onChange: changeMatch
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    disabled: true,
    value: "temp"
  }, "Loading...") : null, isPopulated && items.length == 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    disabled: true,
    value: "temp"
  }, "No Matches Found") : null, items.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: item.cvid,
      value: item.cvid
    }, item.name + " (" + item.startYear + ") [" + item.numIssues + " issues] [" + item.publisher + "]");
  }));
};

ImportComicSearchResults.propTypes = {
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (ImportComicSearchResults);

/***/ }),

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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/Components/Loading/LoadingIndicator */ "./resources/js/Components/Loading/LoadingIndicator.js");
/* harmony import */ var _AddComic_Import_ImportComics_ImportComicRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/AddComic/Import/ImportComics/ImportComicRow */ "./resources/js/AddComic/Import/ImportComics/ImportComicRow.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/Store/Slices/importComics */ "./resources/js/Store/Slices/importComics.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }









var ImportComicTable = function ImportComicTable(_ref) {
  var match = _ref.match;
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  var folderId = match.params.folderId;

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_5__["importComicsSelector"]),
      isLoading = _useSelector.isLoading,
      items = _useSelector.items;

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_5__["fetchItems"])(folderId));
  }, [dispatch, folderId]);

  function onMasterChange(e) {
    var checked = e.target.checked;
    dispatch(Object(_Store_Slices_importComics__WEBPACK_IMPORTED_MODULE_5__["setAllChecked"])(checked));
  }

  if (isLoading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__["default"], null);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: "checkbox",
    defaultChecked: true,
    onChange: onMasterChange
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Folder"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Issue Count"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Monitor"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Series"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, items.map(function (item, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddComic_Import_ImportComics_ImportComicRow__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
      key: index,
      id: index
    }, item));
  })));
};

ImportComicTable.propTypes = {
  match: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["withRouter"])(ImportComicTable));

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
/* harmony import */ var _AddComic_Import_ImportComics_ImportComicFooter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/AddComic/Import/ImportComics/ImportComicFooter */ "./resources/js/AddComic/Import/ImportComics/ImportComicFooter.js");





var Import = function Import() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Page_PageRow__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddComic_Import_ImportComics_ImportComicTable__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddComic_Import_ImportComics_ImportComicFooter__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
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
//# sourceMappingURL=5.js.map