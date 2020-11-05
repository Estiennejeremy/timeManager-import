import Api from "@/services/Api";

export default {
  getClockUser(userId) {
    return Api().get(`/clocks/${userId}`);
  },

  getLastClockUser(userId) {
    return Api().get(`/clocksMax/${userId}`);
  },

  createClock(clock, userId) {
    return Api().post(`/clocks/${userId}`, { clock: clock });
  },

  updateClock(clock, id) {
    return Api().put(`/clocks/${id}`, { clock: clock });
  }
};
