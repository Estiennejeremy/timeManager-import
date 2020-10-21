import Api from "@/services/Api";

export default {
  getClock() {
    return Api().get("/clocks/");
  },

  updateClock() {
    return Api().get("/clocks/");
  }
};
