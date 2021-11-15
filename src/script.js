function displayLocalTemp(response) {
  console.log(response);
  let currentCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-display-temp");
  let responseTemp = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let highTempElement = document.querySelector("#temp-high");
  let lowTempElement = document.querySelector("#temp-low");
  let descriptionElement = document.querySelector("#description");
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${responseTemp}`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionElement.innerHTML = response.data.weather[0].main;
  console.log(response);
}

function searchCurrentLocation(event) {
  function getCurrentCoords(response) {
    let currentLocationLat = response.coords.latitude;
    let currentLocationLon = response.coords.longitude;
    let unit = "metric";

    let apiKey = "aaa0469026a2f6fda71f9536102ca825";
    let coordsApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocationLat}&lon=${currentLocationLon}&units=${unit}&appid=${apiKey}`;

    axios.get(coordsApiUrl).then(displayLocalTemp);
  }
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCoords);
}

function displayCityAndTemp(response) {
  let currentCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-display-temp");
  let humidityElement = document.querySelector("#humidity");
  let responseTemp = Math.round(response.data.main.temp);
  let windSpeedElement = document.querySelector("#wind-speed");
  let highTempElement = document.querySelector("#temp-high");
  let lowTempElement = document.querySelector("#temp-low");
  let descriptionElement = document.querySelector("#description");
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${responseTemp}`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionElement.innerHTML = response.data.weather[0].main;
  console.log(response);
}

function searchCity(event) {
  event.preventDefault();
  let unit = "metric";
  let searchedCity = document.querySelector("#search");

  let apiKey = "aaa0469026a2f6fda71f9536102ca825";

  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=${unit}&appid=${apiKey}`;

  axios.get(weatherApiUrl).then(displayCityAndTemp);
}

// DISPLAYING SEARCHED CITY FUNCTION

// function searchCity(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search");
//   let currentCity = document.querySelector("#searched-city");
//   currentCity.innerHTML = `${searchInput.value}`;
// }

//DISPLYING DATE AND TIME

let currentDate = document.querySelector("#current-date");

let currentTime = document.querySelector("#current-time");

let now = new Date();

let date = now.getDate();

let year = now.getFullYear();

let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let minutes = ("0" + now.getMinutes()).slice(-2);

currentDate.innerHTML = `${months[now.getMonth()]} ${date}, ${year}`;

currentTime.innerHTML = `${
  weekday[now.getDay()]
}, ${now.getHours()}:${minutes}`;

// DISPLAYING SEARCHED CITY

let form = document.querySelector("#search-form");

form.addEventListener("submit", searchCity);

//LOCATON AND WEATHER API
let unit = "metric";
let searchedCity = document.querySelector("#search");

let apiKey = "aaa0469026a2f6fda71f9536102ca825";

let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&unit=${unit}&appid=${apiKey}`;

axios.get(weatherApiUrl).then(displayCityAndTemp);

let currentLocationButton = document.querySelector("#current-location-btn");

currentLocationButton.addEventListener("click", searchCurrentLocation);
