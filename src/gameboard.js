const GameBoard = function(ShipFactory) {
  try {
    // verify shipFactory is valid
    ShipFactory(3).hit();
    ShipFactory(3).isSunk();
  }
  catch {
    throw('a ship factory must be supplied as an argument');
  }

  const shipFactory = ShipFactory;
  const gridLength = 10;
  const gridHeight = 10;
  let ships = [];
  let misses = [];
  let attacks = [];
  let hits = [];
  const remainingPlacements = [2, 3, 3, 4, 5];

  function getShips() {
    return ships;
  }

  function getMisses() {
    return misses;
  }

  function placeShip(coordinates) {
    // throw error if any coordinates don't exist on the board
    coordinates.forEach((coordinate) => {
      let yCoordinate = coordinate[0];
      let xCoordinate = coordinate[1];

      if (yCoordinate > gridHeight - 1 || yCoordinate < 0 || xCoordinate > gridLength - 1) {
        throw('invalid ship position');
      }
    });

    // throw error if any coordinates overlap with an existing ship
    coordinates.forEach((coordinate) => {
      let yCoordinate = coordinate[0];
      let xCoordinate = coordinate[1];

      ships.forEach((shipEntry) => {
        shipEntry.coordinates.forEach((occupiedCoordinate) => {
          let occupiedYCoordinate = occupiedCoordinate[0];
          let occupiedXCoordinate = occupiedCoordinate[1];

          if (occupiedYCoordinate === yCoordinate && occupiedXCoordinate === xCoordinate) {
            throw('invalid ship position');
          }
        });
      });
    });

    // throw error if coordinates are repeated
    if (hasDuplicateCoordinates(coordinates)) {
      throw('invalid ship position');
    }

    // throw error if coordinates are not in a straight line
    if (!isInLine(coordinates)) {
      throw('invalid ship position');
    }

    // create the new ship entry
    ships.push({
      coordinates: coordinates,
      ship: shipFactory(coordinates.length),
    });
  }

  function isInLine(coordinates) {
    let result = false;
    let yCoordinates = coordinates.map(coordinate => coordinate[0]);
    let xCoordinates = coordinates.map(coordinate => coordinate[1]);

    // if y coordinates are increasing sequentially and x coordinates are the same, then the coordinates are in line
    if (isIncreasing(yCoordinates)
      && xCoordinates.every((element) => element === xCoordinates[0])) {
      result = true;
    }

    // if y coordinates are decreasing sequentially and x coordinates are the same, then the coordinates are in line
    if (isDecreasing(yCoordinates)
      && xCoordinates.every((element) => element === xCoordinates[0])) {
      result = true;
    }

    // if x coordinates are increasing sequentially and y coordinates are the same, then the coordinates are in line
    if (isIncreasing(xCoordinates)
      && yCoordinates.every((element) => element === yCoordinates[0])) {
      result = true;
    }

    // if x coordinates are decreasing sequentially and y coordinates are the same, then the coordinates are in line
    if (isDecreasing(xCoordinates)
      && yCoordinates.every((element) => element === yCoordinates[0])) {
      result = true;
    }

    return result;
  }

  function isIncreasing(array) {
    // returns true if array elements are increasing
    // for example, [0, 1, 2, 3] is an increasing array
    let result = true;
    let previous = array[0];

    array.forEach((element, index) => {
      if (index > 0) {
        if (element !== previous + 1) {
          result = false;
        }
        previous = element;
      }
    });

    if (array.length <= 1) {
      result = false;
    }

    return result;
  }

  function isDecreasing(array) {
    // returns true if array elements are decreasing
    // for example, [4, 3, 2, 1] is a decreasing array
    let result = true;
    let previous = array[0];

    array.forEach((element, index) => {
      if (index > 0) {
        if (element !== previous - 1) {
          result = false;
        }
        previous = element;
      }
    });

    if (array.length <= 1) {
      result = false;
    }

    return result;
  }

  function hasDuplicateCoordinates(coordinates) {
    // return true if any coordinates are duplicated
    let visitedCoordinates = [];
    let result = false;

    coordinates.forEach((coordinate) => {
      visitedCoordinates.forEach((visitedCoordinate) => {
        if (visitedCoordinate[0] === coordinate[0] && visitedCoordinate[1] === coordinate[1]) {
          result = true;
        }
      });
      visitedCoordinates.push(coordinate);
    });

    return result;
  }

  function hasBeenAttacked(coordinate) {
    // returns true if the coordinate exists in the attacks array
    let result = false;

    attacks.forEach((attackCoordinate) => {
      if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {
        result = true;
      }
    });

    return result;
  }

  function receiveAttack(attackCoordinate) {
    // if there is a ship at the supplied coordinate, register a 'hit'
    let attackedShip;
    let attackedShipSection;

    // throw an error if the attackCoordinate is not on the board or if the position has already been attacked
    if (!isValidCoordinate(attackCoordinate) || hasBeenAttacked(attackCoordinate)) {
      throw('invalid attack coordinate');
    }

    // record the attack location
    attacks.push(attackCoordinate.slice(0));

    // loop through all the ships and see if any ship coordinates match the attack coordinate
    // if a coordinate match is found, record the ship and which section of the ship got hit
    // and add the coordinate to the hits array
    ships.forEach((shipEntry) => {
      let shipSection = 0;

      shipEntry.coordinates.forEach((coordinate) => {
        if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {
          attackedShip = shipEntry.ship;
          attackedShipSection = shipSection;
          hits.push(attackCoordinate.slice(0));
        }
        shipSection += 1;
      });
    });

    // if the attack hit a ship, call the ship.hit() method to record the damage
    // if the attack didn't hit a ship, record the attack as a miss
    if (attackedShip) {
      attackedShip.hit(attackedShipSection);
    } else {
      misses.push(attackCoordinate.slice(0));
    }
  }

  function isCoordinateAvailable(coordinate) {
    // returns true if the coordinate is not already occupied by a ship
    const occupiedCoordinates = [];
    let result = true;

    ships.forEach((ship) => {
      ship.coordinates.forEach((coordinate) => {
        occupiedCoordinates.push(coordinate.slice(0));
      });
    });

    for (let i = 0; i < occupiedCoordinates.length; i++) {
      if (occupiedCoordinates[i][0] === coordinate[0] && occupiedCoordinates[i][1] === coordinate[1]) {
        result = false;
      }
    }

    return result;
  }

  function allSunk() {
    // return true if ship.isSunk() returns true for each ship
    let result = [];

    ships.forEach((shipEntry) => {
      let ship = shipEntry.ship;

      if (ship.isSunk()) {
        result.push(true);
      } else {
        result.push(false);
      }
    });

    if (result.every((item) => item === true)) {
      return true;
    }
    return false;
  }

  function getAttacks() {
    return attacks;
  }

  function getSize() {
    return [gridLength, gridHeight];
  }

  function getHits() {
    return hits;
  }

  function isValidCoordinate(coordinate) {
    // returns true if coordinate exists on the board
    let validXCoordinate;
    let validYCoordinate;

    if(coordinate[0] >= 0 && coordinate[0] <= gridLength - 1) {
      validYCoordinate = true;
    }

    if(coordinate[1] >= 0 && coordinate[1] <= gridHeight - 1) {
      validXCoordinate = true;
    }

    if (validYCoordinate && validXCoordinate) {
      return true;
    }

    return false;
  }

  function print() {
    // return a matrix of characters representing the board
    // '' is an unattacked position
    // 'x' is an attacked position that scored a hit
    // 'o' is an attacked position that was a miss
    // sunk ships have an 'X' for each ship section
    let printedBoard = Array(gridLength).fill([]);
    printedBoard = printedBoard.map(element => Array(gridHeight).fill(''));
    
    // draw hits
    attacks.forEach(attackCoordinate => {
      let y = attackCoordinate[0];
      let x = attackCoordinate[1];
      printedBoard[y][x] = 'x';
    });

    // draw misses
    misses.forEach(missCoordinate => {
      let y = missCoordinate[0];
      let x = missCoordinate[1];
      printedBoard[y][x] = 'o';
    });

    // draw sunken ships
    ships.forEach(shipEntry => {
      if (shipEntry.ship.isSunk()) {
        shipEntry.coordinates.forEach((coordinate) => {
          printedBoard[coordinate[0]][coordinate[1]] = 'X';
        });
      }
    });

    return printedBoard;
  }

  function clear() {
    ships = [];
    misses = [];
    hits = [];
    attacks = [];
  }

  function getRemainingShips() {
    let remainingShips = 0;
    ships.forEach((shipEntry) => {
      if (!shipEntry.ship.isSunk()) {
        remainingShips += 1;
      }
    });
    return remainingShips;
  }

  function areAllShipsPlaced() {
    if (remainingPlacements.length > 0) {
      return false;
    }

    return true;
  }

  return { getShips, getMisses, getAttacks, getHits, getSize, getRemainingShips, placeShip, receiveAttack, allSunk, print, clear, areAllShipsPlaced }
}

export default GameBoard;