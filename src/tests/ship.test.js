/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import {
  carrier, battleship, destroyer, submarine, patrol,
} from '../ship';

test('The ship was hit', () => {
  const array = [0, 0, 0];
  carrier.hit(array, 0);
  expect(array).toEqual(['hit', 0, 0]);
});
