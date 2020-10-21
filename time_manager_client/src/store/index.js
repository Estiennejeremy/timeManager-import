import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import modules from "./modules";
const vuexPersist = new VuexPersist({
  key: "TemplateClientVue",
  storage: localStorage
});

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  modules,
  plugins: [vuexPersist.plugin]
});

export default store;
