import Api from "@/services/Api";

export default {
  createWorkingTime(workingtime) {
    return Api().post("/workingtimes", { workingtime: workingtime });
  },

  updateWorkingTime(id, workingtime) {
    return Api().put(`/workingtimes/${id}`, { workingtime: workingtime });
  },

  deleteWorkingTime(id) {
    return Api().delete(`/workingtimes/${id}`);
  },

  getWorkingTime(id, user_id) {
    return Api().get(`/workingtimes/${user_id}/${id}`);
  },

  getWorkingTimes(user_id, start, end) {
    return Api().get(
      `/workingtimes/${user_id}?${start ? `start=${start}` : ""}${
        end ? `&end=${end}` : ""
      }`
    );
  }
};
