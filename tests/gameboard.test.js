import GameBoard from '../src/gameboard';

const mockShipFactoryUnSunk = (length) => {
  // return a ship object that hasn't been sunk
  return {
    getDamage: () => {},
    isSunk: () => { return false },
    hit: jest.fn((location) => {})
  }
}

const mockShipFactorySunk = (length) => {
  // return a ship object that has been sunk
  return {
    getDamage: () => {},
    isSunk: () => { return true },
    hit: jest.fn((location) => {})
  }
}

describe('GameBoard instantiation', () => {

  test('raises an error when no arguments are supplied', () => {
    expect(() => GameBoard()).toThrow('a ship factory must be supplied as an argument');
  });

  test('raises an error when supplied argument is not a valid ship factory object', () => {
    expect(() => GameBoard({})).toThrow('a ship factory must be supplied as an argument');
  });
  
  test('does not raise an error when supplied argument is a valid ship factory object', () => {
    const shipFactory = mockShipFactoryUnSunk;

    expect(() => GameBoard(shipFactory)).not.toThrow();
  });

});

describe('gameboard.placeShip()', () => {

  test('raises an error when some or all ship coordinates do not exist on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([[-1, -1], [-1, 0]])).toThrow('invalid ship position');
  });

  test('raises an error when some or all ship coordinates overlap with an existing ship', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1]]);

    expect(() => board.placeShip([[0, 0], [1, 0]])).toThrow('invalid ship position');
  });

  test('raises an error if coordinates are repeated', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([[0, 0], [0, 0]])).toThrow('invalid ship position');
  });

  test('raises an error if coordinates are not in a straight line', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([[0, 0], [2, 0]])).toThrow('invalid ship position');
  });

  test('creates a new ship entry when placing a ship in the +y direction', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    expect(board.getShips()[0].coordinates).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    // verify ship entry has a valid ship object
    expect(board.getShips()[0].ship.hit).toBeDefined();
    expect(board.getShips()[0].ship.isSunk).toBeDefined();
  });

  test('creates a new ship entry when placing a ship in the +x direction', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);

    expect(board.getShips()[0].coordinates).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);

    // verify ship entry has a valid ship object
    expect(board.getShips()[0].ship.hit).toBeDefined();
    expect(board.getShips()[0].ship.isSunk).toBeDefined();
  });
      
});

describe('gameboard.receiveAttack()', () => {

  test('if ship exists at the coordinates of the attack, ship takes damage', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[5, 5], [6, 5], [7, 5], [8, 5], [9, 5]]);
    board.receiveAttack([5, 5]);

    expect(board.getShips()[0].ship.hit).toHaveBeenCalledWith(0);
  });

  test('if ship does not exist at the coordinates of the attack, record the attack as a miss', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[5, 5], [6, 5], [7, 5], [8, 5], [9, 5]]);
    board.receiveAttack([5, 8]);

    expect(board.getShips()[0].ship.hit).not.toHaveBeenCalled;
    expect(board.getMisses()[0]).toEqual([5, 8]);
  });

  test('if the attack coordinate is not on the board, throw an error', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => board.receiveAttack([11, 11])).toThrow('invalid attack coordinate');
  });

  test('if the coordinate has already been attacked, throw an error', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 9], [1, 9], [2, 9], [3, 9]]);
    board.receiveAttack([0, 9]);

    expect(() => board.receiveAttack([0, 9])).toThrow('invalid attack coordinate');
  });

});

describe('gameboard.allSunk()', () => {

  test('returns false if some ships have not been sunk', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0]]);
    board.placeShip([[8, 5], [8, 6], [8, 7]]);

    expect(board.allSunk()).toBe(false);
  });

  test('returns true if all ships have been sunk', () => {
    const shipFactory = mockShipFactorySunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0]]);
    board.placeShip([[8, 5], [8, 6], [8, 7]]);

    expect(board.allSunk()).toBe(true);
  });

});

describe('gameboard.getAttacks()', () => {

  test('it returns an array of coordinates that represents attacks on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0]]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([5, 5]);

    expect(board.getAttacks()).toEqual([[0, 0], [5, 5]]);
  });

});

describe('gameboard.getSize()', () => {

  test('it returns an array that represents the length and height of the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.getSize()).toEqual([10, 10]);
  });

});

describe('gameboard.getHits()', () => {

  test('it returns an array of coordinates that represents hits on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0]]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([5, 5]);

    expect(board.getHits()).toEqual([[0, 0]]);
  });

});

describe('gameboard.print()', () => {

  test('it returns a character representation of the board that shows hits with an x and misses with an o', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);
    const expected = [
      ['x', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', 'o', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ];

    board.placeShip([[0, 0], [1, 0], [2, 0]]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([5, 1]);

    expect(board.print()).toEqual(expected);
  });

  test('it returns a character representation of the board that shows each section of a sunk ship as an X', () => {
    const shipFactory = mockShipFactorySunk;
    const board = GameBoard(shipFactory);
    const expected = [
      ['X', 'X', 'X', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ];

    // place pre-sunken ships
    board.placeShip([[0, 0], [0, 1], [0, 2]]);
    board.placeShip([[3, 0], [4, 0], [5, 0]]);

    expect(board.print()).toEqual(expected);
  });

});

describe('gameboard.clear()', () => {

  test('it clears the ships array', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1], [0, 2]]);
    board.clear();

    expect(board.getShips()).toEqual([]);
  });

  test('it clears the misses array', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1], [0, 2]]);
    board.receiveAttack([5, 5]);
    board.clear();

    expect(board.getMisses()).toEqual([]);
  });

  test('it clears the hits array', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1], [0, 2]]);
    board.receiveAttack([0, 0]);
    board.clear();

    expect(board.getHits()).toEqual([]);
  });

  test('it clears the attacks array', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1], [0, 2]]);
    board.receiveAttack([0, 0]);
    board.clear();

    expect(board.getAttacks()).toEqual([]);
  });

});

describe('gameboard.getRemainingShips()', () => {

  test('it returns the number of ships that have not been sunk', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [0, 1], [0, 2]]);
    board.placeShip([[7, 0], [7, 1], [7, 2]]);

    expect(board.getRemainingShips()).toBe(2);
  });

});

describe('gameboard.areAllShipsPlaced()', () => {

  test('returns false if the remainingPlacements array is not empty', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.areAllShipsPlaced()).toBe(false);
  });

});