import Game from '../src/game';

const fakeBoard = {
  placeShip: () => {},
}

const fakeComputerPlayer = {
  board: fakeBoard,
  getBoard: () => board,
}

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