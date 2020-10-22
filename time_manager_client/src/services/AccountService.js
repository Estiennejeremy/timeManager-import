import Api from "@/services/Api";

export default {
  createUser() {
    return Api().post("/users");
  },

  updateUser(id) {
    return Api().put(`/users/${id}`);
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
