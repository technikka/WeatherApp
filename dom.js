const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");
const searchResults = document.querySelector(".select-city");
const errorDiv = document.querySelector(".error");
const content = document.querySelector(".content");
const backgroundImage = document.querySelector(".background-image");
const tempUnit = document.querySelector("input[type=range]");
const weatherProperties = document.querySelector(".weather-properties");

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

  displayWeatherType();

  displayFeelsLike();
  displayLowTemp();
  displayHighTemp();

  displayLowerBackdrop();

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
  const tempDiv = document.createElement("div");
  tempDiv.classList.add("current-temp");
  weatherProperties.appendChild(tempDiv);
  tempDiv.textContent = formatTemp(currentTemp());
};

const formatWeatherType = (type) => {
  if (type === "Thunderstorm") {
    return "Stormy Skies";
  } else if (type === "Drizzle" || type === "Rain") {
    return "Rainy Skies";
  } else if (type === "Snow") {
    return "Snowy Skies";
  } else if (type === "Clouds") {
    return "Cloudy Skies";
  } else if (type === "Clear") {
    return "Clear Skies";
  } else {
    return `${type}y Atmosphere`;
  }
};

const displayWeatherType = () => {
  const typeDiv = document.createElement("div");
  typeDiv.classList.add("type");
  weatherProperties.appendChild(typeDiv);
  typeDiv.textContent = formatWeatherType(weatherType());
};

const displayFeelsLike = () => {
  const tempDiv = document.createElement("div");
  tempDiv.classList.add("feels-like");
  weatherProperties.appendChild(tempDiv);
  tempDiv.textContent = "Feels Like " + formatTemp(feelsLike());
};

const displayLowTemp = () => {
  const tempDiv = document.createElement("div");
  tempDiv.classList.add("low-temp");
  weatherProperties.appendChild(tempDiv);
  tempDiv.textContent = "Low " + formatTemp(lowTemp());
};

const displayHighTemp = () => {
  const tempDiv = document.createElement("div");
  tempDiv.classList.add("high-temp");
  weatherProperties.appendChild(tempDiv);
  tempDiv.textContent = "High " + formatTemp(highTemp());
};

const displayHumidity = () => {
  const humDiv = document.createElement("div");
  humDiv.classList.add("humidity");
  const backdrop = document.querySelector(".lower-backdrop");
  backdrop.appendChild(humDiv);
  const value = document.createElement("div");
  value.textContent = humidity() + "\u0025";
  const property = document.createElement("div");
  property.textContent = "Humidity";
  humDiv.appendChild(value);
  humDiv.appendChild(property);
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
  const visDiv = document.createElement("div");
  visDiv.classList.add("visibility");
  const backdrop = document.querySelector(".lower-backdrop");
  backdrop.appendChild(visDiv);
  const value = document.createElement("div");
  value.textContent = formatVisibility(visibility());
  const property = document.createElement("div");
  property.textContent = "Visibility";
  visDiv.appendChild(value);
  visDiv.appendChild(property);
};

const displayWindSpeed = () => {
  const windDiv = document.createElement("div");
  windDiv.classList.add("wind-speed");

  const backdrop = document.querySelector(".lower-backdrop");
  backdrop.appendChild(windDiv);

  const value = document.createElement("div");
  value.textContent = windSpeed() + " mph";
  const property = document.createElement("div");
  property.textContent = "Wind";
  windDiv.appendChild(value);
  windDiv.appendChild(property);
};

const displayLowerBackdrop = () => {
  const div = document.createElement("div");
  div.classList.add("lower-backdrop");
  div.classList.add("dark-background");
  weatherProperties.appendChild(div);
};

searchBtn.addEventListener("click", (event) => {
  errorDiv.textContent = "";
  searchResults.textContent = "";
  weatherProperties.textContent = "";
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
  const header = document.createElement("h2");
  header.textContent = "Select Location";
  searchResults.appendChild(header);
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
  const locationHeader = document.createElement("h1");
  locationHeader.classList.add("current-location");
  weatherProperties.appendChild(locationHeader);
  locationHeader.textContent = locationObj.name;
};

const toggleError = (error) => {
  if (error) {
    errorDiv.classList.add("show");
    errorDiv.classList.add("dark-background");
  } else {
    errorDiv.classList.remove("show");
    errorDiv.classList.remove("dark-background");
  }
};

const displayLocationInvalid = () => {
  locationHeader.textContent = "";
  toggleError(true);
  errorDiv.textContent = "Please enter a valid zipcode or string";
};

const displayLocationNotFound = () => {
  toggleError(true);
  errorDiv.textContent = "That location was not found in our database";
};

const displayBackgroundImage = () => {
  const weather = weatherTypeId();
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
