const Game = function(humanPlayer, computerPlayer) {
  if (!humanPlayer || !computerPlayer) {
    throw('a human player object and a computer player object must be supplied as arguments');
  }

  if (!humanPlayer.getBoard) {
    throw('the human player object must respond to the getBoard() method');
  }

  if (!computerPlayer.getBoard) {
    throw('the computer player object must respond to the getBoard() method');
  }

  if (!computerPlayer.attack) {
    throw('the computer player object must respond to the attack() method');
  }

  const computer = computerPlayer;
  const human = humanPlayer;
  const computerBoard = computer.getBoard();
  const humanBoard = human.getBoard();

  function initialize() {
    // place ships on the computer player's board
    computerBoard.placeShip([0, 0], 5, 0);
    computerBoard.placeShip([0, 9], 4, 0);
    computerBoard.placeShip([2, 2], 3, 1);
    computerBoard.placeShip([9, 7], 3, 1);
    computerBoard.placeShip([10, 5], 2, 1);

    // place ships on the human player's board
    humanBoard.placeShip([1, 0], 5, 1);
    humanBoard.placeShip([5, 0], 4, 1);
    humanBoard.placeShip([0, 10], 3, 0);
    humanBoard.placeShip([7, 7], 3, 0);
    humanBoard.placeShip([10, 5], 2, 1);
  }

  return { initialize }

}

export default Game;