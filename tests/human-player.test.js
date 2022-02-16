import HumanPlayer from '../src/human-player';

const mockBoard = {
  receiveAttack: () => {},
  placeShip: () => {},
  allSunk: () => {},
};

describe('HumanPlayer instantiation', () => {

  test('throws an error if no arguments are supplied', () => {
    expect(() => HumanPlayer()).toThrow('a gameboard object must be supplied as an argument');
  });

  test('throws an error if called with an object that does not have the receiveAttack() method', () => {
    const fakeBoard = {
      placeShip: () => {},
      allSunk: () => {}
    };

    expect(() => HumanPlayer(fakeBoard)).toThrow('the gameboard argument must respond to the recieveAttack() method');
  });

  test('throws an error if called with an object that does not have the placeShip() method', () => {
    const fakeBoard = {
      receiveAttack: () => {},
      allSunk: () => {}
    };

    expect(() => HumanPlayer(fakeBoard)).toThrow('the gameboard argument must respond to the placeShip() method');
  });

  test('throws an error if called with an object that does not have the allSunk() method', () => {
    const fakeBoard = {
      placeShip: () => {},
      receiveAttack: () => {}
    };

    expect(() => HumanPlayer(fakeBoard)).toThrow('the gameboard argument must respond to the allSunk() method');
  });

});

describe('HumanPlayer.getBoard()', () => {

  test('returns the board object', () => {
    const board = mockBoard;
    const humanPlayer = HumanPlayer(board);

    expect(humanPlayer.getBoard()).toBe(board);
  });

});