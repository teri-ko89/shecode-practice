function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let weatherKey = "ae68b960e44fefb7476cca553ef96ed1";
  let url = `${weatherUrl}${input.value}&units=metric&appid=${weatherKey}`;
  axios.get(url).then(displayWeather);
}

let celsiusTemperature = null;

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
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
  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
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

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }.png"
        alt=""
        width="42"
      />
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
