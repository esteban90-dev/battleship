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
  const boardLength = board.getSize()[0];
  const boardHeight = board.getSize()[1];
  let previousAttacks = [];

  function attack(printedHumanBoard, difficulty) {
    let isValid = false;
    let attackCoordinate = [];

    // build array of coordinates that represents which grid points have already been attacked
    printedHumanBoard.forEach((gridRow, rowIndex) => {
      gridRow.forEach((gridPoint, pointIndex) => {
        if (gridPoint !== '') {
          let coordinate = [rowIndex, pointIndex];
          previousAttacks.push(coordinate.slice(0));
        }
      });
    });

    if (difficulty === 0) {
      // if easy mode, just return a valid random coordinate
      while (!isValid) {
        attackCoordinate = [random(0, boardLength), random(0, boardHeight)];
        if (isValidCoordinate(attackCoordinate)) {
          isValid = true;
        }
      }
      return attackCoordinate;
    }

    if (difficulty === 1) {
      // if hard difficulty, analyze the printed human board and return a coordinate near
      // a small 'x' - ignore large 'X's because these are already sunken ships

      const xLines = [];
      const yLines = [];
      const lines = [];
      const lineExtensionCoordinates = [];
      let validLineExtensionCoordinates = [];
      const adjacents = [];
      let validAdjacentCoordinates = [];
      const unSunkenHits = [];

      // 1. analyze board for x-direction lines
      printedHumanBoard.forEach((gridRow, rowIndex) => {
        let temp = [];
        gridRow.forEach((gridPoint, pointIndex) => {
          let current = gridPoint;
          let next = gridRow[pointIndex + 1];

          if (current === 'x' && next === 'x') {
            temp.push([rowIndex, pointIndex].slice(0));
          }

          if (current === 'x' && next !== 'x' && temp.length > 0) {
            temp.push([rowIndex, pointIndex].slice(0));
            xLines.push(temp.slice(0));
            temp = [];
          }

          if (pointIndex === gridRow.length - 1 && temp.length > 1) {
            xLines.push(temp.slice(0));
            temp = [];
          }
        });
      });

      // 2. analyze board for y-direction lines
      for (let i = 0; i < boardHeight; i++) {
        let temp = [];
        for (let j = 0; j < boardLength; j++) {
          let current = printedHumanBoard[j][i];
          let next; 
      
          if (j !== boardHeight - 1) {
            next = printedHumanBoard[j + 1][i];
          }

          if (current === 'x' && next === 'x') {
            temp.push([j, i].slice(0));
          }

          if (current === 'x' && next !== 'x' && temp.length > 0) {
            temp.push([j, i].slice(0));
            yLines.push(temp.slice(0));
            temp = [];
          }

          if (j === boardHeight - 1 && temp.length > 1) {
            yLines.push(temp.slice(0));
            temp = [];
          }
        }
      }

      // 3. combine xLines and yLines into one array
      xLines.forEach((line) => lines.push(line.slice(0)));
      yLines.forEach((line) => lines.push(line.slice(0)));

      // 4. build an array that contains the coordinates from both ends of each line
      lines.forEach((line) => {
        let firstElement = line[0];
        let lastElement = line[line.length - 1];
        let direction;

        // calculate direction
        if (lastElement[1] - firstElement[1] > 0) {
          direction = 'x';
        }
        else {
          direction = 'y';
        }

        // if x direction, add an x coordinate on the beginning and end of line
        if (direction === 'x') {
          let beginning = [];
          let end = [];

          beginning.push(firstElement[0]);
          beginning.push(firstElement[1] - 1);
          end.push(lastElement[0]);
          end.push(lastElement[1] + 1);

          lineExtensionCoordinates.push(beginning.slice(0));
          lineExtensionCoordinates.push(end.slice(0));
        }

        // if y direction, add a y coordinate on the beginning and end of line
        if (direction === 'y') {
          let beginning = [];
          let end = [];

          beginning.push(firstElement[0] - 1);
          beginning.push(firstElement[1]);
          end.push(lastElement[0] + 1);
          end.push(lastElement[1]);

          lineExtensionCoordinates.push(beginning.slice(0));
          lineExtensionCoordinates.push(end.slice(0));
        }
      });

      // 5. remove any invalid coordinates
      validLineExtensionCoordinates = lineExtensionCoordinates.filter((coordinate) => isValidCoordinate(coordinate));

      // 6. return the first value in validLineExtensionCoordinates, if any exist
      if (validLineExtensionCoordinates.length > 0) {
        return validLineExtensionCoordinates[0];
      }

      // 7. if no validLineExtensionCoordinates, find adjacent coordinates to existing x's
      printedHumanBoard.forEach((gridRow, rowIndex) => {
        gridRow.forEach((gridPoint, pointIndex) => {
          if (gridPoint === 'x') {
            let coordinate = [rowIndex, pointIndex];
            unSunkenHits.push(coordinate.slice(0));
          }
        });
      });

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

      // filter out any invalid coordinates
      validAdjacentCoordinates = adjacents.filter((coordinate) => isValidCoordinate(coordinate));

      // return the first validAdjacentCoordinate, if any
      if (validAdjacentCoordinates.length > 0) {
        return validAdjacentCoordinates[0];
      }

      // 8.  if there are no valid adjacent coordinates, just randomly guess (similar to easy mode)
      let isValid = false;

      while (!isValid) {
        attackCoordinate = [random(0, boardLength), random(0, boardHeight)];
        if (isValidCoordinate(attackCoordinate)) {
          isValid = true;
        }
      }
      return attackCoordinate;
    }
  }

  function isValidCoordinate(coordinate) {
    let onBoard = false;
    let notAttacked = false;

    if (!hasBeenAttacked(coordinate, previousAttacks)) {
      notAttacked = true;
    }

    if (coordinate[0] >= 0 && coordinate[0] < boardHeight && coordinate[1] >= 0 && coordinate[1] < boardLength) {
      onBoard = true;
    }

    return notAttacked && onBoard;
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