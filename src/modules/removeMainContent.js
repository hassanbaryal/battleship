const removeMainContent = () => {
  const main = document.querySelector('main');
  main.textContent = '';
};

const elementFromHtml = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

export { removeMainContent, elementFromHtml };
