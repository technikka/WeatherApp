const searchField = document.querySelector("input[type=text]");
const searchBtn = document.querySelector("input[type=submit");
const searchResults = document.querySelector(".select-city");
const errorDiv = document.querySelector(".error");

searchBtn.addEventListener("click", (event) => {
  errorDiv.textContent = "";
  searchResults.textContent = "";
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
      getCurrentWeather();
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
