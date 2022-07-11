import GameBoard from './gameboard';
import * as ships from './ship';
import Player from './player';
import dom from './dom';
import events from './pubSub';

export default (function gameLoop() {
  const newGame = () => {
    // create boards
    const playerBoard = GameBoard();
    const machineBoard = GameBoard();

    const playerSquares = [];
    const machineSquares = [];

    // place ships
    playerBoard.placeShip(playerBoard.matrix, 'pcarrier', 5, 'x');
    playerBoard.placeShip(playerBoard.matrix, 'pbattleship', 4, 'y');
    playerBoard.placeShip(playerBoard.matrix, 'pdestroyer', 3, 'x');
    playerBoard.placeShip(playerBoard.matrix, 'psubmarine', 3, 'y');
    playerBoard.placeShip(playerBoard.matrix, 'ppatrol', 2, 'x');

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    dom.select.randomBtn.addEventListener('click', (event) => {
      playerBoard.matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));
      machineBoard.matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));
      const axis = ['x', 'y'];
      playerBoard.placeShip(playerBoard.matrix, 'pcarrier', 5, axis[randomInteger(0, 1)]);
      playerBoard.placeShip(playerBoard.matrix, 'pbattleship', 4, axis[randomInteger(0, 1)]);
      playerBoard.placeShip(playerBoard.matrix, 'pdestroyer', 3, axis[randomInteger(0, 1)]);
      playerBoard.placeShip(playerBoard.matrix, 'psubmarine', 3, axis[randomInteger(0, 1)]);
      playerBoard.placeShip(playerBoard.matrix, 'ppatrol', 2, axis[randomInteger(0, 1)]);

      dom.renderBoard(playerBoard.matrix, dom.select.grid1Div, 'player', playerSquares);
    });

    machineBoard.placeShip(machineBoard.matrix, 'mcarrier', 5, 'x');
    machineBoard.placeShip(machineBoard.matrix, 'mbattleship', 4, 'y');
    machineBoard.placeShip(machineBoard.matrix, 'mdestroyer', 3, 'x');
    machineBoard.placeShip(machineBoard.matrix, 'msubmarine', 3, 'x');
    machineBoard.placeShip(machineBoard.matrix, 'mpatrol', 2, 'x');

    dom.renderBoard(machineBoard.matrix, dom.select.grid2Div, 'machine', machineSquares);
    dom.renderBoard(playerBoard.matrix, dom.select.grid1Div, 'player', playerSquares);

    // rounds
    machineSquares.forEach((sqr) => {
      sqr.style.cursor = 'crosshair';
      sqr.addEventListener('mouseenter', () => {
        const line = +sqr.getAttribute('data-line');
        const col = +sqr.getAttribute('data-col');
        const { background } = sqr.style;
        if (machineBoard.matrix[line][col] === 1 || background === 'grey' || background === 'red') {
          sqr.style.cursor = 'not-allowed';
          console.log('occupied');
        }
      });
      sqr.addEventListener('click', () => {
        const line = +sqr.getAttribute('data-line');
        const col = +sqr.getAttribute('data-col');
        const { background } = sqr.style;
        if (machineBoard.matrix[line][col] !== 1 && background !== 'grey' && background !== 'red') {
          events.publish('machineTurn', '');
          machineBoard.receiveAttack(machineBoard.matrix, line, col, machineSquares);
        }
      });
    });

    const machine = Player('Machine');
    events.subscribe('machineTurn', events.events, () => {
      machine.randomPlay(playerBoard.matrix);
    });

    events.subscribe('attack', events.events, (values) => {
      playerBoard.receiveAttack(playerBoard.matrix, values.rLine, values.rCol, playerSquares);
    });
  };

  dom.select.restartButton.addEventListener('click', () => {
    window.location.reload();
  });

  newGame();
}());
