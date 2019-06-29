const state = {
  user: null
};

const getters = {
  user: state => state.user,
  isLoggedIn: state => !!state.user
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  login(context, payload) {
    // run firebase method to login
    // 1. popup login
    const userData = {
      userName: "Subhasis Debsharma",
      profilePicture: ""
    };
    context.commit("login", userData);
  },
  // eslint-disable-next-line no-unused-vars
  silentLogin(context, payload) {
    // run firebase method to login
    // 1. auto login
    const userData = {
      userName: "Subhasis Debsharma",
      profilePicture: ""
    };
    context.commit("login", userData);
  },
  logout(context) {
    // Api call to get all loaded cities
    // remove if anything is in browser storage
    // logout from firebase
    context.commit("logout");
  }
};

const mutations = {
  login(state, payload) {
    state.list = payload;
  },
  logout(state, payload) {
    state.user = payload;
  }
};

export const cities = {
  state,
  getters,
  actions,
  mutations
};
