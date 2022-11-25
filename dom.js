const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");
const searchResults = document.querySelector(".select-city");
const errorDiv = document.querySelector(".error");
const locationHeader = document.querySelector(".current-location");
const content = document.querySelector(".content");
const backgroundImage = document.querySelector(".background-image");
const tempUnit = document.querySelector("input[type=range]");
const weatherProperties = document.querySelector('.weather-properties');

tempUnit.addEventListener("change", () => {
  if (weatherObj) {
    displayCurrentTemp();
    displayFeelsLike();
    displayLowTemp();
    displayHighTemp();
  }
});

const displayResults = () => {
  
  displayCurrentLocation();
  displayCurrentWeather();
  displayBackgroundImage();
};

const displayCurrentWeather = () => {
  displayCurrentTemp();
  displayFeelsLike();
  displayLowTemp();
  displayHighTemp();
  displayHumidity();
  displayVisibility();
  displayWindSpeed();
};

const formatTemp = (temp) => {
  if (tempUnit.value === "0") {
    return temp + "\u00B0";
  } else {
    return tempToCelsius(temp) + "\u00B0";
  }
};

const displayCurrentTemp = () => {
  const tempDiv = document.querySelector(".current-temp");
  tempDiv.textContent = "Current " + formatTemp(currentTemp());
};

const displayFeelsLike = () => {
  const tempDiv = document.querySelector(".feels-like");
  tempDiv.textContent = "Feels Like " + formatTemp(feelsLike());
};

const displayLowTemp = () => {
  const tempDiv = document.querySelector(".low-temp");
  tempDiv.textContent = "Low " + formatTemp(lowTemp());
};

const displayHighTemp = () => {
  const tempDiv = document.querySelector(".high-temp");
  tempDiv.textContent = "High " + formatTemp(highTemp());
};

const displayHumidity = () => {
  const humDiv = document.querySelector(".humidity");
  humDiv.textContent = humidity() + "\u0025" + " humidity";
};

const formatVisibility = (meters) => {
  if (meters >= 1000) {
    let numOfKm = Math.round(meters / 1000);
    return numOfKm + " km";
  } else {
    return meters + " m";
  }
};
const displayVisibility = () => {
  const visDiv = document.querySelector(".visibility");
  visDiv.textContent = formatVisibility(visibility()) + " visibility";
};

const displayWindSpeed = () => {
  const windDiv = document.querySelector(".wind-speed");
  windDiv.textContent = windSpeed() + " mph";
};

searchBtn.addEventListener("click", (event) => {
  errorDiv.textContent = "";
  searchResults.textContent = "";
  event.preventDefault();
  toggleError();

  let input = searchField.value;
  if (/^[0-9]{5}(?:-[0-9]{4})?$/.test(input)) {
    searchByZipcode(input);
    toggleTrigger();
    toggleDrawer();
  } else if (/^([^a-zA-Z]*[A-Za-z]){4}[\s\S]*/.test(input)) {
    searchByCity(input);
  } else {
    displayLocationInvalid();
  }
});

const displayLocations = (locationsArray) => {
  toggleTrigger();
  toggleDrawer();
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

const toggleError = (error) => {
  if (error) {
    errorDiv.classList.add("show");
    errorDiv.classList.add("dark-background");
  } else {
    errorDiv.classList.remove('show')
    errorDiv.classList.remove('dark-background')
  }
};

const displayLocationInvalid = () => {
  locationHeader.textContent = "";
  toggleError(true);
  errorDiv.textContent = "Please enter a valid zipcode or string";
};

const displayLocationNotFound = () => {
  locationHeader.textContent = "";
  toggleError(true);
  errorDiv.textContent = "That location was not found in our database";
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
