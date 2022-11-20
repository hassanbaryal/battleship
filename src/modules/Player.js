const Player = (playerName, myBoard) => {
  const name = playerName;
  const board = myBoard;

  const getName = () => name;

  const getBoard = () => board;

  const attack = (coords, enemyBoard) => enemyBoard.receiveAttack(coords);

  return { getName, getBoard, attack };
};

const Computer = (myBoard, ships) => {
  const possibleNames = ['Black Beard', 'Doflamingo', 'Kaido'];
  const name = possibleNames[Math.floor(Math.random() * possibleNames.length)];
  const board = myBoard;

  // Setup own board
  (() => {
    const orientations = ['right', 'down'];
    for (let i = 0; i < ships.length; i += 1) {
      let placed = false;
      while (!placed) {
        const randomCoord = [Math.floor(Math.random * 10), Math.floor(Math.random * 10)];
        const orientation = orientations[Math.floor(Math.random * 2)];
        // If ship place successful, update ship coords and orientation
        // exit while loop to move onto next ship
        if (board.placeShip(ships[i], randomCoord, orientation)) {
          ships[i].setCoord(randomCoord);
          ships[i].setOrientation(orientation);
          placed = true;
        }
      }
    }
  })();

  const getName = () => name;

  const getBoard = () => board;

  // returns a random x,y coordinate
  const getRandomCoords = () => [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];

  const attack = (enemyBoard) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const coords = getRandomCoords();
      const returnValue = enemyBoard.receiveAttack(coords);
      if (returnValue) return returnValue;
    }
  };

  return { getName, getBoard, attack };
};

export { Player, Computer };
