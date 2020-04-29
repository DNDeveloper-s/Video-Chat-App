/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/assets/js/Auth/auth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/js/Auth/Client/authSettings.js":
/*!******************************************************!*\
  !*** ./public/assets/js/Auth/Client/authSettings.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const authUI = __webpack_require__(/*! ./authUI */ \"./public/assets/js/Auth/Client/authUI.js\");\r\nconst postDetailsToServer = __webpack_require__(/*! ../Server/postDetailsToServer */ \"./public/assets/js/Auth/Server/postDetailsToServer.js\");\r\n\r\nfunction initEventListenerToButtons(cb) {\r\n    // Get Action Button through DOM\r\n    const actionBtn = document.querySelector('.submit > button');\r\n    const actionType = actionBtn.dataset.type; // Getting Action Type of Button // Login or SignUp\r\n\r\n    actionBtn.addEventListener('click', function() {\r\n        console.log(actionType);\r\n        cb(actionType);\r\n    });\r\n\r\n}\r\n\r\nfunction initEventListenerToInput(cb) {\r\n    // Grabbing all these input fields\r\n    const inputEls = document.querySelectorAll('.input-control > input');\r\n    const actionBtn = document.querySelector('.submit > button');\r\n    const actionType = actionBtn.dataset.type; // Getting Action Type of Button // Login or SignUp\r\n\r\n    // Attaching Event listener\r\n    inputEls.forEach(inputEl => {\r\n        inputEl.addEventListener('keyup', function(e) {\r\n            if(e.key === 'Enter') {\r\n                cb(actionType);\r\n            }\r\n        })\r\n    })\r\n}\r\n\r\nasync function postDetailsToServerByActionType(actionType, cb) {\r\n    // Fetching form details from UI\r\n    const details = authUI.getDetailsFromUI(actionType); // Will recieve object filled with details\r\n\r\n    // Posting to server\r\n    const data = await postDetailsToServer(details);\r\n\r\n    cb(data);\r\n}\r\n\r\nmodule.exports = {\r\n    initEventListenerToButtons,\r\n    initEventListenerToInput,\r\n    postDetailsToServerByActionType\r\n}\n\n//# sourceURL=webpack:///./public/assets/js/Auth/Client/authSettings.js?");

/***/ }),

/***/ "./public/assets/js/Auth/Client/authUI.js":
/*!************************************************!*\
  !*** ./public/assets/js/Auth/Client/authUI.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function getDetailsFromUI(actionType = String) {\r\n    // Details Object\r\n    // Where all the details about the form to this object\r\n    const detailsObj = {};\r\n\r\n    // Attaching Action Type to the object\r\n    detailsObj.actionType = actionType;\r\n\r\n    // Grabbing some Common Details across both actionTypes\r\n    detailsObj.userName = document.getElementsByName('user_name')[0].value;\r\n    detailsObj.password = document.getElementsByName('password')[0].value;\r\n\r\n    // Now grabbing some unCommon details using some conditionals\r\n    if(actionType === 'signup') {\r\n        detailsObj.fullName = document.getElementsByName('full_name')[0].value;\r\n        detailsObj.email = document.getElementsByName('email')[0].value;\r\n    }\r\n\r\n    // Returning Details \r\n    return detailsObj;\r\n}\r\n\r\nasync function showMessage(data) {\r\n    /**\r\n     * \r\n     * data = {\r\n     *      type: String, // success or error\r\n     *      message: String\r\n     * }\r\n     * \r\n     */\r\n    // Checking if there is already message \r\n    let showMessageEl = document.querySelector('.show_message');\r\n    if(showMessageEl) {\r\n        showMessageEl.classList.add('remove');\r\n        await new Promise((res, rej) => {\r\n            setTimeout(() => {\r\n                showMessageEl.remove();\r\n                res();\r\n            }, 200);\r\n        });\r\n    }\r\n\r\n    const htmlToAdd = `\r\n        <div class=\"show_message ${data.type}\">\r\n            <p>${data.message}</p>\r\n        </div>\r\n    `;\r\n\r\n    // Form Element through DOM \r\n    const formEl = document.querySelector('.form');\r\n\r\n    // Injecting to formEl\r\n    formEl.insertAdjacentHTML('afterbegin', htmlToAdd);\r\n}\r\n\r\nmodule.exports = {\r\n    getDetailsFromUI,\r\n    showMessage\r\n}\n\n//# sourceURL=webpack:///./public/assets/js/Auth/Client/authUI.js?");

