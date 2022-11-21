const apiKey = "76431272d389605d0569ccddf5351f6b";
let locationObj;

const geocodeLocationCall = (cityName, limit = 5) => {
  return (
    "http://api.openweathermap.org/geo/1.0/direct?" +
    "q=" +
    cityName +
    ",US" +
    "&limit=" +
    limit +
    "&appid=" +
    apiKey
  );
};

const geocodeZipcodeCall = (zipcode) => {
  return (
    "http://api.openweathermap.org/geo/1.0/zip?" +
    "zip=" +
    zipcode +
    ",US" +
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
      currentWeatherCall(locationObj.lat, locationObj.lon),
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
    let response = await fetch(geocodeLocationCall(cityName), { mode: "cors" });
    let dataArray = await response.json();
    if (dataArray.length > 0) {
      displayLocations(dataArray);
    } else {
      displayLocationNotFound();
    }
  } catch (error) {
    console.log(error);
  }
}

async function searchZipcode(zipcode) {
  try {
    let response = await fetch(geocodeZipcodeCall(zipcode), { mode: "cors" });
    let data = await response.json();
    if (data) {
      console.log(data);
    } else {
      displayLocationInvalid();
    }
  } catch (error) {
    console.log(error);
  }
}

const setLocationObj = (value) => {
  if (typeof value === "object") {
    locationObj = value;
  } else if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(value)) {
    // valid zipcode
    locationObj = searchZipcode(value);
  } else if (/^([^a-zA-Z]*[A-Za-z]){4}[\s\S]*/.test(value)) {
    locationObj = searchLocation(value); // valid string
  } else {
    displayLocationInvalid();
  }
};

// Dom manipulation
const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");
const searchResults = document.querySelector(".select-city");
const errorDiv = document.querySelector(".error");

searchBtn.addEventListener("click", (event) => {
  errorDiv.textContent = '';
  searchResults.textContent = '';
  event.preventDefault();
  setLocationObj(searchField.value);
});

const displayLocations = (locationsArray) => {
  locationsArray.forEach(function (location) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("selectable");
    searchResults.appendChild(newDiv);
    newDiv.textContent = location.name + ", " + location.state;

    newDiv.addEventListener("click", function () {
      let nodeList = document.querySelectorAll(".selectable");
      let index = Array.from(nodeList).indexOf(this);
      setLocationObj(locationsArray[index]);
      currentWeather();
    });
  });
};

const displayCurrentLocation = (location = locationObj.name) => {
  const header = document.querySelector(".current-location");
  header.textContent = location;
};

const displayLocationInvalid = () => {
  errorDiv.textContent = "Please enter a valid zipcode or string";
};

const displayLocationNotFound = () => {
  errorDiv.textContent = "That location was not found in our database";
};
