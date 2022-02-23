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

  test('a response object is returned that shows the human ship positions, computer ship positions, printed human board, printed computer board, and winner status', () => {
    const expected = {
      humanShipCoordinates: [
        [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
        [[5, 0], [5, 1], [5, 2], [5, 3]],
        [[0, 9], [1, 9], [2, 9]],
        [[7, 7], [8, 7], [9, 7]],
        [[9, 5], [9, 6]]
      ],
      computerShipCoordinates: [
        [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
        [[0, 9], [1, 9], [2, 9], [3, 9]],
        [[2, 2], [2, 3], [2, 4]],
        [[8, 7], [8, 8], [8, 9]],
        [[9, 5], [9, 6]]
      ],
      humanShipsRemaining: 5,
      computerShipsRemaining: 5,
      humanBoard: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ],
      computerBoard: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ],
      winner: null,
    };

    expect(game.initialize()).toEqual(expected);
  });

});

describe('game.turn()', () => {

  test('when called with an attack coordinate, a reponse object is returned that shows the human ship positions, computer ship positions, printed human board, printed computer board, and winner status', () => {
    // stub out computerPlayer.attack() since this normally responds with random coordinates
    computerPlayer.attack = () => [5, 5];

    const expected = {
      humanShipCoordinates: [
        [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]],
        [[5, 0], [5, 1], [5, 2], [5, 3]],
        [[0, 9], [1, 9], [2, 9]],
        [[7, 7], [8, 7], [9, 7]],
        [[9, 5], [9, 6]],
      ],
      computerShipCoordinates: [
        [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
        [[0, 9], [1, 9], [2, 9], [3, 9]],
        [[2, 2], [2, 3], [2, 4]],
        [[8, 7], [8, 8], [8, 9]],
        [[9, 5], [9, 6]],
      ],
      humanShipsRemaining: 5,
      computerShipsRemaining: 5,
      humanBoard: [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', 'o', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ],
      computerBoard: [
        ['x', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
      ],
      winner: null,
    };

    game.initialize();

    expect(game.turn([0, 0])).toEqual(expected);
  });

});