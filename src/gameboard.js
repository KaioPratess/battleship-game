/* eslint-disable no-plusplus */
import * as ships from './ship';
import events from './pubSub';
import dom from './dom';

function GameBoard() {
  const matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));

  const placeShip = (grid, name, size, axis) => {
    const line = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
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
          placeShip(grid, name, size, axis);
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
          placeShip(grid, name, size, axis);
        }
      } else {
        placeShip(grid, name, size, axis);
      }
    } else {
      placeShip(grid, name, size, axis);
    }
  };

  const receiveAttack = (grid, line, col, array) => {
    const position = grid[line][col];
    if (position !== 0 && position !== 1) {
      ships[position].hit();
      array.forEach((item) => {
        const l = item.getAttribute('data-line');
        const c = item.getAttribute('data-col');
        if (l == line && c == col) {
          item.style.background = 'red';
        }
      });
    } else {
      grid[line][col] = 1;
      array.forEach((item) => {
        const l = item.getAttribute('data-line');
        const c = item.getAttribute('data-col');
        if (l == line && c == col) {
          item.style.background = 'blue';
        }
      });
    }
  };

  const psunkShips = [];
  const msunkShips = [];

  events.subscribe('sunk', events.events, (name) => {
    if (name.slice(0, 1) === 'p') {
      psunkShips.push(name);
    } else if (name.slice(0, 1) === 'm') {
      msunkShips.push(name);
    }
    if (psunkShips.length === 5) {
      dom.select.gameResultH2.textContent = 'You lost! The machine beat you';
      dom.select.resetGameDiv.style.display = 'flex';
    } else if (msunkShips.length === 5) {
      dom.select.resetGameDiv.style.display = 'flex';
      dom.select.gameResultH2.textContent = 'Congrats! You beat the Machine';
    }
  });

  return { placeShip, receiveAttack, matrix };
}

export default GameBoard;
