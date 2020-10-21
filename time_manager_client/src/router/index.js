import Vue from "vue";
import VueRouter from "vue-router";

import paths from "./paths";

function route(path, view, name) {
  return {
    name: name || view,
    path,
    component: resovle => import(`@/views/${view}.vue`).then(resovle)
  };
}

const scrollBehavior = function(to, from, savedPosition) {
  to;
  from;
  savedPosition;
  return { x: 0, y: 0 };
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: paths
    .map(path => route(path.path, path.view, path.name))
    .concat([{ path: "*", redirect: "/login" }]),
  scrollBehavior
});

export default router;
