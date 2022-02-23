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

/***/ "./src/computer-player.js":
/*!********************************!*\
  !*** ./src/computer-player.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst ComputerPlayer = function(gameboard) {\n  if (!gameboard) {\n    throw('a gameboard object must be supplied as an argument');\n  }\n\n  if (!gameboard.receiveAttack) {\n    throw('the gameboard argument must respond to the recieveAttack() method');\n  }\n\n  if (!gameboard.placeShip) {\n    throw('the gameboard argument must respond to the placeShip() method');\n  }\n\n  if (!gameboard.allSunk) {\n    throw('the gameboard argument must respond to the allSunk() method');\n  }\n\n  const board = gameboard;\n\n  function attack() {\n    // returns random coordinate from the board that hasn't been attacked yet\n    const boardLength = board.getSize()[0];\n    const boardHeight = board.getSize()[1];\n    let isValid = false;\n    let randomCoordinate = [];\n\n    while (!isValid) {\n      // keep looking for random coordinates until one is found that has not been attacked yet\n      randomCoordinate = [random(0, boardLength), random(0, boardHeight)];\n      if (!hasBeenAttacked(randomCoordinate)) {\n        isValid = true;\n      }\n    }\n    return randomCoordinate;\n  }\n\n  function hasBeenAttacked(coordinate) {\n    const attacks = board.getAttacks();\n    let result = false;\n\n    attacks.forEach((attackCoordinate) => {\n      if (coordinate[0] === attackCoordinate[0] && coordinate[1] === attackCoordinate[1]) {\n        result = true;\n      }\n    });\n\n    return result;\n  }\n\n  function random(startNumber, endNumber) {\n    return parseInt(Math.random() * endNumber) + startNumber;\n  }\n\n  function getBoard() {\n    return board;\n  }\n\n  return { attack, getBoard }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComputerPlayer);\n\n//# sourceURL=webpack:///./src/computer-player.js?");

/***/ }),

