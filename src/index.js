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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".today-temp");
  temperatureElement.innerHTML = `${temperature}`;
  let currentLocation = response.data.name;
  let cityName = document.querySelector("h1");
  cityName.innerHTML = currentLocation;
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
  let currentTemp = document.querySelector(".today-temp");
  currentTemp.innerHTML = `54`;
}

let tempFarenheit = document.querySelector(".temp-farenheit");
tempFarenheit.addEventListener("click", changeToFarenheit);

function changeToCelsius(event) {
  let currentTemp = document.querySelector(".today-temp");
  currentTemp.innerHTML = `12`;
}

let tempCelsius = document.querySelector(".temp-celsius");
tempCelsius.addEventListener("click", changeToCelsius);

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
