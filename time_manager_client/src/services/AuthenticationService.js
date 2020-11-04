import Api from "@/services/Api";

export default {
  register(user, credentials) {
    return Api().post("/registration", {
      user: user
    }, {
      headers: {
        Authorization: `Bearer ${credentials}`
      }
    });
  },
  login(user) {
    return Api().post("/session", { user: user });
  },
  logout(credentials) {
    return Api().delete("/session", {
      headers: {
        Authorization: `Bearer ${credentials}`
      }
    })
  }
};
