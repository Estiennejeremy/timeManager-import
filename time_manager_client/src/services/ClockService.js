import Api from "@/services/Api";

export default {
  getClock(id) {
    return Api().get(`/clocks/${id}`);
  },

  updateClock(clock, id) {
    return Api().post(`/clocks/${id}`, { clock: clock });
  }
};
