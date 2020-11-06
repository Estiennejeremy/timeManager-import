import Api from "@/services/Api";

export default {
  createTeam(team) {
    return Api().post("/teams", { team: team });
  },

  updateTeam(id, team) {
    return Api().put(`/teams/${id}`, { team: team });
  },

  deleteTeam(id) {
    return Api().delete(`/teams/${id}`);
  },

  getTeam(team_id) {
    return Api().get(`/teams/${team_id}`);
  },

  getTeams() {
    return Api().get(`/teams`);
  },

  addEmployee(team_id, user_id) {
    return Api().post(`/Usersteams`, { user_team: { team_id, user_id } });
  },

  removeEmployee(team_id, user_id) {
    return Api().delete(`/Usersteams/${user_id}/${team_id}`);
  },

  getWorkingtimesTeam(team_id) {
    return Api()
      .get(`/workingtimesByTeam/${team_id}`)
      .then(res => {
        let dailyWorkingtimes = this.getDailyWorkingtimes(
          res.data.workingtimes
        );
        let currentWorkingTime = this.getCurrentWorkingtime(dailyWorkingtimes);
        let weeklyWorkingtimes = this.getWeeklyWorkingtimes(
          res.data.workingtimes
        );
        let monthlyWorkingtimes = this.getMonthlyWorkingtimes(
          res.data.workingtimes
        );

        return Promise.resolve({
          workingtimes: res.data.workingtimes,
          dailyWorkingtimes: dailyWorkingtimes,
          currentWorkingTime: currentWorkingTime,
          weeklyWorkingtimes: weeklyWorkingtimes,
          monthlyWorkingtimes: monthlyWorkingtimes
        });
      });
  },
  getMonthlyWorkingtimes(workingTimes) {
    return workingTimes.filter(workingTime => {
      let current = new Date();
      let start = new Date(workingTime.start);
      return (
        start.getMonth() == current.getMonth() &&
        start.getFullYear() == current.getFullYear()
      );
    });
  },
  sortWorkingtimesByMonthDays(monthlyWorkingtimes) {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthlyWorkingtimes.reduce(
      (sort, workingtime) => {
        switch (monthNames[new Date(workingtime.start).getMonth()]) {
          case "January":
            sort[0].push(workingtime);
            break;
          case "February":
            sort[1].push(workingtime);
            break;
          case "March":
            sort[2].push(workingtime);
            break;
          case "April":
            sort[3].push(workingtime);
            break;
          case "May":
            sort[4].push(workingtime);
            break;
          case "June":
            sort[5].push(workingtime);
            break;
          case "July":
            sort[6].push(workingtime);
            break;
          case "August":
            sort[7].push(workingtime);
            break;
          case "September":
            sort[8].push(workingtime);
            break;
          case "October":
            sort[9].push(workingtime);
            break;
          case "November":
            sort[10].push(workingtime);
            break;
          case "December":
            sort[11].push(workingtime);
            break;
        }
        return sort;
      },
      [[], [], [], [], [], [], [], [], [], [], [], []]
    );
  },
  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  },
  getDailyWorkingtimes(workingtimes) {
    return workingtimes.filter(workingTime => {
      let current = new Date();
      let start = new Date(workingTime.start);
      let end = new Date(workingTime.end);
      return (
        start.toLocaleDateString() == current.toLocaleDateString() &&
        end.toLocaleDateString() == current.toLocaleDateString()
      );
    });
  },
  getCurrentWorkingtime(dailyWorkingtimes) {
    return dailyWorkingtimes.find(
      workingtime =>
        new Date() > new Date(workingtime.start) &&
        new Date() < new Date(workingtime.end)
    );
  },
  getWeeklyWorkingtimes(workingTimes) {
    return workingTimes.filter(workingTime => {
      let current = new Date();
      let start = new Date(workingTime.start);
      let end = new Date(workingTime.end);
      return (
        this.getWeekNumber(start) == this.getWeekNumber(current) &&
        this.getWeekNumber(end) == this.getWeekNumber(current)
      );
    });
  },
  sortWorkingtimesByWeekDays(weeklyWorkingtimes) {
    return weeklyWorkingtimes.reduce(
      (sort, workingtime) => {
        switch (
          new Date(workingtime.start).toLocaleString("default", {
            weekday: "long"
          })
        ) {
          case "Monday":
            sort[0].push(workingtime);
            break;
          case "Tuesday":
            sort[1].push(workingtime);
            break;
          case "Wednesday":
            sort[2].push(workingtime);
            break;
          case "Thursday":
            sort[3].push(workingtime);
            break;
          case "Friday":
            sort[4].push(workingtime);
            break;
          case "Saturday":
            sort[5].push(workingtime);
            break;
          case "Sunday":
            sort[6].push(workingtime);
            break;
        }
        return sort;
      },
      [[], [], [], [], [], [], []]
    );
  }
};
