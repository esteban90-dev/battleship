const Display = function() {
  const startButton = document.querySelector('#start');
  const humanBoard = document.querySelector('#humanBoard');
  const computerBoard = document.querySelector('#computerBoard');

  function handleStart(handler) {
    startButton.addEventListener('click', handler);
  }

  function render(gameResponse) {
    // display the human's board
    gameResponse.humanBoard.forEach((gridRow, rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('grid-row');
      gridRow.forEach((gridPoint, pointIndex) => {
        const boardButton = document.createElement('button');
        const boardButtonId = `${rowIndex}${pointIndex}`;
        boardButton.setAttribute('id', boardButtonId);
        boardButton.setAttribute('disabled', true);
        boardButton.classList.add('human-button');
        boardButton.innerHTML = ' ';
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
        const boardButton = document.createElement('button');
        const boardButtonId = `${rowIndex}${pointIndex}`;
        boardButton.setAttribute('id', boardButtonId);
        boardButton.classList.add('computer-button');
        boardButton.innerHTML = ' ';
        row.appendChild(boardButton);
      });
      computerBoard.appendChild(row);
    });
  }

  return { handleStart, render }
}

export default Display;