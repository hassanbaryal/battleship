/* eslint-disable no-undef */
import Gameboard from '../modules/Gameboard';
import Ship from '../modules/Ship';

describe('Testing Gameboard object', () => {
  const carrier = Ship('Carrier', 5);
  const carrierTwo = Ship('Destroyer', 5);
  test.only('Places ship (recieves true)', () => {
    const playerBoard = Gameboard();
    expect(playerBoard.placeShip(carrier, [3, 2], 'down')).toBeTruthy();
  });

  test.only('Unable to place ship (recieves false)', () => {
    const playerBoard = Gameboard();
    expect(playerBoard.placeShip(carrier, [7, 2], 'right')).toBeFalsy();
  });

  test.only('Unable to place ship on occupied cell (recieves false)', () => {
    const playerBoard = Gameboard();
    playerBoard.placeShip(carrier, [7, 2], 'down');
    expect(playerBoard.placeShip(carrier, [7, 2], 'down')).toBeFalsy();
  });

  test.only('Place ship at another location and remove previous location', () => {
    const playerBoard = Gameboard();
    playerBoard.placeShip(carrier, [7, 2], 'down');
    playerBoard.placeShip(carrier, [1, 2], 'down');
    expect(playerBoard.placeShip(carrierTwo, [7, 2], 'down')).toBeTruthy();
  });

  test.only('Fire shots', () => {
    const playerBoard = Gameboard();
    const carrierThree = Ship('Carrier', 5);
    const battleShip = Ship('Battleship', 4);
    const cruiser = Ship('Cruiser', 3);
    const submarine = Ship('Submarine', 3);
    const destroyer = Ship('Destroyer', 2);
    playerBoard.placeShip(carrierThree, [1, 2], 'down');
    playerBoard.placeShip(battleShip, [6, 8], 'right');
    playerBoard.placeShip(cruiser, [3, 7], 'down');
    playerBoard.placeShip(submarine, [4, 1], 'right');
    playerBoard.placeShip(destroyer, [9, 0], 'down');
    expect(playerBoard.receiveAttack([0, 0])).toMatch('miss');
    expect(playerBoard.receiveAttack([8, 0])).toMatch('miss');
    expect(playerBoard.receiveAttack([8, 7])).toMatch('miss');
    expect(playerBoard.receiveAttack([1, 7])).toMatch('miss');
    expect(playerBoard.receiveAttack([1, 2])).toMatch('hit');
    expect(playerBoard.receiveAttack([9, 8])).toMatch('hit');
    expect(playerBoard.receiveAttack([5, 1])).toMatch('hit');
    expect(playerBoard.receiveAttack([5, 1])).toBeFalsy();
  });

  test.only('Test isGameOver method', () => {
    const playerBoard = Gameboard();
    const submarine = Ship('Submarine', 3);
    const destroyer = Ship('Destroyer', 2);
    playerBoard.placeShip(submarine, [4, 1], 'right');
    playerBoard.placeShip(destroyer, [9, 0], 'down');
    expect(playerBoard.isGameOver()).toBeFalsy();
    playerBoard.receiveAttack([4, 1]);
    playerBoard.receiveAttack([5, 1]);
    playerBoard.receiveAttack([6, 1]);
    expect(playerBoard.isGameOver()).toBeFalsy();
    playerBoard.receiveAttack([9, 1]);
    expect(playerBoard.isGameOver()).toBeFalsy();
    playerBoard.receiveAttack([9, 0]);
    expect(playerBoard.isGameOver()).toBeTruthy();
  });
});
