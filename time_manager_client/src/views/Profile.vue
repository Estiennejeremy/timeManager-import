<template>
  <div class="container">
    <v-row align="center" justify="space-around">
      <v-col class="d-flex flex-column" cols="12" md="3" lg="3">
        <div v-if="isInworkingtime" class="isWorking">
          <v-btn fab color="green" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <section>
            <h3 v-for="workingtime in dailyWorkingtimes" :key="workingtime.id">
              {{ getPlanning(workingtime) }}
            </h3>
          </section>
        </div>
        <div v-if="!isInworkingtime" class="isWorking">
          <v-btn fab color="red" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <section>
            <h3 v-for="workingtime in dailyWorkingtimes" :key="workingtime.id">
              {{ getPlanning(workingtime) }}
            </h3>
            <h3 v-if="dailyWorkingtimes && dailyWorkingtimes.length == 0">
              No current workingtime
            </h3>
          </section>
        </div>
        <doughnut-chart
          v-if="dailyWorkData"
          :chartdata="dailyWorkData"
          :options="options"
        />
      </v-col>

      <v-col class="d-flex flex-column" cols="12" md="9" lg="9">
        <v-row align="center" justify="center">
          <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
            <v-select
              v-model="visualize"
              :items="visualizeOptions"
              label="Visualize"
              solo
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
            <v-select
              v-model="periode"
              v-on:change="changePeriode()"
              :items="periodeOptions"
              label="Select period"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <line-chart
          v-if="weeklyWorkData"
          :chartdata="weeklyWorkData"
          :options="options"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LineChart from "../components/charts/Line.js";
