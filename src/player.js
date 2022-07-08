import events from './pubSub';

function Player(n) {
  const name = n;

  const randomPlay = (matrix) => {
    let rLine = Math.floor(Math.random() * 10);
    let rCol = Math.floor(Math.random() * 10);
    let position = matrix[rLine][rCol];

    if (position === 'hit' || position === 1) {
      do {
        rLine = Math.floor(Math.random() * 10);
        rCol = Math.floor(Math.random() * 10);
        position = matrix[rLine][rCol];
      } while (position === 'hit' || position === 1);

      if (position === 'carrier' || position === 'battleship' || position === 'destroyer' || position === 'submarine' || position === 'patrol') {
        matrix[rLine][rCol] = position;
      } else if (position === 0) {
        matrix[rLine][rCol] = 1;
      }
    } else if (position === 'carrier' || position === 'battleship' || position === 'destroyer' || position === 'submarine' || position === 'patrol') {
      matrix[rLine][rCol] = position;
      events.publish('attack', { rLine, rCol });
    } else if (position === 0) {
      matrix[rLine][rCol] = 1;
      events.publish('attack', { rLine, rCol });
    }
  };

  return { randomPlay };
}

export default Player;
