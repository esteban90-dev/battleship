import Ship from '../src/ship';
import GameBoard from '../src/gameboard';
import Game from '../src/game';
import ComputerPlayer from '../src/computer-player';
import HumanPlayer from '../src/human-player';

let shipFactory;
let computerBoard;
let computerPlayer;
let humanBoard;
let humanPlayer;
let game;

beforeEach(() => {
  shipFactory = Ship;
  computerBoard = GameBoard(shipFactory);
  computerPlayer = ComputerPlayer(computerBoard);
  humanBoard = GameBoard(shipFactory);
  humanPlayer = HumanPlayer(humanBoard);
  game = Game(humanPlayer, computerPlayer);
});

describe('game.initialize()', () => {

  test('a reponse object is returned that shows the humans ship positions', () => {
    const expected = [
      [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
      [[5, 0], [5, 1], [5, 2], [5, 3]],
      [[0, 9], [1, 9], [2, 9]],
      [[7, 7], [8, 7], [9, 7]],
      [[9, 5], [9, 6]],
    ];

    expect(game.initialize().humanShipCoordinates).toEqual(expected);
  });

  test('a reponse object is returned that shows the computers ship positions', () => {
    const expected = [
      [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
      [[0, 9], [1, 9], [2, 9], [3, 9]],
      [[2, 2], [2, 3], [2, 4]],
      [[8, 7], [8, 8], [8, 9]],
      [[9, 5], [9, 6]],
    ];

    expect(game.initialize().computerShipCoordinates).toEqual(expected);
  });

});

describe('game.turn()', () => {

  describe('human makes an attack on the computers board', () => {

    test('a reponse object is returned that shows the computers board following the attack', () => {
      const expected = [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', 'x', '', '', '', ''],
    ];
      game.initialize();

      expect(game.turn([9, 5]).computerBoard).toEqual(expected);
    });

  });

  describe('human makes an attack on the computers board, and computer responds with an attack on the humans board', () => {

    test('a reponse object is returned that shows the humans board following the attack', () => {
      game.initialize();
      
      // we don't know where the computer will attack
      // just make sure an 'x' or an 'o' appears on the human's board
      const wasAttacked = game.turn([9, 5]).humanBoard.some(array => array.includes('x') || array.includes('o'));
      expect(wasAttacked).toEqual(true);
    });

  });

});