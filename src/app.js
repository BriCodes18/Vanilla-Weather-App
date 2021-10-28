function updateWeather(response) {
  console.log(response.data);

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
}

let city = "London";

let apiKey = "b190b9864cf7bf2f14432317f03ad0e6";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(updateWeather);
