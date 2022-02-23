import GameController from '../src/game-controller';

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