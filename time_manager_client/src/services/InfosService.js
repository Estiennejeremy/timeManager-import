import Api from "@/services/Api";

export default {
  status() {
    return Api().get("/infos/server/status");
  }
};