import DoughnutChart from "../components/charts/Doughnut.js";
import WorkingTimesService from "../services/WorkingTimesService.js";
import ClockService from "../services/ClockService.js";
export default {
  name: "Profile",
  props: ["userId"],
  data: () => ({
    date: `${new Date().getHours()}:${(new Date().getMinutes() < 10
      ? "0"
      : "") + new Date().getMinutes()}`,
    isInworkingtime: false,
    dailyWorkingtimes: null,
    weeklyWorkingtimes: null,
    monthlyWorkingtimes: null,
    dailyClocks: null,
    weeklyClocks: null,
    monthlyClocks: null,
    dailyWorkData: null,
    weeklyWorkData: null,
    currentWorkingTime: null,
    visualize: "Line",
    periode: "Weekly",
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    visualizeOptions: ["Line", "Doughnut", "Bar"],
    periodeOptions: ["Weekly", "Monthly"],
    monthNames: [
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
      "December",
    ],
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),
    getPlanning(workingtime) {
      let start = new Date(workingtime.start);
      let end = new Date(workingtime.end);
      return `${("0" + start.getHours()).slice(-2)}:${(
        "0" + start.getMinutes()
      ).slice(-2)}-${("0" + end.getHours()).slice(-2)}:${(
        "0" + end.getMinutes()
      ).slice(-2)}`;
    },
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      return weekNo;
    },
    getDailyWorkingtimes(workingtimes) {
      return workingtimes.filter((workingTime) => {
        let current = new Date();
        let start = new Date(workingTime.start);
        let end = new Date(workingTime.end);
        return (
          start.toLocaleDateString() == current.toLocaleDateString() &&
          end.toLocaleDateString() == current.toLocaleDateString()
        );
      });
    },
    getDailyClocks(clocks) {
      return clocks.filter((clock) => {
        let current = new Date();
        let time = new Date(clock.start);
        return time.toLocaleDateString() == current.toLocaleDateString();
      });
    },
    getIsInWorkingtime(dailyWorkingtimes) {
      return dailyWorkingtimes.some(
        (workingtime) =>
          new Date() > new Date(workingtime.start) &&
          new Date() < new Date(workingtime.end)
      );
    },
    getCurrentWorkingtime(dailyWorkingtimes) {
      return dailyWorkingtimes.find(
        (workingtime) =>
          new Date() > new Date(workingtime.start) &&
          new Date() < new Date(workingtime.end)
      );
    },
    setDailyWorkingtimeChart(currentWorkingTime, dailyClocks) {
      if (currentWorkingTime) {
        let lastClock = dailyClocks.find(
          (clock) =>
            new Date(clock.start) >= new Date(currentWorkingTime.start) &&
            !clock.end
        );
        let total = (
          (new Date(currentWorkingTime.end).getTime() -
            new Date(currentWorkingTime.start).getTime()) /
          (1000 * 3600)
        ).toFixed(2);
        if (lastClock) {
          let work = (
            (new Date().getTime() - new Date(lastClock.start).getTime()) /
            (1000 * 3600)
          ).toFixed(2);
          let late = (
            (new Date(lastClock.start).getTime() -
              new Date(currentWorkingTime.start).getTime()) /
            (1000 * 3600)
          ).toFixed(2);
          this.dailyWorkData = {
            labels: ["Late time", "Workingtime", "Less time"],
            datasets: [
              {
                data: [late, work, total - work],
                backgroundColor: ["yellow", "green"],
                weight: 0.5,
              },
            ],
          };
        } else {
          let late = (
            (new Date().getTime() -
              new Date(currentWorkingTime.start).getTime()) /
            (1000 * 3600)
          ).toFixed(2);
          this.dailyWorkData = {
            labels: ["Late time", "Less time"],
            datasets: [
              {
                data: [late, total - late],
                backgroundColor: ["yellow"],
                weight: 0.5,
              },
            ],
          };
        }
      }
    },
    getWeeklyWorkingtimes(workingTimes) {
      return workingTimes.filter((workingTime) => {
        let current = new Date();
        let start = new Date(workingTime.start);
        let end = new Date(workingTime.end);
        return (
          this.getWeekNumber(start) == this.getWeekNumber(current) &&
          this.getWeekNumber(end) == this.getWeekNumber(current)
        );
      });
    },
    getWeeklyClocks(clocks) {
      return clocks.filter((clock) => {
        let current = new Date();
        let time = new Date(clock.start);
        return this.getWeekNumber(time) == this.getWeekNumber(current);
      });
    },
    sortWorkingtimesByWeekDays(weeklyWorkingtimes) {
      return weeklyWorkingtimes.reduce(
        (sort, workingtime) => {
          switch (
            new Date(workingtime.start).toLocaleString("default", {
              weekday: "long",
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
    },
    sortClocksByWeekDays(weeklyClocks) {
      return weeklyClocks.reduce(
        (sort, clock) => {
          switch (
            new Date(clock.start).toLocaleString("default", {
              weekday: "long",
            })
          ) {
            case "Monday":
              sort[0].push(clock);
              break;
            case "Tuesday":
              sort[1].push(clock);
              break;
            case "Wednesday":
              sort[2].push(clock);
              break;
            case "Thursday":
              sort[3].push(clock);
              break;
            case "Friday":
              sort[4].push(clock);
              break;
            case "Saturday":
              sort[5].push(clock);
              break;
            case "Sunday":
              sort[6].push(clock);
              break;
          }
          return sort;
        },
        [[], [], [], [], [], [], []]
      );
    },
    setWeeklyWorkingtimeChart(sortClockByDay) {
      this.weeklyWorkData = {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            data: sortClockByDay.map((dayClocks) =>
              dayClocks.reduce((hours, clock) => {
                if (clock.end) {
                  hours =
                    hours +
                    parseInt(
                      (
                        Math.abs(new Date(clock.start) - new Date(clock.end)) /
                        36e5
                      ).toFixed(2)
                    );
                } else {
                  hours =
                    hours +
                    parseInt(
                      (
                        Math.abs(new Date(clock.start) - new Date()) / 36e5
                      ).toFixed(2)
                    );
                }
                return hours;
              }, 0)
            ),
            label: "Workingtime",
            backgroundColor: "green",
            weight: 0.5,
          },
        ],
      };
    },
    changePeriode() {
      if (this.periode == "Monthly") {
        this.setMonthWorkingtimeChart(this.monthlyClocks);
      } else if (this.periode == "Weekly") {
        this.setWeeklyWorkingtimeChart(this.weeklyClocks);
      }
    },
    getMonthlyWorkingtimes(workingTimes) {
      return workingTimes.filter((workingTime) => {
        let current = new Date();
        let start = new Date(workingTime.start);
        let end = new Date(workingTime.end);
        return (
          start.getMonth() == current.getMonth() &&
          start.getFullYear() == current.getFullYear()
        );
      });
    },
    getMonthlyClocks(clocks) {
      return clocks.filter((clock) => {
        let current = new Date();
        let time = new Date(clock.start);
        return (
          time.getMonth() == current.getMonth() &&
          time.getFullYear() == current.getFullYear()
        );
      });
    },
    sortWorkingtimesByMonthDays(monthlyWorkingtimes) {
      return monthlyWorkingtimes.reduce(
        (sort, workingtime) => {
          switch (this.monthNames[new Date(workingtime.start).getMonth()]) {
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
    sortClocksByMonthDays(monthClocks) {
      return monthClocks.reduce(
        (sort, clock) => {
          switch (this.monthNames[new Date(clock.start).getMonth()]) {
            case "January":
              sort[0].push(clock);
              break;
            case "February":
              sort[1].push(clock);
              break;
            case "March":
              sort[2].push(clock);
              break;
            case "April":
              sort[3].push(clock);
              break;
            case "May":
              sort[4].push(clock);
              break;
            case "June":
              sort[5].push(clock);
              break;
            case "July":
              sort[6].push(clock);
              break;
            case "August":
              sort[7].push(clock);
              break;
            case "September":
              sort[8].push(clock);
              break;
            case "October":
              sort[9].push(clock);
              break;
            case "November":
              sort[10].push(clock);
              break;
            case "December":
              sort[11].push(clock);
              break;
          }
          return sort;
        },
        [[], [], [], [], [], [], [], [], [], [], [], []]
      );
    },
    setMonthWorkingtimeChart(sortClockByMonth) {
      this.weeklyWorkData = {
        labels: this.monthNames,
        datasets: [
          {
            data: sortClockByMonth.map((monthocks) =>
              monthocks.reduce((hours, clock) => {
                if (clock.end) {
                  hours =
                    hours +
                    parseInt(
                      (
                        Math.abs(new Date(clock.start) - new Date(clock.end)) /
                        36e5
                      ).toFixed(2)
                    );
                } else {
                  hours =
                    hours +
                    parseInt(
                      (
                        Math.abs(new Date(clock.start) - new Date()) / 36e5
                      ).toFixed(2)
                    );
                }
                return hours;
              }, 0)
            ),
            label: "Workingtime",
            backgroundColor: "green",
            weight: 0.5,
          },
        ],
      };
    },
    init() {
      Promise.all([
        WorkingTimesService.getWorkingTimesUser(
          this.userId ? this.userId : this.id
        ),
        ClockService.getClockUser(this.userId ? this.userId : this.id),
      ]).then((res) => {
        //////////// DAILY /////////////
        let dailyWorkingtimes = this.getDailyWorkingtimes(
          res[0].data.workingtimes
        );
        this.dailyWorkingtimes = dailyWorkingtimes;

        let dailyClocks = this.getDailyClocks(res[1].data.data);
        this.dailyClocks = dailyClocks;

        this.isInworkingtime = this.getIsInWorkingtime(dailyWorkingtimes);

        let currentWorkingTime = this.getCurrentWorkingtime(dailyWorkingtimes);
        this.currentWorkingTime = currentWorkingTime;

        this.setDailyWorkingtimeChart(currentWorkingTime, dailyClocks);

        //////////// WEEKLY /////////////
        let weeklyWorkingtimes = this.getWeeklyWorkingtimes(
          res[0].data.workingtimes
        );
        this.weeklyWorkingtimes = weeklyWorkingtimes;

        let weeklyClocks = this.getWeeklyClocks(res[1].data.data);
        this.weeklyClocks = weeklyClocks;

        let sortyWorkingtimeByWeekDay = this.sortWorkingtimesByWeekDays(
          weeklyWorkingtimes
        );

        let sortClockByWeekDay = this.sortClocksByWeekDays(weeklyClocks);
        this.weeklyClocks = sortClockByWeekDay;

        this.setWeeklyWorkingtimeChart(sortClockByWeekDay);

        //////////// MONTHLY /////////////
        let monthlyWorkingtimes = this.getMonthlyWorkingtimes(
          res[0].data.workingtimes
        );
        this.monthlyWorkingtimes = monthlyWorkingtimes;

        let monthlyClocks = this.getMonthlyClocks(res[1].data.data);
        this.monthlyClocks = monthlyClocks;

        let sortyWorkingtimeByMonthDay = this.sortWorkingtimesByMonthDays(
          monthlyWorkingtimes
        );

        let sortClockByMonthDay = this.sortClocksByMonthDays(monthlyClocks);
        this.monthlyClocks = sortClockByMonthDay;
        console.log(sortClockByMonthDay)
      });
    },
  },

  computed: {
    ...mapState("user", ["id", "email", "username"]),
  },
  mounted() {
    this.init();
  },
  watch: {
    userId: function(newVal) {
      this.userId = newVal;
      this.isWorking = false;
      this.dailyWorkingtimes = null;
      this.weeklyWorkingtimes = null;
      this.monthlyWorkingtimes = null;
      this.dailyClocks = null;
      this.weeklyClocks = null;
      this.monthlyClocks = null;
      this.dailyWorkData = null;
      this.weeklyWorkData = null;
      this.init();
    },
  },
  components: {
    LineChart,
    DoughnutChart,
  },
};
</script>

<style scoped>
.container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.isWorking {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.timeColor {
  margin-right: 20px;
}
</style>
