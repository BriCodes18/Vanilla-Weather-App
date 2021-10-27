function updateTemperature(response) {
  console.log(response.data);
}

function getTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;

  let apiKey = "b190b9864cf7bf2f14432317f03ad0e6";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(updateTemperature);
}

let weatherForm = document.querySelector("#city");
weatherForm.addEventListener("submit", getTemperature);
