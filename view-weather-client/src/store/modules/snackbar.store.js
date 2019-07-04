const state = {
  snackbarMessage: "",
  snackbarType: ""
};

const getters = {
  snackbarMessage: state => state.snackbarMessage,
  snackbarType: state => state.snackbarType
};

const actions = {
  triggerSnackbar(context, payload) {
    context.commit("triggerSnackbar", payload);
  }
};

const mutations = {
  triggerSnackbar(state, payload) {
    state.snackbarMessage = payload && payload.snackbarMessage;
    state.snackbarType = payload && payload.snackbarType;
  }
};

export const snackbarStore = {
  state,
  getters,
  actions,
  mutations
};
