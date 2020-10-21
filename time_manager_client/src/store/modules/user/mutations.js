import { set, execute } from "@/utils/vuex";

export default {
  setUser: set("user"),
  setToken: execute("token"),
  toggleLogged: set("isUserLoggedIn")
};
