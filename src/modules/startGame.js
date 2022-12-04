import { removeMainContent, elementFromHtml } from './domFunctions';
// eslint-disable-next-line import/no-cycle
import buildEndGamePage from './endGame';
import { map } from './map';

const endGame = (winner, loser, winnerMap, loserMap) => {
  removeMainContent();
  buildEndGamePage(winner, loser, winnerMap, loserMap);
};

const switchMaps = (maps) => {
  // Remove present maps
  maps[0].getVisibleMap().remove();
  maps[1].getHiddenMap().remove();
  const friendlyWatersDom = document.querySelector('.friendly-waters');
  const enemyWatersDom = document.querySelector('.enemy-waters');
  // Append new maps
  friendlyWatersDom.appendChild(maps[1].getVisibleMap());
  enemyWatersDom.appendChild(maps[0].getHiddenMap());
};

const updateGameMsg = (player, result) => {
  const msg = document.querySelector('.game-update-msg');
  msg.textContent = `It's a ${result}! Processing next turn in a moment..`;

  setTimeout(() => {
    if (result === 'hit') msg.textContent = `Captain ${player.getName()}, we've been hit! Arrr!`;
    else msg.textContent = `Captain ${player.getName()}, we've dodged a cannon ball! Ahoy!`;
  }, 4000);
};

const toggleEnemyMap = () => document.querySelector('.board-container.enemy-waters').classList.toggle('disabled');

const processTurn = (players, maps, result) => {
  toggleEnemyMap();
  // Update modal message
  const modal = document.querySelector('.modal-popup');
  const modalMsg = modal.querySelector('.modal-msg');
  modalMsg.textContent = `Please pass the device to your mortal enemy, Captain ${players[1].getName()}!`;
  // Update game message to display results and start countdown
  updateGameMsg(players[1], result);
  // Toggle modal
  setTimeout(() => {
    modal.classList.toggle('invisible');
  }, 3000);
  // Switch maps, enable enemy map
  setTimeout(() => {
    switchMaps(maps);
    toggleEnemyMap();
  }, 3500);
};

const isGameOver = (player) => player.getBoard().isGameOver();

const computerTurn = (players) => players[1].attack(players[0].getBoard());

const updateMaps = (coords, result, mapToUpdate) => mapToUpdate.attack(coords, result);

const addFunctionality = (page, numPlayers, players, maps) => {
  // Add functionality to enemy board
  page.addEventListener('click', (e) => {
    // if enemy board is not clicked
    if (!e.target.closest('.enemy-waters')) return;
    const cell = e.target.closest('.cell');
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const result = players[0].attack([x, y], players[1].getBoard());
    // if attack not valid (i.e. clicking an already clicked cell)
    if (!result) return;
    // Update map
    updateMaps([x, y], result, maps[1]);

    // Check if game is over
    if (isGameOver(players[1])) {
      endGame(players[0], players[1], maps[0], maps[1]);
      return;
    }

    if (numPlayers === 1) {
      // Computers turn
      const [computerResult, coords] = computerTurn(players);
      updateMaps(coords, computerResult, maps[0]);
      // Check if computer has won
      if (isGameOver(players[0])) {
        endGame(players[1], players[0], maps[1], maps[0]);
      }
    } else {
      // Process and update turns (switch maps)
      processTurn(players, maps, result);
      // eslint-disable-next-line no-param-reassign
      players = [players[1], players[0]];
      // eslint-disable-next-line no-param-reassign
      maps = [maps[1], maps[0]];
    }
  });

  const modal = document.querySelector('.modal-popup');
  modal.querySelector('.modal-btn').addEventListener('click', () => modal.classList.toggle('invisible'));
};

const createMaps = (players) => [map(players[0]), map(players[1])];

const buildStartGamePage = (numPlayers = 1, players = []) => {
  const page = elementFromHtml(`
      <div class="main-game-container">
      <div class="game-update-msg">Player One, tap on the enemy map to attack!</div>

      <div class="game-container">
        <div class="board-container friendly-waters">
          <div class="board-title friendly-waters">Friendly Waters</div>
        </div>
        
        <div class="board-container enemy-waters">
          <div class="board-title enemy-waters">Enemy Waters</div>
        </div>
      </div>
    </div>
  `);

  const maps = createMaps(players);
  // Add maps to DOM
  const friendlyWatersDom = page.querySelector('.friendly-waters');
  const enemyWatersDom = page.querySelector('.enemy-waters');
  friendlyWatersDom.appendChild(maps[0].getVisibleMap());
  enemyWatersDom.appendChild(maps[1].getHiddenMap());

  addFunctionality(page, numPlayers, players, maps);

  document.querySelector('main').appendChild(page);
};

export default buildStartGamePage;
