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

const map = () => {
  const [hiddenMap, hiddenCells] = createMap();
  const [visibleMap, visibleCells] = createMap();

  const getHiddenMap = () => hiddenMap;

  const getVisibleMap = () => visibleMap;

  const attack = (coords, hitStatus) => {
    const [x, y] = coords;
    if (hitStatus === 'hit') {
      hiddenCells[y][x].classList.toggle('hit');
      visibleCells[y][x].classList.toggle('hit');
    } else {
      hiddenCells[y][x].classList.toggle('miss');
      visibleCells[y][x].classList.toggle('miss');
    }
  };
};

export { createMap, map };
