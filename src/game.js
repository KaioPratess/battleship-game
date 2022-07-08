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
    playerBoard.placeShip(playerBoard.matrix, 5, 3, 'carrier', 5, 'x');
    playerBoard.placeShip(playerBoard.matrix, 0, 0, 'battleship', 4, 'y');
    playerBoard.placeShip(playerBoard.matrix, 0, 7, 'destroyer', 3, 'x');
    playerBoard.placeShip(playerBoard.matrix, 8, 4, 'submarine', 3, 'x');
    playerBoard.placeShip(playerBoard.matrix, 9, 2, 'patrol', 2, 'x');

    machineBoard.placeShip(machineBoard.matrix, 5, 3, 'carrier', 5, 'x');
    machineBoard.placeShip(machineBoard.matrix, 0, 0, 'battleship', 4, 'y');
    machineBoard.placeShip(machineBoard.matrix, 0, 7, 'destroyer', 3, 'x');
    machineBoard.placeShip(machineBoard.matrix, 8, 4, 'submarine', 3, 'x');
    machineBoard.placeShip(machineBoard.matrix, 9, 2, 'patrol', 2, 'x');

    dom.renderBoard(machineBoard.matrix, dom.select.grid2Div, 'machine', machineSquares);
    dom.renderBoard(playerBoard.matrix, dom.select.grid1Div, 'player', playerSquares);

    // rounds
    machineSquares.forEach((sqr) => {
      sqr.style.cursor = 'crosshair';
      sqr.addEventListener('click', (event) => {
        const line = +sqr.getAttribute('data-line');
        const col = +sqr.getAttribute('data-col');
        machineBoard.receiveAttack(machineBoard.matrix, line, col, machineSquares);
        events.publish('machineTurn', '');
      });
    });

    const machine = Player('Machine');
    events.subscribe('machineTurn', events.events, () => {
      machine.randomPlay(playerBoard.matrix);
      events.subscribe('attack', events.events, (values) => {
        console.log(values);
        playerBoard.receiveAttack(playerBoard.matrix, values.rLine, values.rCol, playerSquares);
      });
    });
  };

  newGame();
}());
