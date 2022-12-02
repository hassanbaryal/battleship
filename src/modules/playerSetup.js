import { createMap } from './map';
import { removeMainContent, elementFromHtml } from './domFunctions';
import buildStartGamePage from './startGame';
import checkPlayerSetupValidity from './playerSetupValidation';
import Ship from './Ship';
import Gameboard from './Gameboard';
import { Player, Computer } from './Player';

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

// This function executes when player setup form is successfully submitted.
// The function constructs the player(s) and calls for the next 'event' to occur
// (either start player setup for player two, or start game)
const completeSetup = (gameBoard, form, numPlayers, players) => {
  const name = form.querySelector('#name').value;
  const player = Player(name, gameBoard);
  players.push(player);
  removeMainContent();
  if (numPlayers === 2 && players.length === 1) {
    // eslint-disable-next-line no-use-before-define
    buildPlayerSetupPage(numPlayers, players);
  } else if (numPlayers === 2 && players.length === 2) {
    // call function to start 2 player vs player game
  } else {
    // create computer. call function to start player vs computer game
    const newComputer = Computer(Gameboard(), createShips());
    players.push(newComputer);
    buildStartGamePage(numPlayers, players);
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

  // Add functionality to board
  page.querySelector('.board').addEventListener('click', (e) => {
    const cell = e.target.closest('.cell');
    if (!cell) return;
    addShipToBoard(newGameBoard, shipsArray[index], cell, page);
  });

  // Add functionality to submit button
  const submitBtn = page.querySelector('.submit-btn');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkPlayerSetupValidity(page, shipsArray)) {
      completeSetup(newGameBoard, page, numPlayers, players);
    }
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
