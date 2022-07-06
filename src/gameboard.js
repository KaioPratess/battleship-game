function GameBoard() {
  const matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));

  const placeShip = (grid, line, col, name, size, axis) => {
    const position = grid[line][col];
    if (position === 0) {
      if (axis === 'x' && (size + col) <= grid[line].length - 1) {
        const verificationArray = [];
        for (let i = col; i <= (size + col) - 1; i++) {
          if (grid[line][i] === 0) {
            verificationArray.push(0);
          }
        }
        if (verificationArray.length === size && verificationArray.every((x) => x === 0)) {
          for (let i = col; i <= (size + col) - 1; i++) {
            grid[line][i] = name;
          }
        } else {
          throw Error('adjacent spots unavailable');
        }
      } else if (axis === 'y' && (size + line) <= grid.length - 1) {
        const verificationArray = [];
        for (let i = line; i <= (size + line) - 1; i++) {
          if (grid[i][col] === 0) {
            verificationArray.push(0);
          }
        }
        if (verificationArray.length === size && verificationArray.every((x) => x === 0)) {
          for (let i = line; i <= (size + line) - 1; i++) {
            grid[i][col] = name;
          }
        } else {
          throw Error('adjacent spots unavailable');
        }
      }
    } else {
      throw Error('spot unavailable');
    }
  };

  return { placeShip };
}

const board1 = GameBoard();

export default board1;
