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
export default {
  name: "Profile",
  props: ["hideTitle"],
  data: () => ({
    date: `${new Date().getHours()}:${(new Date().getMinutes() < 10
      ? "0"
      : "") + new Date().getMinutes()}`,
    isLate: false,
    doughnutData: {
      labels: ["Workingtime", "Free time"],
      datasets: [
        {
          data: [70, 30],
          weight: 0.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    visualizeOptions: ["Line", "Doughnut", "Bar"],
    periodeOptions: ["Monthly", "Weekly", "Daily"]
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"])
  },

  computed: {
    ...mapState("user", ["id", "email", "username"])
  },
  mounted() {
    setInterval(
      () =>
        (this.date = `${new Date().getHours()}:${(new Date().getMinutes() < 10
          ? "0"
          : "") + new Date().getMinutes()}`),
      10000
    );
  },
  components: {
    LineChart,
    DoughnutChart
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
