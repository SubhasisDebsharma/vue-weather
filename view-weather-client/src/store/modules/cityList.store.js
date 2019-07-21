import axios from "axios";
import apis from "../../constants/apis";
import { SNACKBAR_TYPE } from "../../constants/snackbar.const";
const state = {
  myCityList: [],
  myCityListLoadnig: false,
  addingCittLoadnig: false,
  addingCityToList: null
};

const getters = {
  myCityList: state => state.myCityList,
  myCityListLoadnig: state => state.myCityListLoadnig,
  addingCityToList: state => state.addingCityToList
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
      context.commit("addingCityToList", payload);
      axios
        .post(apis.addCityToMyList, payload, {
          headers: {
            Authorization: context.getters.userAuthToken
          }
        })
        .then(response => {
          if (response.data.success) {
            context.dispatch("triggerSnackbar", {
              snackbarMessage: "City has added successfully.",
              snackbarType: SNACKBAR_TYPE.SUCCESS
            });
            context.commit("addCityToMyList", [payload]);
            context.commit("addingCityToList", null);
          }
        })
        .catch(err => {
          context.dispatch("triggerSnackbar", {
            snackbarMessage: err.message + " : " + "Please Check later.",
            snackbarType: SNACKBAR_TYPE.ERROR
          });
          context.commit("addCityToMyList", [payload]);
          context.commit("addingCityToList", null);
        });
    }
  },
  removeCityFromList(context, payload) {
    const arr = [...context.getters.myCityList];
    const i = arr.findIndex(el => el.id === payload.id);
    arr.splice(i, 1);
    axios({
      url: apis.removeCityFromList,
      method: "delete",
      data: { id: payload.id },
      headers: {
        Authorization: context.getters.userAuthToken
      }
    })
      .then(response => {
        if (response.data.success) {
          context.dispatch("triggerSnackbar", {
            snackbarMessage: "City has removed successfully.",
            snackbarType: SNACKBAR_TYPE.SUCCESS
          });
        }
      })
      .catch(err => {
        context.dispatch("triggerSnackbar", {
          snackbarMessage: err.message,
          snackbarType: SNACKBAR_TYPE.ERROR
        });
      });
    context.commit("loadMyCities", arr);
  },
  loadMyCities(context) {
    if (context.getters.isLoggedIn) {
      context.commit("myCityListLoadnig", true);
      axios
        .get(apis.getMyCityList, {
          headers: {
            Authorization: context.getters.userAuthToken
          }
        })
        .then(response => {
          context.commit("loadMyCities", response.data);
          context.commit("myCityListLoadnig", false);
        })
        .catch(err => {
          context.dispatch("triggerSnackbar", {
            snackbarMessage: "Faild to load city list: " + err.message,
            snackbarType: SNACKBAR_TYPE.ERROR
          });
          context.commit("myCityListLoadnig", false);
        });
    } else {
      context.commit("loadMyCities", []);
    }
  }
};

const mutations = {
  addCityToMyList(state, payload) {
    state.myCityList = [...payload, ...state.myCityList];
  },
  loadMyCities(state, payload) {
    state.myCityList = [...payload];
  },
  myCityListLoadnig(state, payload) {
    state.myCityListLoadnig = payload;
  },
  addingCityToList(state, payload) {
    state.addingCityToList = payload;
  }
};

export const cityListStore = {
  state,
  getters,
  actions,
  mutations
};
