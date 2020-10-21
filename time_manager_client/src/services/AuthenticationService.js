import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().put("signup", credentials);
  },
  login(credentials) {
    return Api().post("signin", credentials);
  }
};
