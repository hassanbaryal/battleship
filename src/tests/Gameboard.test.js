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
});
