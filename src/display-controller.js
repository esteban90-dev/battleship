const DisplayController = function(Game, Display) {
  const game = Game;
  const display = Display;

  // bind the display's start button to the start method
  display.handleStart(start);

  function start() {
    const response = game.turn([0, 0]);

    console.log(response);
    // display.render(response);
  }

  function attack(coordinate) {
    const response = game.turn(coordinate);

    display.render(response);
  }
}

export default DisplayController;