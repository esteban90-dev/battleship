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

  describe('isSunk()', () => {
    test('returns true if each item in the damage array is 1', () => {
      const ship = new Ship(4);

      ship.hit(0);
      ship.hit(1);
      ship.hit(2);
      ship.hit(3);

      expect(ship.isSunk()).toBe(true);
    });

    test('returns false if any item in the damage array is not 1', () => {
      const ship = new Ship(4);
      
      ship.hit(0);
      ship.hit(1);
      ship.hit(2);

      expect(ship.isSunk()).toBe(false);
    });
  });
});