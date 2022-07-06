function GameBoard() {
  const grid = new Array(10).fill(0).map(() => new Array(10).fill(0));

  return { grid };
}

export default GameBoard;
