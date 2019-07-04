import axios from "axios";
import apis from "../../constants/apis";

const state = {
  autoSearchList: [],
  searchAPIProgress: false
};

const getters = {
  autoSearchList: state => state.autoSearchList,
  searchAPIProgress: state => state.searchAPIProgress
};

const actions = {
  loadAutoSearch(context, payload) {
    const url = apis.cityAutoComplete;
    const query = {
      input: payload
    };
    context.commit("setSearchAPIProgress", true);
    axios
      .get(url, {
        params: query
      })
      .then(response => {
        const cities = Object.values(response.data);
        context.commit("addToAutoSearchList", cities);
        context.commit("setSearchAPIProgress", false);
      })
      .catch(error => {
        console.log(error);
        context.commit("setSearchAPIProgress", false);
      });
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
    state.autoSearchList = payload;
    // update the index DB with new Data
  },
  setSearchAPIProgress(state, payload) {
    state.searchAPIProgress = payload;
  }
};

export const autoSearchStore = {
  state,
  getters,
  actions,
  mutations
};
