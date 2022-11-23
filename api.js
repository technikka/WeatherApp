const apiKey = "76431272d389605d0569ccddf5351f6b";
let locationObj;

const setLocationObj = (value) => {
  locationObj = value
}

async function getCurrentWeather() {
  try {
    let response = await fetch(
      callCurrentWeatherUrl(locationObj.lat, locationObj.lon),
      { mode: "cors" }
    );
    let dataArray = await response.json();
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

async function searchByCity(cityName) {
  try {
    let response = await fetch(callbyCityUrl(cityName), { mode: "cors" });
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

async function searchByZipcode(zipcode) {
  try {
    let response = await fetch(callbyZipcodeUrl(zipcode), { mode: "cors" });
    let data = await response.json();
    if (data) {
      setLocationObj(data);
    } else {
      displayLocationInvalid();
    }
  } catch (error) {
    console.log(error);
  }
}

const callbyCityUrl = (cityName, limit = 5) => {
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

const callbyZipcodeUrl = (zipcode) => {
  return (
    "http://api.openweathermap.org/geo/1.0/zip?" +
    "zip=" +
    zipcode +
    ",US" +
    "&appid=" +
    apiKey
  );
};

const callCurrentWeatherUrl = (lat, lon) => {
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