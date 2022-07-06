function Ship(size) {
  const length = new Array(size).fill('0');
  // eslint-disable-next-line no-unused-vars
  let sunk = false;

  const isSunk = () => {
    if (length.every((part) => part === 'hit')) {
      sunk = true;
    }
  };

  const hit = (i) => {
    length[i] = 'hit';
    isSunk();
  };

  return {
    hit,
  };
}

export default Ship;
