const GameBoard = function(ShipFactory) {
  try {
    // verify shipFactory is valid
    ShipFactory(3).hit();
    ShipFactory(3).isSunk();
  }
  catch {
    throw('a ship factory must be supplied as an argument');
  }

  const gridLength = 10;
  const gridHeight = 10;
  const ships = [];
  const misses = [];
  const attacks = [];
  const shipFactory = ShipFactory;

  function getShips() {
    return ships;
  }

  function getMisses() {
    return misses;
  }

  function placeShip(startCoordinate, shipLength, direction) {
    const coordinates = [];
    let currentCoordinate;
    let i = 0;

    currentCoordinate = startCoordinate;

    // throw an error if the direction argument is incorrect
    if (direction !== 0 && direction !== 1) {
      throw('invalid ship direction');
    }

    // if direction is 0, determine remaining coordinates in the +x direction
    if (direction === 0) {
      while (i < shipLength) {
        coordinates.push(currentCoordinate.slice(0));
        currentCoordinate[0] += 1;
        i += 1;
      }
    }

    // if direction is 1, determine remaining coordinates in the +y direction
    if (direction === 1) {
      while (i < shipLength) {
        coordinates.push(currentCoordinate.slice(0));
        currentCoordinate[1] += 1;
        i += 1;
      }
    }

    // throw an error if any coordindates are not on the board or if any coordinates are unavailable
    if (!coordinates.every(isValidCoordinate) || !coordinates.every(isCoordinateAvailable)) {
      throw('invalid ship position');
    }

    // create the new ship entry
    ships.push({
      coordinates: coordinates,
      ship: shipFactory(shipLength),
    });
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
    ships.forEach((shipEntry) => {
      let shipSection = 0;

      shipEntry.coordinates.forEach((coordinate) => {
        if (attackCoordinate[0] === coordinate[0] && attackCoordinate[1] === coordinate[1]) {
          attackedShip = shipEntry.ship;
          attackedShipSection = shipSection;
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

  function isValidCoordinate(coordinate) {
    // returns true if coordinate exists on the board
    let validXCoordinate;
    let validYCoordinate;

    if(coordinate[0] >= 0 && coordinate[0] <= gridLength) {
      validXCoordinate = true;
    }

    if(coordinate[1] >= 0 && coordinate[1] <= gridHeight) {
      validYCoordinate = true;
    }

    if (validXCoordinate && validYCoordinate) {
      return true;
    }

    return false;
  }

  return { getShips, getMisses, getAttacks, getSize, placeShip, receiveAttack, allSunk }
}

export default GameBoard;