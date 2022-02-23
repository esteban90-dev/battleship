const DisplayController = function(Game, Display) {
  const game = Game;
  const display = Display;

  // bind the display's start button to the start method
  display.bindStartButton(start);

  function start() {
    const response = game.initialize();

    display.renderHumanBoard(response.humanBoard, response.humanShipCoordinates);
    display.renderComputerBoard(response.computerBoard);

    // bind computer board buttons to the attack method
    display.bindAttackButtons(attack);
  }

  function attack(event) {
    const id = event.target.getAttribute('id');
    const coordinate = [parseInt(id.slice(1)[0]), parseInt(id.slice(1)[1])];
    const response = game.turn(coordinate);

    display.renderStatuses(response);
    display.renderHumanBoard(response.humanBoard, response.humanShipCoordinates);
    display.renderComputerBoard(response.computerBoard);
    
    if (response.winner) {
      display.renderWinner(response.winner);
    }

    // bind computer board buttons to the attack method unless there is a winner
    if (!response.winner) {
      display.bindAttackButtons(attack);
    }
  }
}

export default DisplayController;