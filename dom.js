const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");
const searchResults = document.querySelector(".select-city");
const errorDiv = document.querySelector(".error");
const locationHeader = document.querySelector(".current-location");
const content = document.querySelector(".content");
const tempUnit = document.querySelector("input[type=range]");

tempUnit.addEventListener("change", () => {
  // change temperatures to celcius
  // if tempUnit.value === 0
  // convert all to farenheight
  // if tempUnit.value === 1
  // convert all to celcius
});

const displayResults = () => {
  displayCurrentLocation();
  displayCurrentWeather();
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
