function Player(n) {
  const name = n;

  const randomPlay = (matrix, line1, col1, line2, col2) => {
    let rLine = line1;
    let rCol = col1;
    let position = matrix[rLine][rCol];

    if (position === 'hit' || position === 'missed') {
      rLine = line2;
      rCol = col2;
      position = matrix[rLine][rCol];
      if (position === 'carrier' || position === 'battleship' || position === 'destroyer' || position === 'submarine' || position === 'patrol') {
        matrix[rLine][rCol] = 'hit';
      } else if (position === 0) {
        matrix[rLine][rCol] = 'missed';
      }
    } else if (position === 'carrier' || position === 'battleship' || position === 'destroyer' || position === 'submarine' || position === 'patrol') {
      matrix[rLine][rCol] = 'hit';
      throw Error('ship');
    } else if (position === 0) {
      matrix[rLine][rCol] = 'missed';
    }
  };

  return { randomPlay };
}

const player1 = Player();

export default player1;
