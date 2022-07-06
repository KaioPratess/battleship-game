/* eslint-disable no-plusplus */
import board1 from '../gameboard';

test('Place Ship', () => {
  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));

  board1.placeShip(grid, 0, 3, 'patrol', 4, 'y');

  expect(grid[0][3] && grid[1][3] && grid[2][3] && grid[3][3]).toBe('patrol');
});
