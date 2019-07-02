import Vue from "vue";
import Vuex from "vuex";
import { autoSearchStore } from "./modules/autoSearch.store";
import { cityListStore } from "./modules/cityList.store";
import { loginStore } from "./modules/login.store";
import { weatherStore } from "./modules/weather.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    autoSearchStore,
    cityListStore,
    loginStore,
    weatherStore
  }
});
