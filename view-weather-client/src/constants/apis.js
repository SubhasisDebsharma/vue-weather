module.exports = {
  sampleFiveDaysWeather:
    // "https://firebasestorage.googleapis.com/v0/b/viewweather-a2bc9.appspot.com/o/fiveDaysWeather.json?alt=media&token=048e03e3-9975-44de-86f2-7dd02cfa5c53",
    "https://samples.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22",
  sampleLocalWeather:
    "https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22",
  cityAutoComplete:
    "http://localhost:5001/viewweather-a2bc9/us-central1/dummySearchCities",
  addCityToMyList:
    "http://localhost:5001/viewweather-a2bc9/us-central1/widgets/addCityToMyList",
  getMyCityList:
    "http://localhost:5001/viewweather-a2bc9/us-central1/widgets/getMyCityList",
  removeCityFromList:
    "http://localhost:5001/viewweather-a2bc9/us-central1/widgets/removeCityFromList",
  currentWeather: "https://api.openweathermap.org/data/2.5/weather",
  fiveDaysForecast: "https://api.openweathermap.org/data/2.5/forecast"
};
