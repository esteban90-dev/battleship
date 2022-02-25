import GameController from '../src/game-controller';

let humanBoard;
let computerBoard;
let computerPlayer;
let display;
let gameController;
let printedComputerBoard;
let printedHumanBoard;
let shipCoordinates;

describe('instantiation', () => {

  test('it throws an error if called without arguments', () => {
    expect(() => { GameController() }).toThrow('computer player, human board, and display objects must be provided');
  });

  test('it throws an error if computer player doesnt respond to getBoard()', () => {
    const computerPlayer = {};
    const humanBoard = {};
    const display = {};

    expect(() => { GameController(computerPlayer, humanBoard, display) }).toThrow('computer player must respond to getBoard() method');
  });

  test('it throws an error if humanBoard doesnt respond to receiveAttack()', () => {
    const computerPlayer = { getBoard: () => {} };
    const humanBoard = {};
    const display = {};

    expect(() => { GameController(computerPlayer, humanBoard, display) }).toThrow('human board must respond to receiveAttack() method');
  });

  test('it throws an error if display doesnt respond to renderHumanBoard()', () => {
    const computerPlayer = { getBoard: () => {} };
    const humanBoard = { receiveAttack: () => {} };
    const display = {};

    expect(() => { GameController(computerPlayer, humanBoard, display) }).toThrow('display must respond to renderHumanBoard() method');
  });

});

describe('init()', () => {

  beforeEach(() => {
    humanBoard = { 
      receiveAttack: () => {},
      print: () => 'printed human board',
      getShips: () => [],
    };

    computerBoard = {
      receiveAttack: () => {},
      print: () => 'printed computer board',
      getShips: () => [],
    };

    computerPlayer = { getBoard: () => computerBoard };

    display = {
      renderHumanBoard: jest.fn((printedHumanBoard) => {}),
      renderComputerBoard: jest.fn((printedComputerBoard) => {}),
    }

    gameController = GameController(computerPlayer, humanBoard, display);
    printedComputerBoard = computerBoard.print();
    printedHumanBoard = humanBoard.print();
    shipCoordinates = [];
  });

  test('it calls display.renderHumanBoard() with the printed human board and ship coordinates', () => {
    gameController.init();

    expect(display.renderHumanBoard).toHaveBeenCalledWith(printedHumanBoard, shipCoordinates);
  });

  test('it calls display.renderComputerBoard() with the printed computer board', () => {
    gameController.init();

    expect(display.renderComputerBoard).toHaveBeenCalledWith(printedComputerBoard);
  });

});

describe('receivePlacement()', () => {

  beforeEach(() => {
    humanBoard = { 
      placeShip: jest.fn((coordinates) => {}),
      receiveAttack: () => {},
      getShips: () => [],
      print: () => 'printed human board',
    };

    computerBoard = {};
    computerPlayer = { getBoard: () => computerBoard };
    printedHumanBoard = humanBoard.print();

    display = {
      renderHumanBoard: jest.fn((printedHumanBoard, shipCoordinates) => {}),
      renderComputerBoard: jest.fn((printedComputerBoard) => {}),
    }

    gameController = GameController(computerPlayer, humanBoard, display);

  });

  test('it calls the human boards placeShip() method', () => {
    const shipCoordinates = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];

    gameController.receivePlacement(shipCoordinates);

    expect(humanBoard.placeShip).toHaveBeenCalledWith(shipCoordinates);
  });

  test('it calls display.renderHumanBoard() with the printed human board and ship coordinates', () => {
    const shipCoordinates = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];

    gameController.receivePlacement(shipCoordinates);

    expect(display.renderHumanBoard).toHaveBeenCalledWith(printedHumanBoard, []);
  });

});

