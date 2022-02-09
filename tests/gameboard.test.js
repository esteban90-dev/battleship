import GameBoard from '../src/gameboard';
import Ship from '../src/ship';

describe('GameBoard instantiation', () => {

  test('raises an error when no arguments are supplied', () => {
    expect(() => GameBoard()).toThrow('a ship factory must be supplied as an argument');
  });

  test('raises an error when supplied argument is not a valid ship factory object', () => {
    expect(() => GameBoard({})).toThrow('a ship factory must be supplied as an argument');
  });
  
  test('does not raise an error when supplied argument is a valid ship factory object', () => {
    const shipFactory = Ship;

    expect(() => GameBoard(shipFactory)).not.toThrow();
  });

  
});