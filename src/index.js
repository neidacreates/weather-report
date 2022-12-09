'use strict';
const currentTempElemt = document.getElementById('tempText');
const landscapeElemt = document.getElementById('emojiScene');

const state = {
  tempText: 80,
  scene: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  city: 'Seattle',
};
// ----- CHANGING CITY NAME ----- //
const changeCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput').value;
  const cityName = document.getElementById('cityName');
  state.city = cityNameInput;
  cityName.textContent = state.city;
};

// ----- CHANGING STATES BY TEMPERATURE ----- //
// const tempChange = (element, style1, style2, style3, style4, style5) => {
//   element.removeAttribute('style');
//   if (state.tempText >= 80) {
//     element.classList.add(`${style1}`);
//   } else if (79 >= state.tempText && state.tempText >= 70) {
//     element.classList.add(`${style2}`);
//   } else if (69 >= state.tempText && state.tempText >= 60) {
//     element.classList.add(`${style3}`);
//   } else if (59 >= state.tempText && state.tempText >= 50) {
//     element.classList.add(`${style4}`);
//   } else {
//     element.classList.add(`${style5}`);
//   }
// };

// ----- CHANGING TEMPERATURE COLOR ----- //
const colorChange = () => {
  currentTempElemt.removeAttribute('class');
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

// ----- CHANGING TEMPERATURE COUNT ----- //
const increaseTemp = () => {
  state.tempText += 1;
  colorChange();
  landscapeChange();
  currentTempElemt.textContent = `${state.tempText}`;
};

const decreaseTemp = () => {
  state.tempText -= 1;
  colorChange();
  landscapeChange();
  currentTempElemt.textContent = `${state.tempText}`;
};

// ----- CHANGING LANDSCAPE SCENE ----- //

const landscapeChange = () => {
  if (state.tempText >= 80) {
    state.scene = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (79 >= state.tempText && state.tempText >= 70) {
    state.scene = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (69 >= state.tempText && state.tempText >= 60) {
    state.scene = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (59 >= state.tempText && state.tempText >= 50) {
    state.scene = '💨🍃🌬️💨🍃🌬️💨🍃🌬️💨🍃🌬️';
  } else {
    state.scene = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  }

  landscapeElemt.textContent = state.scene;
};

// ----- REGISTERING EVENT HANDLERS ----- //
const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('tempIncrease');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.getElementById('tempDecrease');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const changeCityInput = document.getElementById('cityNameInput');
  changeCityInput.addEventListener('input', changeCityName);
};

// ----- SETTING SO DOM LOADS BEFORE JS ----- //
document.addEventListener('DOMContentLoaded', registerEventHandlers);
