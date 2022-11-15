/* eslint-disable no-undef */
import { Player, Computer } from '../modules/Player';
import Gameboard from '../modules/Gameboard';
import Ship from '../modules/Ship';

describe('Testing Player and Computer Objects', () => {
  // Setup Player one board
  const playerOneBoard = Gameboard();
  const carrier = Ship('Carrier', 5);
  const battleShip = Ship('Battleship', 4);
  const cruiser = Ship('Cruiser', 3);
  const submarine = Ship('Submarine', 3);
  const destroyer = Ship('Destroyer', 2);
  playerOneBoard.placeShip(carrier, [1, 2], 'down');
  playerOneBoard.placeShip(battleShip, [6, 8], 'right');
  playerOneBoard.placeShip(cruiser, [3, 7], 'down');
  playerOneBoard.placeShip(submarine, [4, 1], 'right');
  playerOneBoard.placeShip(destroyer, [9, 0], 'down');

  // Setup Player Two (computer) board
  const computerBoard = Gameboard();
  const carrierTwo = Ship('Carrier', 5);
  const battleShipTwo = Ship('Battleship', 4);
  const cruiserTwo = Ship('Cruiser', 3);
  const submarineTwo = Ship('Submarine', 3);
  const destroyerTwo = Ship('Destroyer', 2);
  computerBoard.placeShip(carrierTwo, [1, 2], 'down');
  computerBoard.placeShip(battleShipTwo, [6, 8], 'right');
  computerBoard.placeShip(cruiserTwo, [3, 7], 'down');
  computerBoard.placeShip(submarineTwo, [4, 1], 'right');
  computerBoard.placeShip(destroyerTwo, [9, 0], 'down');

  // Create players
  const playerOne = Player('Chopper', playerOneBoard);
  const playerTwo = Computer(computerBoard);

  test.only('Testing attack method for Player', () => {
    expect(playerOne.attack([0, 0], playerTwo.getBoard())).toMatch('miss');
    expect(playerOne.attack([0, 0], playerTwo.getBoard())).toBeFalsy();
    expect(playerOne.attack([1, 2], playerTwo.getBoard())).toMatch('hit');
    expect(playerOne.attack([1, 2], playerTwo.getBoard())).toBeFalsy();
  });

  test.only('Testing attack method for Computer', () => {
    const POSSIBLE_VALUES = ['hit', 'miss', false];
    expect(POSSIBLE_VALUES).toContain(playerTwo.attack(playerOne.getBoard()));
    expect(POSSIBLE_VALUES).toContain(playerTwo.attack(playerOne.getBoard()));
    expect(POSSIBLE_VALUES).toContain(playerTwo.attack(playerOne.getBoard()));
    expect(POSSIBLE_VALUES).toContain(playerTwo.attack(playerOne.getBoard()));
    expect(POSSIBLE_VALUES).toContain(playerTwo.attack(playerOne.getBoard()));
    expect(POSSIBLE_VALUES).toContain(playerTwo.attack(playerOne.getBoard()));
  });
});
