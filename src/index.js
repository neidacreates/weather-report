'use strict';
const currentTempElemt = document.getElementById('tempText');
const landscapeElemt = document.getElementById('landscapeScene');
const skyElemt = document.getElementById('skyScene');

const state = {
  tempText: 80,
  scene: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  city: 'Seattle',
  lat: 47.608013,
  lon: -122.335167,
  sky: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️',
  skySelect: 'Sunny',
};
// ----- CHANGING CITY NAME ----- //
const changeCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput').value;
  const cityName = document.getElementById('cityName');
  state.city = cityNameInput;
  cityName.textContent = state.city;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getWeather = async () => {
  await wait(1000);
  return axios
    .get('http://127.0.0.1:5000/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      let currentTemp = response.data.main.temp;
      currentTemp = Math.round((currentTemp - 273.15) * 1.8 + 32.0);
      state.tempText = currentTemp;
      console.log(response);
      console.log(currentTemp);
      return currentTemp;
    })
    .catch((error) => {
      console.log('error in getWeather');
      console.log('error:', error);
      console.log('error response:', error.response);
    });
};

const findLatitudeAndLongitude = () => {
  return axios
    .get('http://127.0.0.1:5000/location', {
      params: {
        q: state.city,
        format: 'json',
      },
    })
    .then((response) => {
      const latitude = response.data[0].lat;
      const longitude = response.data[0].lon;
      state.lat = latitude;
      state.lon = longitude;
      console.log(latitude, longitude);
      return { latitude, longitude };
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!');
      console.log('error:', error);
      console.log('error response:', error.response);
    });
};

const changeTempText = async () => {
  await wait(2000);
  // state.tempText = currentTemp;
  currentTempElemt.textContent = state.tempText;
  landscapeChange();
  colorChange();
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

// ----- CHANGING SKY SCENE ----- //

const skyChange = () => {
  state.skySelect = document.getElementById('skySelect').value;
  console.log(state.skySelect);
  if (state.skySelect === 'Sunny') {
    state.sky = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.skySelect === 'Cloudy') {
    state.sky = '☁️ ☁️☁️🌤️☁️ ☁️☁️☁️ ☁️☁️';
  } else if (state.skySelect === 'Rainy') {
    state.sky = '🌧🌈🌧🌧💧🌧🌦🌧💧🌧🌧';
  } else if (state.skySelect === 'Windy') {
    state.sky = '💨🍃🌬️💨🍃🌬️💨🍃🌬️💨🍃';
  } else {
    state.sky = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }

  skyElemt.textContent = state.sky;
};

// ----- REGISTERING EVENT HANDLERS ----- //
const registerEventHandlers = () => {
  const increaseTempButton = document.getElementById('tempIncrease');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.getElementById('tempDecrease');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const changeCityInput = document.getElementById('cityNameInput');
  changeCityInput.addEventListener('input', changeCityName);

  const changeTempButton = document.getElementById('getWeather');
  changeTempButton.addEventListener('click', () => {
    findLatitudeAndLongitude();
    getWeather();
    changeTempText();
  });

  const changeSkySelect = document.getElementById('skySelect');
  changeSkySelect.addEventListener('change', skyChange);
};

// ----- SETTING SO DOM LOADS BEFORE JS ----- //
document.addEventListener('DOMContentLoaded', registerEventHandlers);
