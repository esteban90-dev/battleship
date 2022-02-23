import Game from '../src/game';

describe('Game instantiation', () => {

  test('throws an error if no arguments are supplied', () => {
    expect(() => { Game() }).toThrow('a human player object and a computer player object must be supplied as arguments');
  });

  test('throws an error if called with a human player object that does not have the getBoard() method', () => {
    const fakeHumanPlayer = {
      test: () => {},
    };

    const fakeComputerPlayer = {
      getBoard: () => {},
    };

    expect(() => Game(fakeHumanPlayer, fakeComputerPlayer)).toThrow('the human player object must respond to the getBoard() method');
  });

  test('throws an error if called with a computer player object that does not have the getBoard() method', () => {
    const fakeHumanPlayer = {
      getBoard: () => {},
    };

    const fakeComputerPlayer = {
      test: () => {},
    };

    expect(() => Game(fakeHumanPlayer, fakeComputerPlayer)).toThrow('the computer player object must respond to the getBoard() method');
  });

  test('throws an error if called with a computer player object that does not have the attack() method', () => {
    const fakeHumanPlayer = {
      getBoard: () => {},
    };

    const fakeComputerPlayer = {
      getBoard: () => {},
    };

    expect(() => Game(fakeHumanPlayer, fakeComputerPlayer)).toThrow('the computer player object must respond to the attack() method');
  });

});

describe('game.initialize()', () => {

  const humanBoard = {
    placeShip: () => {},
    getShips: () => [],
    clear: jest.fn(() => {}),
    print: () => {},
    allSunk: () => {},
    getRemainingShips: () => {},
  }

  const computerBoard = {
    placeShip: () => {},
    getShips: () => [],
    clear: jest.fn(() => {}),
    print: () => {},
    allSunk: () => {},
    getRemainingShips: () => {},
  }

  const fakeHumanPlayer = {
    getBoard: () => humanBoard,
  };

  const fakeComputerPlayer = {
    getBoard: () => computerBoard,
    attack: () => {},
  };

  test('it clears the computer board', () => {
    const game = Game(fakeHumanPlayer, fakeComputerPlayer);

    game.initialize();

    expect(computerBoard.clear).toHaveBeenCalled();
  });

  test('it clears the human board', () => {
    const game = Game(fakeHumanPlayer, fakeComputerPlayer);

    game.initialize();

    expect(humanBoard.clear).toHaveBeenCalled();
  });

});

describe('game.turn()', () => {

  const losingBoard = {
    allSunk: () => true,
    receiveAttack: () => {},
    print: () => {},
    getShips: () => [],
    getRemainingShips: () => {},
  }

  const notLosingBoard = {
    allSunk: () => false,
    receiveAttack: () => {},
    print: () => {},
    getShips: () => [],
    getRemainingShips: () => {},
  }

  describe('no winner yet', () => {

    test('the winner property in the reponse object shows null', () => {
      const fakeHumanPlayer = {
        getBoard: () => notLosingBoard,
      };
    
      const fakeComputerPlayer = {
        getBoard: () => notLosingBoard,
        attack: () => {},
      };

      const game = Game(fakeHumanPlayer, fakeComputerPlayer);

      expect(game.turn([0, 0]).winner).toBeNull();
    });

  });

  describe('the human wins', () => {

    test('the winner property in the reponse object shows human', () => {
      const fakeHumanPlayer = {
        getBoard: () => notLosingBoard,
      };
    
      const fakeComputerPlayer = {
        getBoard: () => losingBoard,
        attack: () => {},
      };

      const game = Game(fakeHumanPlayer, fakeComputerPlayer);

      expect(game.turn([0, 0]).winner).toMatch('human');
    });
    
  });

  describe('the computer wins', () => {

    test('the winner property in the reponse object shows computer', () => {
      const fakeHumanPlayer = {
        getBoard: () => losingBoard,
      };
    
      const fakeComputerPlayer = {
        getBoard: () => notLosingBoard,
        attack: () => {},
      };

      const game = Game(fakeHumanPlayer, fakeComputerPlayer);

      expect(game.turn([0, 0]).winner).toMatch('computer');
    });

  });

});