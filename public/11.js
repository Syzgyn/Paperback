(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./resources/js/Settings/Indexers/IndexerList.js":
/*!*******************************************************!*\
  !*** ./resources/js/Settings/Indexers/IndexerList.js ***!
  \*******************************************************/
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






var IndexerList = function IndexerList() {
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

  if (isLoading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_Loading_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__["default"], null);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Components_SettingsConnectors_ConnectorList__WEBPACK_IMPORTED_MODULE_4__["default"], {
    items: items,
    url: "/api/indexer"
  });
};

/* harmony default export */ __webpack_exports__["default"] = (IndexerList);

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

/***/ })

}]);
//# sourceMappingURL=11.js.map