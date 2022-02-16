const ComputerPlayer = function(gameboard) {
  if (!gameboard) {
    throw('a gameboard object must be supplied as an argument');
  }

  if (!gameboard.receiveAttack) {
    throw('the gameboard argument must respond to the recieveAttack() method');
  }

  if (!gameboard.placeShip) {
    throw('the gameboard argument must respond to the placeShip() method');
  }

  if (!gameboard.allSunk) {
    throw('the gameboard argument must respond to the allSunk() method');
  }

  const board = gameboard;

  function attack() {
    // returns random coordinate from the board that hasn't been attacked yet
    const boardLength = board.getSize()[0];
    const boardHeight = board.getSize()[1];
    let isValid = false;
    let randomCoordinate = [];

    while (!isValid) {
      // keep looking for random coordinates until one is found that has not been attacked yet
      randomCoordinate = [random(0, boardLength), random(0, boardHeight)];
      if (!hasBeenAttacked(randomCoordinate)) {
        isValid = true;
      }
    }
    return randomCoordinate;
  }

  function hasBeenAttacked(coordinate) {
    const attacks = board.getAttacks();
    let result = false;

    attacks.forEach((attackCoordinate) => {
      if (coordinate[0] === attackCoordinate[0] && coordinate[1] === attackCoordinate[1]) {
        result = true;
      }
    });

    return result;
  }

  function random(startNumber, endNumber) {
    return parseInt(Math.random() * endNumber) + startNumber;
  }

  return { attack }
}

export default ComputerPlayer;