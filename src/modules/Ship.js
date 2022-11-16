const Ship = (shipName, inputLength) => {
  const length = inputLength;
  const name = shipName;
  let hits = 0;
  let coord = null;
  let orientation = null;

  const getName = () => name;

  const getLength = () => length;

  const getCoord = () => coord;

  const getOrientation = () => orientation;

  const setCoord = (newCoord) => { coord = newCoord; };

  const setOrientation = (newOrient) => { orientation = newOrient; };

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
    getName, getLength, getCoord, getOrientation, setCoord, setOrientation, hit, isSunk,
  };
};

export default Ship;
