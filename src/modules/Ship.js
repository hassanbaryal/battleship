const Ship = (shipName, inputLength) => {
  const length = inputLength;
  const name = shipName;
  let hits = 0;

  const getName = () => name;

  const getLength = () => length;

  // modify hit to take in coordinates and modify coordinates
  // object in array to be hit === true
  const hit = () => {
    if (hits < length) hits += 1;
    return hits;
  };

  const isSunk = () => {
    if (hits === length) return true;
    return false;
  };

  return {
    getName, getLength, hit, isSunk,
  };
};

export default Ship;
