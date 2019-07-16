import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Snackbar from "@/components/shared/Snackbar";
import { snackbarStore } from "@/store/modules/snackbar.store";
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
    snackbarStore
  }
});
describe("Snackbar.vue", () => {
  it("Snackbar colorType test ***", () => {
    const wrapper = shallowMount(Snackbar, { store, localVue });
    expect(wrapper.vm.colorType).to.equal("info");
  });
});
