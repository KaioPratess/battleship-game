function Player(n) {
  const name = n;

  const randomPlay = (matrix) => {
    let rLine = Math.floor(Math.random() * 10);
    let rCol = Math.floor(Math.random() * 10);
    let position = matrix[rLine][rCol];

    if (position === 'hit' || position === 'missed') {
      do {
        rLine = Math.floor(Math.random() * 10);
        rCol = Math.floor(Math.random() * 10);
        position = matrix[rLine][rCol];
      } while (position === 'hit' || position === 'missed');

      if (position === 'carrier' || position === 'battleship' || position === 'destroyer' || position === 'submarine' || position === 'patrol') {
        matrix[rLine][rCol] = 'hit';
      } else if (position === 0) {
        matrix[rLine][rCol] = 'missed';
      }
    } else if (position === 'carrier' || position === 'battleship' || position === 'destroyer' || position === 'submarine' || position === 'patrol') {
      matrix[rLine][rCol] = 'hit';
    } else if (position === 0) {
      matrix[rLine][rCol] = 'missed';
    }
  };

  return { randomPlay };
}

export default Player;
