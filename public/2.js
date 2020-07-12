(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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
/* harmony import */ var _Store_Slices_Settings_downloaders__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/Store/Slices/Settings/downloaders */ "./resources/js/Store/Slices/Settings/downloaders.js");
/* harmony import */ var _Components_SettingsConnectors_ConnectorList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Components/SettingsConnectors/ConnectorList */ "./resources/js/Components/SettingsConnectors/ConnectorList.js");






var DownloaderList = function DownloaderList() {
  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    dispatch(Object(_Store_Slices_Settings_downloaders__WEBPACK_IMPORTED_MODULE_3__["fetchDownloaders"])());
  }, [dispatch]);

  var _useSelector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(_Store_Slices_Settings_downloaders__WEBPACK_IMPORTED_MODULE_3__["settingsDownloadersSelector"]),
      isLoading = _useSelector.isLoading,
      isPopulated = _useSelector.isPopulated,
      items = _useSelector.items;

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
/* harmony import */ var _Settings_Downloaders_DownloaderList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/Settings/Downloaders/DownloaderList */ "./resources/js/Settings/Downloaders/DownloaderList.js");





var DownloaderSettings = function DownloaderSettings() {
  function onSavePress() {//TODO: General downloader settings
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_SettingsMenuBar__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_SettingsToolbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onSavePress: onSavePress
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Downloaders"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Settings_Downloaders_DownloaderList__WEBPACK_IMPORTED_MODULE_4__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (DownloaderSettings);

/***/ })

}]);
//# sourceMappingURL=2.js.map