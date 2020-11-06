<template>
  <div class="container">
    <v-row align="baseline" justify="center">
      <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
        <h3>Workingtime:</h3>
      </v-col>
      <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
        <v-select
          v-model="periode"
          :items="periodeOptions"
          v-on:change="changePeriode()"
          label="Select period"
          solo
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
        <v-select
          v-model="visualize"
          :items="visualizeOptions"
          label="Visualize"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <line-chart
      v-if="visualize == 'Line'"
      :chartdata="chartData"
      :options="options2"
    />
    <bar-chart
      v-if="visualize == 'Bar'"
      :chartdata="chartData"
      :options="options2"
    />
    <doughnut-chart
      v-if="visualize == 'Doughnut'"
      :chartdata="chartData"
      :options="options1"
    />
  </div>
</template>

<script>
import LineChart from "../components/charts/Line.js";
import BarChart from "../components/charts/Bar.js";
import DoughnutChart from "../components/charts/Doughnut.js";
import AccountService from "../services/AccountService";
export default {
  name: "TeamDashboard",
  props: ["team"],
  data: () => ({
    employeeInfos: null,
    visualize: "Doughnut",
    periode: "Daily",
    options1: {
      responsive: true,
      maintainAspectRatio: false
    },
    options2: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    },
    visualizeOptions: ["Doughnut", "Line", "Bar"],
    periodeOptions: ["Daily", "Weekly", "Monthly"],
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
    ],
    chartData: null
  }),

  mounted() {
    this.init();
  },

  methods: {
    init() {
      Promise.all(
        this.team.employee.map(e => AccountService.getUserInfos(e.id))
      ).then(res => {
        this.employeeInfos = res;
        this.setDailyWorkingtimeChart();
      });
    },
    changePeriode() {
      if (this.periode == "Monthly") {
        this.setMonthWorkingtimeChart();
      } else if (this.periode == "Weekly") {
        this.setWeeklyWorkingtimeChart();
      } else if (this.periode == "Daily") {
        this.setDailyWorkingtimeChart();
      }
    },
    setDailyWorkingtimeChart() {
      let data = this.employeeInfos.map((empInfo) => {
        return parseFloat(empInfo.dailyClocks
          .reduce((hours, clock) => {
            let work = !clock.end
              ? (new Date().getTime() - new Date(clock.start).getTime()) /
                (1000 * 3600)
              : (new Date(clock.end).getTime() -
                  new Date(clock.start).getTime()) /
                (1000 * 3600);
            return hours + work;
          }, 0)).toFixed(2)
      });
      this.chartData = {
        labels: this.team.employee.map(e => e.username),
        datasets: [
          {
            data: data,
            backgroundColor: this.team.employee.map(() =>
              this.getRandomColor()
            ),
            weight: 0.5,
            label: "Workingtime"
          }
        ]
      };
    },
    setWeeklyWorkingtimeChart() {
      let data = this.employeeInfos.map((empInfo) => {
        return parseFloat(empInfo.sortClockByWeekDay
          .map((dayClocks) =>
            dayClocks.reduce((hours, clock) => {
              if (clock.end) {
                hours =
                  hours +
                  Math.abs(new Date(clock.start) - new Date(clock.end)) / 36e5;
              } else {
                hours =
                  hours + Math.abs(new Date(clock.start) - new Date()) / 36e5;
              }
              return hours;
            }, 0.0)
          )
          .reduce((hours, d) => hours + d, 0)).toFixed(2)
      });
      this.chartData = {
        labels: this.team.employee.map(e => e.username),
        datasets: [
          {
            data: data,
            label: "Workingtime",
            backgroundColor: this.team.employee.map(() =>
              this.getRandomColor()
            ),
            weight: 0.5
          }
        ]
      };
    },
    setMonthWorkingtimeChart() {
<<<<<<< HEAD
      let data = this.employeeInfos.map((empInfo) => {
        return parseFloat(empInfo.sortClockByMonthDay
          .map((monthocks) =>
=======
      let data = this.employeeInfos.map(empInfo => {
        return empInfo.sortClockByMonthDay
          .map(monthocks =>
>>>>>>> 7bdfc947bf52f209fb0a8327f965489a82d54abb
            monthocks.reduce((hours, clock) => {
              if (clock.end) {
                hours =
                  hours +
                  Math.abs(new Date(clock.start) - new Date(clock.end)) / 36e5;
              } else {
                hours =
                  hours +
                  (Math.abs(new Date(clock.start) - new Date()) / 36e5)
              }
              return hours;
            }, 0)
          )
<<<<<<< HEAD
          .reduce((hours, d) => hours + d, 0)).toFixed(2)
=======
          .reduce((hours, d) => hours + d, 0);
>>>>>>> 7bdfc947bf52f209fb0a8327f965489a82d54abb
      });
      this.chartData = {
        labels: this.team.employee.map(e => e.username),
        datasets: [
          {
            data: data,
            label: "Workingtime",
            backgroundColor: this.team.employee.map(() =>
              this.getRandomColor()
            ),
            weight: 0.5
          }
        ]
      };
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  watch: {
    team: function(newVal) {
      this.team = newVal;
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
</style>
