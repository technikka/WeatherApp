const apiKey = "76431272d389605d0569ccddf5351f6b";
let locationObj;
let weatherObj;

const setLocationObj = async (value) => {
  locationObj = value;
  weatherObj = await getCurrentWeather(value.lat, value.lon);
  return weatherObj;
};

const currentTemp = () => {
  return Math.round(weatherObj.main.temp);
};

const lowTemp = () => {
  return Math.round(weatherObj.main.temp_min);
};

const highTemp = () => {
  return Math.round(weatherObj.main.temp_max);
};

const tempToCelsius = (farenheight) => {
  return Math.round(farenheight - 32 * 0.5556);
};

const feelsLike = () => {
  return Math.round(weatherObj.main.feels_like);
};

const humidity = () => {
  return weatherObj.main.humidity;
};

// const pressure = () => {
//   return weatherObj.main.pressure;
// };

const visibility = () => {
  return weatherObj.visibility;
}

const windSpeed = () => {
  return weatherObj.wind.speed;
}

const weatherTypeId = () => {
  return weatherObj.weather[0].id;
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
      setLocationObj(data).then(() => {
        displayResults();
      });
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
    "&units=imperial" +
    "&appid=" +
    apiKey
  );
};
