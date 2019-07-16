import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import MyCityList from "@/components/MyCityList";
import Vuex from "vuex";
import Vuetify from "vuetify";
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
const c1 = {
  coord: { lat: 13.13333, lon: 78.133331 },
  country: "IN",
  id: 1266305,
  name: "Kolar"
};
const c2 = {
  coord: { lat: 49.80743, lon: 21.434071 },
  country: "PL",
  id: 768827,
  name: "Kolaczyce"
};
const c3 = {
  coord: { lat: 15.2, lon: 76.866669 },
  country: "IN",
  id: 1266320,
  name: "Kolagallu"
};
const myCityList = [c1, c2, c3];
const store = new Vuex.Store({
  state: {
    isLoggedIn: true,
    searchedCity: {},
    myCityList: myCityList,
    myCityListLoadnig: false,
    addingCityToList: {}
  },
  mutations: {},
  actions: {
    getSearchWeather: () => {},
    removeCityFromList: () => {}
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    searchedCity: state => state.searchedCity,
    myCityList: state => state.myCityList,
    myCityListLoadnig: state => state.myCityListLoadnig,
    addingCityToList: state => state.addingCityToList
  }
});
describe("MyCityList.vue", () => {
  it("MyCityList isLoggedIn test ***", () => {
    const wrapper = shallowMount(MyCityList, { store, localVue });
    expect(wrapper.vm.isLoggedIn).to.equal(true);
  });

  it("MyCityList cities test ***", () => {
    const wrapper = shallowMount(MyCityList, { store, localVue });
    expect(wrapper.vm.cities.length).to.equal(3);
  });

  it("MyCityList cities test ***", () => {
    const wrapper = shallowMount(MyCityList, {
      store,
      localVue
    });
    wrapper.setData({
      search: "Kolaczyce"
    });
    expect(wrapper.vm.filteredCities[0].name).to.equal("Kolaczyce");
  });
});
