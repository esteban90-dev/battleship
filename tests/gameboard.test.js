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

  test('throws an error when some or all ship coordinates do not exist on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => { board.placeShip([[-1, 0], [0, 0], [1, 0], [2, 0], [3, 0]]) }).toThrow('invalid ship position');
  });

  test('throws an error when some or all ship coordinates overlap with an existing ship', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    expect(() => { board.placeShip([[0, 0], [0, 1], [0, 2], [0, 3]]) }).toThrow('invalid ship position');
  });

  test('throws an error if coordinates are repeated', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => { board.placeShip([[0, 0], [0, 0], [1, 0], [2, 0], [3, 0]]) }).toThrow('invalid ship position');
  });

  test('throws an error if coordinates are not in a straight line', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(() => { board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [5, 0]]) }).toThrow('invalid ship position');
  });

  test('throws an error if the ship length doesnt match the last entry in the remainingPlacements array', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    // if no ships have been placed yet, the carrier (length of 5) should be placed first

    expect(() => { board.placeShip([[-1, 0], [0, 0]]) }).toThrow('invalid ship position');
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

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.receiveAttack([0, 0]);

    expect(() => board.receiveAttack([0, 0])).toThrow('invalid attack coordinate');
  });

});

describe('gameboard.allSunk()', () => {

  test('returns false if some ships have not been sunk', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);

    expect(board.allSunk()).toBe(false);
  });

  test('returns true if all ships have been sunk', () => {
    const shipFactory = mockShipFactorySunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);

    expect(board.allSunk()).toBe(true);
  });

});

describe('gameboard.getAttacks()', () => {

  test('it returns an array of coordinates that represents attacks on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([4, 0]);

    expect(board.getAttacks()).toEqual([[0, 0], [4, 0]]);
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

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
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

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([5, 1]);

    expect(board.print()).toEqual(expected);
  });

  test('it returns a character representation of the board that shows each section of a sunk ship as an X', () => {
    const shipFactory = mockShipFactorySunk;
    const board = GameBoard(shipFactory);
    const expected = [
      ['X', '', '', 'X', 'X', 'X', 'X', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['X', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ];

    // place pre-sunken ships
    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 3], [0, 4], [0, 5], [0, 6]]);

    expect(board.print()).toEqual(expected);
  });

});

describe('gameboard.getRemainingShips()', () => {

  test('it returns the number of ships that have not been sunk', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);

    expect(board.getRemainingShips()).toBe(2);
  });

});

describe('gameboard.getNextPlacementLength()', () => {

  test('returns 5 (representing a carrier) if no ships have been placed yet', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.getNextPlacementLength()).toBe(5);
  });

  test('returns 4 (representing a battleship) if carrier has been placed', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    expect(board.getNextPlacementLength()).toBe(4);
  });

  test('returns 3 (representing a cruiser) if carrier and battleship have been placed', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);

    expect(board.getNextPlacementLength()).toBe(3);
  });

  test('returns 3 (representing a submarine) if carrier, battleship, and cruiser have been placed', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);
    board.placeShip([[0, 2], [1, 2], [2, 2]]);

    expect(board.getNextPlacementLength()).toBe(3);
  });

  test('returns 2 (representing a destroyer) if carrier, battleship, cruiser, and submarine have been placed', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);
    board.placeShip([[0, 2], [1, 2], [2, 2]]);
    board.placeShip([[0, 3], [1, 3], [2, 3]]);

    expect(board.getNextPlacementLength()).toBe(2);
  });

  test('returns undefined if carrier, battleship, cruiser, submarine, and destroyer have been placed', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);
    board.placeShip([[0, 2], [1, 2], [2, 2]]);
    board.placeShip([[0, 3], [1, 3], [2, 3]]);
    board.placeShip([[0, 4], [1, 4]]);

    expect(board.getNextPlacementLength()).toBe(undefined);
  });

});

describe('gameboard.isValidPlacement()', () => {

  test('returns true if the supplied coordinates represent a valid placement', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.isValidPlacement([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]])).toBe(true);
  });

  test('returns false when some or all ship coordinates do not exist on the board', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.isValidPlacement([[-1, 0], [0, 0], [1, 0], [2, 0], [3, 0]])).toBe(false);
  });

  test('returns false when some or all ship coordinates overlap with an existing ship', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    expect(board.isValidPlacement([[0, 0], [0, 1], [0, 2], [0, 3]])).toBe(false);
  });

  test('returns false if coordinates are repeated', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.isValidPlacement([[0, 0], [1, 0], [2, 0], [3, 0], [3, 0]])).toBe(false);
  });

  test('returns false if coordinates are not in a straight line', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.isValidPlacement([[0, 0], [1, 0], [2, 0], [3, 0], [5, 0]])).toBe(false);
  });

  test('returns false if the ship length doesnt match the last entry in the remainingPlacements array', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    // if no ships have been placed yet, the carrier (length of 5) should be placed first

    expect(board.isValidPlacement([[0, 0], [1, 0], [2, 0], [3, 0]])).toBe(false);
  });

});

describe('board.getRemainingPlacements()', () => {

  test('when no ships have been placed, it returns 5', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    expect(board.getRemainingPlacements()).toBe(5);
  });

  test('when 1 ship has been placed, it returns 4', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);

    expect(board.getRemainingPlacements()).toBe(4);
  });

  test('when all ships have been placed, it returns 0', () => {
    const shipFactory = mockShipFactoryUnSunk;
    const board = GameBoard(shipFactory);

    board.placeShip([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
    board.placeShip([[0, 1], [1, 1], [2, 1], [3, 1]]);
    board.placeShip([[0, 2], [1, 2], [2, 2]]);
    board.placeShip([[0, 3], [1, 3], [2, 3]]);
    board.placeShip([[0, 4], [1, 4]]);

    expect(board.getRemainingPlacements()).toBe(0);
  });

});