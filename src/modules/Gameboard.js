const Gameboard = () => {
  const missedShotsCoords = [];
  const shipsPlaced = [];
  const map = (() => {
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

  const checkCell = (coords) => {
    const [x, y] = coords;
    if (map[y][x] !== null) return false;
    return true;
  };

  const removeShipFromMap = (ship) => {
    for (let y = 0; y < map.length; y += 1) {
      for (let x = 0; x < map.length; x += 1) {
        if (map[y][x] === ship) map[y][x] = null;
      }
    }
  };

  const placeShip = (ship, coords, orientation) => {
    let [x, y] = coords;
    const allCoordinates = [];
    // For loop checks if cells are not occupied and
    // are not outside map
    for (let i = 0; i < ship.getLength(); i += 1) {
      // If coordinates exceed map limits, return false
      if (x > 9 || y > 9) return false;
      // If current cell is occupied, return false
      if (!checkCell([x, y])) return false;
      allCoordinates.push([x, y]);
      if (orientation === 'right') x += 1;
      else y += 1;
    }
    // Remove previous location of ship, if ship is already placed
    if (shipsPlaced.includes(ship)) removeShipFromMap(ship);

    allCoordinates.forEach((coordinate) => {
      map[coordinate[1]][coordinate[0]] = ship;
    });

    shipsPlaced.push(ship);

    return true;
  };

  const receiveAttack = (coords) => {
    const [x, y] = coords;
    if (map[y][x] === null) {
      missedShotsCoords.push(coords);
      return false;
    }
    return true;
  };

  return { placeShip, receiveAttack };
};

export default Gameboard;
