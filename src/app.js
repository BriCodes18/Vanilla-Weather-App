function updateTemperature(response) {
  console.log(response.data);
}

let apiKey = "b190b9864cf7bf2f14432317f03ad0e6";
let units = "imperial";
let city = `London`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(updateTemperature);
