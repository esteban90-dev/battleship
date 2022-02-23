const GameController = function(computerPlayer, humanBoard, display) {
  if (!computerPlayer || !humanBoard || !display) {
    throw('computer player, human board, and display objects must be provided');
  }

  if (!computerPlayer.getBoard) {
    throw('computer player must respond to getBoard() method');
  }

  if (!humanBoard.receiveAttack) {
    throw('human board must respond to receiveAttack() method');
  }

  if (!display.renderHumanBoard) {
    throw('display must respond to renderHumanBoard() method');
  }
}

export default GameController;