import { removeMainContent, elementFromHtml } from './domFunctions';
// eslint-disable-next-line import/no-cycle
import buildStartPage from './startupPage';

const addFunctionality = (page) => {
  const restartBtn = page.querySelector('.restart-btn');
  restartBtn.addEventListener('click', () => {
    removeMainContent();
    buildStartPage();
  });
};

const buildEndGamePage = (winner, loser, winnerMap, loserMap) => {
  const page = elementFromHtml(`
    <div class="end-game-container">
      <div class="end-game-msg"> ${winner.getName()} sent ${loser.getName()} to Davey Jones' Locker!</div>
      <div class="boards-container">
        <div class="player-one">
          <div class="player-one-title">Winner: ${winner.getName()}</div>
        </div>
        <div class="player-two">
          <div class="player-two-title">Loser: ${loser.getName()}</div>
        </div>
      </div>
      <button type="button" class="restart-btn">Restart</button>
    </div>
  `);

  const playerOneSection = page.querySelector('.player-one');
  const playerTwoSection = page.querySelector('.player-two');

  playerOneSection.appendChild(winnerMap.getVisibleMap());
  playerTwoSection.appendChild(loserMap.getVisibleMap());

  addFunctionality(page);

  document.querySelector('main').appendChild(page);
};

export default buildEndGamePage;
