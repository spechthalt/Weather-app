function displayLocalTemp(response) {
  let currentCity = document.querySelector("#searched-city");
  let currentTemp = document.querySelector("#current-display-temp");
  let responseTemp = Math.round(response.data.main.temp);
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let highTempElement = document.querySelector("#temp-high");
  let lowTempElement = document.querySelector("#temp-low");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${responseTemp}`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response);

  displayForecast();
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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  days.forEach(function (days) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-lg-2 col-sm-4">
      <div class="weather-forcast-date">${days}</div>
      <img
      src="https://ssl.gstatic.com/onebox/weather/48/rain_light.png"
      alt=""
      width="40px"
      />
      <div class="weather-forcast-temperatures">
      <span class="weather-forecast-max">18° </span>
      <span class="weather-forecast-min">13°</span>
      </div>
    </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "aaa0469026a2f6fda71f9536102ca825";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${responseTemp}`;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  highTempElement.innerHTML = Math.round(response.data.main.temp_max);
  lowTempElement.innerHTML = Math.round(response.data.main.temp_min);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response);

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let unit = "metric";
  let searchedCity = document.querySelector("#search");

  let apiKey = "aaa0469026a2f6fda71f9536102ca825";

  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=${unit}&appid=${apiKey}`;

  axios.get(weatherApiUrl).then(displayCityAndTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-display-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperatureFahrenheit);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-display-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureCelsius = Math.round(celsiusTemperature);
  temperatureElement.innerHTML = temperatureCelsius;
}

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

let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=${unit}&appid=${apiKey}`;

axios.get(weatherApiUrl).then(displayCityAndTemp);

let currentLocationButton = document.querySelector("#current-location-btn");

currentLocationButton.addEventListener("click", searchCurrentLocation);

//F and C conversion
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#temp-f");

let celsiusLink = document.querySelector("#temp-c");

fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
celsiusLink.addEventListener("click", displayCelsiusTemp);
