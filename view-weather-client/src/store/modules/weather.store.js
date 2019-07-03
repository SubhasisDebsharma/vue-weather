import axios from "axios";
import apis from "../../constants/apis";

const state = {
  searchedWeather: null,
  localWeather: null
};

const getters = {
  searchedWeather: state => state.searchedWeather,
  localWeather: state => state.localWeather
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  getSearchWeather(context, payload) {
    // get weather form weather api with lat lang

    axios.get(apis.sampleFiveDaysWeather).then(
      data => {
        context.commit("addSearchedWeather", data);
      },
      err => {
        console.log(err);
        context.commit("addSearchedWeather", null);
      }
    );
  },
  // eslint-disable-next-line no-unused-vars
  loadCities(context, payload) {
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
  }
};

export const weatherStore = {
  state,
  getters,
  actions,
  mutations
};
