const state = {
  myCityList: []
};

const getters = {
  myCityList: state => state.myCityList
};

const actions = {
  addCityToMyList(context, payload) {
    const cityAlreadyPresent = context.getters.myCityList.find(
      el => el.id === payload.id
    );
    if (cityAlreadyPresent) {
      context.dispatch("triggerSnackbar", {
        snackbarMessage: `${payload.name} is already present in your list`
      });
    } else {
      // make api call to store the city in db
      context.commit("addCityToMyList", [payload]);
    }
  },
  removeCityFromList(context, payload) {
    const arr = [...context.getters.myCityList];
    const i = arr.findIndex(el => el.id === payload.id);
    arr.splice(i, 1);
    // api call to remove
    context.commit("loadMyCities", arr);
  },
  // eslint-disable-next-line no-unused-vars
  loadMyCities(context, payload) {
    // Api call to get all loaded cities
    if (context.getters.isLoggedIn) {
      import("../../assets/json/cityList.json")
        .then(data => {
          context.commit("loadMyCities", data.default);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      context.commit("loadMyCities", []);
    }
  }
};

const mutations = {
  addCityToMyList(state, payload) {
    state.myCityList = [...state.myCityList, ...payload];
  },
  loadMyCities(state, payload) {
    state.myCityList = [...payload];
  }
};

export const cityListStore = {
  state,
  getters,
  actions,
  mutations
};
