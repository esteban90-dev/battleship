const GameBoard = function(shipFactory) {
  try {
    // verify shipFactory is valid
    shipFactory(3).hit();
    shipFactory(3).isSunk();
  }
  catch {
    throw('a ship factory must be supplied as an argument');
  }
}

export default GameBoard;