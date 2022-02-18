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
    const response = {};

    // clear both boards
    computerBoard.clear();
    humanBoard.clear();

    // place ships on the computer player's board
    computerBoard.placeShip([0, 0], 5, 0);
    computerBoard.placeShip([0, 9], 4, 0);
    computerBoard.placeShip([2, 2], 3, 1);
    computerBoard.placeShip([8, 7], 3, 1);
    computerBoard.placeShip([9, 5], 2, 1);

    // place ships on the human player's board
    humanBoard.placeShip([1, 0], 5, 1);
    humanBoard.placeShip([5, 0], 4, 1);
    humanBoard.placeShip([0, 9], 3, 0);
    humanBoard.placeShip([7, 7], 3, 0);
    humanBoard.placeShip([9, 5], 2, 1);

    // build the response object
    response.humanShipCoordinates = humanBoard.getShips().map(element => element.coordinates);
    response.computerShipCoordinates = computerBoard.getShips().map(element => element.coordinates);

    return response;
  }

  function turn(humanAttackCoordinates) {
    const response = {};

    // send the human's attack to the computer's board
    computerBoard.receiveAttack(humanAttackCoordinates);

    // send the computer's attack to the human's board
    humanBoard.receiveAttack(computer.attack());

    // build the response object
    response.humanBoard = humanBoard.print();
    response.computerBoard = computerBoard.print();

    if (humanBoard.allSunk()) {
      response.winner = 'computer';
    }
    else if (computerBoard.allSunk()) {
      response.winner = 'human';
    }
    else {
      response.winner = null;
    }

    return response;
  }

  return { initialize, turn }

}

export default Game;