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

describe('game.initialize()', () => {

  beforeEach(() => {
    shipFactory = Ship;
    computerBoard = GameBoard(shipFactory);
    computerPlayer = ComputerPlayer(computerBoard);
    humanBoard = GameBoard(shipFactory);
    humanPlayer = HumanPlayer(humanBoard);
    game = Game(humanPlayer, computerPlayer);
  });

  test('it places a carrier, battleship, cruiser, submarine, and destroyer on the computer players board', () => {
    game.initialize();

    const shipLengths = computerBoard.getShips().map((shipEntry) => shipEntry.coordinates.length);

    expect(shipLengths.sort()).toEqual([2, 3, 3, 4, 5]);
  });

  test('it places a carrier, battleship, cruiser, submarine, and destroyer on the human players board', () => {
    game.initialize();

    const shipLengths = humanBoard.getShips().map((shipEntry) => shipEntry.coordinates.length);

    expect(shipLengths.sort()).toEqual([2, 3, 3, 4, 5]);
  });

});