// HTML elements that will update
// let city = document.querySelector("#city");
let date = 10;
let time = 3;
let temp = document.querySelector("#current-temp");
let units = document.querySelector("#units");
let feelsLike = document.querySelector("#feels-like");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let description = document.querySelector("#description");

let city = "madrid";
// API details
let apiKey = "40d6bad2eff6e11cb44680c13dcdac2c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// update current weather info
let displayCurrentTempInfo = (response) => {
  let dataInfo = response.data;
  console.log(dataInfo);
  temp.innerHTML = Math.round(dataInfo.main.temp) + units.innerHTML;
  feelsLike.innerHTML = dataInfo.main.feels_like;
  humidity.innerHTML = dataInfo.main.humidity;
  windSpeed.innerHTML = dataInfo.wind.speed;
  description.innerHTML = dataInfo.weather[0].description;
};

axios.get(apiUrl).then(displayCurrentTempInfo);
