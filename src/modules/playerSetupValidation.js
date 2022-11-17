const showErrorMsg = (form, newMsg) => {
  const msg = form.querySelector('.setup-msg');
  const submitBtn = form.querySelector('.submit-btn');
  const temp = msg.textContent;
  msg.textContent = newMsg;
  msg.classList.toggle('error');
  submitBtn.disabled = true;
  setTimeout(() => {
    msg.textContent = `${temp}`;
    msg.classList.toggle('error');
    submitBtn.disabled = false;
  }, 4000);
};

const checkPlayerSetupValidity = (form, shipsArray) => {
  if (form.checkValidity()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const ship of shipsArray) {
      if (!ship.getCoord()) {
        // say that you have to place all ships
        showErrorMsg(form, 'Ship(s) Missing!');
        return false;
      }
    }
  } else {
    // say that yuo have to input a name
    showErrorMsg(form, 'Name Missing!');
    return false;
  }

  return true;
};

export default checkPlayerSetupValidity;
