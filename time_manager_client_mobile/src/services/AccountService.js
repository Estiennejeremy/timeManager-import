import Api from "@/services/Api";

export default {
  createUser(user) {
    return Api().post("/users", { user: user });
  },

  updateUser(user, id) {
    return Api().put(`/users/${id}`, { user: user });
  },

  getUser(id) {
    return Api().get(`/users/${id}`);
  },

  getUsers() {
    return Api().get("/users");
  },

  deleteUser(id) {
    return Api().delete(`/users/${id}`);
  }
};
