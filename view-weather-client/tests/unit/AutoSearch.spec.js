import { expect } from "chai";
import { shallow, createLocalVue } from "@vue/test-utils";
import AutoSearch from "@/components/AutoSearch.vue";
import { autoSearchStore } from "@/store/modules/autoSearch.store";
import { weatherStore } from "@/store/modules/weather.store";
import Vuex from "vuex";
import Vuetify from "vuetify";
const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(Vuex);
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    autoSearchStore,
    weatherStore
  }
});

describe("AutoSearch.vue", () => {
  it("AutoSearch search string test ***", () => {
    const wrapper = shallow(AutoSearch, { store, localVue });
    expect(wrapper.vm.search).to.equal("");
    expect(wrapper.vm.items.length).to.equal(0);
  });
  it("AutoSearch items array test ***", () => {
    const wrapper = shallow(AutoSearch, { store, localVue });
    expect(wrapper.vm.items.length).to.equal(0);
  });
  it("AutoSearch items autosearch in progress test ***", () => {
    const wrapper = shallow(AutoSearch, { store, localVue });
    expect(wrapper.vm.searchAPIProgress).to.equal(false);
  });
});
