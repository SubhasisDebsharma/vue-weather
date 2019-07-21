import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/vue-doc",
      name: "vueDoc",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "vueDoc" */ "../views/VueDoc.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      beforeEnter: (to, from, next) => {
        if (store.getters.isLoggedIn) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
