import axios from "axios";
import apis from "../../constants/apis";
import config from "../../config";
import { SNACKBAR_TYPE } from "../../constants/snackbar.const";
const state = {
  searchedCity: null,
  searchedWeatherForecast: null,
  searchedWeatherForecastLoading: false,
  searchedCurrentWeather: null,
  searchedCurrentWeatherLoading: false,
  localWeather: null,
  localWeatherLoading: true
};

const getters = {
  searchedCity: state => state.searchedCity,
  searchedWeatherForecast: state => state.searchedWeatherForecast,
  searchedWeatherForecastLoading: state => state.searchedWeatherForecastLoading,
  searchedCurrentWeather: state => state.searchedCurrentWeather,
  searchedCurrentWeatherLoading: state => state.searchedCurrentWeatherLoading,
  localWeather: state => state.localWeather,
  localWeatherLoading: state => state.localWeatherLoading
};

const actions = {
  getSearchWeather(context, payload) {
    context.commit("searchedCity", payload);
    context.commit("searchedWeatherForecastLoading", true);
    axios
      .get(apis.fiveDaysForecast, {
        params: {
          id: payload.id,
          appid: config.WEATHER_API_KEY,
          units: "metric"
        }
      })
      .then(
        response => {
          context.commit("searchedWeatherForecastLoading", false);
          context.commit("searchedWeatherForecast", response.data);
        },
        err => {
          context.dispatch("triggerSnackbar", {
            snackbarMessage: "Faild to load weather forecast: " + err.message,
            snackbarType: SNACKBAR_TYPE.ERROR
          });
          context.commit("searchedWeatherForecastLoading", false);
          context.commit("searchedWeatherForecast", null);
        }
      );
    context.commit("searchedCurrentWeatherLoading", true);
    axios
      .get(apis.currentWeather, {
        params: {
          id: payload.id,
          appid: config.WEATHER_API_KEY,
          units: "metric"
        }
      })
      .then(response => {
        context.commit("searchedCurrentWeatherLoading", false);
        context.commit("searchedCurrentWeather", response.data);
        context.dispatch("saveCity", payload);
      })
      .catch(err => {
        context.dispatch("triggerSnackbar", {
          snackbarMessage: "Faild to load current weather: " + err.message,
          snackbarType: SNACKBAR_TYPE.ERROR
        });
        context.commit("searchedCurrentWeatherLoading", false);
        context.commit("searchedCurrentWeather", null);
      });
  },
  loadLocalWeather(context) {
    if ("geolocation" in navigator) {
      context.commit("localWeatherLoading", true);
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        axios
          .get(apis.currentWeather, {
            params: {
              lat,
              lon,
              appid: config.WEATHER_API_KEY,
              units: "metric"
            }
          })
          .then(response => {
            context.commit("localWeatherLoading", false);
            context.commit("localWeather", response.data);
          })
          .catch(err => {
            context.dispatch("triggerSnackbar", {
              snackbarMessage: "Faild to load local weather: " + err.message,
              snackbarType: SNACKBAR_TYPE.ERROR
            });
            context.commit("localWeatherLoading", false);
            context.commit("localWeather", null);
          });
      });
    }
  }
};

const mutations = {
  searchedCity(state, payload) {
    state.searchedCity = payload;
  },
  searchedWeatherForecast(state, payload) {
    state.searchedWeatherForecast = payload;
  },
  searchedWeatherForecastLoading(state, payload) {
    state.searchedWeatherForecastLoading = payload;
  },
  searchedCurrentWeather(state, payload) {
    state.searchedCurrentWeather = payload;
  },
  searchedCurrentWeatherLoading(state, payload) {
    state.searchedCurrentWeatherLoading = payload;
  },
  localWeather(state, payload) {
    state.localWeather = payload;
  },
  localWeatherLoading(state, payload) {
    state.localWeatherLoading = payload;
  }
};

export const weatherStore = {
  state,
  getters,
  actions,
  mutations
};
