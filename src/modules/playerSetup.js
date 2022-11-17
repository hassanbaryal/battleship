import createMap from './map';
import checkPlayerSetupValidity from './playerSetupValidation';
import Ship from './Ship';
import Gameboard from './Gameboard';
import { Player, Computer } from './Player';

const elementFromHtml = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

const createShips = () => {
  const carrier = Ship('Carrier', 5);
  const battleShip = Ship('Battleship', 4);
  const cruiser = Ship('Cruiser', 3);
  const submarine = Ship('Submarine', 3);
  const destroyer = Ship('Destroyer', 2);
  return [carrier, battleShip, cruiser, submarine, destroyer];
};

const changeShipSelector = (shipsArray, index, page) => {
  const currentShip = page.querySelector('.current-ship-selected');
  // Changes text of ship selector
  currentShip.textContent = shipsArray[index].getName();
  // Adds the .placed class to ship selector to indicated to user if ship has been placed on board
  if (shipsArray[index].getCoord()) {
    if (!currentShip.classList.contains('placed')) currentShip.classList.toggle('placed');
  } else if (currentShip.classList.contains('placed')) {
    currentShip.classList.toggle('placed');
  }
};

const addShipToBoardDOM = (ship, page) => {
  const boardDom = page.querySelector('.board');
  if (!boardDom.classList.contains(`${ship.getName()}`)) {
    boardDom.classList.toggle(`${ship.getName()}`);
  } else {
    const existingCells = page.querySelectorAll(
      `[data-ship="${ship.getName()}"]`,
    );
    existingCells.forEach((element) => {
      element.classList.toggle('ship-placed');
      element.removeAttribute('data-ship');
    });
  }

  let [x, y] = ship.getCoord();
  const orientation = ship.getOrientation();
  let currCell;
  for (let i = 0; i < ship.getLength(); i += 1) {
    currCell = page.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    currCell.classList.toggle('ship-placed');
    currCell.setAttribute('data-ship', `${ship.getName()}`);
    if (orientation === 'right') x += 1;
    else y += 1;
  }
};

const addShipToBoard = (gameBoard, ship, cell, page) => {
  const [x, y] = [Number(cell.dataset.x), Number(cell.dataset.y)];
  const orientation = page
    .querySelector('.current-orientation-selected')
    .textContent.toLowerCase();

  if (gameBoard.placeShip(ship, [x, y], orientation)) {
    ship.setCoord([x, y]);
    ship.setOrientation(orientation);
    addShipToBoardDOM(ship, page);
  }
};

const addFunctionality = (page, numPlayers, players) => {
  const shipsArray = createShips();
  const newGameBoard = Gameboard();
  let index = 0;

  // Adding functionality to ship selector
  const prevBtn = page.querySelector('.ship-selector .prev-btn');
  const nextBtn = page.querySelector('.ship-selector .next-btn');

  prevBtn.addEventListener('click', () => {
    if (index === 0) index = shipsArray.length - 1;
    else index -= 1;
    changeShipSelector(shipsArray, index, page);
  });

  nextBtn.addEventListener('click', () => {
    if (index === shipsArray.length - 1) index = 0;
    else index += 1;
    changeShipSelector(shipsArray, index, page);
  });

  // Adding functionality to orientation selector
  const prevBtnOrientation = page.querySelector('.orientation-selector .prev-btn');
  const currOrientation = page.querySelector('.current-orientation-selected');
  const nextBtnOrientation = page.querySelector('.orientation-selector .next-btn');

  prevBtnOrientation.addEventListener('click', () => {
    if (currOrientation.textContent === 'Right') currOrientation.textContent = 'Down';
    else currOrientation.textContent = 'Right';
  });

  nextBtnOrientation.addEventListener('click', () => {
    if (currOrientation.textContent === 'Right') currOrientation.textContent = 'Down';
    else currOrientation.textContent = 'Right';
  });

  // Add functionality to ship selector, board, and submit btn
  // When cell is clicked, take current ship, using shipsArray[index], and add it to the gameboard. if adding to game board is successfull, modify map to show this by creating a function in map.js. This function is similar to gameboard place ship function, where it will place the current ship on the boardDOM.
  // Things to consider:
  // -if user wants to place ship in a different place, have to remove the ship from dom. Have to remove correct ship
  // Maybe add ship name to classlist of board?
  page.querySelector('.board').addEventListener(('click'), (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    addShipToBoard(newGameBoard, shipsArray[index], cell, page);
  });

  // Add functionality to submit button
  const submitBtn = page.querySelector('.submit-btn');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkPlayerSetupValidity(page, shipsArray);
  });
};

const buildPlayerSetupPage = (numPlayers = 1, players = []) => {
  let playerText = 'One';
  if (players.length === 1) {
    playerText = 'Two';
  }

  const page = elementFromHtml(`
    <form class="player-setup">
        <div class="setup-msg">Player ${playerText} Setup</div>
        <input type="text" minlength="1" id="name" placeholder="Enter your name, captain" required>


        <div class="setup-player-ships">
          <div class="selector ship-selector">
            <button type="button" class="prev-btn">&#60;</button>
            <div class="current-ship-selected">Carrier</div>
            <button type="button" class="next-btn">&#62;</button>
          </div>

          <div class="selector orientation-selector">
            <button type="button" class="prev-btn">&#60;</button>
            <div class="current-orientation-selected">Right</div>
            <button type="button" class="next-btn">&#62;</button>
          </div>
        </div>

        <button type="submit" class="submit-btn">Submit</button>
    </form>
  `);

  const [board, cells] = createMap();
  page.querySelector('.orientation-selector').after(board);

  addFunctionality(page, numPlayers, players);

  document.querySelector('main').appendChild(page);
};

export default buildPlayerSetupPage;
