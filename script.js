const apiKey = "76431272d389605d0569ccddf5351f6b";
let selectedLocation;

const geocodeCall = (cityName, limit = 5) => {
  return (
    "http://api.openweathermap.org/geo/1.0/direct?" +
    "q=" +
    cityName +
    ",840" +
    "&limit=" +
    limit +
    "&appid=" +
    apiKey
  );
};

const currentWeatherCall = (lat, lon) => {
  return (
    "https://api.openweathermap.org/data/2.5/weather?" +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey
  );
};

async function currentWeather() {
  try {
    let response = await fetch(
      currentWeatherCall(selectedLocation.lat, selectedLocation.lon),
      { mode: "cors" }
    );
    let dataArray = await response.json();
    console.log(dataArray);
  } catch (error) {
    console.log(error);
  }
}

async function searchLocation(cityName) {
  try {
    let response = await fetch(geocodeCall(cityName), { mode: "cors" });
    let dataArray = await response.json();
    if (dataArray.length > 0) {
      displayLocations(dataArray);
    } else {
      displayLocationInvalid();
    }
  } catch (error) {
    console.log(error);
  }
}

// Dom manipulation

const container = document.querySelector(".select-city");

const displayLocations = (locationsArray) => {
  locationsArray.forEach(function (location) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("selectable");
    container.appendChild(newDiv);
    newDiv.textContent = location.name + ", " + location.state;

    newDiv.addEventListener("click", function () {
      let nodeList = document.querySelectorAll(".selectable");
      let index = Array.from(nodeList).indexOf(this);
      selectedLocation = locationsArray[index];
      currentWeather();
    });
  });
};

const displayLocationInvalid = () => {
  let newDiv = document.createElement("div");
  container.appendChild(newDiv);
  newDiv.textContent = "That location was not found in our database";
};

searchLocation("jacksonville");