/***/ }),

/***/ "./public/assets/js/Auth/Server/postDetailsToServer.js":
/*!*************************************************************!*\
  !*** ./public/assets/js/Auth/Server/postDetailsToServer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * \r\n * Expecting Details Object\r\n * \r\n * details = {\r\n *      actionType: String,\r\n *      ... Some Form Details\r\n * }\r\n * \r\n */\r\n\r\nmodule.exports = async (details) => {\r\n    const res = await fetch(`${window.location.origin}/auth/${details.actionType}`, {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(details)\r\n    })\r\n\r\n    return res.json();\r\n}\n\n//# sourceURL=webpack:///./public/assets/js/Auth/Server/postDetailsToServer.js?");

/***/ }),

/***/ "./public/assets/js/Auth/auth.js":
/*!***************************************!*\
  !*** ./public/assets/js/Auth/auth.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const authSettings = __webpack_require__(/*! ./Client/authSettings */ \"./public/assets/js/Auth/Client/authSettings.js\");\r\nconst authUI = __webpack_require__(/*! ./Client/authUI */ \"./public/assets/js/Auth/Client/authUI.js\");\r\nconst utils = __webpack_require__(/*! ../utilities */ \"./public/assets/js/utilities.js\");\r\n\r\n// Home Imports\r\nconst homeSettings = __webpack_require__(/*! ../Dashboard/Home/Client/homeSettings */ \"./public/assets/js/Dashboard/Home/Client/homeSettings.js\");\r\n\r\n// Add Event Listener to action buttons\r\nauthSettings.initEventListenerToButtons(\r\n    // Callback recieves actionType of Button\r\n    async function(actionType) {\r\n        authSettings.postDetailsToServerByActionType(actionType, \r\n            // Callback recieves data recieved from the server\r\n            async function(data) {\r\n                console.log(data);\r\n                // Showing Message to UI that what went wrong or right\r\n                authUI.showMessage({\r\n                    type: data.acknowledgement.type,\r\n                    message: data.acknowledgement.message\r\n                })\r\n\r\n                // Waiting 1500ms or 1.5s before redirecting\r\n                await utils.waitAMin(1500);\r\n                \r\n                // Loading Home Page\r\n                if(data.acknowledgement.type === 'success') {\r\n                    homeSettings.loadHome();\r\n                }\r\n            }\r\n        );\r\n    }\r\n);\r\n\r\n// Add Event Listener to input 'Submit on Enter'\r\nauthSettings.initEventListenerToInput(\r\n    // Callback recieves actionType of Button\r\n    async function (actionType) {\r\n        authSettings.postDetailsToServerByActionType(actionType, \r\n            // Callback recieves data recieved from the server\r\n            async function(data) {\r\n                console.log(data);\r\n                // Showing Message to UI that what went wrong or right\r\n                authUI.showMessage({\r\n                    type: data.acknowledgement.type,\r\n                    message: data.acknowledgement.message\r\n                })\r\n\r\n                // Waiting 1500ms or 1.5s before redirecting\r\n                await utils.waitAMin(1500);\r\n                \r\n                // Loading Home Page\r\n                if(data.acknowledgement.type === 'success') {\r\n                    const redirectUrl = window.location.search.split('&')[1];\r\n                    \r\n                    if(redirectUrl && redirectUrl.length > 0) {\r\n                        const refinedRedirectUrl = redirectUrl.slice(11);\r\n                        window.location.replace(`${window.location.origin}${refinedRedirectUrl}`);\r\n                    } else {\r\n                        homeSettings.loadHome();\r\n                    }\r\n                }\r\n            }\r\n        );\r\n    }    \r\n);\n\n//# sourceURL=webpack:///./public/assets/js/Auth/auth.js?");

/***/ }),

