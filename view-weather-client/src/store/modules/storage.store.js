const state = {
  savedCity: null
};

const getters = {
  savedCity: state => state.savedCity
};

const actions = {
  saveCity(context, payload) {
    const str = JSON.stringify(payload);
    window.localStorage.setItem("lastCity", str);
  },
  loadSavedCity(context) {
    const savedCity = window.localStorage.getItem("lastCity");
    const savedCityObj = savedCity && JSON.parse(savedCity);
    if (savedCityObj) {
      context.commit("savedCity", savedCityObj);
    }
  }
};

const mutations = {
  savedCity(state, payload) {
    state.savedCity = payload;
  }
};

export const storageStore = {
  state,
  getters,
  actions,
  mutations
};
