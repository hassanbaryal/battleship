/* eslint-disable no-undef */
import Ship from '../modules/Ship';

describe.skip('Testing Ship factory function', () => {
  const carrier = Ship('Carrier', 5);

  test.only('Get ship name', () => {
    expect(carrier.getName()).toMatch('Carrier');
  });

  test.only('Get ship length', () => {
    expect(carrier.getLength()).toBe(5);
  });

  test.only('Test isSunk before any hits', () => {
    expect(carrier.isSunk()).toBeFalsy();
  });

  test.only.each([
    { hit: 1 },
    { hit: 2 },
    { hit: 3 },
    { hit: 4 },
    { hit: 5 },
  ])('Hit ship multiple times: Hit $hit', ({ hit }) => {
    expect(carrier.hit()).toBe(hit);
  });

  test.only('isSunk is true', () => {
    expect(carrier.isSunk()).toBeTruthy();
  });

  test.only('Hits should not exceed length of ship', () => {
    expect(carrier.hit()).toBe(5);
  });
});
