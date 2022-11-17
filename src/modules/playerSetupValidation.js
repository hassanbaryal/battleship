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
  }, 1000);
};

const checkPlayerSetupValidity = (form, shipsArray) => {
  if (form.checkValidity()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const ship of shipsArray) {
      if (!ship.getCoord()) {
        // say that you have to place all ships
        showErrorMsg(form, 'You have not placed your ships, Captain!');
        return false;
      }
    }
  } else {
    // say that yuo have to input a name
    showErrorMsg(form, 'Please input your name, Captain!');
    return false;
  }

  return true;
};

export default checkPlayerSetupValidity;
