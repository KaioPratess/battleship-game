import events from './pubSub';

function Ship(n, size) {
  const name = n;
  const length = [];
  // eslint-disable-next-line no-unused-vars
  let sunk = false;

  const isSunk = () => {
    if (length.length === size && length.every((part) => part === 'hit')) {
      sunk = true;
      events.publish('sunk', name);
    }
  };

  const hit = () => {
    if (length.length < size) {
      length.push('hit');
      isSunk();
    }
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
