//get current date
function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();
  return `Today is ${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;
}
let now = new Date();
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(now);
console.log(dateElement);

//add city name
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("h2");
  let cityInput = document.querySelector("#input-text");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "8799882eec11a6cae9364a17c61e256e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-text-input");
searchForm.addEventListener("submit", search);

//convert degrees
function convertToFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = 90;
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = 66;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//Week 5 Homework - In your project, when a user searches for a city
// (example: New York), it should display the name of the city on the
// result page and the current temperature of the city.

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `It is ${temperature} degrees in ${city}`;
  let iconElement = document.querySelector("#icon");
  let h2 = document.querySelector("h2");
  h2.innerHTML = message;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8799882eec11a6cae9364a17c61e256e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function retrievePosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(getPosition);
}

let buttonClick = document.querySelector("button");
buttonClick.addEventListener("click", retrievePosition);
