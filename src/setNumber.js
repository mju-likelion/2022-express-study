function setNumber(field) {
  const width = field[0].length;
  const height = field.length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const bombCount = calcBombCount(field, i, j);
      if (field[i][j] !== "*" && bombCount) {
        field[i][j] = bombCount;
      }
    }
  }
}

function calcBombCount(field, x, y) {
  const width = field[0].length;
  const height = field.length;
  let bombCount = 0;

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < height && j >= 0 && j < width && field[i][j] === "*") {
        bombCount++;
      }
    }
  }

  return bombCount;
}

module.exports = setNumber;
