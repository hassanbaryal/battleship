import createMap from './map';
import Ship from './Ship';
import Gameboard from './Gameboard';
import { Player, Computer } from './Player';

const elementFromHtml = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
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
          <div class="ship-selector">
            <button type="button" class="prev-btn">&#60;</button>
            <div class="current-ship-selected"></div>
            <button type="button" class="next-btn">&#62;</button>
          </div>
        </div>

        <button type="submit">Submit</button>
    </form>
  `);

  const [board, cells] = createMap();
  page.querySelector('.ship-selector').after(board);

  document.querySelector('main').appendChild(page);
};

const createShips = () => {
  const carrier = Ship('Carrier', 5);
  const battleShip = Ship('Battleship', 4);
  const cruiser = Ship('Cruiser', 3);
  const submarine = Ship('Submarine', 3);
  const destroyer = Ship('Destroyer', 2);
  return [carrier, battleShip, cruiser, submarine, destroyer];
};

const addFunctionality = (page, numPlayers, players) => {
  const shipsArray = createShips();
  const newGameBoard = Gameboard();
};

export default buildPlayerSetupPage;
