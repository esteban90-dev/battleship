const GameController = function(ComputerPlayer, HumanBoard, Display) {
  if (!ComputerPlayer || !HumanBoard || !Display) {
    throw('computer player, human board, and display objects must be provided');
  }

  if (!ComputerPlayer.getBoard) {
    throw('computer player must respond to getBoard() method');
  }

  if (!HumanBoard.receiveAttack) {
    throw('human board must respond to receiveAttack() method');
  }

  if (!Display.renderHumanBoard) {
    throw('display must respond to renderHumanBoard() method');
  }

  const display = Display;
  const computerPlayer = ComputerPlayer;
  const humanBoard = HumanBoard;
  const computerBoard = computerPlayer.getBoard();

  function init() {
    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
    display.setNextPlacementSize(humanBoard.getNextPlacement());
    display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);
    display.renderRemainingPlacements();
  }

  function receivePlacement(coordinates) {
    humanBoard.placeShip(coordinates);
    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.setNextPlacementSize(humanBoard.getNextPlacement());
    display.renderRemainingPlacements();
    if (humanBoard.areAllShipsPlaced()) {
      placeComputerShips();
      display.bindComputerGridButtonsForAttack(receiveAttack);
      display.renderHumanAttackPrompt();
      display.renderHumanShipsRemaining(humanBoard.getRemainingShips());
      display.renderComputerShipsRemaining(computerBoard.getRemainingShips());
    }
    else {
      display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);
    }
  }

  function placeComputerShips() {
    computerBoard.placeShip([[5, 1], [6, 1], [7, 1], [8, 1], [9, 1]]);
    computerBoard.placeShip([[1, 7], [2, 7], [3, 7], [4, 7]]);
    computerBoard.placeShip([[0, 3], [1, 3], [2, 3]]);
    computerBoard.placeShip([[7, 5], [8, 5], [9, 5]]);
    computerBoard.placeShip([[7, 8], [7, 9]]);
  }

  function receiveAttack(coordinates) {
    const computerGuess = computerPlayer.attack(humanBoard.print(), display.getDifficulty());
    const humanShipCoordinates = humanBoard.getShips().map((shipEntry) => shipEntry.coordinates);

    computerBoard.receiveAttack(coordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
    display.renderComputerShipsRemaining(computerBoard.getRemainingShips());
    // if the computer board ships are sunk, announce the human as the winner,
    // otherwise let the computer guess again
    if (computerBoard.allSunk()) {
      display.renderHumanWinner();
    }
    else {
      display.renderComputerAttackPrompt();
      // add 2 second delay to simulate the computer thinking
      sleep(1000).then(() => {
        humanBoard.receiveAttack(computerGuess);
        display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
        display.renderHumanShipsRemaining(humanBoard.getRemainingShips());
        // if human board ships are sunk, announce the computer as winner,
        // otherwise prompt the human to attack again
        if (humanBoard.allSunk()) {
          display.renderComputerWinner();
        }
        else {
          display.bindComputerGridButtonsForAttack(receiveAttack);
          display.renderHumanAttackPrompt();
        }
      });
    }
    
  }

  function testPlacement(coordinates) {
    return humanBoard.isValidPlacement(coordinates);
  }

  async function sleep(ms) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => { resolve('complete') }, ms)
    });
  }

  return { init, receivePlacement };
}

export default GameController;