/***/ "./public/assets/js/Dashboard/Home/Client/homeSettings.js":
/*!****************************************************************!*\
  !*** ./public/assets/js/Dashboard/Home/Client/homeSettings.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function initActionButtonHandler(cb) {\r\n    // Grabbing those buttons\r\n    const createActionBtn = document.querySelector('.create_room_btn');\r\n    const joinActionBtn = document.querySelector('.join_room_btn');\r\n\r\n    // Adding Event Handlers\r\n    createActionBtn.addEventListener('click', function() {\r\n        cb('createRoom');\r\n    });\r\n    joinActionBtn.addEventListener('click', function() {\r\n        cb('joinRoom');\r\n    });\r\n}\r\n\r\nfunction loadHome() {\r\n    window.location.replace(`${window.location.origin}/dashboard/home`);\r\n}\r\n\r\nmodule.exports = {\r\n    initActionButtonHandler,\r\n    loadHome,\r\n}\n\n//# sourceURL=webpack:///./public/assets/js/Dashboard/Home/Client/homeSettings.js?");

/***/ }),

/***/ "./public/assets/js/Room/Server/getPeers.js":
/*!**************************************************!*\
  !*** ./public/assets/js/Room/Server/getPeers.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = async () => {\r\n    const res = await fetch(`${window.location.origin}/room/getPeers?roomId=${roomId}`, {\r\n        method: 'GET'\r\n    });\r\n\r\n    return res.json();\r\n}\n\n//# sourceURL=webpack:///./public/assets/js/Room/Server/getPeers.js?");

/***/ }),

/***/ "./public/assets/js/utilities.js":
/*!***************************************!*\
  !*** ./public/assets/js/utilities.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function waitAMin(time = Number /** In milliseconds  */) {\r\n    return new Promise((res, rej) => {\r\n        setTimeout(() => {\r\n            res();\r\n        }, time);\r\n    })\r\n}\r\n\r\nasync function fetchPeersToSS() {\r\n    const data = await __webpack_require__(/*! ./Room/Server/getPeers */ \"./public/assets/js/Room/Server/getPeers.js\")();\r\n\r\n    console.log(data);\r\n\r\n    sessionStorage.setItem('current_peers', JSON.stringify(data.acknowledgement.peerObj));\r\n}\r\n\r\nfunction fetchPeersFromSS() {\r\n    const jsonPeers = sessionStorage.getItem('current_peers');\r\n    console.log(jsonPeers);\r\n    const peerObj = JSON.parse(jsonPeers);\r\n    return peerObj;\r\n}\r\n\r\nasync function fetchCurrentUser() {\r\n    const res = await fetch(`${window.location.origin}/room/fetch?details=curUser`, {\r\n        method: 'GET'\r\n    });\r\n\r\n    return res.json();\r\n}\r\n\r\nfunction pauseVideo(videoEl) {\r\n    const video = document.querySelector(videoEl);\r\n    const videoHolder = video.parentElement;\r\n\r\n    // Creating new canvas element\r\n    const canvasEl = document.createElement('canvas');\r\n    videoHolder.append(canvasEl);\r\n\r\n    // Grabbing some canvas stuff, el and context\r\n    const canvas = videoHolder.querySelector('canvas');\r\n    const context = canvas.getContext('2d');\r\n\r\n    // some global variables\r\n    let myWidth, myHeight, ratio;\r\n    \r\n    // Event handler on the video element\r\n    video.addEventListener('loadedmetadata', function() {\r\n        ratio = video.videoWidth/video.videoHeight;\r\n        myWidth = video.videoWidth-100;\r\n        myHeight = parseInt(myWidth/ratio,10);\r\n        canvas.width = myWidth;\r\n        canvas.height = myHeight;\r\n\r\n        // Put it all together\r\n        context.fillRect(0,0,myWidth,myHeight);\r\n        context.drawImage(video,0,0,myWidth,myHeight);\r\n\r\n        // Video is paused, Lets add some utiility classes on video parent element\r\n        videoHolder.classList.add('videoPaused');\r\n    },false);\r\n\r\n}\r\n\r\nmodule.exports = {\r\n    waitAMin,\r\n    fetchPeersToSS,\r\n    fetchPeersFromSS,\r\n    fetchCurrentUser,\r\n    pauseVideo\r\n}\n\n//# sourceURL=webpack:///./public/assets/js/utilities.js?");

/***/ })

/******/ });