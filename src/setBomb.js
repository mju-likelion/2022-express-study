const { random } = require("lodash");

function setBomb(field, bombCount) {
  const width = field[0].length;
  const height = field.length;

  let count = 0;
  while (count < bombCount) {
    const x = random(0, height - 1);
    const y = random(0, width - 1);

    if (field[x][y] !== "*") {
      field[x][y] = "*";
      count++;
    }
  }
}

module.exports = setBomb;
