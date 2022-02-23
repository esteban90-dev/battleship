const Display = function() {
  const startButton = document.querySelector('#start');
  const humanBoard = document.querySelector('#humanBoard');
  const computerBoard = document.querySelector('#computerBoard');
  const humanStatus = document.querySelector('#humanStatus');
  const computerStatus = document.querySelector('#computerStatus');

  function bindStartButton(handler) {
    startButton.addEventListener('click', handler);
  }

  function bindAttackButtons(handler) {
    const computerBoardButtons = document.querySelectorAll('.computer-button');
    computerBoardButtons.forEach((button) => {
      button.addEventListener('click', handler);
    });
  }

  function renderStatuses(gameResponse) {
    // clear the status areas
    humanStatus.innerHTML = '';
    computerStatus.innerHTML = '';

    // display remaining ships
    humanStatus.innerHTML = `Remaining ships: ${gameResponse.humanShipsRemaining}`;
    computerStatus.innerHTML = `Remaining ships: ${gameResponse.computerShipsRemaining}`;
  }

  function renderBoards(gameResponse) {
    // clear the boards 
    humanBoard.innerHTML = '';
    computerBoard.innerHTML = '';

    // display the human's board
    gameResponse.humanBoard.forEach((gridRow, rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('grid-row');
      gridRow.forEach((gridPoint, pointIndex) => {
        const boardButton = document.createElement('div');
        const boardButtonId = `h${rowIndex}${pointIndex}`;
        boardButton.setAttribute('id', boardButtonId);
        boardButton.classList.add('human-button');
        boardButton.innerHTML = gameResponse.humanBoard[rowIndex][pointIndex];
        gameResponse.humanShipCoordinates.forEach((shipCoordinatesArray) => {
          shipCoordinatesArray.forEach((shipCoordinate) => {
            if (shipCoordinate[0] === rowIndex && shipCoordinate[1] === pointIndex) {
              boardButton.classList.add('ship-present');
            }
          });
        });
        row.appendChild(boardButton);
      });
      humanBoard.appendChild(row);
    });

    // display the computer's board
    gameResponse.computerBoard.forEach((gridRow, rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('grid-row');
      gridRow.forEach((gridPoint, pointIndex) => {
        const boardButton = document.createElement('div');
        const boardButtonId = `c${rowIndex}${pointIndex}`;
        boardButton.setAttribute('id', boardButtonId);
        boardButton.classList.add('computer-button');
        boardButton.innerHTML = gameResponse.computerBoard[rowIndex][pointIndex];
        row.appendChild(boardButton);
      });
      computerBoard.appendChild(row);
    });
  }

  function renderWinner(winner) {
    const winnerContainer = document.querySelector('#winner');
    const winnerMessage = document.createElement('p');
    winnerMessage.innerHTML = `${winner} is the winner!`;
    winnerContainer.appendChild(winnerMessage);
  }

  return { bindStartButton, bindAttackButtons, renderBoards, renderStatuses, renderWinner }
}

export default Display;