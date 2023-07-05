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

//Display Weather
function displayWeather(response) {
  let city = document.querySelector(".city");
  city.innerHTML = response.data.city;
  let currentT = document.querySelector(".current-temp");
  let feelsLikeT = document.querySelector("#feels-like");
  let weatherDescription = document.querySelector(
    ".current-weather-description"
  );
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#day0-icon");

  console.log(response);
  currentT.innerHTML = Math.round(response.data.temperature.current);
  feelsLikeT.innerHTML = Math.round(response.data.temperature.feels_like);
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML =
    response.data.condition.description.charAt(0).toUpperCase() +
    response.data.condition.description.slice(1);
  icon.setAttribute("src", `images/${response.data.condition.icon}.png`);
  icon.setAttribute("alt", response.data.condition.description);

  //set dark mode at night
  let card = document.querySelector(".card");
  let feelingDescription = document.querySelector(".feeling-description");
  let alternativeDegree = document.querySelector(".alternative-degree");
  if (icon.src.includes("night")) {
    console.log("night");
    card.classList.add("dark");
    feelingDescription.classList.add("dark");
    alternativeDegree.classList.add("dark");
    icon.classList.add("dark");
  } else {
    card.classList.remove("dark");
    feelingDescription.classList.remove("dark");
    alternativeDegree.classList.remove("dark");
    icon.classList.remove("dark");
  }
}

function searchCity(city) {
  let apiKey = "fdt0a6ab6o2733f48fa51ccaa0c76a01";
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".city");
  let cityInput = document.querySelector("#search-city");
  if (cityInput.value) {
    city.innerHTML = `${
      cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1)
    }`;
    searchCity(cityInput.value);
  } else {
    alert`Please enter a valid city name`;
  }
}
function activateGeolocation(event) {
  function retrievePosition(position) {
    let apiKey = "fdt0a6ab6o2733f48fa51ccaa0c76a01";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let weatherUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

    axios.get(weatherUrl).then(displayWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector(".location");
currentLocation.addEventListener("click", activateGeolocation);

//Change between units
function updateUnitsDegrees(event) {
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

  /* function displayCelsiusTemperature(temperature) {
    temperature.innerHTML = Math.round((temperature.innerHTML - 32) * 0.556);
  }
  function displayFahrenheitTemperature(temperature) {
    temperature.innerHTML = Math.round(temperature.innerHTML * 1.8 + 32);
  }
  function changeUnit(degree) {
    if (degrees.innerHTML === "°C") {
      degrees.innerHTML = "°F";
      alternativeUnit.innerHTML = "°C";
      temperatures.forEach(displayFahrenheitTemperature);
    } else {
      degrees.innerHTML = "°C";
      alternativeUnit.innerHTML = "°F";
      temperatures.forEach(displayCelsiusTemperature);
    }
  }
  let temperatures = document.querySelectorAll(".temperature");
  console.log(temperatures);
  let degrees = document.querySelectorAll(".degree");
  degrees.forEach(changeUnit);*/
}

let alternativeUnit = document.querySelector("#alternative-degree");
alternativeUnit.addEventListener("click", updateUnitsDegrees);
