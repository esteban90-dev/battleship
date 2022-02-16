const HumanPlayer = function(gameboard) {
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

  function getBoard() {
    return board;
  }

  return { getBoard }
}

export default HumanPlayer;