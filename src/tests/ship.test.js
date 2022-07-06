/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import Ship from '../ship';

test('The ship was hit', () => {
  const array = [0, 0, 0];
  const hit = (i) => {
    array[i] = 'hit';
  };
  hit(0);
  expect(array).toEqual(['hit', 0, 0]);
});
