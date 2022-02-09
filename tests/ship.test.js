import Ship from '../src/ship';

describe('ship instantiation', () => {
  test('raises an error when called without length argument', () => {
    expect(() => Ship()).toThrow('length argument must be a positive integer value');
  })

  test('does not raise error when called with proper length argument', () => {
    expect(() => Ship(3)).not.toThrow();
  });
})

describe('ship.getDamage()', () => {
  test('returns damage array', () => {
    const ship = Ship(4);

    expect(ship.getDamage()).toEqual([0, 0, 0, 0]);
  });
});

describe('ship.hit()', () => {
  test('when called with integer value representing damage at particular location of the ship, it updates the damage property', () => {
    const ship = Ship(4);

    ship.hit(3);

    expect(ship.getDamage()).toEqual([0, 0, 0, 1]);
  });
});

describe('ship.isSunk()', () => {
  test('returns true if each item in the damage array is 1', () => {
    const ship = Ship(4);

    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);

    expect(ship.isSunk()).toBe(true);
  });

  test('returns false if any item in the damage array is not 1', () => {
    const ship = Ship(4);
    
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);

    expect(ship.isSunk()).toBe(false);
  });
});