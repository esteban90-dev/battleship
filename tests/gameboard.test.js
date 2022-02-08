import GameBoard from '../src/gameboard';

describe('GameBoard constructor', () => {

  test('creates a gameboard object with a ships property', () => {
    const board = new GameBoard();

    expect(board.ships).toBeDefined();
  });
      
  test('create a gameboard object with a misses property', () => {
    const board = new GameBoard();

    expect(board.misses).toBeDefined();
  });
});