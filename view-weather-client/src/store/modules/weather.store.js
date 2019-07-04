// import axios from "axios";
// import apis from "../../constants/apis";

const state = {
  searchedCity: null,
  searchedWeatherForcust: null,
  searchedWeatherForcustLoading: false,
  searchedCurrentWeather: null,
  searchedCurrentWeatherLoading: false,
  localWeather: null,
  localWeatherLoading: true
};

const getters = {
  searchedCity: state => state.searchedCity,
  searchedWeatherForcust: state => state.searchedWeatherForcust,
  searchedWeatherForcustLoading: state => state.searchedWeatherForcustLoading,
  searchedCurrentWeather: state => state.searchedCurrentWeather,
  searchedCurrentWeatherLoading: state => state.searchedCurrentWeatherLoading,
  localWeather: state => state.localWeather,
  localWeatherLoading: state => state.localWeatherLoading
};

const actions = {
  getSearchWeather(context, payload) {
    context.commit("searchedCity", payload);
    context.commit("searchedWeatherForcustLoading", true);
    import("../../assets/json/fiveDaysWeather.json").then(
      data => {
        console.log(data);
        context.commit("searchedWeatherForcustLoading", false);
        context.commit("searchedWeatherForcust", data);
      },
      err => {
        console.log(err);
        context.commit("searchedWeatherForcustLoading", false);
        context.commit("searchedWeatherForcust", null);
      }
    );
    context.commit("searchedCurrentWeatherLoading", true);
    import("../../assets/json/currentWeather.json").then(
      data => {
        console.log(data);
        context.commit("searchedCurrentWeatherLoading", false);
        context.commit("searchedCurrentWeather", data);
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
        console.log(data);
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
  searchedWeatherForcust(state, payload) {
    state.searchedWeatherForcust = payload;
  },
  searchedWeatherForcustLoading(state, payload) {
    state.searchedWeatherForcustLoading = payload;
  },
  searchedCurrentWeather(state, payload) {
    state.searchCurrentWeather = payload;
  },
  searchedCurrentWeatherLoading(state, payload) {
    state.searchCurrentWeatherLoading = payload;
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
