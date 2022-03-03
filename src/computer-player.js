const ComputerPlayer = function(gameboard) {
  if (!gameboard) {
    throw('a gameboard object must be supplied as an argument');
  }

  if (!gameboard.receiveAttack) {
    throw('the gameboard argument must respond to the recieveAttack() method');
  }

  if (!gameboard.placeShip) {
    throw('the gameboard argument must respond to the placeShip() method');
  }

  if (!gameboard.allSunk) {
    throw('the gameboard argument must respond to the allSunk() method');
  }

  const board = gameboard;

  function attack(printedHumanBoard, difficulty) {
    const boardLength = board.getSize()[0];
    const boardHeight = board.getSize()[1];
    let isValid = false;
    let attackCoordinate = [];
    let previousAttacks = [];

    // build array of coordinates that represents which grid points have already been attacked
    printedHumanBoard.forEach((gridRow, rowIndex) => {
      gridRow.forEach((gridPoint, pointIndex) => {
        if (gridPoint !== '') {
          let coordinate = [rowIndex, pointIndex];
          previousAttacks.push(coordinate.slice(0));
        }
      });
    });

    while (!isValid) {
      if (difficulty === 0) {
        // if easy difficulty, just return a random coordinate
        attackCoordinate = [random(0, boardLength), random(0, boardHeight)];
      }

      if (difficulty === 1) {
        // if hard difficulty, analyze the printed human board and return a coordinate near
        // a small 'x' - ignore large 'X's because these are already sunken ships
        // 1. return all coordinates with an 'x'
        // 2. get their adjacent coordinates
        // 3. randomly select from these coordinates

        const unSunkenHits = [];
        const adjacents = [];

        // get all the unsunken ('x') hits
        printedHumanBoard.forEach((gridRow, rowIndex) => {
          gridRow.forEach((gridPoint, pointIndex) => {
            if (gridPoint === 'x') {
              let coordinate = [rowIndex, pointIndex];
              unSunkenHits.push(coordinate.slice(0));
            }
          });
        });

        if (unSunkenHits.length > 0) {
          // if there are 'x's, find all the coordinates adjacent to the 'x's
          unSunkenHits.forEach((coordinate) => {
            // one coordinate above
            adjacents.push([coordinate[0] + 1, coordinate[1]]);

            // one coordinate below
            adjacents.push([coordinate[0] - 1, coordinate[1]]);

            // one coordinate right
            adjacents.push([coordinate[0], coordinate[1] + 1]);

            // one coordinate left
            adjacents.push([coordinate[0], coordinate[1] - 1]);
          });

          // randomly select one of the adjacents as an attack coordinate
          attackCoordinate = adjacents[random(0, adjacents.length)];
        }
        else {
          // if there are no x's, just choose a random board coordinate
          attackCoordinate = [random(0, boardLength), random(0, boardHeight)];
        }
      }

      // validate that coordinate hasn't been attacked already and is actually on the board
      if (!hasBeenAttacked(attackCoordinate, previousAttacks) && attackCoordinate[0] >= 0 && attackCoordinate[0] < boardHeight && attackCoordinate[1] >= 0 && attackCoordinate[1] < boardLength) {
        isValid = true;
      }
    }

    return attackCoordinate;
  }

  function hasBeenAttacked(coordinate, previousAttacks) {
    let result = false;

    previousAttacks.forEach((attackCoordinate) => {
      if (coordinate[0] === attackCoordinate[0] && coordinate[1] === attackCoordinate[1]) {
        result = true;
      }
    });

    return result;
  }

  function random(startNumber, endNumber) {
    return parseInt(Math.random() * endNumber) + startNumber;
  }

  function getBoard() {
    return board;
  }

  return { attack, getBoard }
}

export default ComputerPlayer;