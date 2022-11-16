const createMap = () => {
  const board = document.createElement('div');
  const cellsArray = [];

  board.classList.toggle('board');

  for (let y = 0; y < 10; y += 1) {
    const tempArray = [];
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement('div');
      cell.classList.toggle('cell');
      cell.setAttribute('data-x', x);
      cell.setAttribute('data-y', y);
      board.appendChild(cell);
      tempArray.push(cell);
    }
    cellsArray.push(tempArray);
  }

  return [board, cellsArray];
};

export default createMap;
