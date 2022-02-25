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

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Display = function() {\n  const humanBoard = document.querySelector('#humanBoard');\n  const computerBoard = document.querySelector('#computerBoard');\n  const humanStatus = document.querySelector('#humanStatus');\n  const computerStatus = document.querySelector('#computerStatus');\n  const verticalButton = document.querySelector('#vertical');\n  const horizontalButton = document.querySelector('#horizontal');\n  let nextPlacementSize;\n  let orientation = activeOrientation();\n\n  verticalButton.addEventListener('click', () => {\n    orientation = verticalButton.getAttribute('id');\n  });\n\n  horizontalButton.addEventListener('click', () => {\n    orientation = horizontalButton.getAttribute('id');\n  });\n\n  function activeOrientation() {\n    let result;\n\n    if (verticalButton.checked) {\n      result = verticalButton.getAttribute('id');\n    }\n    else {\n      result = horizontalButton.getAttribute('id');\n    }\n    \n    return result;\n  }\n\n  function bindHumanGridButtonsForPlacement(hoverHandler, clickHandler) {\n    const humanGridButtons = document.querySelectorAll('.human-button');\n    humanGridButtons.forEach((button) => {\n      button.addEventListener('mouseover', () => {\n        // during ship placement, when a human's grid point is hovered over,\n        // we need to figure out the other grid points that would make up an \n        // entire ship.  For example, when placing a carrier (length of 5), \n        // if grid point [0, 0] is hovered over, we would expect [1, 0], [2, 0], \n        // [3, 0], and [4, 0] to be the remaining coordinates making up the placement\n        // in the vertical direction.  When hovered over, these other coordinates should\n        // be highlighted green if they represent a valid placement, or highlighted red\n        // if an invalid placement.\n\n        const idString = button.getAttribute('id');\n        const coordinate = [parseInt(idString.slice(1, 2)), parseInt(idString.slice(2, 3))];\n\n        // get remaining coordinates\n        const coordinates = addRemainingCoordinates(coordinate);\n        \n        // convert coordinates into ids\n        const ids = coordinatesToIds(coordinates);\n        \n        // if coordinates are valid, highlight the buttons green\n        // otherwise highlight them red\n        if (hoverHandler(coordinates)) {\n          console.log('highlighting green');\n          highlightGreen(ids);\n        }\n        else {\n          console.log('highlighting green');\n          highlightRed(ids);\n        }\n      \n      });\n\n      button.addEventListener('click', () => {\n        const idString = button.getAttribute('id');\n        const coordinate = [parseInt(idString.slice(1, 2)), parseInt(idString.slice(2, 3))];\n\n        // get remaining coordinates\n        const coordinates = addRemainingCoordinates(coordinate);\n\n        // only allow valid ship placements\n        if (hoverHandler(coordinates)) {\n          clickHandler(coordinates);\n        }\n      });\n    });\n  }\n\n  function bindComputerGridButtonsForAttack(handler) {\n    const buttons = document.querySelectorAll('.computer-button');\n    buttons.forEach((button), () => {\n      button.addEventListener('click', handler);\n    });\n  }\n\n  function highlightGreen(ids) {\n    const humanGridButtons = document.querySelectorAll('.human-button');\n\n    // clear any red highlights on the board\n    humanGridButtons.forEach((button) => {\n      if (button.classList.contains('highlight-red')) {\n        button.classList.toggle('highlight-red');\n      }\n    });\n\n    // highlight matching buttons green\n    humanGridButtons.forEach((button) => {\n      if (ids.includes(button.getAttribute('id'))) {\n        if (!button.classList.contains('highlight-green')) {\n          button.classList.toggle('highlight-green');\n        }\n      }\n      else {\n        if (button.classList.contains('highlight-green')) {\n          button.classList.toggle('highlight-green');\n        }\n      }\n    });\n  }\n\n  function highlightRed(ids) {\n    const humanGridButtons = document.querySelectorAll('.human-button');\n\n    // clear any green highlights on the board\n    humanGridButtons.forEach((button) => {\n      if (button.classList.contains('highlight-green')) {\n        button.classList.toggle('highlight-green');\n      }\n    });\n\n    // highlight matching buttons red\n    humanGridButtons.forEach((button) => {\n      if (ids.includes(button.getAttribute('id'))) {\n        if (!button.classList.contains('highlight-red')) {\n          button.classList.toggle('highlight-red');\n        }\n      }\n      else {\n        if (button.classList.contains('highlight-red')) {\n          button.classList.toggle('highlight-red');\n        }\n      }\n    });\n  }\n\n  function coordinatesToIds(coordinates) {\n    let ids = [];\n\n    coordinates.forEach((coordinate) => {\n      ids.push(`h${coordinate[0]}${coordinate[1]}`);\n    });\n\n    return ids;\n  }\n\n  function addRemainingCoordinates(coordinate) {\n    let yCoords = [];\n    let xCoords = [];\n    let newCoords = [];\n    let direction = 'y';\n\n    // push the intial coordinates into the arrays\n    yCoords.push(coordinate[0]);\n    xCoords.push(coordinate[1]);\n\n    // if direction is vertical\n    if (orientation === verticalButton.getAttribute('id')) {\n      // push nextPlacementSize more increasing y coordinates into the yCoords array\n      for (let i = 0; i < nextPlacementSize - 1; i++) {\n        let lastEntry = yCoords.slice(-1)[0];\n        yCoords.push(lastEntry + 1);\n      }\n\n      // push nextPlacementSize more same x coordinates into the xCoords array\n      for (let i = 0; i < nextPlacementSize - 1; i++) {\n        xCoords.push(xCoords.slice(-1)[0]);\n      }\n    }\n\n    // if direction is horizontal\n    if (orientation === horizontalButton.getAttribute('id')) {\n      // push nextPlacementSize more same y coordinates into the yCoords array\n      for (let i = 0; i < nextPlacementSize - 1; i++) {\n        yCoords.push(yCoords.slice(-1)[0]);\n      }\n\n      // push nextPlacementSize more increasing x coordinates into the xCoords array\n      for (let i = 0; i < nextPlacementSize - 1; i++) {\n        let lastEntry = xCoords.slice(-1)[0];\n        xCoords.push(lastEntry + 1);\n      }\n    }\n\n    // create the new coordinates array\n    yCoords.forEach((element, index) => {\n      let temp = [];\n      temp.push(element);\n      temp.push(xCoords[index]);\n      newCoords.push(temp);\n    });\n    \n    return newCoords;\n  }\n\n  function renderStatuses(gameResponse) {\n    // clear the status areas\n    humanStatus.innerHTML = '';\n    computerStatus.innerHTML = '';\n\n    // display remaining ships\n    humanStatus.innerHTML = `Remaining ships: ${gameResponse.humanShipsRemaining}`;\n    computerStatus.innerHTML = `Remaining ships: ${gameResponse.computerShipsRemaining}`;\n  }\n\n  function renderHumanBoard(boardArr, shipCoordinates) {\n    // clear the board\n    humanBoard.innerHTML = '';\n\n    // display the human's board\n    boardArr.forEach((gridRow, rowIndex) => {\n      const row = document.createElement('div');\n      row.classList.add('grid-row');\n      gridRow.forEach((gridPoint, pointIndex) => {\n        const boardButton = document.createElement('div');\n        const boardButtonId = `h${rowIndex}${pointIndex}`;\n        boardButton.setAttribute('id', boardButtonId);\n        boardButton.classList.add('human-button');\n        boardButton.innerHTML = boardArr[rowIndex][pointIndex];\n        shipCoordinates.forEach((shipCoordinatesArray) => {\n          shipCoordinatesArray.forEach((shipCoordinate) => {\n            if (shipCoordinate[0] === rowIndex && shipCoordinate[1] === pointIndex) {\n              boardButton.classList.add('ship-present');\n            }\n          });\n        });\n        row.appendChild(boardButton);\n      });\n      humanBoard.appendChild(row);\n    });\n  }\n\n  function renderComputerBoard(boardArr) {\n    // clear the board\n    computerBoard.innerHTML = '';\n\n    // display the computer's board\n    boardArr.forEach((gridRow, rowIndex) => {\n      const row = document.createElement('div');\n      row.classList.add('grid-row');\n      gridRow.forEach((gridPoint, pointIndex) => {\n        const boardButton = document.createElement('div');\n        const boardButtonId = `c${rowIndex}${pointIndex}`;\n        boardButton.setAttribute('id', boardButtonId);\n        boardButton.classList.add('computer-button');\n        boardButton.innerHTML = boardArr[rowIndex][pointIndex];\n        row.appendChild(boardButton);\n      });\n      computerBoard.appendChild(row);\n    });\n  }\n\n  function renderWinner(winner) {\n    const winnerContainer = document.querySelector('#winner');\n    const winnerMessage = document.createElement('p');\n    winnerMessage.innerHTML = `${winner} is the winner!`;\n    winnerContainer.appendChild(winnerMessage);\n  }\n\n  function setNextPlacementSize(size) {\n    nextPlacementSize = size;\n  }\n\n  return { bindHumanGridButtonsForPlacement, bindComputerGridButtonsForAttack, renderHumanBoard, renderComputerBoard, renderStatuses, renderWinner, setNextPlacementSize }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Display);\n\n//# sourceURL=webpack:///./src/display.js?");

/***/ }),

/***/ "./src/game-controller.js":
/*!********************************!*\
  !*** ./src/game-controller.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst GameController = function(ComputerPlayer, HumanBoard, Display) {\n  if (!ComputerPlayer || !HumanBoard || !Display) {\n    throw('computer player, human board, and display objects must be provided');\n  }\n\n  if (!ComputerPlayer.getBoard) {\n    throw('computer player must respond to getBoard() method');\n  }\n\n  if (!HumanBoard.receiveAttack) {\n    throw('human board must respond to receiveAttack() method');\n  }\n\n  if (!Display.renderHumanBoard) {\n    throw('display must respond to renderHumanBoard() method');\n  }\n\n  const display = Display;\n  const computerPlayer = ComputerPlayer;\n  const humanBoard = HumanBoard;\n\n  function init() {\n    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);\n    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);\n    display.renderComputerBoard(computerPlayer.getBoard().print());\n    display.setNextPlacementSize(humanBoard.getNextPlacement());\n    display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);\n  }\n\n  function receivePlacement(coordinates) {\n    humanBoard.placeShip(coordinates);\n    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);\n    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);\n    display.setNextPlacementSize(humanBoard.getNextPlacement());\n    if (!humanBoard.areAllShipsPlaced()) {\n      display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);\n    }\n  }\n\n  function testPlacement(coordinates) {\n    console.log(\"testing coordinates: \" + coordinates);\n    return humanBoard.isValidPlacement(coordinates);\n  }\n\n  return { init, receivePlacement };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameController);\n\n//# sourceURL=webpack:///./src/game-controller.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst GameBoard = function(ShipFactory) {\n  try {\n    // verify shipFactory is valid\n    ShipFactory(3).hit();\n    ShipFactory(3).isSunk();\n  }\n  catch {\n    throw('a ship factory must be supplied as an argument');\n  }\n\n  const shipFactory = ShipFactory;\n  const gridLength = 10;\n  const gridHeight = 10;\n  let ships = [];\n  let misses = [];\n  let attacks = [];\n  let hits = [];\n  const remainingPlacements = [2, 3, 3, 4, 5];\n\n  function getShips() {\n    return ships;\n  }\n\n  function getMisses() {\n    return misses;\n  }\n\n  function placeShip(coordinates) {\n    if (!isValidPlacement(coordinates)) {\n      throw('invalid ship position');\n    }\n\n    // create the new ship entry\n    ships.push({\n      coordinates: coordinates,\n      ship: shipFactory(coordinates.length),\n    });\n\n    // pop the last entry off the remainingPlacements array\n    remainingPlacements.pop();\n  }\n\n  function isInLine(coordinates) {\n    let result = false;\n    let yCoordinates = coordinates.map(coordinate => coordinate[0]);\n    let xCoordinates = coordinates.map(coordinate => coordinate[1]);\n\n    // if y coordinates are increasing sequentially and x coordinates are the same, then the coordinates are in line\n    if (isIncreasing(yCoordinates)\n      && xCoordinates.every((element) => element === xCoordinates[0])) {\n      result = true;\n    }\n\n    // if y coordinates are decreasing sequentially and x coordinates are the same, then the coordinates are in line\n    if (isDecreasing(yCoordinates)\n      && xCoordinates.every((element) => element === xCoordinates[0])) {\n      result = true;\n    }\n\n    // if x coordinates are increasing sequentially and y coordinates are the same, then the coordinates are in line\n    if (isIncreasing(xCoordinates)\n      && yCoordinates.every((element) => element === yCoordinates[0])) {\n      result = true;\n    }\n\n    // if x coordinates are decreasing sequentially and y coordinates are the same, then the coordinates are in line\n    if (isDecreasing(xCoordinates)\n      && yCoordinates.every((element) => element === yCoordinates[0])) {\n      result = true;\n    }\n\n    return result;\n  }\n\n  function isIncreasing(array) {\n    // returns true if array elements are increasing\n    // for example, [0, 1, 2, 3] is an increasing array\n    let result = true;\n    let previous = array[0];\n\n    array.forEach((element, index) => {\n      if (index > 0) {\n        if (element !== previous + 1) {\n          result = false;\n        }\n        previous = element;\n      }\n    });\n\n    if (array.length <= 1) {\n      result = false;\n    }\n\n    return result;\n  }\n\n  function isDecreasing(array) {\n    // returns true if array elements are decreasing\n    // for example, [4, 3, 2, 1] is a decreasing array\n    let result = true;\n    let previous = array[0];\n\n    array.forEach((element, index) => {\n      if (index > 0) {\n        if (element !== previous - 1) {\n          result = false;\n        }\n        previous = element;\n      }\n    });\n\n    if (array.length <= 1) {\n      result = false;\n    }\n\n    return result;\n  }\n\n  function hasDuplicateCoordinates(coordinates) {\n    // return true if any coordinates are duplicated\n    let visitedCoordinates = [];\n    let result = false;\n\n    coordinates.forEach((coordinate) => {\n      visitedCoordinates.forEach((visitedCoordinate) => {\n        if (visitedCoordinate[0] === coordinate[0] && visitedCoordinate[1] === coordinate[1]) {\n          result = true;\n        }\n      });\n      visitedCoordinates.push(coordinate);\n    });\n\n    return result;\n  }\n\n  function hasBeenAttacked(coordinate) {\n    // returns true if the coordinate exists in the attacks array\n    let result = false;\n\n    attacks.forEach((attackCoordinate) => {\n      if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {\n        result = true;\n      }\n    });\n\n    return result;\n  }\n\n  function receiveAttack(attackCoordinate) {\n    // if there is a ship at the supplied coordinate, register a 'hit'\n    let attackedShip;\n    let attackedShipSection;\n\n    // throw an error if the attackCoordinate is not on the board or if the position has already been attacked\n    if (!isValidCoordinate(attackCoordinate) || hasBeenAttacked(attackCoordinate)) {\n      throw('invalid attack coordinate');\n    }\n\n    // record the attack location\n    attacks.push(attackCoordinate.slice(0));\n\n    // loop through all the ships and see if any ship coordinates match the attack coordinate\n    // if a coordinate match is found, record the ship and which section of the ship got hit\n    // and add the coordinate to the hits array\n    ships.forEach((shipEntry) => {\n      let shipSection = 0;\n\n      shipEntry.coordinates.forEach((coordinate) => {\n        if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {\n          attackedShip = shipEntry.ship;\n          attackedShipSection = shipSection;\n          hits.push(attackCoordinate.slice(0));\n        }\n        shipSection += 1;\n      });\n    });\n\n    // if the attack hit a ship, call the ship.hit() method to record the damage\n    // if the attack didn't hit a ship, record the attack as a miss\n    if (attackedShip) {\n      attackedShip.hit(attackedShipSection);\n    } else {\n      misses.push(attackCoordinate.slice(0));\n    }\n  }\n\n  function isCoordinateAvailable(coordinate) {\n    // returns true if the coordinate is not already occupied by a ship\n    const occupiedCoordinates = [];\n    let result = true;\n\n    ships.forEach((ship) => {\n      ship.coordinates.forEach((coordinate) => {\n        occupiedCoordinates.push(coordinate.slice(0));\n      });\n    });\n\n    for (let i = 0; i < occupiedCoordinates.length; i++) {\n      if (occupiedCoordinates[i][0] === coordinate[0] && occupiedCoordinates[i][1] === coordinate[1]) {\n        result = false;\n      }\n    }\n\n    return result;\n  }\n\n  function allSunk() {\n    // return true if ship.isSunk() returns true for each ship\n    let result = [];\n\n    ships.forEach((shipEntry) => {\n      let ship = shipEntry.ship;\n\n      if (ship.isSunk()) {\n        result.push(true);\n      } else {\n        result.push(false);\n      }\n    });\n\n    if (result.every((item) => item === true)) {\n      return true;\n    }\n    return false;\n  }\n\n  function getAttacks() {\n    return attacks;\n  }\n\n  function getSize() {\n    return [gridLength, gridHeight];\n  }\n\n  function getHits() {\n    return hits;\n  }\n\n  function isValidCoordinate(coordinate) {\n    // returns true if coordinate exists on the board\n    let validXCoordinate;\n    let validYCoordinate;\n\n    if(coordinate[0] >= 0 && coordinate[0] <= gridLength - 1) {\n      validYCoordinate = true;\n    }\n\n    if(coordinate[1] >= 0 && coordinate[1] <= gridHeight - 1) {\n      validXCoordinate = true;\n    }\n\n    if (validYCoordinate && validXCoordinate) {\n      return true;\n    }\n\n    return false;\n  }\n\n  function print() {\n    // return a matrix of characters representing the board\n    // '' is an unattacked position\n    // 'x' is an attacked position that scored a hit\n    // 'o' is an attacked position that was a miss\n    // sunk ships have an 'X' for each ship section\n    let printedBoard = Array(gridLength).fill([]);\n    printedBoard = printedBoard.map(element => Array(gridHeight).fill(''));\n    \n    // draw hits\n    attacks.forEach(attackCoordinate => {\n      let y = attackCoordinate[0];\n      let x = attackCoordinate[1];\n      printedBoard[y][x] = 'x';\n    });\n\n    // draw misses\n    misses.forEach(missCoordinate => {\n      let y = missCoordinate[0];\n      let x = missCoordinate[1];\n      printedBoard[y][x] = 'o';\n    });\n\n    // draw sunken ships\n    ships.forEach(shipEntry => {\n      if (shipEntry.ship.isSunk()) {\n        shipEntry.coordinates.forEach((coordinate) => {\n          printedBoard[coordinate[0]][coordinate[1]] = 'X';\n        });\n      }\n    });\n\n    return printedBoard;\n  }\n\n  function clear() {\n    ships = [];\n    misses = [];\n    hits = [];\n    attacks = [];\n  }\n\n  function getRemainingShips() {\n    let remainingShips = 0;\n    ships.forEach((shipEntry) => {\n      if (!shipEntry.ship.isSunk()) {\n        remainingShips += 1;\n      }\n    });\n    return remainingShips;\n  }\n\n  function areAllShipsPlaced() {\n    if (remainingPlacements.length > 0) {\n      return false;\n    }\n\n    return true;\n  }\n\n  function isValidPlacement(coordinates) {\n    let result = true;;\n\n    // return false if any coordinates don't exist on the board\n    coordinates.forEach((coordinate) => {\n      let yCoordinate = coordinate[0];\n      let xCoordinate = coordinate[1];\n\n      if (yCoordinate > gridHeight - 1 || yCoordinate < 0 || xCoordinate > gridLength - 1) {\n        result = false;\n      }\n    });\n\n    // return false if any coordinates overlap with an existing ship\n    coordinates.forEach((coordinate) => {\n      let yCoordinate = coordinate[0];\n      let xCoordinate = coordinate[1];\n\n      ships.forEach((shipEntry) => {\n        shipEntry.coordinates.forEach((occupiedCoordinate) => {\n          let occupiedYCoordinate = occupiedCoordinate[0];\n          let occupiedXCoordinate = occupiedCoordinate[1];\n\n          if (occupiedYCoordinate === yCoordinate && occupiedXCoordinate === xCoordinate) {\n            result = false;\n          }\n        });\n      });\n    });\n\n    // return false if coordinates are repeated\n    if (hasDuplicateCoordinates(coordinates)) {\n      result = false;\n    }\n\n    // return false if coordinates are not in a straight line\n    if (!isInLine(coordinates)) {\n      result = false;\n    }\n\n    // return false if length of coordinates array doesnt match the last entry in the remainingPlacements array\n    if (coordinates.length !== getNextPlacement()) {\n      result = false;\n    }\n\n    return result;\n  }\n\n  function getNextPlacement() {\n    return remainingPlacements[remainingPlacements.length - 1];\n  }\n\n  return { getShips, getMisses, getAttacks, getHits, getSize, getRemainingShips, placeShip, receiveAttack, allSunk, print, clear, areAllShipsPlaced, getNextPlacement, isValidPlacement }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack:///./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _computer_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer-player */ \"./src/computer-player.js\");\n/* harmony import */ var _game_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game-controller */ \"./src/game-controller.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n\n\n\n\n\n\nconst ship = _ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\nconst computerBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ship);\nconst computerPlayer = (0,_computer_player__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(computerBoard);\nconst humanBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ship);\nconst display = (0,_display__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\nconst gameController = (0,_game_controller__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(computerPlayer, humanBoard, display);\n\ngameController.init();\n\n//# sourceURL=webpack:///./src/index.js?");

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