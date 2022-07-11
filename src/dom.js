import GameBoard from './gameboard';
import events from './pubSub';

export default (function dom() {
  const select = {
    grid1Div: document.querySelector('.grid-1'),
    grid2Div: document.querySelector('.grid-2'),
    resetGameDiv: document.querySelector('.reset-game'),
    gameResultH2: document.querySelector('.game-result'),
    restartButton: document.querySelector('.restart-btn'),
    ships: document.querySelectorAll('.ship'),
    shipsDiv: document.querySelector('.ships'),
    initialGrid: document.querySelector('.initial-grid'),
    randomBtn: document.querySelector('.randomize-btn'),
    resetBtn: document.querySelector('.reset-btn'),
    rotateBtn: document.querySelector('.rotate-btn'),
    startBtn: document.querySelector('.start-btn'),
    initialBg: document.querySelector('.initial-screen-bg'),
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
        if (player === 'player' || player === 'initial') {
          array.push(square);
          if (matrix[i][j] === 'pcarrier' || matrix[i][j] === 'pbattleship' || matrix[i][j] === 'pdestroyer' || matrix[i][j] === 'psubmarine' || matrix[i][j] === 'ppatrol') {
            square.style.background = 'grey';
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
