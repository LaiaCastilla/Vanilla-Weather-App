//Current Time
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDayTime = document.querySelector(".day-time");
currentDayTime.innerHTML = `${day} ${hour}:${minutes}`;
//City search && Current Weather search
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let city = document.querySelector(".city");
  if (cityInput.value) {
    city.innerHTML = `${
      cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1)
    }`;
  } else {
    alert`Please enter a valid city name`;
  }
  let apiKey = "fdt0a6ab6o2733f48fa51ccaa0c76a01";
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  let currentT = document.querySelector(".current-temp");
  let feelsLikeT = document.querySelector("#feels-like");

  let weatherDescription = document.querySelector(
    ".current-weather-description"
  );
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#day0-icon");
  function changeTemperature(response) {
    console.log(response);
    currentT.innerHTML = Math.round(response.data.temperature.current);
    feelsLikeT.innerHTML = Math.round(response.data.temperature.feels_like);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    weatherDescription.innerHTML =
      response.data.condition.description.charAt(0).toUpperCase() +
      response.data.condition.description.slice(1);
    icon.setAttribute("src", `images/${response.data.condition.icon}.png`);
    console.log(response);
  }

  axios.get(weatherUrl).then(changeTemperature);
}
let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", searchCity);
//Current location weather Search
function activateGeolocation() {
  function showLocationWeather(response) {
    console.log(response);
    let currentT = document.querySelector(".current-temp");
    let feelsLikeT = document.querySelector("#feels-like");
    let weatherDescription = document.querySelector(
      ".current-weather-description"
    );
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let city = document.querySelector(".city");
    currentT.innerHTML = Math.round(response.data.temperature.current);
    feelsLikeT.innerHTML = Math.round(response.data.temperature.feels_like);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    weatherDescription.innerHTML =
      response.data.condition.description.charAt(0).toUpperCase() +
      response.data.condition.description.slice(1);
    console.log(response);
    city.innerHTML = response.data.city;
  }

  function retrievePosition(position) {
    let apiKey = "fdt0a6ab6o2733f48fa51ccaa0c76a01";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let weatherUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
    axios.get(weatherUrl).then(showLocationWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocation = document.querySelector(".location");
currentLocation.addEventListener("click", activateGeolocation);
//Change between units
function changeUnit(event) {
  let currentT = document.querySelector(".current-temp");
  console.log(currentT);
  let currentUnit = document.querySelector(".current-unit");
  console.log(currentUnit.innerHTML);
  if (currentUnit.innerHTML === "°C") {
    currentT.innerHTML = Math.round(currentT.innerHTML * 1.8 + 32);
    currentUnit.innerHTML = "°F";
    alternativeUnit.innerHTML = "°C";
  } else {
    currentT.innerHTML = Math.round((currentT.innerHTML - 32) * 0.556);
    currentUnit.innerHTML = "°C";
    alternativeUnit.innerHTML = "°F";
  }
}

let alternativeUnit = document.querySelector("#alternative-degree");
alternativeUnit.addEventListener("click", changeUnit);
