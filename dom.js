const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");
const searchResults = document.querySelector(".select-city");
const errorDiv = document.querySelector(".error");
const locationHeader = document.querySelector(".current-location");
const content = document.querySelector(".content");
const backgroundImage = document.querySelector(".background-image");
const tempUnit = document.querySelector("input[type=range]");

tempUnit.addEventListener("change", () => {
  if (weatherObj) {
    displayCurrentTemp();
  }
});

const displayResults = () => {
  displayCurrentLocation();
  displayCurrentWeather();
  displayBackgroundImage();
};

const displayBackgroundImage = () => {
  // const weather = weatherTypeId();
  const weather = 850;
  if (weather >= 200 && weather <= 299) {
    // Thunderstorm
    backgroundImage.style.backgroundImage = "url(assets/thunderstorm.jpg)";
  } else if (
    (weather >= 300 && weather <= 399) ||
    (weather >= 500 && weather <= 599)
  ) {
    // Drizzle or Rain
    backgroundImage.style.backgroundImage = "url(assets/rain.jpg)";
  } else if (weather >= 600 && weather <= 699) {
    // Snow
    backgroundImage.style.backgroundImage = "url(assets/snow.jpg)";
  } else if (weather >= 700 && weather <= 799) {
    // Atmosphere (fog, smoke, mist, etc)
    backgroundImage.style.backgroundImage = "url(assets/atmosphere.jpg";
  } else if (weather > 800 && weather <= 899) {
    // Clouds
    backgroundImage.style.backgroundImage = "url(assets/clouds.jpg)";
  } else {
    // weather === 800; Clear
    backgroundImage.style.backgroundImage = "url(assets/clear.jpg)";
  }
};

const displayCurrentWeather = () => {
  displayCurrentTemp();
};

const displayCurrentTemp = () => {
  const tempDiv = document.querySelector(".current-temp");
  if (tempUnit.value === "0") {
    tempDiv.textContent = currentTemp() + "\u00B0";
  } else {
    tempDiv.textContent = tempToCelsius(currentTemp()) + "\u00B0";
  }
};

searchBtn.addEventListener("click", (event) => {
  errorDiv.textContent = "";
  searchResults.textContent = "";
  event.preventDefault();

  let input = searchField.value;
  if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(input)) {
    searchByZipcode(input);
  } else if (/^([^a-zA-Z]*[A-Za-z]){4}[\s\S]*/.test(input)) {
    searchByCity(input);
  } else {
    displayLocationInvalid();
  }
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
      setLocationObj(locationsArray[index]).then(() => {
        displayResults();
      });
      searchResults.textContent = "";
    });
  });
};

const displayCurrentLocation = () => {
  locationHeader.textContent = locationObj.name + ", " + locationObj.state;
};

const displayLocationInvalid = () => {
  locationHeader.textContent = "";
  errorDiv.textContent = "Please enter a valid zipcode or string";
};

const displayLocationNotFound = () => {
  locationHeader.textContent = "";
  errorDiv.textContent = "That location was not found in our database";
};
