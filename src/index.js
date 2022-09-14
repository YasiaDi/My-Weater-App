let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let dayIndex = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[dayIndex];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
 let forecastHTML = `<div class="row">`; 
  days.forEach(function (day) {
     forecastHTML =
      forecastHTML +
            `<div class="col-2">
              <div class="weather-forecast-weekday">${day}</div>
              <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="" width="42">
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">23°</span>
                <span class="weather-forecast-temp-min">16°</span>
              </div>
            </div>`;
             });
        
 forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let showDate = document.querySelector("#date");
showDate.innerHTML = `${date} ${month} ${year}`;
let showTime = document.querySelector("#time");
showTime.innerHTML = `${day}, ${hours}:${minutes}🕑`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiumTemperature = response.data.main.temp;
  document.querySelector("#degrees").innerHTML = Math.round(celsiumTemperature);
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%💦`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h🌬️`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let weatherIcon = document.querySelector("#Weather-Icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let farengheitTemp = document.querySelector("#farengheit");
farengheitTemp.addEventListener("click", function (event) {
  event.preventDefault();
  let degreesF = document.querySelector("#degrees");
    celsiumTemp.classList.remove("active");
  farengheitTemp.classList.add("active");
  degreesF.innerHTML = Math.round((celsiumTemperature * 9) / 5 + 32);
});

let celsiumTemp = document.querySelector("#celsium");
celsiumTemp.addEventListener("click", function (event) {
  event.preventDefault();
  let degreesC = document.querySelector("#degrees");
  celsiumTemp.classList.add("active");
  farengheitTemp.classList.remove("active");
  degreesC.innerHTML = Math.round(celsiumTemperature);
});

function searchCity(city) {
  let units = "metric";
  let apiKey = "5c3ca9a3ee35bb20a7e1912736e317c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5c3ca9a3ee35bb20a7e1912736e317c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiumTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kharkiv");
displayForecast();
