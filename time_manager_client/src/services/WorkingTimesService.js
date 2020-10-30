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

    getWorkingTimeUser(id, user_id) {
        return Api().get(`/workingtimes/${user_id}/${id}`);
    },

    getWorkingTimesUser(userId, start, end) {
        return Api().get(
                `/workingtimes/${userId}?${start ? `start=${start}` : ""}${
        end ? `&end=${end}` : ""
      }`
    );
  },

  getDailyWorkingTimesUser(userId) {
    let day = new Date();

    const fd = `${day.getFullYear()}-${
      (day.getMonth() + 1).toString().length == 1
        ? "0" + (day.getMonth() + 1)
        : day.getMonth() + 1
    }-${
      day.getDate().toString().length == 1
        ? "0" + day.getDate()
        : day.getDate()
    }T00:00:00Z`;

    const ld = `${day.getFullYear()}-${
      (day.getMonth() + 1).toString().length == 1
        ? "0" + (day.getMonth() + 1)
        : day.getMonth() + 1
    }-${
      day.getDate().toString().length == 1
        ? "0" + day.getDate()
        : day.getDate()
    }T23:59:59Z`;

    return Api().get(
      `/workingtimes/${userId}?start=${fd}&end=${ld}`
    );
  },

  getWeeklyWorkingTimesUser(userId) {
    const startOfWeek = () => {
      let d = new Date();
      var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }
    
    const endOfWeek = () =>
    {
      let date = new Date();
      var lastday = date.getDate() - (date.getDay() - 1) + 6;
      return new Date(date.setDate(lastday));
    
    }

    var firstDay = startOfWeek();
    var lastDay = endOfWeek()

    const fd = `${firstDay.getFullYear()}-${
      (firstDay.getMonth() + 1).toString().length == 1
        ? "0" + (firstDay.getMonth() + 1)
        : firstDay.getMonth() + 1
    }-${
      firstDay.getDate().toString().length == 1
        ? "0" + firstDay.getDate()
        : firstDay.getDate()
    }T00:00:00Z`;

    const ld = `${lastDay.getFullYear()}-${
      (lastDay.getMonth() + 1).toString().length == 1
        ? "0" + (lastDay.getMonth() + 1)
        : lastDay.getMonth() + 1
    }-${lastDay.getDate().toString().length == 1 ? "0" + lastDay.getDate(): lastDay.getDate()}T00:00:00Z`;

    return Api().get(`/workingtimes/${userId}?start=${fd}&end=${ld}`);
  },

  getMonthlyWorkingTimesUser(userId) {
    const daysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };

    let date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      daysInMonth(date.getMonth() + 1, date.getFullYear())
    );

    const fd = `${firstDay.getFullYear()}-${
      (firstDay.getMonth() + 1).toString().length == 1
        ? "0" + (firstDay.getMonth() + 1)
        : firstDay.getMonth() + 1
    }-${
      firstDay.getDate().toString().length == 1
        ? "0" + firstDay.getDate()
        : firstDay.getDate()
    }T00:00:00Z`;

    const ld = `${lastDay.getFullYear()}-${
      (lastDay.getMonth() + 1).toString().length == 1
        ? "0" + (lastDay.getMonth() + 1)
        : lastDay.getMonth() + 1
    }-${lastDay.getDate().toString().length == 1 ? "0" + lastDay.getDate(): lastDay.getDate()}T00:00:00Z`;

    return Api().get(`/workingtimes/${userId}?start=${fd}&end=${ld}`);
  },
};