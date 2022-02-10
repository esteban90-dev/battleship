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

describe('gameboard.placeShip()', () => {

  test('creates a new ship entry when placing a ship in the +x direction', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 5, 0);

    expect(board.getShips()[0].coordinates).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    // verify ship entry has a valid ship object
    expect(board.getShips()[0].ship.hit).toBeDefined();
    expect(board.getShips()[0].ship.isSunk).toBeDefined();
  });

  test('creates a new ship entry when placing a ship in the +y direction', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 5, 1);

    expect(board.getShips()[0].coordinates).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);

    // verify ship entry has a valid ship object
    expect(board.getShips()[0].ship.hit).toBeDefined();
    expect(board.getShips()[0].ship.isSunk).toBeDefined();
  });

  test('raises an error when some or all ship coordinates do not exist on the board', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([-1, -1], 5, 0)).toThrow('invalid ship position');
  });

  test('raises an error when some or all ship coordinates overlap with an existing ship', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 5, 0);

    expect(() => board.placeShip([0, 0], 5, 1)).toThrow('invalid ship position');
  });

  test('raises an error if the direction argument is not a 1 or 0', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([0, 0], 5, 3)).toThrow('invalid ship direction');
  });
      
});

describe('gameboard.receiveAttack()', () => {

  test('if ship exists at the coordinates of the attack, ship takes damage', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([5, 5], 5, 0);
    board.receiveAttack([5, 5]);

    expect(board.getShips()[0].ship.getDamage()).toEqual([1, 0, 0, 0, 0]);
  });

  test('if ship does not exist at the coordinates of the attack, record the attack as a miss', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([5, 5], 5, 0);
    board.receiveAttack([5, 8]);

    expect(board.getShips()[0].ship.getDamage()).toEqual([0, 0, 0, 0, 0]);
    expect(board.getMisses()[0]).toEqual([5, 8]);
  });

  test('if the attack coordinate is not on the board, throw an error', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    expect(() => board.receiveAttack([11, 11])).toThrow('invalid attack coordinate');
  });

  test('if the coordinate has already been attacked, throw an error', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 10], 5, 0);
    board.receiveAttack([0, 10]);

    expect(() => board.receiveAttack([0, 10])).toThrow('invalid attack coordinate');
  });

});

describe('gameboard.allSunk()', () => {

  test('returns true if all ships have been sunk', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 3, 1);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 2]);

    board.placeShip([10, 0], 3, 1);
    board.receiveAttack([10, 0]);
    board.receiveAttack([10, 1]);
    board.receiveAttack([10, 2]);

    expect(board.allSunk()).toBe(true);
  });

  test('returns false if some ships have not been sunk', () => {
    const shipFactory = Ship;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 3, 1);
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 2]);

    board.placeShip([10, 0], 3, 1);
    board.receiveAttack([10, 0]);
    board.receiveAttack([10, 2]);

    expect(board.allSunk()).toBe(false);
  });

});