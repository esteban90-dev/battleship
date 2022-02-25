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

  display.bindForm(receivePlacement);

  function init() {
    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
  }

  function receivePlacement(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const coordinates = JSON.parse(formData.get('coordinates'));

    humanBoard.placeShip(coordinates);
    const humanShipCoordinates = humanBoard.getShips().map(entry => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
  }

  return { init, receivePlacement };
}

export default GameController;