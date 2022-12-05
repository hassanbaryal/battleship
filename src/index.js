import './styles/style.css';
import './styles/mobile.css';
import buildStartPage from './modules/startupPage';

const root = document.documentElement;
root.classList.toggle('light');

document.querySelector('.toggle-theme-btn').addEventListener('click', () => {
  root.classList.toggle('light');
  root.classList.toggle('dark');
});

buildStartPage();
