// import axios from "axios";
// import apis from "../../constants/apis";

const state = {
  autoSearchList: null
};

const getters = {
  autoSearchList: state => state.autoSearchList
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  loadAutoSearch(context, payload) {
    // get weather form weather api with lat lang
    // call api to get get all the cities. should use index db to store the list
    const cities = [
      {
        id: 707860,
        name: "Hurzuf",
        country: "UA",
        coord: {
          lon: 34.283333,
          lat: 44.549999
        }
      },
      {
        id: 519188,
        name: "Novinki",
        country: "RU",
        coord: {
          lon: 37.666668,
          lat: 55.683334
        }
      },
      {
        id: 1283378,
        name: "Gorkhā",
        country: "NP",
        coord: {
          lon: 84.633331,
          lat: 28
        }
      }
    ];
    // as the list is huge better to make a mapping of first 3 laters of city to the city details array
    // to optimise the performace, better to use web worker to create the mapping because the array will be huge
    context.commit("addToAutoSearchList", cities);
  },
  // eslint-disable-next-line no-unused-vars
  getCitiesForAutoSearch(context, payload) {
    // Api call to get all loaded cities
    // call google auto search api
    context.commit("addToAutoSearchList", []);
  }
};

const mutations = {
  addToAutoSearchList(state, payload) {
    state.searchedWeather = payload;
    // update the index DB with new Data
  }
};

export const autoSearchStore = {
  state,
  getters,
  actions,
  mutations
};
