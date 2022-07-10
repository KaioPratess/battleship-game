import events from './pubSub';

function Player(n) {
  const name = n;

  const randomPlay = (matrix) => {
    let rLine = Math.floor(Math.random() * 10);
    let rCol = Math.floor(Math.random() * 10);
    let position = matrix[rLine][rCol];

    if (position === 'hit' || position === 1) {
      while (position === 'hit' || position === 1) {
        rLine = Math.floor(Math.random() * 10);
        rCol = Math.floor(Math.random() * 10);
        position = matrix[rLine][rCol];
      }
      if (position === 'pcarrier' || position === 'pbattleship' || position === 'pdestroyer' || position === 'psubmarine' || position === 'ppatrol') {
        events.publish('attack', { rLine, rCol });
        matrix[rLine][rCol] = 'hit';
      } else if (position === 0) {
        events.publish('attack', { rLine, rCol });
        matrix[rLine][rCol] = 1;
      }
    } else if (position === 'pcarrier' || position === 'pbattleship' || position === 'pdestroyer' || position === 'psubmarine' || position === 'ppatrol') {
      events.publish('attack', { rLine, rCol });
      matrix[rLine][rCol] = 'hit';
    } else if (position === 0) {
      events.publish('attack', { rLine, rCol });
      matrix[rLine][rCol] = 1;
    }
  };

  return { randomPlay };
}

export default Player;
