/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/map.js":
/*!************************!*\
  !*** ./src/lib/map.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n//doble () se autoinvoca\r\n(function(){\r\n    const lat = 20.2679601;\r\n    const lon = -97.958196;\r\n    const leafLetMap = L.map('map').setView([lat, lon], 16);\r\n    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {\r\n        atribution: '&copy; <a href=\"https://openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(leafLetMap);\r\n\r\n    marker = new L.marker([lat, lon], {\r\n        draggable: true,\r\n        autoPan: true,\r\n    }).addTo(map);\r\n\r\n    // obtener lat y lon swl marker\r\n    marker.on('moveend', function(e){\r\n        marker = e.target\r\n        const position = marker.getLatLng()\r\n        console.log(`El usuario soltó el marcador en las coordenadas: ${position.lat}, ${position.lng}`)\r\n        map.panTo(new L.LatLng(position.lat, position.lng))\r\n    })\r\n    //TODO: Obtener información de la dirección física\r\n        geocodeService.reverse().latlng(position, 13).run(function(error, result){\r\n        console.log(`La info. calculada por geocoder al intentar hacer la georeferencia inversa es: ${result}`);\r\n        marker.bind.Popup(result.address.LongLabel)\r\n        document.querySelector('.street').textContent=result.address?.Address ?? '';\r\n        document.querySelector('#street').value=result.address?.Address ?? '';\r\n        document.querySelector('#lat').value=result.address?.Address ?? '';\r\n        document.querySelector('#lng').value=result.address?.Address ?? '';\r\n\r\n    })\r\n})();\n\n//# sourceURL=webpack://mx.edu.utxj.ti.dsm.awos.bienesraices220308/./src/lib/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/lib/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;