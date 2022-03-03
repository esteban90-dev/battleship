import ComputerPlayer from '../src/computer-player';

const mockBoard = {
  receiveAttack: () => {},
  placeShip: () => {},
  allSunk: () => {},
  getAttacks: () => [[0, 0], [5, 5], [9, 9]],
  getHits: () => [[5, 5]],
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

describe('ComputerPlayer.getBoard()', () => {

  test('returns the board object', () => {
    const board = mockBoard;
    const computerPlayer = ComputerPlayer(board);

    expect(computerPlayer.getBoard()).toBe(board);
  });

});

describe('ComputerPlayer.attack()', () => {

  describe('with difficulty set to 0 (easy)', () => {
  
    test('returns a random board coordinate that has not already been attacked', () => {
      const board = mockBoard;
      const computerPlayer = ComputerPlayer(board);
      const printedHumanBoard = [
        ['X', '', '', 'x', '', '', '', '', '', ''],
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

      const invalidAttackCoordinates = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 3]];
  
      for (let i = 0; i < 25; i++) {
        const coordinate = computerPlayer.attack(printedHumanBoard, 0);
        expect(hasBeenAttacked(coordinate, invalidAttackCoordinates)).toBe(false);
      }
    });

  });

  describe('with difficulty set to 1 (hard)', () => {

    test('returns a board coordinate that is adjacent to an unsunk hit on the computer board', () => {
      const board = mockBoard;
      const computerPlayer = ComputerPlayer(board);
      const printedHumanBoard = [
        ['X', '', '', 'x', '', '', '', '', '', ''],
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
      const validCoordinates = [[0, 2], [1, 3], [0, 4]];
  
      for (let i = 0; i < 25; i++) {
        const coordinate = computerPlayer.attack(printedHumanBoard, 1);
        expect(isCoordinateInArray(coordinate, validCoordinates)).toBe(true);
      }
    });

    test('returns a board coordinate that is adjacent and inline with existing unsunk hits on the computer board', () => {
      const board = mockBoard;
      const computerPlayer = ComputerPlayer(board);
      const printedHumanBoard = [
        ['X', '', '', '', '', '', '', '', '', ''],
        ['X', '', '', 'x', '', '', '', '', '', ''],
        ['X', '', '', 'x', '', '', '', '', '', ''],
        ['X', '', '', '', '', '', '', '', '', ''],
        ['X', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ];
      const validCoordinates = [[0, 3], [3, 3]];
  
      for (let i = 0; i < 25; i++) {
        const coordinate = computerPlayer.attack(printedHumanBoard, 1);
        expect(isCoordinateInArray(coordinate, validCoordinates)).toBe(true);
      }
    });

    test('if there are no other unsunk hits on the board, returns a random board coordinate that hasnt been attacked', () => {
      const board = mockBoard;
      const computerPlayer = ComputerPlayer(board);
      const printedHumanBoard = [
        ['X', '', '', '', '', '', '', '', '', ''],
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

      const coordinate = computerPlayer.attack(printedHumanBoard, 1);

      const invalidAttackCoordinates = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];
  
      for (let i = 0; i < 25; i++) {
        const coordinate = computerPlayer.attack(printedHumanBoard, 0);
        expect(hasBeenAttacked(coordinate, invalidAttackCoordinates)).toBe(false);
      }
    });

  });

});

function hasBeenAttacked(coordinate, attackHistory) {
  let result = false;

  attackHistory.forEach((attackedCoordinate) => {
    if (attackedCoordinate[0] === coordinate[0] && attackedCoordinate[1] === coordinate[1]) {
      result = true;
    }
  });

  return result;
}

function isCoordinateInArray(coordinate, array) {
  let result = false;

  array.forEach((element) => {
    if (element[0] === coordinate[0] && element[1] === coordinate[1]) {
      result = true;
    }
  });

  return result;
}