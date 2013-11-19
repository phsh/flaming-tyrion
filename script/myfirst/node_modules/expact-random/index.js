/**
 * Get a random number between min and max.
 */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Get a random int between min and max.
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.random = random;
module.exports.randomInt = randomInt;

