const GameController = function(ComputerPlayer, HumanBoard, Display) {
  if (!ComputerPlayer || !HumanBoard || !Display) {
    throw new Error('computer player, human board, and display objects must be provided');
  }

  if (!ComputerPlayer.getBoard) {
    throw new Error('computer player must respond to getBoard() method');
  }

  if (!HumanBoard.receiveAttack) {
    throw new Error('human board must respond to receiveAttack() method');
  }

  if (!Display.renderHumanBoard) {
    throw new Error('display must respond to renderHumanBoard() method');
  }

  const display = Display;
  const computerPlayer = ComputerPlayer;
  const humanBoard = HumanBoard;
  const computerBoard = computerPlayer.getBoard();

  function testPlacement(coordinates) {
    return humanBoard.isValidPlacement(coordinates);
  }

  async function sleep(ms) {
    await new Promise((resolve) => {
      setTimeout(() => { resolve('complete'); }, ms);
    });
  }

  function placeComputerShips() {
    // randomly choose between 10 different computer ship placement configurations
    const random = parseInt(Math.random() * 10, 10);

    if (random === 0) {
      computerBoard.placeShip([[5, 1], [6, 1], [7, 1], [8, 1], [9, 1]]);
      computerBoard.placeShip([[1, 7], [2, 7], [3, 7], [4, 7]]);
      computerBoard.placeShip([[0, 3], [1, 3], [2, 3]]);
      computerBoard.placeShip([[7, 5], [8, 5], [9, 5]]);
      computerBoard.placeShip([[7, 8], [7, 9]]);
    }

    if (random === 1) {
      computerBoard.placeShip([[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]);
      computerBoard.placeShip([[8, 6], [8, 7], [8, 8], [8, 9]]);
      computerBoard.placeShip([[5, 0], [6, 0], [7, 0]]);
      computerBoard.placeShip([[7, 2], [8, 2], [9, 2]]);
      computerBoard.placeShip([[0, 9], [1, 9]]);
    }

    if (random === 2) {
      computerBoard.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
      computerBoard.placeShip([[6, 9], [7, 9], [8, 9], [9, 9]]);
      computerBoard.placeShip([[3, 3], [3, 4], [3, 5]]);
      computerBoard.placeShip([[5, 4], [5, 5], [5, 6]]);
      computerBoard.placeShip([[7, 2], [7, 3]]);
    }

    if (random === 3) {
      computerBoard.placeShip([[3, 4], [3, 5], [3, 6], [3, 7], [3, 8]]);
      computerBoard.placeShip([[6, 1], [6, 2], [6, 3], [6, 4]]);
      computerBoard.placeShip([[2, 2], [3, 2], [4, 2]]);
      computerBoard.placeShip([[5, 6], [6, 6], [7, 6]]);
      computerBoard.placeShip([[4, 4], [5, 4]]);
    }

    if (random === 4) {
      computerBoard.placeShip([[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]]);
      computerBoard.placeShip([[5, 2], [6, 2], [7, 2], [8, 2]]);
      computerBoard.placeShip([[1, 3], [2, 3], [3, 3]]);
      computerBoard.placeShip([[6, 9], [7, 9], [8, 9]]);
      computerBoard.placeShip([[9, 5], [9, 6]]);
    }

    if (random === 5) {
      computerBoard.placeShip([[5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]);
      computerBoard.placeShip([[1, 9], [2, 9], [3, 9], [4, 9]]);
      computerBoard.placeShip([[4, 6], [4, 7], [4, 8]]);
      computerBoard.placeShip([[4, 5], [5, 5], [6, 5]]);
      computerBoard.placeShip([[7, 5], [8, 5]]);
    }

    if (random === 6) {
      computerBoard.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
      computerBoard.placeShip([[9, 6], [9, 7], [9, 8], [9, 9]]);
      computerBoard.placeShip([[1, 3], [1, 4], [1, 5]]);
      computerBoard.placeShip([[7, 6], [7, 7], [7, 8]]);
      computerBoard.placeShip([[4, 7], [4, 8]]);
    }

    if (random === 7) {
      computerBoard.placeShip([[5, 3], [5, 4], [5, 5], [5, 6], [5, 7]]);
      computerBoard.placeShip([[3, 3], [3, 4], [3, 5], [3, 6]]);
      computerBoard.placeShip([[4, 2], [5, 2], [6, 2]]);
      computerBoard.placeShip([[7, 3], [7, 4], [7, 5]]);
      computerBoard.placeShip([[0, 7], [1, 7]]);
    }

    if (random === 8) {
      computerBoard.placeShip([[4, 8], [5, 8], [6, 8], [7, 8], [8, 8]]);
      computerBoard.placeShip([[1, 1], [1, 2], [1, 3], [1, 4]]);
      computerBoard.placeShip([[0, 4], [0, 5], [0, 6]]);
      computerBoard.placeShip([[4, 4], [5, 4], [6, 4]]);
      computerBoard.placeShip([[5, 1], [6, 1]]);
    }

    if (random === 9) {
      computerBoard.placeShip([[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]]);
      computerBoard.placeShip([[5, 2], [6, 2], [7, 2], [8, 2]]);
      computerBoard.placeShip([[2, 3], [3, 3], [4, 3]]);
      computerBoard.placeShip([[5, 4], [6, 4], [7, 4]]);
      computerBoard.placeShip([[3, 5], [4, 5]]);
    }
  }

  function receiveAttack(coordinates) {
    const computerGuess = computerPlayer.attack(humanBoard.print(), display.getDifficulty());
    const humanShipCoordinates = humanBoard.getShips().map((shipEntry) => shipEntry.coordinates);

    computerBoard.receiveAttack(coordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
    display.displayComputerShipsRemaining(computerBoard.getRemainingShips());
    // if the computer board ships are sunk, announce the human as the winner,
    // otherwise let the computer guess again
    if (computerBoard.allSunk()) {
      display.displayHumanWinner();
    }
    else {
      display.displayComputerPrompt();
      // add 2 second delay to simulate the computer thinking
      sleep(1000).then(() => {
        humanBoard.receiveAttack(computerGuess);
        display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
        display.displayHumanShipsRemaining(humanBoard.getRemainingShips());
        // if human board ships are sunk, announce the computer as winner,
        // otherwise prompt the human to attack again
        if (humanBoard.allSunk()) {
          display.displayComputerWinner();
        } else {
          display.bindComputerGridButtonsForAttack(receiveAttack);
          display.displayHumanPrompt();
        }
      });
    }
  }

  function receivePlacement(coordinates) {
    humanBoard.placeShip(coordinates);
    const humanShipCoordinates = humanBoard.getShips().map((entry) => entry.coordinates);
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.setNextPlacementSize(humanBoard.getNextPlacementLength());
    display.displayRemainingPlacements();
    if (humanBoard.getRemainingPlacements() === 0) {
      placeComputerShips();
      display.bindComputerGridButtonsForAttack(receiveAttack);
      display.hideGameSetup();
      display.displayHumanPrompt();
      display.displayHumanShipsRemaining(humanBoard.getRemainingShips());
      display.displayComputerShipsRemaining(computerBoard.getRemainingShips());
    } else {
      display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);
    }
  }

  function init() {
    const humanShipCoordinates = humanBoard.getShips().map((entry) => entry.coordinates);
    display.displayPlacementPrompt();
    display.displayGameSetup();
    display.renderHumanBoard(humanBoard.print(), humanShipCoordinates);
    display.renderComputerBoard(computerPlayer.getBoard().print());
    display.setNextPlacementSize(humanBoard.getNextPlacementLength());
    display.bindHumanGridButtonsForPlacement(testPlacement, receivePlacement);
    display.displayRemainingPlacements();
  }

  return { init, receivePlacement };
};

export default GameController;
