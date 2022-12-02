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

const map = (player) => {
  const [hiddenMap, hiddenCells] = createMap();
  const [visibleMap, visibleCells] = createMap();

  // Add ships to visible map
  (() => {
    const ships = player.getBoard().getShips();
    for (let i = 0; i < ships.length; i += 1) {
      let [x, y] = ships[i].getCoord();
      const shipOrient = ships[i].getOrientation();
      for (let j = 0; j < ships[i].getLength(); j += 1) {
        visibleCells[y][x].classList.toggle('ship-placed');
        if (shipOrient === 'right') x += 1;
        else y += 1;
      }
    }
  })();

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

  return { getHiddenMap, getVisibleMap, attack };
};

export { createMap, map };
