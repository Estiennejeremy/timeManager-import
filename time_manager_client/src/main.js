import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import { sync } from "vuex-router-sync";

import Paths from "@/router/paths.js";

sync(store, router);

router.beforeEach((to, from, next) => {
  if (
    !store.state.user.isUserLoggedIn &&
    Paths.filter(
      path =>
        path.name === to.name &&
        path.public === false
    ).length > 0
  ) {
    next("login");
  } else if (store.state.user.isUserLoggedIn &&
    Paths.filter(
      path =>
        path.name === to.name &&
        (path.role.includes("default") || path.role.includes(store.state.user.role))
    ).length === 0
  ) {
    next("home");
  } else {
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
