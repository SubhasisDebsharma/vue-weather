import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store/";
import "./registerServiceWorker";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import "@fortawesome/fontawesome-free/css/all.css";
import firebaseApp from "./auth/firebase.js";

firebaseApp.initializeApp();

Vue.use(Vuetify, {
  iconfont: "fa"
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
