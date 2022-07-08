import GameBoard from './gameboard';

export default (function dom() {
  const select = {
    grid1Div: document.querySelector('.grid-1'),
    grid2Div: document.querySelector('.grid-2'),
    randomBtn: document.querySelector('.randomize'),
  };

  function renderBoard(matrix, div, player, array) {
    select.grid1Div.textContent = '';
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-coord', `${i}${j}`);
        square.setAttribute('data-line', i);
        square.setAttribute('data-col', j);
        div.append(square);
        if (player === 'player') {
          array.push(square);
          if (matrix[i][j] === 'carrier' || matrix[i][j] === 'battleship' || matrix[i][j] === 'destroyer' || matrix[i][j] === 'submarine' || matrix[i][j] === 'patrol') {
            square.style.background = 'brown';
          }
        } else if (player === 'machine') {
          array.push(square);
        }
      }
    }
  }

  return {
    select, renderBoard,
  };
}());
