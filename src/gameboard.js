/* eslint-disable no-plusplus */
import * as ships from './ship';
import events from './pubSub';

function GameBoard() {
  const matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));

  const sunkShips = [];

  const placeShip = (grid, line, col, name, size, axis) => {
    const position = grid[line][col];
    if (position === 0) {
      if (axis === 'x' && (size + col) <= grid[line].length) {
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
          events.publish('unavailable', `${name}, ${size}, ${axis}`);
        }
      } else if (axis === 'y' && (size + line) <= grid.length) {
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
          events.publish('unavailable', `${name}, ${size}, ${axis}`);
        }
      } else {
        events.publish('unavailable', `${name}, ${size}, ${axis}`);
      }
    } else {
      events.publish('unavailable', `${name}, ${size}, ${axis}`);
    }
  };

  const receiveAttack = (grid, line, col) => {
    const position = grid[line][col];
    if (position !== 0 && position !== 1) {
      ships[position].hit(0);
    } else {
      grid[line][col] = 1;
    }
  };

  return { placeShip, receiveAttack, matrix };
}

export default GameBoard;
