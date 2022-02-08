import Ship from '../src/ship';

describe('ship constructor', () => {
  test('when called with a length integer, returns object with damage array property', () => {
    const ship = new Ship(4);

    expect(ship.damage).toEqual([0, 0, 0, 0]);
  });
});

describe('ship object', () => {
  describe('hit()', () => {
    test('when called with integer value representing damage at particular location of the ship, it updates the damage array property', () => {
      const ship = new Ship(4);
      ship.hit(3);

      expect(ship.damage).toEqual([0, 0, 0, 1]);
    });
  });
});