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

  test('creates a new ship entry when placing a ship in the +y direction', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 5, 0);

    expect(board.getShips()[0].coordinates).toEqual([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    // verify ship entry has a valid ship object
    expect(board.getShips()[0].ship.hit).toBeDefined();
    expect(board.getShips()[0].ship.isSunk).toBeDefined();
  });

  test('creates a new ship entry when placing a ship in the +x direction', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 5, 1);

    expect(board.getShips()[0].coordinates).toEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);

    // verify ship entry has a valid ship object
    expect(board.getShips()[0].ship.hit).toBeDefined();
    expect(board.getShips()[0].ship.isSunk).toBeDefined();
  });

  test('raises an error when some or all ship coordinates do not exist on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([-1, -1], 5, 0)).toThrow('invalid ship position');
  });

  test('raises an error when some or all ship coordinates overlap with an existing ship', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 5, 0);

    expect(() => board.placeShip([0, 0], 5, 1)).toThrow('invalid ship position');
  });

  test('raises an error if the direction argument is not a 1 or 0', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => board.placeShip([0, 0], 5, 3)).toThrow('invalid ship direction');
  });
      
});

describe('gameboard.receiveAttack()', () => {

  test('if ship exists at the coordinates of the attack, ship takes damage', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([5, 5], 5, 0);
    board.receiveAttack([5, 5]);

    expect(board.getShips()[0].ship.hit).toHaveBeenCalledWith(0);
  });

  test('if ship does not exist at the coordinates of the attack, record the attack as a miss', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([5, 5], 5, 0);
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

    board.placeShip([0, 10], 5, 0);
    board.receiveAttack([0, 10]);

    expect(() => board.receiveAttack([0, 10])).toThrow('invalid attack coordinate');
  });

});

describe('gameboard.allSunk()', () => {

  test('returns false if some ships have not been sunk', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 3, 1);
    board.placeShip([10, 0], 3, 1);

    expect(board.allSunk()).toBe(false);
  });

  test('returns true if all ships have been sunk', () => {
    const shipFactory = mockShipFactorySunk;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 3, 1);
    board.placeShip([10, 0], 3, 1);

    expect(board.allSunk()).toBe(true);
  });

});

describe('gameboard.getAttacks()', () => {

  test('it returns an array of coordinates that represents attacks on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([0, 0], 3, 1);
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

    board.placeShip([0, 0], 3, 1);
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

    board.placeShip([0, 0], 3, 1);
    board.receiveAttack([0, 0]);
    board.receiveAttack([5, 1]);

    expect(board.print()).toEqual(expected);
  });

});