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
      console.log(length, name);
      isSunk();
    }
  };

  return {
    hit, length, sunk, name,
  };
}

const mcarrier = Ship('mcarrier', 5);
const mbattleship = Ship('mbattleship', 4);
const mdestroyer = Ship('mdestroyer', 3);
const msubmarine = Ship('msubmarine', 3);
const mpatrol = Ship('mpatrol', 2);

const pcarrier = Ship('pcarrier', 5);
const pbattleship = Ship('pbattleship', 4);
const pdestroyer = Ship('pdestroyer', 3);
const psubmarine = Ship('psubmarine', 3);
const ppatrol = Ship('ppatrol', 2);

export {
  mcarrier, mbattleship, mdestroyer, msubmarine, mpatrol, pcarrier, pbattleship, pdestroyer,
  psubmarine, ppatrol,
};
