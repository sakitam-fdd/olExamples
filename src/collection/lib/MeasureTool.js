(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MeasureTool", [], factory);
	else if(typeof exports === 'object')
		exports["MeasureTool"] = factory();
	else
		root["MeasureTool"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function () {
  function Style() {
    _classCallCheck(this, Style);
  }

  _createClass(Style, [{
    key: 'getStyleByPoint',
    value: function getStyleByPoint(options) {
      var style = null;
      if (!options) {
        style = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 0.75,
            src: 'data:image/png;base64,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0p8zAAA6GWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTUtMTEtMDNUMTE6MjU6MzcrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE1LTExLTAzVDExOjI1OjM3KzA4OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNS0xMS0wM1QxMToyNTozNyswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6NGIzODJiN2QtODBkNi00YmYzLTkwOTktOWYyMTZhOTAyNzUyPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOmZiZDY2Yzk5LWM5ZjYtNDBkOS05NzY0LWJkYTA1YmI5NWFmZjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmZiZDY2Yzk5LWM5ZjYtNDBkOS05NzY0LWJkYTA1YmI5NWFmZjwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDpmYmQ2NmM5OS1jOWY2LTQwZDktOTc2NC1iZGEwNWJiOTVhZmY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTUtMTEtMDNUMTE6MjU6MzcrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NGIzODJiN2QtODBkNi00YmYzLTkwOTktOWYyMTZhOTAyNzUyPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE1LTExLTAzVDExOjI1OjM3KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MzA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PjRRCfkAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAXBJREFUeNqs1TFrFEEUB/DfDWIlBISx9QMErO9bbBpJoQloISZVIjZWWomFYB3sRItTPJjKTxCYKoWkUZvYBY8IQkgRiGczyHG3FzZ386+W9/b9eFPsbE9LRk3/Bu6jwR3cKq1f+IqE9zHl0+nZ3hTUwyO8xE2X5zee4W1MeTwDjpr+dbzDuqtlgM2Y8vl/sGw2wF2L5RPWY8rjUApbS2DK7Bb0Rk1/BT+xYrn8we2AjQqYYmwErKmXtYDViuBqQKwIxoCLiuBFwHFF8DjgoCJ4EPCxIjgI+IyjCtgRhqF81NsVwO2Y8nmAmPIXvFgCe16MmftwF68ROkJ/8TSm/Kb1gi3ovXIvhg7YZkz5w2RxZqi8sNNhu51prHXDiU33yu+gLXsx5cdtjcuOtYsfLfXveDJvaC4YUz7Dg5bWw9Jz1Q3FlPcxnCgNS81CYMmrOc+LZ9T0D0dN/7DLu9c6mgnjmuB+19N0Bb/VBk+6gv8GAHn5ZfPg+9pTAAAAAElFTkSuQmCC'
          })
        });
      } else {
        style = new ol.style.Style({});
        if (options['stroke'] && this._getStroke(options['stroke'])) {
          style.setStroke(this._getStroke(options['stroke']));
        }
        if (options['text'] && this._getText(options['text'])) {
          style.setText(this._getText(options['text']));
        }
        if (options['fill'] && this._getFill(options['fill'])) {
          style.setFill(this._getFill(options['fill']));
        }
        if (options['icon']) {
          style.setImage(this._getImage(options['icon']));
        }
      }
      return style;
    }
  }, {
    key: 'getStyleByLine',
    value: function getStyleByLine(options) {
      var style = null;
      if (!options) {
        style = new ol.style.Style({
          stroke: new ol.style.Stroke({
            width: 4,
            color: '#0000EE'
          })
        });
      } else {
        style = new ol.style.Style({});
        if (options['stroke'] && this._getStroke(options['stroke'])) {
          style.setStroke(this._getStroke(options['stroke']));
        }
        if (options['text'] && this._getText(options['text'])) {
          style.setText(this._getText(options['text']));
        }
        if (options['fill'] && this._getFill(options['fill'])) {
          style.setFill(this._getFill(options['fill']));
        }
      }
      return style;
    }
  }, {
    key: 'getStyleByPolygon',
    value: function getStyleByPolygon(options) {
      var style = null;
      if (!options) {
        style = new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(67, 110, 238, 0.4)'
          }),
          stroke: new ol.style.Stroke({
            color: '#4781d9',
            width: 2
          }),
          image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
              color: '#ffcc33'
            })
          })
        });
      } else {
        style = new ol.style.Style({});
        if (options['stroke'] && this._getStroke(options['stroke'])) {
          style.setStroke(this._getStroke(options['stroke']));
        }
        if (options['text'] && this._getText(options['text'])) {
          style.setText(this._getText(options['text']));
        }
        if (options['fill'] && this._getFill(options['fill'])) {
          style.setFill(this._getFill(options['fill']));
        }
      }
      return style;
    }
  }, {
    key: 'getStyleByParams',
    value: function getStyleByParams(options) {
      try {
        var style = null;
        if (typeof options === 'function') {
          style = options;
        } else {
          if (!options) {
            style = new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(67, 110, 238, 0.4)'
              }),
              stroke: new ol.style.Stroke({
                color: '#4781d9',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#ffcc33'
                })
              })
            });
          } else {
            style = new ol.style.Style({});
            if (options['stroke'] && this._getStroke(options['stroke'])) {
              style.setStroke(this._getStroke(options['stroke']));
            }
            if (options['text'] && this._getText(options['text'])) {
              style.setText(this._getText(options['text']));
            }
            if (options['fill'] && this._getFill(options['fill'])) {
              style.setFill(this._getFill(options['fill']));
            }
            if (options['icon']) {
              style.setImage(this._getImage(options['icon']));
            }
          }
        }
        return style;
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: 'getStyleForMeasure',
    value: function getStyleForMeasure(options) {
      try {
        var style = null;
        if (typeof options === 'function') {
          style = options;
        } else {
          if (!options) {
            style = new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(67, 110, 238, 0.4)'
              }),
              stroke: new ol.style.Stroke({
                color: 'rgba(242,123,57,1)',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 4,
                stroke: new ol.style.Stroke({
                  color: 'rgba(255,0,0,1)',
                  width: 1
                }),
                fill: new ol.style.Fill({
                  color: 'rgba(255,255,255,1)'
                })
              })
            });
          } else {
            style = new ol.style.Style({});
            if (options['stroke'] && this._getStroke(options['stroke'])) {
              style.setStroke(this._getStroke(options['stroke']));
            }
            if (options['text'] && this._getText(options['text'])) {
              style.setText(this._getText(options['text']));
            }
            if (options['fill'] && this._getFill(options['fill'])) {
              style.setFill(this._getFill(options['fill']));
            }
            if (options['regularShape']) {
              style.setImage(this._getRegularShape(options['regularShape']));
            }
            if (options['circle']) {
              style.setImage(this._getRegularCircle(options['circle']));
            }
          }
        }
        return style;
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: '_getRegularShape',
    value: function _getRegularShape(options) {
      try {
        var regularShape = new ol.style.RegularShape({
          fill: this._getFill(options['fill']) || undefined,
          points: options['points'] && typeof options['points'] === 'number' ? options['points'] : 1,
          radius: options['radius'] && typeof options['radius'] === 'number' ? options['radius'] : undefined,
          radius1: options['radius1'] && typeof options['radius1'] === 'number' ? options['radius1'] : undefined,
          radius2: options['radius2'] && typeof options['radius2'] === 'number' ? options['radius2'] : undefined,
          angle: options['angle'] && typeof options['angle'] === 'number' ? options['angle'] : 0,
          snapToPixel: options['snapToPixel'] && typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
          stroke: this._getStroke(options['stroke']) || undefined,
          rotation: options['rotation'] && typeof options['rotation'] === 'number' ? options['rotation'] : 0,
          rotateWithView: options['rotateWithView'] && typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false
        });
        if (regularShape && regularShape instanceof ol.style.RegularShape) {
          return regularShape;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: '_getRegularCircle',
    value: function _getRegularCircle(options) {
      try {
        var circle = new ol.style.Circle({
          fill: new ol.style.Fill({
            color: options['fill'] && options['fill']['fillColor'] ? options['fill']['fillColor'] : 'rgba(255,255,255,1)'
          }),
          radius: options['circleRadius'] && typeof options['circleRadius'] === 'number' ? options['circleRadius'] : 0,
          stroke: new ol.style.Stroke({
            color: options['stroke'] && options['stroke']['strokeColor'] ? options['stroke']['strokeColor'] : 'rgba(255,0,0,1)',
            width: options['stroke'] && options['stroke']['strokeWidth'] ? options['stroke']['strokeWidth'] : 1
          })
        });
        if (circle && circle instanceof ol.style.Circle) {
          return circle;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: '_getImage',
    value: function _getImage(options) {
      try {
        var icon = new ol.style.Icon({
          anchor: options['imageAnchor'] ? options['imageAnchor'] : [0.5, 0.5],
          anchorXUnits: options['imageAnchorXUnits'] ? options['imageAnchorXUnits'] : 'fraction',
          anchorYUnits: options['imageAnchorYUnits'] ? options['imageAnchorYUnits'] : 'fraction',
          anchorOrigin: options['imageAnchorOrigin'] ? options['imageAnchorYUnits'] : 'top-left',
          color: options['imageColor'] ? options['imageColor'] : undefined,
          crossOrigin: options['crossOrigin'] ? options['crossOrigin'] : undefined,
          img: options['img'] ? options['img'] : undefined,
          offset: options['offset'] && Array.isArray(options['offset']) && options['offset'].length === 2 ? options['offset'] : [0, 0],
          offsetOrigin: options['offsetOrigin'] ? options['offsetOrigin'] : 'top-left',
          scale: options['scale'] && typeof options['scale'] === 'number' ? options['scale'] : 1,
          rotateWithView: options['rotateWithView'] === true ? options['rotateWithView'] : false,
          opacity: options['imageOpacity'] ? options['imageOpacity'] : 1,
          rotation: options['rotation'] && typeof options['rotation'] === 'number' ? options['rotation'] : 0,
          size: options['size'] && Array.isArray(options['size']) && options['size'].length === 2 ? options['size'] : undefined,
          imgSize: options['imgSize'] && Array.isArray(options['imgSize']) && options['imgSize'].length === 2 ? options['imgSize'] : undefined,
          src: options['imageSrc'] ? options['imageSrc'] : 1
        });
        if (icon && icon instanceof ol.style.Icon) {
          return icon;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: '_getStroke',
    value: function _getStroke(options) {
      try {
        var stroke = new ol.style.Stroke({
          color: options['strokeColor'] ? options['strokeColor'] : undefined,
          lineCap: options['strokeLineCap'] ? options['strokeLineCap'] : 'round',
          lineJoin: options['strokeLineJoin'] ? options['strokeLineJoin'] : 'round',
          lineDash: options['strokeLineDash'] ? options['strokeLineDash'] : undefined,
          lineDashOffset: options['strokeLineDashOffset'] ? options['strokeLineDashOffset'] : '0',
          miterLimit: options['strokeMiterLimit'] ? options['strokeMiterLimit'] : 10,
          width: options['strokeWidth'] ? options['strokeWidth'] : undefined
        });
        if (stroke && stroke instanceof ol.style.Stroke) {
          return stroke;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: '_getText',
    value: function _getText(options) {
      try {
        var text = new ol.style.Text({
          font: options['textFont'] ? options['textFont'] : '10px sans-serif',
          offsetX: options['textOffsetX'] ? options['textOffsetX'] : 0,
          offsetY: options['textOffsetY'] ? options['textOffsetY'] : 0,
          scale: options['textScale'] ? options['textScale'] : undefined,
          rotation: options['textRotation'] ? options['textRotation'] : 0,
          text: options['text'] ? options['text'] : undefined,
          textAlign: options['textAlign'] ? options['textAlign'] : 'start',
          textBaseline: options['textBaseline'] ? options['textBaseline'] : 'alphabetic'
        });
        if (options['textFill']) {
          text.setFill(this._getFill(options['textFill']));
        }
        if (options['textStroke']) {
          text.setStroke(this._getStroke(options['textStroke']));
        }
        if (text && text instanceof ol.style.Text) {
          return text;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, {
    key: '_getFill',
    value: function _getFill(options) {
      try {
        var fill = new ol.style.Fill({
          color: options['fillColor'] ? options['fillColor'] : undefined
        });
        if (fill && fill instanceof ol.style.Fill) {
          return fill;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }]);

  return Style;
}();

exports.default = Style;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getrandom = exports.getrandom = function getrandom(t1, t2, t3) {
  if (!t1 || isNaN(t1)) {
    t1 = 0;
  }
  if (!t2 || isNaN(t2)) {
    t2 = 1;
  }
  if (!t3 || isNaN(t3)) {
    t3 = 0;
  }
  t3 = t3 > 15 ? 15 : t3;
  var _ref = [Math.random() * (t2 - t1) + t1, Math.pow(10, t3)],
      ra = _ref[0],
      du = _ref[1];

  ra = Math.round(ra * du) / du;
  return ra;
};

var getuuid = exports.getuuid = function getuuid() {
  var s = [],
      hexDigits = '0123456789abcdef';

  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};

var stamp = exports.stamp = function stamp(obj) {
  var key = '_p_id_';
  obj[key] = obj[key] || getuuid();
  return obj[key];
};

var trim = exports.trim = function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
};

var splitWords = exports.splitWords = function splitWords(str) {
  return trim(str).split(/\s+/);
};

var firstUpperToCase = exports.firstUpperToCase = function firstUpperToCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
};
var upperFirstChart = exports.upperFirstChart = function upperFirstChart(str) {
  return str.replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(2);

var _Style2 = __webpack_require__(0);

var _Style3 = _interopRequireDefault(_Style2);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MeasureTool = function (_Style) {
  _inherits(MeasureTool, _Style);

  function MeasureTool(map, params) {
    _classCallCheck(this, MeasureTool);

    var _this = _possibleConstructorReturn(this, (MeasureTool.__proto__ || Object.getPrototypeOf(MeasureTool)).call(this));

    if (map instanceof ol.Map) {
      _this.defaultParams = {
        measureLengthCursor: 'url(../asset/cur/ruler.cur), default',
        measureAreaCursor: 'url(../asset/cur/ruler.cur), default',
        endStyle: {
          fill: {
            fillColor: 'rgba(67, 110, 238, 0.4)'
          },
          stroke: {
            strokeColor: 'rgba(242,123,57,1)',
            strokeWidth: 2
          },
          circle: {
            circleRadius: 4,
            stroke: {
              strokeColor: 'rgba(255,0,0,1)',
              strokeWidth: 1
            },
            fill: {
              fillColor: 'rgba(255,255,255,1)'
            }
          }
        },
        drawStyle: {
          fill: {
            fillColor: 'rgba(67, 110, 238, 0.4)'
          },
          stroke: {
            strokeColor: 'rgba(242,123,57,1)',
            strokeWidth: 2
          }
        }
      };
      if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        for (var key in params) {
          _this.defaultParams[key] = params[key];
        }
      }

      _this.map = map;

      _this.wgs84Sphere = new ol.Sphere(6378137);

      _this.measureTypes = {
        measureLength: 'measureLength',
        measureArea: 'measureArea'
      };

      _this.dragPanInteraction = null;

      _this.DoubleClickZoom = null;

      _this.isGeodesic = _this.defaultParams['isGeodesic'] === false ? _this.defaultParams['isGeodesic'] : true;

      _this.layerName = _this.defaultParams['layerName'] || 'measureTool';

      _this.previousCursor_ = _this.map.getTargetElement().style.cursor;
    } else {
      throw new Error('传入的不是地图对象或者地图对象为空！');
    }
    return _this;
  }

  _createClass(MeasureTool, [{
    key: 'setUp',
    value: function setUp(params) {
      var _this2 = this;

      this.options = params || {};

      this.map.getTargetElement().style.cursor = this.previousCursor_;

      this.clickCount = '';

      this.drawSketch = null;

      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }
      this.draw = null;

      if (this.beforeMeasurePointerMoveHandler) {
        ol.Observable.unByKey(this.beforeMeasurePointerMoveHandler);
      }
      this.beforeMeasurePointerMoveHandler = null;

      if (this.listener) {
        ol.Observable.unByKey(this.listener);
      }
      this.listener = null;

      this.drawSketch = null;

      if (this.drawPointermove) {
        ol.Observable.unByKey(this.drawPointermove);
      }
      this.drawPointermove = null;

      this.measureAreaTooltip = null;

      this.measureAreaTooltipElement = null;

      this.removeDrawInteraion();

      if (this.measureHelpTooltip) {
        this.map.removeOverlay(this.measureHelpTooltip);
      }
      this.measureHelpTooltip = '';
      if (this.options['measureType'] === this.measureTypes.measureLength) {
        this.measureLengthClick = this.map.on('click', function (eventP) {
          _this2.measureLengthSingleClick = _this2.map.on('singleclick', function (event) {
            if (!_this2.clickCount) {
              _this2.clickCount = (0, _utils.getuuid)();
              _this2.drawSketch.length = '起点';
            }
            _this2.addMeasureOverLay(event.coordinate, _this2.drawSketch.length);
            _this2.addMeasurecircle(event.coordinate);
            ol.Observable.unByKey(_this2.measureLengthSingleClick);
          });
        });
        this.beforeMeasurePointerMoveHandler = this.map.on('pointermove', this.beforeDrawPointMoveHandler, this);
      } else if (this.options['measureType'] === this.measureTypes.measureArea) {
        this.beforeMeasurePointerMoveHandler = this.map.on('pointermove', this.beforeDrawPointMoveHandler, this);
      }
      this.addDrawInteraction();
      this.changeCur(this.options['measureType']);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      try {
        window.setTimeout(function () {
          _this3.getDragPanInteraction().setActive(true);
          _this3.getDoubleClickZoomInteraction().setActive(true);
        }, 300);
        this.map.getTargetElement().style.cursor = this.previousCursor_;
        this.map.removeOverlay(this.measureHelpTooltip);
        this.measureHelpTooltip = null;
        this.removeDrawInteraion();
        this.changeCur();
        this.listener = null;
        this.drawSketch = null;
        if (this.layer && this.layer instanceof ol.layer.Vector) {
          this.map.removeLayer(this.layer);
        }
        this.removeOverlayByLayerName(this.layerName);
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: 'removeOverlayByLayerName',
    value: function removeOverlayByLayerName(layerName) {
      var _overlays = [];
      if (this.map && layerName) {
        var overlays = this.map.getOverlays().getArray();
        var len = overlays.length;
        for (var i = 0; i < len; i++) {
          if (overlays[i] && overlays[i].get('layerName') === layerName) {
            _overlays.push(overlays[i]);
            this.map.removeOverlay(overlays[i]);
            i--;
          }
        }
      }
      return _overlays;
    }
  }, {
    key: 'addDrawInteraction',
    value: function addDrawInteraction() {
      var type = '';

      if (this.options['measureType'] === this.measureTypes.measureLength) {
        type = 'LineString';
      } else if (this.options['measureType'] === this.measureTypes.measureArea) {
        type = 'Polygon';
      }
      this.options['create'] = true;
      this.layer = this.createVectorLayer(this.layerName, this.options);
      var endStyle = this.getStyleForMeasure(this.defaultParams['endStyle']);
      var drawStyle = this.getStyleForMeasure(this.defaultParams['drawStyle']);
      this.layer.setStyle(endStyle);
      this.draw = new ol.interaction.Draw({
        source: this.layer.getSource(),
        type: type,
        style: drawStyle
      });
      this.map.addInteraction(this.draw);
      this.drawListener();
      this.getDragPanInteraction().setActive(false);
      this.getDoubleClickZoomInteraction().setActive(false);
    }
  }, {
    key: 'getLayerByLayerName',
    value: function getLayerByLayerName(layerName) {
      try {
        var targetLayer = null;
        if (this.map) {
          var layers = this.map.getLayers().getArray();
          layers.every(function (layer) {
            if (layer.get('layerName') === layerName) {
              targetLayer = layer;
              return false;
            } else {
              return true;
            }
          });
        }
        return targetLayer;
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: 'createVectorLayer',
    value: function createVectorLayer(layerName, params) {
      try {
        if (this.map) {
          var vectorLayer = this.getLayerByLayerName(layerName);
          if (!(vectorLayer instanceof ol.layer.Vector)) {
            vectorLayer = null;
          }
          if (!vectorLayer) {
            if (params && params.create) {
              vectorLayer = new ol.layer.Vector({
                layerName: layerName,
                params: params,
                layerType: 'vector',
                source: new ol.source.Vector({
                  wrapX: false
                }),
                style: new ol.style.Style({
                  fill: new ol.style.Fill({
                    color: 'rgba(67, 110, 238, 0.4)'
                  }),
                  stroke: new ol.style.Stroke({
                    color: '#4781d9',
                    width: 2
                  }),
                  image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                      color: '#ffcc33'
                    })
                  })
                })
              });
            }
          }
          if (this.map && vectorLayer) {
            if (params && params.hasOwnProperty('selectable')) {
              vectorLayer.set('selectable', params.selectable);
            }

            var _vectorLayer = this.getLayerByLayerName(layerName);
            if (!_vectorLayer || !(_vectorLayer instanceof ol.layer.Vector)) {
              this.map.addLayer(vectorLayer);
            }
          }
          return vectorLayer;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, {
    key: 'removeDrawInteraion',
    value: function removeDrawInteraion() {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
        this.draw = null;
      }
      if (this.listener) {
        ol.Observable.unByKey(this.listener);
        this.listener = null;
      }
      if (this.drawPointermove) {
        ol.Observable.unByKey(this.drawPointermove);
        this.drawPointermove = null;
      }
      if (this.measureLengthClick) {
        ol.Observable.unByKey(this.measureLengthClick);
        this.measureLengthClick = null;
      }
      if (this.beforeMeasurePointerMoveHandler) {
        ol.Observable.unByKey(this.beforeMeasurePointerMoveHandler);
        this.beforeMeasurePointerMoveHandler = null;
      }
      if (this.measureLengthSingleClick) {
        ol.Observable.unByKey(this.measureLengthSingleClick);
        this.measureLengthSingleClick = null;
      }
      this.clickCount = '';
    }
  }, {
    key: 'beforeDrawPointMoveHandler',
    value: function beforeDrawPointMoveHandler(event) {
      if (!this.measureHelpTooltip) {
        var helpTooltipElement = document.createElement('label');
        if (this.measureTypes.measureLength === this.options['measureType']) {
          helpTooltipElement.className = 'HMapLabel hamp-js-measure-length';
          helpTooltipElement.innerHTML = '<span class="HMap_diso"><span class="HMap_disi">单击开始测量</span></span>';
        } else {
          helpTooltipElement.className = 'HMapLabel HMap_disLabel hamp-js-measure-area';
          helpTooltipElement.innerHTML = '<span class="HMap_diso"><span class="HMap_disi">单击开始测面</span></span>';
        }
        this.measureHelpTooltip = new ol.Overlay({
          element: helpTooltipElement,
          offset: [15, -10],
          positioning: 'center-center'
        });
        this.measureHelpTooltip.set('layerName', this.layerName);
        this.map.addOverlay(this.measureHelpTooltip);
      }
      this.measureHelpTooltip.setPosition(event.coordinate);
    }
  }, {
    key: 'changeCur',
    value: function changeCur(type) {
      if (type === this.measureTypes.measureLength) {
        this.map.getTargetElement().style.cursor = this.defaultParams['measureLengthCursor'];
      } else if (type === this.measureTypes.measureArea) {
        this.map.getTargetElement().style.cursor = this.defaultParams['measureAreaCursor'];
      } else {
        this.map.getTargetElement().style.cursor = this.previousCursor_;
      }
    }
  }, {
    key: 'drawPointerMoveHandler',
    value: function drawPointerMoveHandler(event) {
      if (this.measureTypes.measureLength === this.options['measureType']) {
        if (event.dragging) {
          return;
        }
        var helpTooltipElement = this.measureHelpTooltip.getElement();
        helpTooltipElement.className = ' HMapLabel HMap_disLabel move-label';
        helpTooltipElement.innerHTML = '<span>总长:<span class="HMap_disBoxDis"></span></span><br><span style="color: #7a7a7a">单击确定地点,双击结束</span>';
        this.measureHelpTooltip.setPosition(event.coordinate);
      } else if (this.measureTypes.measureArea === this.options['measureType']) {
        if (event.dragging) {
          return;
        }
        var _helpTooltipElement = this.measureHelpTooltip.getElement();
        _helpTooltipElement.className = ' HMapLabel HMap_disLabel move-label hamp-js-measure-area';
        _helpTooltipElement.innerHTML = '<span class="HMap_diso"><span class="HMap_disi">单击确定地点,双击结束</span></span>';
        this.measureHelpTooltip.setPosition(event.coordinate);
      }
    }
  }, {
    key: 'drawListener',
    value: function drawListener() {
      var _this4 = this;

      this.draw.on('drawstart', function (event) {
        _this4.drawSketch = event.feature;
        _this4.drawSketch.set('uuid', (0, _utils.getuuid)());
        if (_this4.measureTypes.measureLength === _this4.options['measureType']) {
          ol.Observable.unByKey(_this4.beforeMeasurePointerMoveHandler);
          ol.Observable.unByKey(_this4.listener);
          _this4.beforeMeasurePointerMoveHandler = null;
          _this4.listener = null;
          _this4.listener = _this4.drawSketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            if (geom instanceof ol.geom.LineString) {
              var output = _this4.formatData(geom);
              _this4.drawSketch.length = output;
              _this4.measureHelpTooltip.getElement().firstElementChild.firstElementChild.innerHTML = output;
            }
          });
          _this4.drawPointermove = _this4.map.on('pointermove', _this4.drawPointerMoveHandler, _this4);
        } else if (_this4.measureTypes.measureArea === _this4.options['measureType']) {
          var uuid = (0, _utils.getuuid)();
          _this4.createMeasureAreaTooltip();
          _this4.drawSketch.set('uuid', uuid);
          _this4.measureAreaTooltip.set('uuid', uuid);
          _this4.listener = _this4.drawSketch.getGeometry().on('change', function (evts) {
            var geom = evts.target;
            var area = _this4.formatData(geom);
            if (_this4.measureAreaTooltip) {
              _this4.measureAreaTooltipElement.innerHTML = '面积' + area;
              _this4.measureAreaTooltip.setPosition(geom.getInteriorPoint().getCoordinates());
            }
          });
          _this4.drawPointermove = _this4.map.on('pointermove', _this4.drawPointerMoveHandler, _this4);
        }
      });
      this.draw.on('drawend', function (ev) {
        window.setTimeout(function () {
          _this4.getDragPanInteraction().setActive(true);
          _this4.getDoubleClickZoomInteraction().setActive(true);
        }, 300);
        _this4.map.getTargetElement().style.cursor = 'default';
        _this4.map.removeOverlay(_this4.measureHelpTooltip);
        _this4.measureHelpTooltip = null;
        if (_this4.measureTypes.measureLength === _this4.options['measureType']) {
          _this4.addMeasureOverLay(ev.feature.getGeometry().getLastCoordinate(), _this4.drawSketch.length, '止点');
          _this4.addMeasurecircle(ev.feature.getGeometry().getLastCoordinate());
        } else if (_this4.options['measureType'] === _this4.measureTypes.measureArea) {
          _this4.addMeasureRemoveButton(ev.feature.getGeometry().getCoordinates()[0][0]);
        }
        _this4.removeDrawInteraion();
        _this4.changeCur();
        _this4.listener = null;
        _this4.drawSketch = null;
      });
    }
  }, {
    key: 'formatData',
    value: function formatData(geom) {
      var output = 0;
      if (geom) {
        if (this.options['measureType'] === this.measureTypes.measureLength) {
          if (this.isGeodesic) {
            var _ref = [geom.getCoordinates(), 0],
                coordinates = _ref[0],
                length = _ref[1];

            var sourceProj = this.map.getView().getProjection();
            for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
              var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
              var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
              length += this.wgs84Sphere.haversineDistance(c1, c2);
            }
            if (length > 100) {
              output = Math.round(length / 1000 * 100) / 100 + ' ' + '公里';
            } else {
              output = Math.round(length * 100) / 100 + ' ' + '米';
            }
          } else {
            output = Math.round(geom.getLength() * 100) / 100;
          }
        } else if (this.options['measureType'] === this.measureTypes.measureArea) {
          if (this.isGeodesic) {
            var _sourceProj = this.getMap().getView().getProjection();
            var geometry = geom.clone().transform(_sourceProj, 'EPSG:4326');
            var _coordinates = geometry.getLinearRing(0).getCoordinates();
            var area = Math.abs(this.wgs84Sphere.geodesicArea(_coordinates));
            if (area > 10000000000) {
              output = Math.round(area / (1000 * 1000 * 10000) * 100) / 100 + ' ' + '万平方公里';
            } else if (area > 1000000 && area < 10000000000) {
              output = Math.round(area / (1000 * 1000) * 100) / 100 + ' ' + '平方公里';
            } else {
              output = Math.round(area * 100) / 100 + ' ' + '平方米';
            }
          } else {
            output = geom.getArea();
          }
        }
      }
      return output;
    }
  }, {
    key: 'addMeasurecircle',
    value: function addMeasurecircle(coordinate) {
      var feature = new ol.Feature({
        uuid: this.drawSketch.get('uuid'),
        geometry: new ol.geom.Point(coordinate)
      });
      this.layer.getSource().addFeature(feature);
    }
  }, {
    key: 'addMeasureOverLay',
    value: function addMeasureOverLay(coordinate, length, type) {
      var helpTooltipElement = document.createElement('label');
      if (type === '止点') {
        helpTooltipElement.className = 'hmap-measure-overLay HMap_disLabel';
        helpTooltipElement.innerHTML = "总长<span class='HMap_disBoxDis'>" + length + '</span>';
        this.addMeasureRemoveButton(coordinate);
      } else {
        helpTooltipElement.className = 'hmap-measure-overLay HMapLabel';
        helpTooltipElement.innerHTML = "<span class='HMap_diso'><span class='HMap_disi'>" + length + '</span></span>';
      }
      var tempMeasureTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [10, -10],
        positioning: 'center-center'
      });
      tempMeasureTooltip.set('layerName', this.layerName);
      this.map.addOverlay(tempMeasureTooltip);
      tempMeasureTooltip.setPosition(coordinate);
      tempMeasureTooltip.set('uuid', this.drawSketch.get('uuid'));
    }
  }, {
    key: 'addMeasureRemoveButton',
    value: function addMeasureRemoveButton(coordinate) {
      var _this5 = this;

      var pos = [coordinate[0] - 5 * this.map.getView().getResolution(), coordinate[1]];
      var btnImg = document.createElement('img');
      btnImg.src = this.defaultParams['removeButtonSrc'] ? this.defaultParams['removeButtonSrc'] : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEYzMzc1RDY3RDU1MTFFNUFDNDJFNjQ4NUUwMzRDRDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEYzMzc1RDc3RDU1MTFFNUFDNDJFNjQ4NUUwMzRDRDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjMzNzVENDdENTUxMUU1QUM0MkU2NDg1RTAzNENENiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjMzNzVENTdENTUxMUU1QUM0MkU2NDg1RTAzNENENiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsDx84AAAAC3SURBVHjavJIxDoMwDEV/ok5wDCbu0DvAdUBIwMLFSs/AxDXY6tZ2SCGVUikd+ifn20+2k5hHVd0AXJGmGQw+UyWMxY8KQGpbUNcB23aYHIsnuSgIy8dlAQ2DgwWSmD0YE5ReAq5pQOMIrKsDRByjKGC/dsxz2L7XQgU8JB7n4qDoY6SYF4J+p72T7/zeOXqr03SMx8XnsTUX7UgElKVCyDK3s8Tsae6sv/8ceceZ6jr1k99fAgwAsZy0Sa2HgDcAAAAASUVORK5CYII=';
      btnImg.style.cursor = 'pointer';
      btnImg.title = '清除测量结果';
      btnImg.groupId = this.drawSketch.get('uuid');
      btnImg.pos = coordinate;
      btnImg.onclick = function (evt) {
        _this5.RemoveMeasure(btnImg.groupId, coordinate);
      };
      var closeBtn = new ol.Overlay({
        element: btnImg,
        offset: [0, 10],
        positioning: 'center-bottom'
      });
      closeBtn.set('layerName', this.layerName);
      this.map.addOverlay(closeBtn);
      this.map.render();
      closeBtn.setPosition(pos);
      closeBtn.set('uuid', this.drawSketch.get('uuid'));
    }
  }, {
    key: 'createMeasureAreaTooltip',
    value: function createMeasureAreaTooltip() {
      this.measureAreaTooltipElement = document.createElement('div');
      this.measureAreaTooltipElement.style.marginLeft = '-6.25em';
      this.measureAreaTooltipElement.className = 'measureTooltip hidden';
      this.measureAreaTooltip = new ol.Overlay({
        element: this.measureAreaTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      this.measureAreaTooltip.set('layerName', this.layerName);
      this.map.addOverlay(this.measureAreaTooltip);
    }
  }, {
    key: 'RemoveMeasure',
    value: function RemoveMeasure(groupId, pos) {
      var overlays = this.getMap().getOverlays().getArray();
      if (overlays && Array.isArray(overlays)) {
        var length = overlays.length;

        for (var j = 0, i = 0; j < length; j++) {
          i++;
          if (overlays[length - i] && overlays[length - i] instanceof ol.Overlay && overlays[length - i].get('uuid') === groupId) {
            this.map.removeOverlay(overlays[length - i]);
          }
        }
      }
      if (this.layer && this.layer.getSource()) {
        var source = this.layer.getSource();
        var features = source.getFeatures();
        features.forEach(function (feat) {
          var lastCoord = feat.getGeometry().getLastCoordinate();
          if (lastCoord[0] === pos[0] && lastCoord[1] === pos[1] || feat.get('uuid') === groupId) {
            source.removeFeature(feat);
          }
        }, this);
      }
    }
  }, {
    key: 'getDragPanInteraction',
    value: function getDragPanInteraction() {
      var _this6 = this;

      if (!this.dragPanInteraction) {
        var items = this.getMap().getInteractions().getArray();
        items.every(function (item) {
          if (item && item instanceof ol.interaction.DragPan) {
            _this6.dragPanInteraction = item;
            return false;
          } else {
            return true;
          }
        });
      }
      return this.dragPanInteraction;
    }
  }, {
    key: 'getDoubleClickZoomInteraction',
    value: function getDoubleClickZoomInteraction() {
      var _this7 = this;

      if (!this.DoubleClickZoom) {
        var items = this.getMap().getInteractions().getArray();
        items.every(function (item) {
          if (item && item instanceof ol.interaction.DoubleClickZoom) {
            _this7.DoubleClickZoom = item;
            return false;
          } else {
            return true;
          }
        });
      }
      return this.DoubleClickZoom;
    }
  }, {
    key: 'getMap',
    value: function getMap() {
      return this.map;
    }
  }]);

  return MeasureTool;
}(_Style3.default);

exports.default = MeasureTool;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=MeasureTool.js.map