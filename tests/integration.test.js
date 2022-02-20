import Ship from '../src/ship';
import GameBoard from '../src/gameboard';
import Game from '../src/game';
import ComputerPlayer from '../src/computer-player';
import HumanPlayer from '../src/human-player';
import Display from '../src/display.js';
import DisplayController from '../src/display-controller.js';

let shipFactory;
let computerBoard;
let computerPlayer;
let humanBoard;
let humanPlayer;
let game;
let display;
let displayController;

beforeEach(() => {
  shipFactory = Ship;
  computerBoard = GameBoard(shipFactory);
  computerPlayer = ComputerPlayer(computerBoard);
  humanBoard = GameBoard(shipFactory);
  humanPlayer = HumanPlayer(humanBoard);
  game = Game(humanPlayer, computerPlayer);
  display = Display;
  display.render = jest.fn(() => {});  // mock display.render
  displayController = DisplayController(game, display);
});

describe('game starts', () => {

  test('display.render() is called with an object that shows the human and computer ship positions', () => {
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
    };

    displayController.handleStart();

    expect(display.render).toHaveBeenCalledWith(expected);
  });

});

describe('human makes an attack on computer and computer reponds with attack on human', () => {

  test('display.render() is called with an object that shows the printed human board, the printed computer board, and the winner status', () => {
    // stub out computerPlayer.attack() since this normally responds with random coordinates
    computerPlayer.attack = () => [5, 5];

    const expected = {
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
    }

    displayController.handleStart();
    displayController.handleAttack([0, 0]);

    expect(display.render).toHaveBeenCalledWith(expected);
  });

});