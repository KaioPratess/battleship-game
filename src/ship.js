function Ship(n, size) {
  const name = n;
  const length = new Array(size).fill().map((_, index) => index);
  // eslint-disable-next-line no-unused-vars
  let sunk = false;

  const isSunk = () => {
    if (length.every((part) => part === 'hit')) {
      sunk = true;
    }
  };

  const hit = (a, i) => {
    const array = a;
    array[i] = 'hit';
    isSunk();
  };

  return {
    hit, length, sunk, name,
  };
}

const carrier = Ship('carrier', 5);
const battleship = Ship('battleship', 4);
const destroyer = Ship('destroyer', 3);
const submarine = Ship('submarine', 3);
const patrol = Ship('patrol', 2);

export {
  carrier, battleship, destroyer, submarine, patrol,
};
