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
      displayLocationInvalid();
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

// Dom manipulation
const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");

searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let value = searchField.value;
  if ((/^[0-9]{5}(?:-[0-9]{4})?$/).test(value)) { // valid zipcode
    locationObj = searchZipcode(value);
  } else {
    locationObj = searchLocation(value);
  }
  console.log(locationObj);
});

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
      locationObj = locationsArray[index];
      currentWeather();
    });
  });
};

const displayLocationInvalid = () => {
  const div = document.querySelector(".error");
  div.textContent = "That location was not found in our database";
};

// // searchLocation("jacksonville");
// searchZipcode('92115');
// // console.log(geocodeZipcodeCall(92115))
