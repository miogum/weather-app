let apiKey = "40d6bad2eff6e11cb44680c13dcdac2c";
let temp = document.querySelector("#current-temp");
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

let celsiusTemp = null;

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

// update sunrise time
function sunriseTime(timestamp) {
  let sunriseTime = new Date(timestamp);
  let hours = sunriseTime.getHours();
  let minutes = sunriseTime.getMinutes();
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
}

// update sunset time
function sunsetTime(timestamp) {
  let sunsetTime = new Date(timestamp);
  let hours = sunsetTime.getHours();
  let minutes = sunsetTime.getMinutes();
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
}

let getForecast = (coordinates) => {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};

// update current weather info
let displayCurrentTempInfo = (response) => {
  let displayCity = document.querySelector("#city");
  let weatherIcon = document.querySelector("#weather-icon");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");

  let dataInfo = response.data;

  celsiusTemp = Math.round(dataInfo.main.temp);
  temp.innerHTML = celsiusTemp;

  displayCity.innerHTML = `${dataInfo.name}, ${dataInfo.sys.country}`;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${dataInfo.weather[0].icon}@2x.png`
  );
  feelsLike.innerHTML = Math.round(dataInfo.main.feels_like) + `°C`;
  humidity.innerHTML = dataInfo.main.humidity + `%`;
  windSpeed.innerHTML = (dataInfo.wind.speed * 2.237).toFixed(1) + " mph";
  description.innerHTML = dataInfo.weather[0].description;

  date.innerHTML = formatDate(dataInfo.dt * 1000);
  time.innerHTML = formatTime();
  sunrise.innerHTML = sunriseTime(dataInfo.sys.sunrise * 1000);
  sunset.innerHTML = sunsetTime(dataInfo.sys.sunset * 1000);

  getForecast(dataInfo.coord);

  fahrenheit.classList.add("not-in-use");
  celsius.classList.remove("not-in-use");
};

let searchLocation = (city) => {
  // API details
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // axios call
  axios.get(apiUrl).then(displayCurrentTempInfo);
};

function getLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchLocation(searchInput.value);
}

let formatDay = (timestamp) => {
  let date = new Date(timestamp);
  let day = date.getDay();

  return days[day];
};

// display 5 day weather forecast
function displayForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row text-center justify-content-center forecast">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML += `
    <div class="col-2">
      <div class="card">
       <div class="row card-body">
          <h5 class="col-6 col-md-3 col-lg-12 card-title day">${formatDay(
            forecastDay.dt * 1000
          )}</h5>
          <h5 class="col-6 col-md-3 col-lg-12 card-title temp">${Math.round(
            forecastDay.temp.day
          )}°C</h5>
          <img
            class="forecast-img"
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="sun"
          />
        </div>
      </div>
    </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// temperature conversions
function displayF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.remove("not-in-use");
  celsius.classList.add("not-in-use");
}

function displayC(event) {
  event.preventDefault();
  temp.innerHTML = celsiusTemp;
  fahrenheit.classList.add("not-in-use");
  celsius.classList.remove("not-in-use");
}

// display fahrenheit temperature
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayF);

// diaplay celsius temperature
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayC);

// cubmit and search for city
let submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", getLocation);

searchLocation("London");