/***/ "./src/display-controller.js":
/*!***********************************!*\
  !*** ./src/display-controller.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DisplayController = function(Game, Display) {\n  const game = Game;\n  const display = Display;\n\n  // bind the display's start button to the start method\n  display.bindStartButton(start);\n\n  function start() {\n    const response = game.initialize();\n\n    display.render(response);\n\n    // bind computer board buttons to the attack method\n    display.bindAttackButtons(attack);\n  }\n\n  function attack(event) {\n    const id = event.target.getAttribute('id');\n    const coordinate = [parseInt(id.slice(1)[0]), parseInt(id.slice(1)[1])];\n    const response = game.turn(coordinate);\n\n    console.log(response);\n    display.render(response);\n\n    // bind computer board buttons to the attack method\n    display.bindAttackButtons(attack);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayController);\n\n//# sourceURL=webpack:///./src/display-controller.js?");

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Display = function() {\n  const startButton = document.querySelector('#start');\n  const humanBoard = document.querySelector('#humanBoard');\n  const computerBoard = document.querySelector('#computerBoard');\n\n  function bindStartButton(handler) {\n    startButton.addEventListener('click', handler);\n  }\n\n  function bindAttackButtons(handler) {\n    const computerBoardButtons = document.querySelectorAll('.computer-button');\n    computerBoardButtons.forEach((button) => {\n      button.addEventListener('click', handler);\n    });\n  }\n\n  function render(gameResponse) {\n    // clear the boards \n    humanBoard.innerHTML = '';\n    computerBoard.innerHTML = '';\n\n    // display the human's board\n    gameResponse.humanBoard.forEach((gridRow, rowIndex) => {\n      const row = document.createElement('div');\n      row.classList.add('grid-row');\n      gridRow.forEach((gridPoint, pointIndex) => {\n        const boardButton = document.createElement('div');\n        const boardButtonId = `h${rowIndex}${pointIndex}`;\n        boardButton.setAttribute('id', boardButtonId);\n        boardButton.classList.add('human-button');\n        boardButton.innerHTML = gameResponse.humanBoard[rowIndex][pointIndex];\n        gameResponse.humanShipCoordinates.forEach((shipCoordinatesArray) => {\n          shipCoordinatesArray.forEach((shipCoordinate) => {\n            if (shipCoordinate[0] === rowIndex && shipCoordinate[1] === pointIndex) {\n              boardButton.classList.add('ship-present');\n            }\n          });\n        });\n        row.appendChild(boardButton);\n      });\n      humanBoard.appendChild(row);\n    });\n\n    // display the computer's board\n    gameResponse.computerBoard.forEach((gridRow, rowIndex) => {\n      const row = document.createElement('div');\n      row.classList.add('grid-row');\n      gridRow.forEach((gridPoint, pointIndex) => {\n        const boardButton = document.createElement('div');\n        const boardButtonId = `c${rowIndex}${pointIndex}`;\n        boardButton.setAttribute('id', boardButtonId);\n        boardButton.classList.add('computer-button');\n        boardButton.innerHTML = gameResponse.computerBoard[rowIndex][pointIndex];\n        row.appendChild(boardButton);\n      });\n      computerBoard.appendChild(row);\n    });\n  }\n\n  return { bindStartButton, bindAttackButtons, render }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);\n\n//# sourceURL=webpack:///./src/display.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Game = function(humanPlayer, computerPlayer) {\n  if (!humanPlayer || !computerPlayer) {\n    throw('a human player object and a computer player object must be supplied as arguments');\n  }\n\n  if (!humanPlayer.getBoard) {\n    throw('the human player object must respond to the getBoard() method');\n  }\n\n  if (!computerPlayer.getBoard) {\n    throw('the computer player object must respond to the getBoard() method');\n  }\n\n  if (!computerPlayer.attack) {\n    throw('the computer player object must respond to the attack() method');\n  }\n\n  const computer = computerPlayer;\n  const human = humanPlayer;\n  const computerBoard = computer.getBoard();\n  const humanBoard = human.getBoard();\n\n  function initialize() {\n    const response = {};\n\n    // clear both boards\n    computerBoard.clear();\n    humanBoard.clear();\n\n    // place ships on the computer player's board\n    computerBoard.placeShip([0, 0], 5, 0);\n    computerBoard.placeShip([0, 9], 4, 0);\n    computerBoard.placeShip([2, 2], 3, 1);\n    computerBoard.placeShip([8, 7], 3, 1);\n    computerBoard.placeShip([9, 5], 2, 1);\n\n    // place ships on the human player's board\n    humanBoard.placeShip([1, 0], 5, 1);\n    humanBoard.placeShip([5, 0], 4, 1);\n    humanBoard.placeShip([0, 9], 3, 0);\n    humanBoard.placeShip([7, 7], 3, 0);\n    humanBoard.placeShip([9, 5], 2, 1);\n\n    // build the response object\n    response.humanBoard = humanBoard.print();\n    response.computerBoard = computerBoard.print();\n    response.humanShipCoordinates = humanBoard.getShips().map(element => element.coordinates);\n    response.computerShipCoordinates = computerBoard.getShips().map(element => element.coordinates);\n\n    if (humanBoard.allSunk()) {\n      response.winner = 'computer';\n    }\n    else if (computerBoard.allSunk()) {\n      response.winner = 'human';\n    }\n    else {\n      response.winner = null;\n    }\n\n    return response;\n  }\n\n  function turn(humanAttackCoordinates) {\n    const response = {};\n\n    // send the human's attack to the computer's board\n    computerBoard.receiveAttack(humanAttackCoordinates);\n\n    // send the computer's attack to the human's board\n    humanBoard.receiveAttack(computer.attack());\n\n    // build the response object\n    response.humanBoard = humanBoard.print();\n    response.computerBoard = computerBoard.print();\n    response.humanShipCoordinates = humanBoard.getShips().map(element => element.coordinates);\n    response.computerShipCoordinates = computerBoard.getShips().map(element => element.coordinates);\n\n    if (humanBoard.allSunk()) {\n      response.winner = 'computer';\n    }\n    else if (computerBoard.allSunk()) {\n      response.winner = 'human';\n    }\n    else {\n      response.winner = null;\n    }\n\n    return response;\n  }\n\n  return { initialize, turn }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst GameBoard = function(ShipFactory) {\n  try {\n    // verify shipFactory is valid\n    ShipFactory(3).hit();\n    ShipFactory(3).isSunk();\n  }\n  catch {\n    throw('a ship factory must be supplied as an argument');\n  }\n\n  const shipFactory = ShipFactory;\n  const gridLength = 10;\n  const gridHeight = 10;\n  let ships = [];\n  let misses = [];\n  let attacks = [];\n  let hits = [];\n\n  function getShips() {\n    return ships;\n  }\n\n  function getMisses() {\n    return misses;\n  }\n\n  function placeShip(startCoordinate, shipLength, direction) {\n    const coordinates = [];\n    let currentCoordinate;\n    let i = 0;\n\n    currentCoordinate = startCoordinate;\n\n    // throw an error if the direction argument is incorrect\n    if (direction !== 0 && direction !== 1) {\n      throw('invalid ship direction');\n    }\n\n    // if direction is 0, determine remaining coordinates in the +y direction\n    if (direction === 0) {\n      while (i < shipLength) {\n        coordinates.push(currentCoordinate.slice(0));\n        currentCoordinate[0] += 1;\n        i += 1;\n      }\n    }\n\n    // if direction is 1, determine remaining coordinates in the +x direction\n    if (direction === 1) {\n      while (i < shipLength) {\n        coordinates.push(currentCoordinate.slice(0));\n        currentCoordinate[1] += 1;\n        i += 1;\n      }\n    }\n\n    // throw an error if any coordindates are not on the board or if any coordinates are unavailable\n    if (!coordinates.every(isValidCoordinate) || !coordinates.every(isCoordinateAvailable)) {\n      throw('invalid ship position');\n    }\n\n    // create the new ship entry\n    ships.push({\n      coordinates: coordinates,\n      ship: shipFactory(shipLength),\n    });\n  }\n\n  function hasBeenAttacked(coordinate) {\n    // returns true if the coordinate exists in the attacks array\n    let result = false;\n\n    attacks.forEach((attackCoordinate) => {\n      if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {\n        result = true;\n      }\n    });\n\n    return result;\n  }\n\n  function receiveAttack(attackCoordinate) {\n    // if there is a ship at the supplied coordinate, register a 'hit'\n    let attackedShip;\n    let attackedShipSection;\n\n    // throw an error if the attackCoordinate is not on the board or if the position has already been attacked\n    if (!isValidCoordinate(attackCoordinate) || hasBeenAttacked(attackCoordinate)) {\n      throw('invalid attack coordinate');\n    }\n\n    // record the attack location\n    attacks.push(attackCoordinate.slice(0));\n\n    // loop through all the ships and see if any ship coordinates match the attack coordinate\n    // if a coordinate match is found, record the ship and which section of the ship got hit\n    // and add the coordinate to the hits array\n    ships.forEach((shipEntry) => {\n      let shipSection = 0;\n\n      shipEntry.coordinates.forEach((coordinate) => {\n        if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {\n          attackedShip = shipEntry.ship;\n          attackedShipSection = shipSection;\n          hits.push(attackCoordinate.slice(0));\n        }\n        shipSection += 1;\n      });\n    });\n\n    // if the attack hit a ship, call the ship.hit() method to record the damage\n    // if the attack didn't hit a ship, record the attack as a miss\n    if (attackedShip) {\n      attackedShip.hit(attackedShipSection);\n    } else {\n      misses.push(attackCoordinate.slice(0));\n    }\n  }\n\n  function isCoordinateAvailable(coordinate) {\n    // returns true if the coordinate is not already occupied by a ship\n    const occupiedCoordinates = [];\n    let result = true;\n\n    ships.forEach((ship) => {\n      ship.coordinates.forEach((coordinate) => {\n        occupiedCoordinates.push(coordinate.slice(0));\n      });\n    });\n\n    for (let i = 0; i < occupiedCoordinates.length; i++) {\n      if (occupiedCoordinates[i][0] === coordinate[0] && occupiedCoordinates[i][1] === coordinate[1]) {\n        result = false;\n      }\n    }\n\n    return result;\n  }\n\n  function allSunk() {\n    // return true if ship.isSunk() returns true for each ship\n    let result = [];\n\n    ships.forEach((shipEntry) => {\n      let ship = shipEntry.ship;\n\n      if (ship.isSunk()) {\n        result.push(true);\n      } else {\n        result.push(false);\n      }\n    });\n\n    if (result.every((item) => item === true)) {\n      return true;\n    }\n    return false;\n  }\n\n  function getAttacks() {\n    return attacks;\n  }\n\n  function getSize() {\n    return [gridLength, gridHeight];\n  }\n\n  function getHits() {\n    return hits;\n  }\n\n  function isValidCoordinate(coordinate) {\n    // returns true if coordinate exists on the board\n    let validXCoordinate;\n    let validYCoordinate;\n\n    if(coordinate[0] >= 0 && coordinate[0] <= gridLength - 1) {\n      validYCoordinate = true;\n    }\n\n    if(coordinate[1] >= 0 && coordinate[1] <= gridHeight - 1) {\n      validXCoordinate = true;\n    }\n\n    if (validYCoordinate && validXCoordinate) {\n      return true;\n    }\n\n    return false;\n  }\n\n  function print() {\n    // return a matrix of characters representing the board\n    // '' is an unattacked position\n    // 'x' is an attacked position that scored a hit\n    // 'o' is an attacked position that was a miss\n    // sunk ships have an 'X' for each ship section\n    let printedBoard = Array(gridLength).fill([]);\n    printedBoard = printedBoard.map(element => Array(gridHeight).fill(''));\n    \n    // draw hits\n    attacks.forEach(attackCoordinate => {\n      let y = attackCoordinate[0];\n      let x = attackCoordinate[1];\n      printedBoard[y][x] = 'x';\n    });\n\n    // draw misses\n    misses.forEach(missCoordinate => {\n      let y = missCoordinate[0];\n      let x = missCoordinate[1];\n      printedBoard[y][x] = 'o';\n    });\n\n    // draw sunken ships\n    ships.forEach(shipEntry => {\n      if (shipEntry.ship.isSunk()) {\n        shipEntry.coordinates.forEach((coordinate) => {\n          printedBoard[coordinate[0]][coordinate[1]] = 'X';\n        });\n      }\n    });\n\n    return printedBoard;\n  }\n\n  function clear() {\n    ships = [];\n    misses = [];\n    hits = [];\n    attacks = [];\n  }\n\n  return { getShips, getMisses, getAttacks, getHits, getSize, placeShip, receiveAttack, allSunk, print, clear }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack:///./src/gameboard.js?");

/***/ }),

