// HTML elements that will update
let date = document.querySelector("#date");
let time = document.querySelector("#time");
let temp = document.querySelector("#current-temp");
let units = document.querySelector("#units");
let feelsLike = document.querySelector("#feels-like");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let description = document.querySelector("#description");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let weatherIcon = document.querySelector("#weather-icon");

// update current date
let formatDate = (timestamp) => {
  let date = new Date(timestamp);
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let year = date.getFullYear();
  let ordinal = "";
  if (dayNumber == 1) {
    ordinal = "st";
  } else if (dayNumber == 2) {
    ordinal = "nd";
  } else if (dayNumber == 3) {
    ordinal = "rd";
  } else if (dayNumber > 3) {
    ordinal = "th";
  }

  return `${day} ${month} ${dayNumber}${ordinal} ${year}`;
};

// update current time
let formatTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let timeOfDay = "";
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours < 12) {
    timeOfDay = "am";
  } else {
    timeOfDay = "pm";
  }

  return `${hours}:${minutes}${timeOfDay}`;
};

// update current weather info
let displayCurrentTempInfo = (response) => {
  let dataInfo = response.data;
  temp.innerHTML = Math.round(dataInfo.main.temp) + units.innerHTML;
  feelsLike.innerHTML = dataInfo.main.feels_like;
  humidity.innerHTML = dataInfo.main.humidity;
  windSpeed.innerHTML = dataInfo.wind.speed;
  description.innerHTML = dataInfo.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${dataInfo.weather[0].icon}@2x.png`
  );
  date.innerHTML = formatDate(dataInfo.dt * 1000);
  time.innerHTML = formatTime();
};

let searchLocation = (city) => {
  // display the name of the city searched
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = city;
  // API details
  let apiKey = "40d6bad2eff6e11cb44680c13dcdac2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // axios call
  axios.get(apiUrl).then(displayCurrentTempInfo);
};

function getLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchLocation(searchInput.value);
}

let form = document.querySelector(".form-group");
form.addEventListener("click", getLocation);

searchLocation("Nairobi");
