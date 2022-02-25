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
    const computerGuess = computerPlayer.attack(); 
    const humanShipCoordinates = humanBoard.getShips().map((shipEntry) => shipEntry.coordinates);

    computerBoard.receiveAttack(coordinates);
    humanBoard.receiveAttack(computerGuess);

    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
    display.bindComputerGridButtonsForAttack(receiveAttack);
  }

  function testPlacement(coordinates) {
    return humanBoard.isValidPlacement(coordinates);
  }

  return { init, receivePlacement };
}

export default GameController;