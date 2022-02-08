function Ship(length) {
  this.damage = Array(length).fill(0);
}

Ship.prototype.hit = function (location) {
  this.damage[location] = 1;
}

Ship.prototype.isSunk = function() {
  return this.damage.every((item) => item === 1);
}

export default Ship;