import Api from "@/services/Api";

export default {
  createWorkingTime() {
    return Api().post("/workingtimes");
  },

  updateWorkingTime(id) {
    return Api().put(`/workingtimes/${id}`);
  },

  deleteWorkingTime(id) {
    return Api().get(`/workingtimes/${id}`);
  },

  getWorkingTime(id, user_id) {
    return Api().get(`/workingtimes/${user_id}/${id}`);
  },

  getWorkingTimes(user_id, start, end) {
    return Api().get(`/workingtimes/${user_id}?start=${start}&end=${end}`);
  }
};
