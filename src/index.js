import axios from 'axios';
'use strict';
const currentTempElemt = document.getElementById('tempText');
const landscapeElemt = document.getElementById('landscapeScene');
const skyElemt = document.getElementById('skyScene');
const cityName = document.getElementById('cityName');
const conditionText = document.getElementById('conditionText');

const state = {
  tempText: 80,
  scene: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂',
  city: 'Seattle',
  lat: 47.608013,
  lon: -122.335167,
  sky: '☁️☁️ ☁️ ☁️☁️ ☁️ ☀️☁️ ☁️☁️',
  skySelect: 'Sunny',
  weatherIcon: '',
  condition: '',
};

// ----- CHANGING CITY NAME ----- //
const changeCityName = () => {
  const cityNameInput = document.getElementById('cityNameInput').value;
  state.city = cityNameInput;
  cityName.textContent = state.city;
};

// ----- RESETTING CITY NAME ----- //
const resetCityName = () => {
  state.city = 'Seattle';
  cityName.textContent = state.city;
  document.getElementById('cityNameInput').value = state.city;
};

// ----- GETTING WEATHER INFO ----- //
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getWeather = async () => {
  await wait(1000);
  return axios
    .get('https://weather-report-proxy-server.vercel.app/weather', {
      params: {
        lat: state.lat,
        lon: state.lon,
      },
    })
    .then((response) => {
      let currentTemp = response.data.main.temp;
      currentTemp = Math.round((currentTemp - 273.15) * 1.8 + 32.0);
      state.tempText = currentTemp;
      state.weatherIcon = response.data.weather[0].icon;
      state.condition = response.data.weather[0].description;
      console.log(response);
      console.log(currentTemp);
      console.log(state.weatherIcon);
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
    .get('https://weather-report-proxy-server.vercel.app/location', {
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
  currentTempElemt.textContent = state.tempText;
  conditionText.textContent = state.condition;
  changeLandscapeTempColor();
  skyChangeByWeather();
};

// ----- CHANGING LANDSCAPE SCENE & TEMPERATURE COLOR ----- //
const changeLandscapeTempColor = () => {
  currentTempElemt.removeAttribute('class');
  if (state.tempText >= 80) {
    currentTempElemt.classList.add('textRed');
    state.scene = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (79 >= state.tempText && state.tempText >= 70) {
    currentTempElemt.classList.add('textOrange');
    state.scene = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (69 >= state.tempText && state.tempText >= 60) {
    currentTempElemt.classList.add('textYellow');
    state.scene = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (59 >= state.tempText && state.tempText >= 50) {
    currentTempElemt.classList.add('textGreen');
    state.scene = '🍁🍂🍁🍂🍁🍂🍁🍂🍁🍂🍁🍂🍁';
  } else {
    currentTempElemt.classList.add('textTeal');
    state.scene = '🌲❄️🌲⛄️🌲❄️⛄️🌲🌲❄️⛄️🌲❄️';
  }

  landscapeElemt.textContent = state.scene;
};

// ----- CHANGING TEMPERATURE COUNT ----- //
const increaseTemp = () => {
  state.tempText += 1;
  changeLandscapeTempColor();
  currentTempElemt.textContent = `${state.tempText}`;
};

const decreaseTemp = () => {
  state.tempText -= 1;
  changeLandscapeTempColor();
  currentTempElemt.textContent = `${state.tempText}`;
};

// ----- CHANGING SKY SCENE ----- //
const sunny = '☁️☁️ ☁️ ☁️☁️ ☁️ ☀️☁️ ☁️☁️';
const cloudy = '☁️ ☁️☁️🌤️☁️ ☁️☁️☁️ ☁️☁️';
const rainy = '🌧🌈🌧🌧💧🌧🌦🌧💧🌧🌧';
const windy = '💨🍃🌬️💨🍃🌬️💨🍃🌬️💨🍃';
const snowy = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';

const skyChange = () => {
  state.skySelect = document.getElementById('skySelect').value;
  console.log(state.skySelect);
  if (state.skySelect === 'Sunny') {
    state.sky = sunny;
  } else if (state.skySelect === 'Cloudy') {
    state.sky = cloudy;
  } else if (state.skySelect === 'Rainy') {
    state.sky = rainy;
  } else if (state.skySelect === 'Windy') {
    state.sky = windy;
  } else {
    state.sky = snowy;
  }

  skyElemt.textContent = state.sky;
};

const skyChangeByWeather = () => {
  if (state.weatherIcon.includes('01') || state.weatherIcon.includes('02')) {
    state.sky = sunny;
  } else if (
    state.weatherIcon.includes('03') ||
    state.weatherIcon.includes('04')
  ) {
    state.sky = cloudy;
  } else if (
    state.weatherIcon.includes('09') ||
    state.weatherIcon.includes('10') ||
    state.weatherIcon.includes('11')
  ) {
    state.sky = rainy;
  } else if (state.weatherIcon.includes('50')) {
    state.sky = windy;
  } else {
    state.sky = snowy;
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

  const resetCityButton = document.getElementById('cityNameReset');
  resetCityButton.addEventListener('click', resetCityName);
};

// ----- SETTING SO DOM LOADS BEFORE JS ----- //
document.addEventListener('DOMContentLoaded', registerEventHandlers);