/***/ "./src/human-player.js":
/*!*****************************!*\
  !*** ./src/human-player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst HumanPlayer = function(gameboard) {\n  if (!gameboard) {\n    throw('a gameboard object must be supplied as an argument');\n  }\n\n  if (!gameboard.receiveAttack) {\n    throw('the gameboard argument must respond to the recieveAttack() method');\n  }\n\n  if (!gameboard.placeShip) {\n    throw('the gameboard argument must respond to the placeShip() method');\n  }\n\n  if (!gameboard.allSunk) {\n    throw('the gameboard argument must respond to the allSunk() method');\n  }\n\n  const board = gameboard;\n\n  function getBoard() {\n    return board;\n  }\n\n  return { getBoard }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HumanPlayer);\n\n//# sourceURL=webpack:///./src/human-player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _human_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./human-player */ \"./src/human-player.js\");\n/* harmony import */ var _computer_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./computer-player */ \"./src/computer-player.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _display_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./display-controller */ \"./src/display-controller.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n\n\n\n\n\n\n\n\nconst shipFactory = _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\nconst computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(shipFactory);\nconst humanBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(shipFactory);\nconst computerPlayer = (0,_computer_player__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(computerBoard);\nconst humanPlayer = (0,_human_player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(humanBoard);\nconst game = (0,_game__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(humanPlayer, computerPlayer);\nconst display = (0,_display__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\nconst displayController = (0,_display_controller__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(game, display);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = function(length) {\n  if((!length) || (!Number.isInteger(length)) || (length < 0)) {\n    throw('length argument must be a positive integer value');\n  }\n\n  const damage = Array(length).fill(0);\n\n  function getDamage() {\n    return damage;\n  }\n\n  function hit(location) {\n    damage[location] = 1;\n  }\n\n  function isSunk() {\n    return damage.every((item) => item === 1);\n  }\n\n  return { getDamage, hit, isSunk }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;