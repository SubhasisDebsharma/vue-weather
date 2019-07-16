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
import "./styles/_index.scss";

firebaseApp.initializeApp();

Vue.use(Vuetify, {
  iconfont: "fa"
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
