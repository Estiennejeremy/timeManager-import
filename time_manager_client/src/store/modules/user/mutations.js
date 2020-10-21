import { set, execute } from "@/utils/vuex";

export default {
  setId: set("id"),
  setEmail: set("email"),
  setUsername: set("username"),
  setToken: execute("token"),
  toggleLogged: set("isUserLoggedIn")
};
