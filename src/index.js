import Ship from './ship';
import GameBoard from './gameboard';
import ComputerPlayer from './computer-player';
import GameController from './game-controller';
import Display from './display';

const ship = Ship;
const computerBoard = GameBoard(ship);
const computerPlayer = ComputerPlayer(computerBoard);
const humanBoard = GameBoard(ship);
const display = Display();
const gameController = GameController(computerPlayer, humanBoard, display);

gameController.init();