/* eslint-disable no-undef */
import Gameboard from '../modules/Gameboard';
import Ship from '../modules/Ship';

describe('Testing Gameboard object', () => {
  const carrier = Ship('Carrier', 5);
  const destroyer = Ship('Destroyer', 2);
  test.only('Places ship (recieves true)', () => {
    const playerBoard = Gameboard();
    expect(playerBoard.placeShip(carrier, [3, 2], 'down')).toBeTruthy();
  });

  test.only('Unable to place ship (recieves false)', () => {
    const playerBoard = Gameboard();
    expect(playerBoard.placeShip(carrier, [7, 2], 'right')).toBeTruthy();
  });
});
