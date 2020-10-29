<template>
  <div class="container">
    <h2 v-if="!hideTitle">{{ date }} | {{ username }}</h2>
    <v-row align="center" justify="space-around">
      <v-col class="d-flex flex-column" cols="12" md="3" lg="3">
        <div v-if="!isLate" class="isLate">
          <v-btn fab color="green" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <h3>Enough time</h3>
        </div>
        <div v-if="isLate" class="isLate">
          <v-btn fab color="red" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <h3>Not enough time</h3>
        </div>
        <doughnut-chart :chartdata="doughnutData" :options="options" />
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
        <line-chart :chartdata="doughnutData" :options="options" />
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
    isLate: false,
    dailyWorkingtimes: null,
    weeklyWorkingtimes: null,
    monthlyWorkingtimes: null,
    dailyClocks: null,
    weeklyClocks: null,
    monthlyClocks: null,
    doughnutData: {
      labels: ["Workingtime", "Free time"],
      datasets: [
        {
          data: [70, 30],
          weight: 0.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    visualizeOptions: ["Line", "Doughnut", "Bar"],
    periodeOptions: ["Monthly", "Weekly", "Daily"],
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),
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
      // Daily
      WorkingTimesService.getDailyWorkingTimesUser(
        this.userId ? this.userId : this.id, 
      ),
      ClockService.getDailyClocksUser(this.userId ? this.userId : this.id),
      // Weekly
      WorkingTimesService.getWeeklyWorkingTimesUser(
        this.userId ? this.userId : this.id
      ),
      ClockService.getWeeklyClocksUser(this.userId ? this.userId : this.id),
      // Monthly
      WorkingTimesService.getMonthlyWorkingTimesUser(
        this.userId ? this.userId : this.id
      ),
      ClockService.getMonthlyClocksUser(this.userId ? this.userId : this.id),
    ]).then((res) => {
      this.dailyWorkingtimes = res[0].data.data;
      this.dailyClocks = res[1].data.data;
      this.weeklyWorkingtimes = res[2].data.data;
      this.weeklyClocks = res[3].data.data;
      this.monthlyWorkingtimes = res[4].data.data;
      this.monthlyClocks = res[5].data.data;
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
.isLate {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.timeColor {
  margin-right: 20px;
}
</style>
