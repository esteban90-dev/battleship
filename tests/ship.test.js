import Ship from '../src/ship';

describe('ship constructor', () => {
  test('when called with a length integer, returns object with damage array property', () => {
    const ship = new Ship(4);

    expect(ship.damage).toEqual([0, 0, 0, 0]);
  });
});