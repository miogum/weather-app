let apiKey = "40d6bad2eff6e11cb44680c13dcdac2c";
let temp = document.querySelector("#current-temp");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
let searchInput = document.querySelector("#search-input");
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

// // update sunrise time
// function sunriseTime(timestamp) {
//   let sunriseTime = new Date(timestamp);
//   let hours = sunriseTime.getHours();
//   let minutes = sunriseTime.getMinutes();
//   let timeOfDay = "";
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   if (hours < 12) {
//     timeOfDay = "am";
//   } else {
//     timeOfDay = "pm";
//   }
//   return `${hours}:${minutes}${timeOfDay}`;
// }

// // update sunset time
// function sunsetTime(timestamp) {
//   let sunsetTime = new Date(timestamp);
//   let hours = sunsetTime.getHours();
//   let minutes = sunsetTime.getMinutes();
//   let timeOfDay = "";
//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }
//   if (hours < 10) {
//     hours = `0${hours}`;
//   }
//   if (hours < 12) {
//     timeOfDay = "am";
//   } else {
//     timeOfDay = "pm";
//   }
//   return `${hours}:${minutes}${timeOfDay}`;
// }

let getForecast = (coordinates) => {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};

// update current weather info
let displayCurrentTempInfo = (response) => {
  let displayCity = document.querySelector("#city");
  let weatherIcon = document.querySelector("#weather-icon");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let mintemp = document.querySelector("#mintemp");
  let maxtemp = document.querySelector("#maxtemp");

  let dataInfo = response.data;
  celsiusTemp = Math.round(dataInfo.main.temp);
  temp.innerHTML = celsiusTemp;
  console.log(dataInfo);
  displayCity.innerHTML = `${dataInfo.name}`;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${dataInfo.weather[0].icon}@2x.png`
  );

  humidity.innerHTML = dataInfo.main.humidity + `%`;
  windSpeed.innerHTML = (dataInfo.wind.speed * 2.237).toFixed(1) + " mph";
  description.innerHTML = dataInfo.weather[0].description;
  console.log(dataInfo);
  date.innerHTML = formatDate(dataInfo.dt * 1000);
  time.innerHTML = formatTime();
  mintemp.innerHTML = Math.round(dataInfo.main.temp_min) + `°C`;
  maxtemp.innerHTML = Math.round(dataInfo.main.temp_max) + `°C`;

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
  searchLocation(searchInput.value);
}

let formatDay = (timestamp) => {
  let date = new Date(timestamp);
  let day = date.getDay();

  return days[day];
};

// display 5 day weather forecast
function displayForecast(response) {
  forecastCelsius = "hi";
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = ``;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML += `
    <div class="col-md-2 col-12"> 
       <div class="row card-body justify-content-center align-content-center">
          <h5 class="col-3 col-md-12 card-title mb-2 day align-self-center">${formatDay(
            forecastDay.dt * 1000
          )}</h5>
          <h5 class="col-3 col-md-12 card-title temp align-self-center">${Math.round(
            forecastDay.temp.day
          )}°C</h5>
          <img
            class="forecast-img col-3 col-md-12"
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="sun"
          />
        </div>
    </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

// temperature conversions
function displayF(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
  console.log(forecastCelsius);
  // toggle visibility of units
  fahrenheit.classList.remove("not-in-use");
  celsius.classList.add("not-in-use");
}

function displayC(event) {
  event.preventDefault();
  temp.innerHTML = celsiusTemp;

  // toggle visibility of units
  fahrenheit.classList.add("not-in-use");
  celsius.classList.remove("not-in-use");
}

// display fahrenheit temperature
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayF);

// diaplay celsius temperature
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayC);

let submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", getLocation);

searchInput.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    submitBtn.click();
  }
});

searchLocation("London");
