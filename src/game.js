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
    playerBoard.placeShip(playerBoard.matrix, 5, 3, 'pcarrier', 5, 'x');
    playerBoard.placeShip(playerBoard.matrix, 0, 0, 'pbattleship', 4, 'y');
    playerBoard.placeShip(playerBoard.matrix, 0, 7, 'pdestroyer', 3, 'x');
    playerBoard.placeShip(playerBoard.matrix, 8, 4, 'psubmarine', 3, 'x');
    playerBoard.placeShip(playerBoard.matrix, 9, 2, 'ppatrol', 2, 'x');

    machineBoard.placeShip(machineBoard.matrix, 5, 3, 'mcarrier', 5, 'x');
    machineBoard.placeShip(machineBoard.matrix, 0, 0, 'mbattleship', 4, 'y');
    machineBoard.placeShip(machineBoard.matrix, 0, 7, 'mdestroyer', 3, 'x');
    machineBoard.placeShip(machineBoard.matrix, 8, 4, 'msubmarine', 3, 'x');
    machineBoard.placeShip(machineBoard.matrix, 9, 2, 'mpatrol', 2, 'x');

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
