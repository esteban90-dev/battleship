function Ship(length) {
  this.damage = Array(length).fill(0);
}

Ship.prototype.hit = function (location) {
  this.damage[location] = 1;
}

export default Ship;