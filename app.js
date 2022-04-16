// change city
let city = document.querySelector("#city");
let btn = document.querySelector(".submit");
let btn2 = document.querySelector(".current");
let temp = document.querySelector("#temp");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let time = document.querySelector("#current-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// live data API
let apiKey = "40d6bad2eff6e11cb44680c13dcdac2c";

let displayCurrentInfo = (response) => {
  let dataInfo = response.data;

  // display temperarure
  let currentTemperature = Math.round(dataInfo.main.temp);
  temp.innerHTML = `${currentTemperature}°C`;
  // display description
  let currentDescription = dataInfo.weather[0].description;
  description.innerHTML = `Description: ${currentDescription}`;
  // display humidity
  let currentHumidity = dataInfo.main.humidity;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  // display wind speed
  let currentWindSpeed = Math.round(dataInfo.wind.speed * 2.23694);
  wind.innerHTML = `Wind Speed: ${currentWindSpeed} mph`;
};

function changeCity() {
  let cityInput = document.querySelector("#enterCity");
  if (cityInput.value === 0) {
    alert("Please enter a city");
  } else {
    cityInput = cityInput.value.split("");
    let input = [];

    for (let i = 0; i < cityInput.length; i++) {
      if (i > 0) {
        input.push(cityInput[i].toLowerCase());
      } else {
        input.push(cityInput[i].toUpperCase());
      }
    }
    city.innerHTML = input.join("");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.join(
      ""
    )}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayCurrentInfo);
  }
}

function showTemp(response) {
  city.innerHTML = response.data.name;
  displayCurrentInfo(response);
}

let showLocation = (position) => {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUpdate = `${apiURL}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUpdate).then(showTemp);
};

function getLocalForecast() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function dateTime() {
  let now = new Date();
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();
  time.innerHTML = `${day} ${hour}:${minute}`;
}

btn.addEventListener("click", changeCity);

btn2.addEventListener("click", getLocalForecast);

dateTime();
