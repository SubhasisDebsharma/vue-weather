import axios from "axios";
import apis from "../../constants/apis";

const state = {
  searchedWeather: null,
  localWeather: null,
  weatherAPILoading: true
};

const getters = {
  searchedWeather: state => state.searchedWeather,
  localWeather: state => state.localWeather,
  weatherAPILoading: state => state.weatherAPILoading
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  getSearchWeather(context, payload) {
    context.commit("weatherAPILoading", true);
    import("../../assets/json/fiveDaysWeather.json").then(
      data => {
        console.log(data);
        context.commit("weatherAPILoading", false);
        context.commit("addSearchedWeather", data);
      },
      err => {
        console.log(err);
        context.commit("weatherAPILoading", false);
        context.commit("addSearchedWeather", null);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  loadLocalWeather(context, payload) {
    // Api call to get all loaded cities
    axios.get(apis.sampleLocalWeather).then(
      data => {
        context.commit("addLocalWeather", data);
      },
      err => {
        console.log(err);
        context.commit("addLocalWeather", null);
      }
    );
  }
};

const mutations = {
  addSearchedWeather(state, payload) {
    state.searchedWeather = payload;
  },
  addLocalWeather(state, payload) {
    state.localWeather = payload;
  },
  weatherAPILoading(state, payload) {
    state.weatherAPILoading = payload;
  }
};

export const weatherStore = {
  state,
  getters,
  actions,
  mutations
};
