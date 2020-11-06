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
          v-if="workdata && visualize == 'Line'"
          :chartdata="workdata"
          :options="options"
        />
        <bar-chart
          v-if="workdata && visualize == 'Bar'"
          :chartdata="workdata"
          :options="options"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AccountService from "../services/AccountService";
import LineChart from "../components/charts/Line.js";
import BarChart from "../components/charts/Bar.js";
import DoughnutChart from "../components/charts/Doughnut.js";
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
    currentWorkingTime: null,
    visualize: "Line",
    periode: "Weekly",
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    workdata: null,
    visualizeOptions: ["Line", "Bar"],
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
      "December"
    ]
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),
    init() {
      AccountService.getUserInfos(this.userId ? this.userId : this.id).then(
        res => {
          this.dailyWorkingtimes = res.dailyWorkingtimes;
          this.dailyClocks = res.dailyClocks;
          this.isInworkingtime = res.isInworkingtime;
          this.currentWorkingTime = res.currentWorkingTime;
          this.weeklyWorkingtimes = res.weeklyWorkingtimes;
          this.weeklyClocks = res.weeklyClocks;
          this.weeklyClocks = res.sortClockByWeekDay;
          this.monthlyWorkingtimes = res.monthlyWorkingtimes;
          this.monthlyWorkingtimes = res.sortyWorkingtimeByMonthDay;
          this.monthlyClocks = res.monthlyClocks;
          this.monthlyClocks = res.sortClockByMonthDay;

          this.setDailyWorkingtimeChart(
            this.currentWorkingTime,
            this.dailyClocks
          );
          this.setWeeklyWorkingtimeChart(this.weeklyClocks);
        }
      );
    },
    getPlanning(workingtime) {
      let start = new Date(workingtime.start);
      let end = new Date(workingtime.end);
      return `${("0" + start.getHours()).slice(-2)}:${(
        "0" + start.getMinutes()
      ).slice(-2)}-${("0" + end.getHours()).slice(-2)}:${(
        "0" + end.getMinutes()
      ).slice(-2)}`;
    },
    changePeriode() {
      if (this.periode == "Monthly") {
        this.setMonthWorkingtimeChart(this.monthlyClocks);
      } else if (this.periode == "Weekly") {
        this.setWeeklyWorkingtimeChart(this.weeklyClocks);
      }
    },
    setDailyWorkingtimeChart(currentWorkingTime, dailyClocks) {
      if (currentWorkingTime) {
        let lastClock = dailyClocks.find(
          clock =>
            (new Date(clock.start) >= new Date(currentWorkingTime.start) &&
              !clock.end) ||
            (clock.end &&
              new Date(clock.end) <= new Date(currentWorkingTime.end) &&
              new Date(clock.start) >= new Date(currentWorkingTime.start))
        );
        let total = (
          (new Date(currentWorkingTime.end).getTime() -
            new Date(currentWorkingTime.start).getTime()) /
          (1000 * 3600)
        ).toFixed(2);
        if (lastClock) {
          let late = (
            (new Date(lastClock.start).getTime() -
              new Date(currentWorkingTime.start).getTime()) /
            (1000 * 3600)
          ).toFixed(2);
          let work = !lastClock.end
            ? (
                (new Date().getTime() - new Date(lastClock.start).getTime()) /
                (1000 * 3600)
              ).toFixed(2)
            : (
                (new Date(lastClock.end).getTime() -
                  new Date(lastClock.start).getTime()) /
                (1000 * 3600)
              ).toFixed(2);
          this.dailyWorkData = !lastClock.end
            ? {
                labels: ["Start margin", "Workingtime", "Less time"],
                datasets: [
                  {
                    data: [late, work, (total - work).toFixed(2)],
                    backgroundColor: ["yellow", "green"],
                    weight: 0.5
                  }
                ]
              }
            : {
                labels: ["Start margin", "Workingtime", "End margin"],
                datasets: [
                  {
                    data: [late, work, (total - work - late).toFixed(2)],
                    backgroundColor: ["yellow", "green", "yellow"],
                    weight: 0.5
                  }
                ]
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
                weight: 0.5
              }
            ]
          };
        }
      }
    },
    setWeeklyWorkingtimeChart(sortClockByDay) {
      this.workdata = {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        datasets: [
          {
            data: sortClockByDay.map(dayClocks =>
              dayClocks
                .reduce((hours, clock) => {
                  if (clock.end) {
                    hours =
                      hours +
                      Math.abs(new Date(clock.start) - new Date(clock.end)) /
                        36e5;
                  } else {
                    hours =
                      hours +
                      Math.abs(new Date(clock.start) - new Date()) / 36e5;
                  }
                  return hours;
                }, 0.0)
                .toFixed(2)
            ),
            label: "Workingtime",
            backgroundColor: "green",
            weight: 0.5
          }
        ]
      };
    },
    setMonthWorkingtimeChart(sortClockByMonth) {
      this.workdata = {
        labels: this.monthNames,
        datasets: [
          {
            data: sortClockByMonth.map(monthocks =>
              monthocks
                .reduce((hours, clock) => {
                  if (clock.end) {
                    hours =
                      hours +
                      Math.abs(new Date(clock.start) - new Date(clock.end)) /
                        36e5;
                  } else {
                    hours =
                      hours +
                      Math.abs(new Date(clock.start) - new Date()) / 36e5;
                  }
                  return hours;
                }, 0)
                .toFixed(2)
            ),
            label: "Workingtime",
            backgroundColor: "green",
            weight: 0.5
          }
        ]
      };
    }
  },

  computed: {
    ...mapState("user", ["id", "email", "username"])
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
    }
  },
  components: {
    LineChart,
    DoughnutChart,
    BarChart
  }
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
