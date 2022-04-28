let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentDay = document.querySelector(".day");
currentDay.innerHTML = `${day}`;

let currentDateMonth = document.querySelector(".dateMonth");
currentDateMonth.innerHTML = `${date} ${month}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${hour}:${minute}`;

let apiKey = "af2c2a87ea7284e044982eed7c20bf83";
function citySubmit(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");

  let cityName = currentCity.value;
  let city = document.querySelector("h1");
  city.innerHTML = cityName;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector(".today-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let currentLocation = response.data.name;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = currentLocation;
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let condition = response.data.weather[0].description;
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = condition;
  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(windSpeed);
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(humidity);

  getForecast(response.data.coord);
}

function cityClick(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#current-city");

  let cityName = currentCity.value;
  let city = document.querySelector("h1");

  city.innerHTML = cityName;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", citySubmit);
citySearch.addEventListener("click", cityClick);

function changeToFarenheit(event) {
  event.preventDefault();
  let tempInFarenheit = (celsiusTemperature * 9) / 5 + 32;
  let currentTemp = document.querySelector(".today-temp");
  currentTemp.innerHTML = Math.round(tempInFarenheit);
  tempCelsiusLink.classList.remove("active");
  tempFarenheitLink.classList.add("active");
}

let tempFarenheit = document.querySelector(".temp-farenheit");
tempFarenheit.addEventListener("click", changeToFarenheit);

function changeToCelsius(event) {
  let currentTemp = document.querySelector(".today-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  tempCelsiusLink.classList.add("active");
  tempFarenheitLink.classList.remove("active");
}

let tempCelsius = document.querySelector("#temp-celsius");
tempCelsius.addEventListener("click", changeToCelsius);

let tempCelsiusLink = document.querySelector("#temp-celsius-link");
let tempFarenheitLink = document.querySelector(".temp-farenheit-link");

let celsiusTemperature = null;
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastELement = document.querySelector("#weather-forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
         <div class="row">
          <div class="col-4" id = "forecast-day">${formatDay(
            forecastDay.dt
          )}</div>
          <div class="col-4">
            <img id="forecast-icon" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="Sun" width = 60px height = 60px/>
          </div>
          <div class="col-2" id = "forecast-temp-min">${Math.round(
            forecastDay.temp.min
          )}°</div>
          <div class="col-2" id = "forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}°</div>
        </div>`;
    }
  });

  forecastELement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function useCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#current-location-form");
currentLocationButton.addEventListener("click", useCurrentLocation);
