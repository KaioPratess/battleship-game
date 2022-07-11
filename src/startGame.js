import GameBoard from './gameboard';
import dom from './dom';
import events from './pubSub';
import gameLoop from './game';

export default function startGame() {
  const initialBoard = GameBoard();

  const initialBoardSquares = [];

  dom.renderBoard(initialBoard.matrix, dom.select.initialGrid, 'initial', initialBoardSquares);

  let size = 0;
  let name;
  let axis = 'x';

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  dom.select.randomBtn.addEventListener('click', (event) => {
    for (let i = 0; i < initialBoard.matrix.length; i++) {
      for (let j = 0; j < initialBoard.matrix[i].length; j++) {
        initialBoard.matrix[i][j] = 0;
      }
    }
    dom.select.initialGrid.textContent = '';
    const axis = ['x', 'y'];
    initialBoard.placeShip(initialBoard.matrix, 'pcarrier', 5, axis[randomInteger(0, 1)]);
    initialBoard.placeShip(initialBoard.matrix, 'pbattleship', 4, axis[randomInteger(0, 1)]);
    initialBoard.placeShip(initialBoard.matrix, 'pdestroyer', 3, axis[randomInteger(0, 1)]);
    initialBoard.placeShip(initialBoard.matrix, 'psubmarine', 3, axis[randomInteger(0, 1)]);
    initialBoard.placeShip(initialBoard.matrix, 'ppatrol', 2, axis[randomInteger(0, 1)]);

    dom.renderBoard(initialBoard.matrix, dom.select.initialGrid, 'initial', initialBoardSquares);
    dom.select.shipsDiv.style.display = 'none';
  });

  dom.select.resetBtn.addEventListener('click', () => {
    window.location.reload();
  });

  dom.select.startBtn.addEventListener('click', () => {
    const ships = [];
    for (let i = 0; i < initialBoard.matrix.length; i++) {
      for (let j = 0; j < initialBoard.matrix[i].length; j++) {
        if (initialBoard.matrix[i][j] === 'pcarrier' || initialBoard.matrix[i][j] === 'pdestroyer' || initialBoard.matrix[i][j] === 'pbattleship' || initialBoard.matrix[i][j] === 'psubmarine' || initialBoard.matrix[i][j] === 'ppatrol') {
          ships.push(initialBoard.matrix[i][j]);
        }
      }
    }
    if (ships.includes('pcarrier') && ships.includes('pbattleship') && ships.includes('pdestroyer') && ships.includes('psubmarine') && ships.includes('ppatrol')) {
      dom.select.initialBg.style.display = 'none';
      gameLoop.newGame(initialBoard);
    } else {
      alert('Place your Ships!');
    }
  });

  dom.select.rotateBtn.addEventListener('click', () => {
    if (axis === 'x') {
      axis = 'y';
      dom.select.shipsDiv.classList.add('y');
      dom.select.shipsDiv.classList.remove('x');
    } else {
      axis = 'x';
      dom.select.shipsDiv.classList.add('x');
      dom.select.shipsDiv.classList.remove('y');
    }
  });

  events.subscribe('getSize', events.events, (obj) => {
    size = +obj.s;
    name = obj.n;
  });

  dom.select.ships.forEach((ship) => {
    ship.addEventListener('dragstart', (event) => {
      const n = event.target.getAttribute('id');
      const s = event.target.getAttribute('data-size');
      events.publish('getSize', { n, s });
    });
  });

  initialBoardSquares.forEach((sqr) => {
    sqr.addEventListener('dragenter', (event) => {
      const grid = initialBoard.matrix;
      const line = +event.target.getAttribute('data-line');
      const col = +event.target.getAttribute('data-col');
      if (grid[line][col] !== 0 && sqr.style.background !== 'white') {
        event.target.returnValue = true;
        sqr.addEventListener('dragover', (event) => {
          event.target.returnValue = true;
        });
      }
      if (axis === 'x' && (size + col) <= grid[line].length && grid[line][col] === 0) {
        const verificationArray = [];
        for (let i = col; i <= (size + col) - 1; i++) {
          if (grid[line][i] === 0) {
            verificationArray.push(0);
          }
        }
        if (verificationArray.length === size && verificationArray.every((x) => x === 0)) {
          event.preventDefault();
          sqr.addEventListener('dragover', (event) => {
            event.preventDefault();
          });
        }
      } else if (axis === 'y' && (size + line) <= grid.length) {
        const verificationArray = [];
        for (let i = line; i <= (size + line) - 1; i++) {
          if (grid[i][col] === 0) {
            verificationArray.push(0);
          }
        }
        if (verificationArray.length === size && verificationArray.every((x) => x === 0)) {
          event.preventDefault();
          sqr.addEventListener('dragover', (event) => {
            event.preventDefault();
          });
        }
      }
    });

    sqr.addEventListener('drop', (event) => {
      const grid = initialBoard.matrix;
      const line = +event.target.getAttribute('data-line');
      const col = +event.target.getAttribute('data-col');
      if (axis === 'x') {
        for (let i = col; i <= (size + col) - 1; i++) {
          const squareN = `${line}${i}`;
          grid[line][i] = name;
          initialBoardSquares[+squareN].style.background = 'grey';
        }
      } else if (axis === 'y') {
        for (let i = line; i <= (size + line) - 1; i++) {
          grid[i][col] = name;
          const squareN = `${i}${col}`;
          initialBoardSquares[+squareN].style.background = 'grey';
        }
      }
      dom.select.ships.forEach((ship) => {
        if (ship.getAttribute('id') === name) {
          ship.style.display = 'none';
        }
      });
    });
  });

  return { initialBoard };
}
