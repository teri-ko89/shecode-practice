function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let city = document.querySelector("#current-city");
  city.innerHTML = capitalizeCity(input.value);
  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let weatherKey = "ae68b960e44fefb7476cca553ef96ed1";
  let url = `${weatherUrl}${input.value}&units=metric&appid=${weatherKey}`;
  axios.get(url).then(displayWeather);
}

function displayWeather(response) {
  let temperature = document.querySelector("#today-temp");
  let currentTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${currentTemperature}°C`;
  let temperatureRange = document.querySelector("#temp-range");
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMax = Math.round(response.data.main.temp_max);
  temperatureRange.innerHTML = `${tempMin}°C / ${tempMax}°C`;
  let weather = document.querySelector("#weather");
  weather.innerHTML = response.data.weather[0].description;
}

function capitalizeCity(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
