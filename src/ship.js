const Ship = function (length) {
  if ((!length) || (!Number.isInteger(length)) || (length < 0)) {
    throw new Error('length argument must be a positive integer value');
  }

  const damage = Array(length).fill(0);

  function getDamage() {
    return damage;
  }

  function hit(location) {
    damage[location] = 1;
  }

  function isSunk() {
    return damage.every((item) => item === 1);
  }

  return { getDamage, hit, isSunk };
};

export default Ship;
