'use strict';
const currentTempElemt = document.getElementById('tempText');

const state = {
  tempText: 80,
};

const colorChange = () => {
  currentTempElemt.removeAttribute('style');
  if (state.tempText >= 80) {
    currentTempElemt.classList.add('textRed');
  } else if (79 >= state.tempText && state.tempText >= 70) {
    currentTempElemt.classList.add('textOrange');
  } else if (69 >= state.tempText && state.tempText >= 60) {
    currentTempElemt.classList.add('textYellow');
  } else if (59 >= state.tempText && state.tempText >= 50) {
    currentTempElemt.classList.add('textGreen');
  } else {
    currentTempElemt.classList.add('textTeal');
  }
};

const increaseTemp = () => {
  state.tempText += 1;
  colorChange();
  currentTempElemt.textContent = `${state.tempText}`;
};

tempText.addEventListener('increaseTemp', increaseTemp);

const decreaseTemp = () => {
  state.tempText -= 1;
  colorChange();
  currentTempElemt.textContent = `${state.tempText}`;
};

tempText.addEventListener('decreaseTemp', decreaseTemp);

const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('tempIncrease');
  increaseTempButton.addEventListener('click', increaseTemp);
  const decreaseTempButton = document.getElementById('tempDecrease');
  decreaseTempButton.addEventListener('click', decreaseTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
