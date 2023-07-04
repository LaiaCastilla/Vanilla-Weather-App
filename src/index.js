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
  let apiKey = "e6ad35b5f3210ce95c5f2b1592b152b6";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  let currentT = document.querySelector(".current-temp");
  let currentMaxT = document.querySelector("#current-maxT");
  let currentMinT = document.querySelector("#current-minT");
  let weatherDescription = document.querySelector(
    ".current-weather-description"
  );

  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  function changeTemperature(response) {
    currentT.innerHTML = Math.round(response.data.main.temp);
    currentMaxT.innerHTML = Math.round(response.data.main.temp_max);
    currentMinT.innerHTML = Math.round(response.data.main.temp_min);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    weatherDescription.innerHTML =
      response.data.weather[0].description.charAt(0).toUpperCase() +
      response.data.weather[0].description.slice(1);
    console.log(response);
  }
  axios.get(weatherUrl).then(changeTemperature);
}
let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", searchCity);
//Current location weather Search
function activateGeolocation() {
  function showLocationWeather(response) {
    let currentT = document.querySelector(".current-temp");
    let currentMaxT = document.querySelector("#current-maxT");
    let currentMinT = document.querySelector("#current-minT");
    let weatherDescription = document.querySelector(
      ".current-weather-description"
    );
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let city = document.querySelector(".city");
    currentT.innerHTML = Math.round(response.data.main.temp);
    currentMaxT.innerHTML = Math.round(response.data.main.temp_max);
    currentMinT.innerHTML = Math.round(response.data.main.temp_min);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    weatherDescription.innerHTML =
      response.data.weather[0].description.charAt(0).toUpperCase() +
      response.data.weather[0].description.slice(1);
    console.log(response);
    city.innerHTML = response.data.name;
  }

  function retrievePosition(position) {
    let apiKey = "e6ad35b5f3210ce95c5f2b1592b152b6";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
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
