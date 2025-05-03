let weatherTab = document.getElementById("weatherTab");
let searchTab = document.getElementById("searchTab");
let grantLocaDiv = document.getElementById("grantLocaDiv");
let grantBtn = document.getElementById("grantBtn");
let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");
let loadingDiv = document.getElementById("loadingDiv");
let showWeatherDiv = document.getElementById("showWeatherDiv");
let cityName = document.getElementById("cityName");
let countryIcon = document.getElementById("countryIcon");
let weather_description = document.getElementById("weather_description");
let weather_icon = document.getElementById("weather_icon");
let temperature = document.getElementById("temperature");
let windspeed = document.getElementById("windspeed");
let humidityInfo = document.getElementById("humidity");
let cloudsInfo = document.getElementById("clouds");
let searchContainer = document.getElementById("searchContainer");
let errorDiv = document.getElementById("errorDiv");

const apiKey = "602058fce0f15ee163b5a8d418152c8f";

//function to Get coordinates from sessionStorage and get current location 
function loadSessionStorage() {
  const localCoordinates = sessionStorage.getItem("user-coordinates");
  if (localCoordinates) {
    grantLocaDiv.classList.add("hidden");
    const { lat, lon } = JSON.parse(localCoordinates);
    getCurrentLocation(lat, lon);
  }
  else {
    showWeatherDiv.classList.add("hidden");
  }
}

//on dom content loading hide loading and searchBar and get coordinates from session storage and find temp
document.addEventListener("DOMContentLoaded", () => {
  loadingDiv.classList.add("hidden");
  searchContainer.classList.add("hidden");
  loadSessionStorage();
  
});

//on clicking search button it opens data of searched city
searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); //prevents form submission as button is inside the form
  let city = cityInput.value.trim();
  if (!city) return;

  try {
    clearErrorImage();
    getData(city);
    cityInput.value = "";  //empting searchBar after clicking
    console.log("city is.....", city);
    showWeatherDiv.classList.remove("hidden");
  } catch (error) {
    console.log("City is not Not found");

  }
});

// to get data of city entered by user
async function getData(city) {
  try {
    loadingDiv.classList.remove("hidden"); //show loading until fetch
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    loadingDiv.classList.add("hidden");

    let data = await response.json();
    if (data.cod !== 200) {
      // Check if city exists
      throw new Error("City not found");
    }
    console.log("Data is", data);
    displayWeatherDetails(data);
  } catch (error) {
    showError();
  } 
}

//get users current location and then its data
function getCurrentData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoordinates);
  } else {
    console.log("No geolocation support");
  }
}

function getCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log("Lat: ", lat, "Long: ", lon);

  sessionStorage.setItem("user-coordinates", JSON.stringify({ lat, lon }));
  getCurrentLocation(lat, lon);
}
// showerror function for entering wrong city
function showError(){
  errorDiv.classList.remove("hidden")
  loadingDiv.classList.add("hidden");
  grantLocaDiv.classList.add("hidden");
  showWeatherDiv.classList.add("hidden");
  //prevent adding img if it already exist
  let errorImg = document.getElementById("errorImg");
  if (errorImg) return;
  //if not exist add it
  const image = document.createElement("img");
  image.src = "images/not-found.png";
  image.id = "errorImg";
  image.style.height = "18rem";
  errorDiv.appendChild(image);
  const newPara = document.createElement("p");
  newPara.id = "errorPara";
  newPara.textContent = "CITY NOT FOUND";
  errorDiv.appendChild(newPara);
  // image.classList.remove("hidden");
  // newPara.classList.remove("hidden");
}

async function getCurrentLocation(lat, lon) {
  try {
    loadingDiv.classList.remove("hidden");
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    let data = await response.json();
    console.log("current data is", data);
    showWeatherDiv.classList.remove("hidden");
    displayWeatherDetails(data);
  } catch (error) {
    console.log("Failed to fetch current location data.");
  } finally {
    loadingDiv.classList.add("hidden");
  }
}

grantBtn.addEventListener("click", () => {
  
  grantLocaDiv.classList.add("hidden")
  getCurrentData();
});

// function to display all weather details
function displayWeatherDetails(data) {
  let { name, weather, main, wind, clouds, sys } = data;
  cityName.textContent = name;
  //  getting icon of weather
  let iconCode = weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weather_icon.src = iconUrl;

  let countryCode = sys.country;
  let flagUrl = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
  countryIcon.src = flagUrl;
  weather_description.textContent = weather[0].main;
  temperature.textContent = `${main.temp}°C`;
  windspeed.textContent = `${wind.speed}m/s`;
  humidityInfo.textContent = `${main.humidity}%`;
  cloudsInfo.textContent = `${clouds.all}%`;
  
}

searchTab.addEventListener("click", () => {
  grantLocaDiv.classList.add("hidden");
  showWeatherDiv.classList.add("hidden");
  searchContainer.classList.remove("hidden");
});

weatherTab.addEventListener("click", () => {
  showWeatherDiv.classList.remove("hidden");
  errorDiv.classList.add("hidden")
  loadSessionStorage();
  searchContainer.classList.add("hidden");
});

function clearErrorImage() {
  const existingErrorImg = document.getElementById("errorImg");
  if (existingErrorImg) existingErrorImg.remove();
  const errorPara = document.getElementById("errorPara");
  if(errorPara) errorPara.remove();

   errorDiv.classList.add("hidden"); 
  
}
