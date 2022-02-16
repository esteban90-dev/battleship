import ComputerPlayer from '../src/computer-player';

const mockBoard = {
  receiveAttack: () => {},
  placeShip: () => {},
  allSunk: () => {},
  getAttacks: () => [[0, 0], [5, 5], [9, 9]],
  getSize: () => [10, 10],
};

describe('ComputerPlayer instantiation', () => {

  test('throws an error if no arguments are supplied', () => {
    expect(() => ComputerPlayer()).toThrow('a gameboard object must be supplied as an argument');
  });

  test('throws an error if called with an object that does not have the receiveAttack() method', () => {
    const fakeBoard = {
      placeShip: () => {},
      allSunk: () => {}
    };

    expect(() => ComputerPlayer(fakeBoard)).toThrow('the gameboard argument must respond to the recieveAttack() method');
  });

  test('throws an error if called with an object that does not have the placeShip() method', () => {
    const fakeBoard = {
      receiveAttack: () => {},
      allSunk: () => {}
    };

    expect(() => ComputerPlayer(fakeBoard)).toThrow('the gameboard argument must respond to the placeShip() method');
  });

  test('throws an error if called with an object that does not have the allSunk() method', () => {
    const fakeBoard = {
      placeShip: () => {},
      receiveAttack: () => {}
    };

    expect(() => ComputerPlayer(fakeBoard)).toThrow('the gameboard argument must respond to the allSunk() method');
  });

});

describe('ComputerPlayer.attack()', () => {

  test('returns a random coordinate on the board that has not been attacked yet', () => {
    const board = mockBoard;
    const computerPlayer = ComputerPlayer(board);

    for (let i = 0; i < 25; i++) {
      expect(computerPlayer.attack()[0]).toBeGreaterThanOrEqual(0);
      expect(computerPlayer.attack()[0]).toBeLessThan(10);
      expect(computerPlayer.attack()[1]).toBeGreaterThanOrEqual(0);
      expect(computerPlayer.attack()[1]).toBeLessThan(10);
      expect(computerPlayer.attack()).not.toEqual([0, 0]);
      expect(computerPlayer.attack()).not.toEqual([5, 5]);
      expect(computerPlayer.attack()).not.toEqual([9, 9]);
    }
  });

});