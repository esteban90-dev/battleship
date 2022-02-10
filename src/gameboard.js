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
  const shipFactory = ShipFactory;

  function getShips() {
    return ships;
  }

  function placeShip(startCoordinate, shipLength, direction) {
    const coordinates = [];
    let currentCoordinate;
    let i = 0;

    currentCoordinate = startCoordinate

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

  return { getShips, placeShip }
}

export default GameBoard;