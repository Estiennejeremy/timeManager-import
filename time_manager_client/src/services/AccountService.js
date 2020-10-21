import Api from "@/services/Api";

export default {
  email(credentials) {
    return Api().get("/account/email", {
      headers: {
        Authorization: `Bearer ${credentials}`
      }
    });
  },

  getName(credentials) {
    return Api().get("/account/name", {
      headers: {
        Authorization: `Bearer ${credentials}`
      }
    });
  },

  getRole(credentials) {
    return Api().get("/account/role", {
      headers: {
        Authorization: `Bearer ${credentials}`
      }
    });
  },

  updateRole(credentials, role) {
    return Api().get("/account/role", role, {
      headers: {
        Authorization: `Bearer ${credentials}`
      }
    });
  }
};
