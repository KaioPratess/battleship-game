import GameBoard from './gameboard';

export default (function dom() {
  const select = {
    grid1Div: document.querySelector('.grid-1'),
    grid2Div: document.querySelector('.grid-2'),
    randomBtn: document.querySelector('.randomize'),
    resetGameDiv: document.querySelector('.reset-game'),
    gameResultH2: document.querySelector('.game-result'),
    restartButton: document.querySelector('.restart-btn'),
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
          if (matrix[i][j] === 'pcarrier' || matrix[i][j] === 'pbattleship' || matrix[i][j] === 'pdestroyer' || matrix[i][j] === 'psubmarine' || matrix[i][j] === 'ppatrol') {
            square.style.background = 'green';
          }
        } else if (player === 'machine') {
          array.push(square);
          if (matrix[i][j] === 'mcarrier' || matrix[i][j] === 'mbattleship' || matrix[i][j] === 'mdestroyer' || matrix[i][j] === 'msubmarine' || matrix[i][j] === 'mpatrol') {
            // square.style.background = 'aqua';
          }
        }
      }
    }
  }

  return {
    select, renderBoard,
  };
}());
