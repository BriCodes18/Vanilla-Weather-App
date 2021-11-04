function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }

  let minutes = date.getMinutes();
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
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon", "Tues"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
            <div class="col-2">
              <div class="forecast-date">${day}</div>
              <img
                src="https://openweathermap.org/img/wn/01d@2x.png"
                alt="Weather Icon"
                width="48"
              />
              <div class="forecast-temps">
                <span class="forecast-max">56°</span>
                <span class="forecast-min">34°</span>
              </div>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b190b9864cf7bf2f14432317f03ad0e6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showForecast);
}

function updateWeather(response) {
  let header = document.querySelector("#city");
  header.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#local-time");
  dateElement.innerHTML = `Last updated: ${formatDate(
    response.data.dt * 1000
  )}`;

  fahrenheitTemp = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b190b9864cf7bf2f14432317f03ad0e6";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-value");
  search(cityInputElement.value);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "b190b9864cf7bf2f14432317f03ad0e6";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showCelsiusTemp(event) {
  event.preventDefault();

  let celsiusTemp = ((fahrenheitTemp - 32) * 5) / 9;

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemp)}°`;
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(fahrenheitTemp)}°`;
}

let fahrenheitTemp = null;

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);

let weatherForm = document.querySelector("#weather-form");
weatherForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("London");
