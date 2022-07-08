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

    dom.renderBoard(machineBoard.matrix, dom.select.grid2Div, 'machine', machineSquares);

    machineSquares.forEach((sqr) => {
      sqr.style.cursor = 'crosshair';
      sqr.addEventListener('mouseenter', () => {
        sqr.style.background = 'lightgreen';
      });
      sqr.addEventListener('mouseout', () => {
        sqr.style.background = 'white';
      });
      sqr.addEventListener('click', () => {
        const line = sqr.getAttribute('data-line');
        const col = sqr.getAttribute('data-col');
        machineBoard.receiveAttack(machineBoard.matrix, line, col);
      });
    });

    // place ships
    dom.renderBoard(playerBoard.matrix, dom.select.grid1Div, 'player', playerSquares);

    function randomCoord(ship, size, axis) {
      const l = Math.floor(Math.random() * 10);
      const c = Math.floor(Math.random() * 10);
      playerBoard.placeShip(playerBoard.matrix, l, c, ship, size, axis);
      dom.renderBoard(playerBoard.matrix, dom.select.grid1Div, 'player', playerSquares);
    }

    dom.select.randomBtn.addEventListener('click', (event) => {
      playerBoard.matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));
      randomCoord('carrier', 5, 'x');
      randomCoord('battleship', 4, 'y');
      randomCoord('destroyer', 3, 'x');
      randomCoord('submarine', 3, 'x');
      randomCoord('patrol', 2, 'y');
    });

    events.subscribe('unavailable', events.events, (values) => {
      const name = values.split(',')[0];
      const size = values.split(',')[1];
      const axis = values.split(',')[2];
      playerBoard.matrix = new Array(10).fill(0).map(() => new Array(10).fill(0));
      randomCoord(name, size, axis);
    });

    // create players
    const machine = Player('Machine');
    const player1 = Player('Player 1');
  };

  newGame();
}());
