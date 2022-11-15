const Player = (playerName, myBoard) => {
  const name = playerName;
  const board = myBoard;

  const getName = () => name;

  const getBoard = () => board;

  const attack = (coords, enemyBoard) => enemyBoard.receiveAttack(coords);

  return { getName, getBoard, attack };
};

const Computer = (myBoard) => {
  const possibleNames = ['Black Beard', 'Doflamingo', 'Kaido'];
  const name = possibleNames[Math.floor(Math.random() * possibleNames.length)];
  const board = myBoard;

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
