const DisplayController = function(Game, Display) {
  const game = Game;
  const display = Display;

  function handleStart() {
    const response = game.initialize();

    display.render(response);
  }

  function handleAttack(coordinate) {
    const response = game.turn(coordinate);

    display.render(response);
  }

  return { handleStart, handleAttack }
}

export default DisplayController;