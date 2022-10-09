function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let weatherKey = "ae68b960e44fefb7476cca553ef96ed1";
  let url = `${weatherUrl}${input.value}&units=metric&appid=${weatherKey}`;
  axios.get(url).then(displayWeather);
}

let celsiusTemperature = null;

function displayWeather(response) {
  console.log(response.data);
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemperature}`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  let weatherIcon = document.querySelector("img");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  celsiusTemperature = response.data.main.temp;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempF = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(tempF);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = weekday[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

let time = document.querySelector("#current-time");
time.innerHTML = `${day} ${hour}:${minutes}`;
