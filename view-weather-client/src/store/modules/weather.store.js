// import axios from "axios";
// import apis from "../../constants/apis";

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
    import("../../assets/json/fiveDaysWeather.json").then(
      data => {
        context.commit("searchedWeatherForecastLoading", false);
        context.commit("searchedWeatherForecast", data);
      },
      err => {
        console.log(err);
        context.commit("searchedWeatherForecastLoading", false);
        context.commit("searchedWeatherForecast", null);
      }
    );
    context.commit("searchedCurrentWeatherLoading", true);
    import("../../assets/json/currentWeather.json").then(
      data => {
        context.commit("searchedCurrentWeatherLoading", false);
        context.commit("searchedCurrentWeather", data);
        context.dispatch("saveCity", payload);
      },
      err => {
        console.log(err);
        context.commit("searchedCurrentWeatherLoading", false);
        context.commit("searchedCurrentWeather", null);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  loadLocalWeather(context, payload) {
    // Api call to get all loaded cities
    context.commit("localWeatherLoading", true);
    import("../../assets/json/currentWeather.json").then(
      data => {
        context.commit("localWeatherLoading", false);
        context.commit("localWeather", data);
      },
      err => {
        console.log(err);
        context.commit("localWeatherLoading", false);
        context.commit("localWeather", null);
      }
    );
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
