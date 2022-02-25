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

  function init() {
    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
    display.setNextPlacementSize(humanBoard.getNextPlacement());
    display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);
  }

  function receivePlacement(coordinates) {
    humanBoard.placeShip(coordinates);
    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.setNextPlacementSize(humanBoard.getNextPlacement());
    if (!humanBoard.areAllShipsPlaced()) {
      display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);
    }
  }

  function testPlacement(coordinates) {
    console.log("testing coordinates: " + coordinates);
    return humanBoard.isValidPlacement(coordinates);
  }

  return { init, receivePlacement };
}

export default GameController;