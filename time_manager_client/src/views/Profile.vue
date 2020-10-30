<template>
  <div class="container">
    <h2 v-if="!hideTitle">{{ date }} | {{ username }}</h2>
    <v-row align="center" justify="space-around">
      <v-col class="d-flex flex-column" cols="12" md="3" lg="3">
        <div v-if="isWorking" class="isWorking">
          <v-btn fab color="green" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <section>
            <h3 v-for="workingtime in dailyWorkingtimes" :key="workingtime.id">
              {{ getPlanning(workingtime) }}
            </h3>
          </section>
        </div>
        <div v-if="!isWorking" class="isWorking">
          <v-btn fab color="red" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <section>
            <h3 v-for="workingtime in dailyWorkingtimes" :key="workingtime.id">
              {{ getPlanning(workingtime) }}
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
              :items="visualizeOptions"
              label="Visualize"
              solo
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
            <v-select
              :items="periodeOptions"
              label="Select period"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <line-chart
          v-if="dailyWorkData"
          :chartdata="dailyWorkData"
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
  props: ["hideTitle", "userId"],
  data: () => ({
    date: `${new Date().getHours()}:${(new Date().getMinutes() < 10
      ? "0"
      : "") + new Date().getMinutes()}`,
    isWorking: false,
    dailyWorkingtimes: null,
    weeklyWorkingtimes: null,
    monthlyWorkingtimes: null,
    dailyClocks: null,
    weeklyClocks: null,
    monthlyClocks: null,
    dailyWorkData: null,
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    visualizeOptions: ["Line", "Doughnut", "Bar"],
    periodeOptions: ["Monthly", "Weekly", "Daily"],
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
  },

  computed: {
    ...mapState("user", ["id", "email", "username"]),
  },
  mounted() {
    setInterval(
      () =>
        (this.date = `${new Date().getHours()}:${(new Date().getMinutes() < 10
          ? "0"
          : "") + new Date().getMinutes()}`),
      10000
    );

    Promise.all([
      WorkingTimesService.getWorkingTimesUser(
        this.userId ? this.userId : this.id
      ),
      ClockService.getClockUser(this.userId ? this.userId : this.id),
    ]).then((res) => {
      ///////////////// DAILY //////////////////////////////

      /// GET DAILY WORKINGTIMES
      let dailyWorkingtimes = res[0].data.data.filter((workingTime) => {
        let current = new Date();
        let start = new Date(workingTime.start);
        let end = new Date(workingTime.end);
        return (
          start.toLocaleDateString() == current.toLocaleDateString() &&
          end.toLocaleDateString() == current.toLocaleDateString()
        );
      });
      this.dailyWorkingtimes = dailyWorkingtimes;

      /// GET DAILY CLOCKS
      let dailyClocks = res[1].data.data.filter((clock) => {
        let current = new Date();
        let time = new Date(clock.time);
        return time.toLocaleDateString() == current.toLocaleDateString();
      });
      this.dailyClocks = dailyClocks;

      /// SET IF HE/SHE'S WORKING
      if (
        dailyWorkingtimes.some(
          (workingtime) =>
            new Date() > new Date(workingtime.start) &&
            new Date() < new Date(workingtime.end)
        )
      )
        this.isWorking = true;
      else this.isWorking = false;

      /// SET CURRENT WORKINGTIME AND HOW MANY WORKINGTIME LESS
      let currentWorkingTime = dailyWorkingtimes.find(
        (workingtime) =>
          new Date() > new Date(workingtime.start) &&
          new Date() < new Date(workingtime.end)
      );

      /// SET WORKINGTIME CHART
      if (currentWorkingTime) {
        let lastClock = dailyClocks.find(
          (clock) =>
            new Date(clock.time) >= new Date(currentWorkingTime.start) &&
            new Date(clock.time) <= new Date(currentWorkingTime.end)
        );
        if (lastClock) {
          let total = (
            (new Date(currentWorkingTime.end).getTime() -
              new Date(currentWorkingTime.start).getTime()) /
            (1000 * 3600)
          ).toFixed(2);
          let work = (
            (new Date().getTime() - new Date(lastClock.time).getTime()) /
            (1000 * 3600)
          ).toFixed(2);
          this.dailyWorkData = {
            labels: ["Workingtime", "Less time"],
            datasets: [
              {
                data: [work, total - work],
                backgroundColor: ["green", "yellow"],
                weight: 0.5,
              },
            ],
          };
        }
      }

      /////////////////// WEEKLY ///////////////////////////////////
      /// GET WEEKLY WORKINGTIMES
      let weeklyWorkingtimes = res[0].data.data.filter((workingTime) => {
        let current = new Date();
        let start = new Date(workingTime.start);
        let end = new Date(workingTime.end);
        return (
          this.getWeekNumber(start) == this.getWeekNumber(current) &&
          this.getWeekNumber(end) == this.getWeekNumber(current)
        );
      });
      this.weeklyWorkingtimes = weeklyWorkingtimes;

      /// GET WEEKLY CLOCKS
      let weeklyClocks = res[1].data.data.filter((clock) => {
        let current = new Date();
        let time = new Date(clock.time);
        return this.getWeekNumber(time) == this.getWeekNumber(current);
      });
      this.weeklyClocks = weeklyClocks;

      

    });
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
