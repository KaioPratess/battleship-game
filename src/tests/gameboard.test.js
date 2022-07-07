/* eslint-disable no-plusplus */
import board1 from '../gameboard';

const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));
grid[0][0] = 'patrol';
grid[0][1] = 'patrol';
grid[0][2] = 'patrol';

test('Place Ship', () => {
  board1.placeShip(grid, 0, 3, 'patrol', 4, 'y');

  expect(grid[0][3] && grid[1][3] && grid[2][3] && grid[3][3]).toBe('patrol');
});

// test('Receive Attack', () => {
//   board1.receiveAttack(grid, 0, 0);
//   board1.receiveAttack(grid, 0, 1);
//   board1.receiveAttack(grid, 0, 2);

//   expect(grid[0][0] && grid[0][1] && grid[0][2]).toBe('hit');

// });
