import createMap from './map';
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
  currentShip.textContent = shipsArray[index].getName();
  if (shipsArray.getCoord()) {
    if (!currentShip.classList.contains('placed')) currentShip.classList.toggle('placed');
  } else if (currentShip.classList.contains('placed')) {
    currentShip.classList.toggle('placed');
  }
};

const addFunctionality = (page, numPlayers, players) => {
  const shipsArray = createShips();
  const newGameBoard = Gameboard();
  let index = 0;

  // Adding functionality to ship selector
  const prevBtn = page.querySelector('.prev-btn');
  const nextBtn = page.querySelector('.next-btn');

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
  // Add functionality to ship selector, board, and submit btn
};

const buildPlayerSetupPage = (numPlayers = 1, players = []) => {
  let playerText = 'One';
  if (players.length === 1) {
    playerText = 'Two';
  }

  const page = elementFromHtml(`
    <form class="player-setup">
        <div class="setup-msg">Player ${playerText} Setup</div>
        <input type="text" minlength="1" id="name" placeholder="Enter your name, captain">


        <div class="setup-player-ships">
          <div class="selector ship-selector">
            <button type="button" class="prev-btn">&#60;</button>
            <div class="current-ship-selected">Carrier</div>
            <button type="button" class="next-btn">&#62;</button>
          </div>

          <div class="selector orientation-selector">
            <button type="button" class="prev-btn">&#60;</button>
            <div class="current-ship-selected">Right</div>
            <button type="button" class="next-btn">&#62;</button>
          </div>
        </div>

        <button type="submit">Submit</button>
    </form>
  `);

  const [board, cells] = createMap();
  page.querySelector('.orientation-selector').after(board);

  addFunctionality(page, numPlayers, players);

  document.querySelector('main').appendChild(page);
};

export default buildPlayerSetupPage;
