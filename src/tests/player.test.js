import player1 from '../player';

const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));
grid[0][0] = 'hit';
grid[1][1] = 'carrier';

test.only('Random Play', () => {
  player1.randomPlay(grid, 0, 0, 1, 1);

  expect(grid[1][1]).toBe('hit');
});
