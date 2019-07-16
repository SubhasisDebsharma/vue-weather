import { expect } from "chai";
import { snackbarStore } from "@/store/modules/snackbar.store";
import Vuex from "vuex";
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    snackbarStore
  }
});
describe("snackbar.store.js", () => {
  it("snackbar store test 1. snackbar message ***", () => {
    store.dispatch("triggerSnackbar", {
      snackbarMessage: "testing store",
      snackbarType: "info"
    });
    expect(store.getters.snackbarMessage).to.equal("testing store");
  });
  it("snackbar store test 2. snackbar info ***", () => {
    store.dispatch("triggerSnackbar", {
      snackbarMessage: "testing store",
      snackbarType: "info"
    });
    expect(store.getters.snackbarType).to.equal("info");
  });
});
