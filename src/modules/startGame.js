import { removeMainContent, elementFromHtml } from './domFunctions';
import { map } from './map';

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
    // Attack successful (hit or miss), now compute that.
    // Update enemy map (visible map)
    updateMaps([x, y], result, maps[1]);

    // Check if game is over (check isGameOver on map that was hit, players[1])
    // If game is over, end game, show both visible maps, add btn to reset to startup page
    // call end game to create end game page/module
    if (isGameOver(players[1])) console.log('PLAYER ONE WON');

    if (numPlayers === 1) {
      // (if player and computer, make computer go)
      const [computerResult, coords] = computerTurn(players);
      updateMaps(coords, computerResult, maps[0]);
      // check if game is over (has computer won)
      if (isGameOver(players[0])) console.log('COMPUTER WONN');
    } else {
      // Update turn (if two players switch players and map array)

      //
    }
    
  });
};

// const addMapsToDOM = (page, maps) => {
// };

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
