const Gameboard = () => {
  const cells = (() => {
    const array = [];
    for (let y = 0; y < 10; y += 1) {
      const temp = [];
      for (let x = 0; x < 10; x += 1) {
        temp.push(null);
      }
      array.push(temp);
    }
    return array;
  })();

  const placeShip = (ship, coords, orientation) => {
    let [x, y] = coords;
    const coordinates = [];
    for (let i = 0; i < ship.getLength(); i += 1) {
      coordinates.push([x, y]);
      cells[y][x] = ship;
      if (orientation === 'right') x += 1;
      else y += 1;
      if (x > 9 || y > 9) return false;
    }
    return true;
  };

  return { placeShip };
};

export default Gameboard;
