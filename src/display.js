const Display = function() {
  const humanBoard = document.querySelector('#humanBoard');
  const computerBoard = document.querySelector('#computerBoard');
  const humanStatus = document.querySelector('#humanStatus');
  const computerStatus = document.querySelector('#computerStatus');
  const gameSetupContainer = document.querySelector('#gameSetup');
  const easyButton = document.querySelector('#easy');
  const hardButton = document.querySelector('#hard');
  let nextPlacementSize;
  let difficulty;

  if (hardButton.checked) {
    difficulty = 1;
  }

  if (easyButton.checked) {
    difficulty = 0;
  }

  easyButton.addEventListener('click', () => {
    if (easyButton.checked) {
      difficulty = 0;
    }
  });

  hardButton.addEventListener('click', () => {
    if (hardButton.checked) {
      difficulty = 1;
    }
  });

  function addRemainingCoordinates(coordinate) {
    const verticalButton = document.querySelector('#vertical');
    const horizontalButton = document.querySelector('#horizontal');
    const yCoords = [];
    const xCoords = [];
    const newCoords = [];

    // push the intial coordinates into the arrays
    yCoords.push(coordinate[0]);
    xCoords.push(coordinate[1]);

    // if direction is vertical
    if (verticalButton.checked) {
      // push nextPlacementSize more increasing y coordinates into the yCoords array
      for (let i = 0; i < nextPlacementSize - 1; i += 1) {
        const lastEntry = yCoords.slice(-1)[0];
        yCoords.push(lastEntry + 1);
      }

      // push nextPlacementSize more same x coordinates into the xCoords array
      for (let i = 0; i < nextPlacementSize - 1; i += 1) {
        xCoords.push(xCoords.slice(-1)[0]);
      }
    }

    // if direction is horizontal
    if (horizontalButton.checked) {
      // push nextPlacementSize more same y coordinates into the yCoords array
      for (let i = 0; i < nextPlacementSize - 1; i += 1) {
        yCoords.push(yCoords.slice(-1)[0]);
      }

      // push nextPlacementSize more increasing x coordinates into the xCoords array
      for (let i = 0; i < nextPlacementSize - 1; i += 1) {
        const lastEntry = xCoords.slice(-1)[0];
        xCoords.push(lastEntry + 1);
      }
    }

    // create the new coordinates array
    yCoords.forEach((element, index) => {
      const temp = [];
      temp.push(element);
      temp.push(xCoords[index]);
      newCoords.push(temp);
    });

    return newCoords;
  }

  function highlightGreen(ids) {
    const humanGridButtons = document.querySelectorAll('.human-button');

    // clear any red highlights on the board
    humanGridButtons.forEach((button) => {
      if (button.classList.contains('highlight-red')) {
        button.classList.toggle('highlight-red');
      }
    });

    // highlight matching buttons green
    humanGridButtons.forEach((button) => {
      if (ids.includes(button.getAttribute('id'))) {
        if (!button.classList.contains('highlight-green')) {
          button.classList.toggle('highlight-green');
        }
      } else if (button.classList.contains('highlight-green')) {
        button.classList.toggle('highlight-green');
      }
    });
  }

  function highlightRed(ids) {
    const humanGridButtons = document.querySelectorAll('.human-button');

    // clear any green highlights on the board
    humanGridButtons.forEach((button) => {
      if (button.classList.contains('highlight-green')) {
        button.classList.toggle('highlight-green');
      }
    });

    // highlight matching buttons red
    humanGridButtons.forEach((button) => {
      if (ids.includes(button.getAttribute('id'))) {
        if (!button.classList.contains('highlight-red')) {
          button.classList.toggle('highlight-red');
        }
      } else if (button.classList.contains('highlight-red')) {
        button.classList.toggle('highlight-red');
      }
    });
  }

  function coordinatesToIds(coordinates) {
    const ids = [];

    coordinates.forEach((coordinate) => {
      ids.push(`h${coordinate[0]}${coordinate[1]}`);
    });

    return ids;
  }

  function renderStatuses(gameResponse) {
    // clear the status areas
    humanStatus.innerHTML = '';
    computerStatus.innerHTML = '';

    // display remaining ships
    humanStatus.innerHTML = `Remaining ships: ${gameResponse.humanShipsRemaining}`;
    computerStatus.innerHTML = `Remaining ships: ${gameResponse.computerShipsRemaining}`;
  }

  function getIcon(boardMark) {
    if (boardMark === 'x') {
      const hitIcon = document.createElement('i');
      hitIcon.classList.add('fa-solid', 'fa-bomb');
      return hitIcon;
    }

    if (boardMark === 'X') {
      const sunkIcon = document.createElement('i');
      sunkIcon.classList.add('fa-solid', 'fa-skull-crossbones');
      return sunkIcon;
    }

    if (boardMark === 'o') {
      const missIcon = document.createElement('i');
      missIcon.classList.add('fa-solid', 'fa-water');
      return missIcon;
    }

    return document.createElement('p');
  }

  function bindHumanGridButtonsForPlacement(hoverHandler, clickHandler) {
    const humanGridButtons = document.querySelectorAll('.human-button');
    humanGridButtons.forEach((button) => {
      button.addEventListener('mouseover', () => {
        // during ship placement, when a human's grid point is hovered over,
        // we need to figure out the other grid points that would make up an 
        // entire ship.  For example, when placing a carrier (length of 5), 
        // if grid point [0, 0] is hovered over, we would expect [1, 0], [2, 0], 
        // [3, 0], and [4, 0] to be the remaining coordinates making up the placement
        // in the vertical direction.  When hovered over, these other coordinates should
        // be highlighted green if they represent a valid placement, or highlighted red
        // if an invalid placement.

        const idString = button.getAttribute('id');
        const coordinate = [parseInt(idString.slice(1, 2), 10), parseInt(idString.slice(2, 3), 10)];

        // get remaining coordinates
        const coordinates = addRemainingCoordinates(coordinate);

        // convert coordinates into ids
        const ids = coordinatesToIds(coordinates);

        // if coordinates are valid, highlight the buttons green
        // otherwise highlight them red
        if (hoverHandler(coordinates)) {
          highlightGreen(ids);
        } else {
          highlightRed(ids);
        }
      });

      button.addEventListener('click', () => {
        const idString = button.getAttribute('id');
        const coordinate = [parseInt(idString.slice(1, 2), 10), parseInt(idString.slice(2, 3), 10)];

        // get remaining coordinates
        const coordinates = addRemainingCoordinates(coordinate);

        // only allow valid ship placements
        if (hoverHandler(coordinates)) {
          clickHandler(coordinates);
        }
      });
    });
  }

  function bindComputerGridButtonsForAttack(handler) {
    const buttons = document.querySelectorAll('.computer-button');
    buttons.forEach((button) => {
      // only add listener if the button hasnt been attacked before (i.e. no icon will be present)
      if (button.firstChild.classList.length === 0) {
        button.addEventListener('click', (event) => {
          const id = event.target.getAttribute('id');
          const coordinate = [parseInt(id.slice(1, 2), 10), parseInt(id.slice(2, 3), 10)];
  
          handler(coordinate);
        });
      }
    });
  }

  function renderHumanBoard(boardArr, shipCoordinates) {
    // clear the board
    humanBoard.innerHTML = '';

    // display the human's board
    boardArr.forEach((gridRow, rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('grid-row');
      gridRow.forEach((gridPoint, pointIndex) => {
        const boardButton = document.createElement('div');
        const boardButtonId = `h${rowIndex}${pointIndex}`;
        boardButton.setAttribute('id', boardButtonId);
        boardButton.classList.add('human-button');
        boardButton.appendChild(getIcon(boardArr[rowIndex][pointIndex]));
        shipCoordinates.forEach((shipCoordinatesArray) => {
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
  }

  function renderComputerBoard(boardArr) {
    // clear the board
    computerBoard.innerHTML = '';

    // display the computer's board
    boardArr.forEach((gridRow, rowIndex) => {
      const row = document.createElement('div');
      row.classList.add('grid-row');
      gridRow.forEach((gridPoint, pointIndex) => {
        const boardButton = document.createElement('div');
        const boardButtonId = `c${rowIndex}${pointIndex}`;
        boardButton.setAttribute('id', boardButtonId);
        boardButton.classList.add('computer-button');
        boardButton.appendChild(getIcon(boardArr[rowIndex][pointIndex]));
        row.appendChild(boardButton);
      });
      computerBoard.appendChild(row);
    });
  }

  function setNextPlacementSize(size) {
    nextPlacementSize = size;
  }

  function displayRemainingPlacements(remainingPlacements) {
    const pShipsRemaining = document.querySelector('#shipsRemaining');
    pShipsRemaining.innerHTML = `${remainingPlacements}`;
  }

  function displayHumanPrompt() {
    // prompt the human to attack the computer
    const gamePrompt = document.querySelector('#gamePrompt');
    gamePrompt.innerHTML = 'click on the computer board to place an attack';
  }

  function displayComputerPrompt() {
    // display that the computer is guessing
    const gamePrompt = document.querySelector('#gamePrompt');
    gamePrompt.innerHTML = 'computer is thinking...';
  }

  function displayHumanWinner() {
    // display the human as winner
    const gamePrompt = document.querySelector('#gamePrompt');
    gamePrompt.innerHTML = 'Human is the winner!';
  }

  function displayComputerWinner() {
    // display the human as winner
    const gamePrompt = document.querySelector('#gamePrompt');
    gamePrompt.innerHTML = 'Computer is the winner!';
  }

  function displayHumanShipsRemaining(shipCount) {
    // clear the status container
    humanStatus.innerHTML = '';

    // display the number of remaining Ships
    const p = document.createElement('p');
    p.innerHTML = `ships remaining: ${shipCount}`;
    humanStatus.appendChild(p);
  }

  function displayComputerShipsRemaining(shipCount) {
    // clear the status container
    computerStatus.innerHTML = '';

    // display the number of remaining Ships
    const p = document.createElement('p');
    p.innerHTML = `ships remaining: ${shipCount}`;
    computerStatus.appendChild(p);
  }

  function getDifficulty() {
    return difficulty;
  }

  function displayGameSetup() {
    if (gameSetupContainer.classList.contains('display-none')) {
      gameSetupContainer.classList.toggle('display-none');
    }
  }

  function hideGameSetup() {
    gameSetupContainer.classList.toggle('display-none');
  }

  function displayPlacementPrompt() {
    const gamePrompt = document.querySelector('#gamePrompt');

    gamePrompt.innerHTML = 'Place your ships';
  }

  function hideReset() {
    const reset = document.querySelector('#reset');

    reset.classList.add('display-none');
  }

  function displayReset() {
    const reset = document.querySelector('#reset');

    reset.classList.toggle('display-none');
  }

  return {
    bindHumanGridButtonsForPlacement,
    bindComputerGridButtonsForAttack,
    renderHumanBoard,
    renderComputerBoard,
    renderStatuses,
    setNextPlacementSize,
    displayRemainingPlacements,
    displayHumanPrompt,
    displayComputerPrompt,
    displayHumanWinner,
    displayComputerWinner,
    displayHumanShipsRemaining,
    displayComputerShipsRemaining,
    getDifficulty,
    displayGameSetup,
    hideGameSetup,
    displayPlacementPrompt,
    hideReset,
    displayReset,
  };
};

export default Display;
