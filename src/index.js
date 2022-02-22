import Ship from './ship';
import GameBoard from './gameboard';
import HumanPlayer from './human-player';
import ComputerPlayer from './computer-player';
import Game from './game';
import DisplayController from './display-controller';
import Display from './display';

const shipFactory = Ship;
const computerBoard = GameBoard(shipFactory);
const humanBoard = GameBoard(shipFactory);
const computerPlayer = ComputerPlayer(computerBoard);
const humanPlayer = HumanPlayer(humanBoard);
const game = Game(humanPlayer, computerPlayer);
const display = Display();
const displayController = DisplayController(game, display);