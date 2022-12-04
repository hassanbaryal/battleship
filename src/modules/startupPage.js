import { removeMainContent, elementFromHtml } from './domFunctions';
// eslint-disable-next-line import/no-cycle
import buildPlayerSetupPage from './playerSetup';

const addFunctionality = (page) => {
  page.querySelector('#select-one-player').addEventListener('click', () => {
    removeMainContent();
    buildPlayerSetupPage(1);
  });

  page.querySelector('#select-two-player').addEventListener('click', () => {
    removeMainContent();
    buildPlayerSetupPage(2);
  });
};

const buildStartPage = () => {
  const page = elementFromHtml(`
    <div class="num-players-container">
      <button type="button" id="select-one-player">1 Player</button>
      <button type="button" id="select-two-player">2 Player</button>
    </div>
  `);

  addFunctionality(page);

  document.querySelector('main').appendChild(page);
};

export default buildStartPage;
