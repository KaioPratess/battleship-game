function Ship(size) {
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
    hit,
  };
}

const carrier = Ship(5);
const battleship = Ship(4);
const destroyer = Ship(3);
const submarine = Ship(3);
const patrol = Ship(2);

export {
  carrier, battleship, destroyer, submarine, patrol,
};
