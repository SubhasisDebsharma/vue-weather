const state = {
  cities: []
};

const getters = {
  cities: state => state.cities
};

const actions = {
  addCities(context, payload) {
    context.commit("addCities", payload);
  },
  loadCities(context, payload) {
    // Api call to get all loaded cities
    context.commit("addCities", payload);
  }
};

const mutations = {
  addCities(state, payload) {
    state.list = [...state.list, ...payload];
  },
  loadCities(state, payload) {
    state.list = [...payload];
  }
};

export const cityListStore = {
  state,
  getters,
  actions,
  mutations
};
