<template>
  <v-container id="chartManager">
    <v-row justify="center">
      <v-col cols="6">
        <v-select
          v-model="selected"
          :items="chartsTypes"
          filled
          shaped
          label="Chart Type"
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="6">
        <v-select
          v-model="selectedPeriod"
          :items="periodTypes"
          filled
          shaped
          label="Period"
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="6">
        <v-btn color="blue" dark x-large @click="updateData()">Generate</v-btn>
      </v-col>
    </v-row>

    <component :is="selected" :chart-data="data" :options="options" />
  </v-container>
</template>

<script>
import Bar from "@/components/charts/manager/Bar.vue";
import LineChart from "@/components/charts/manager/Line.vue";
import HorizontalBar from "@/components/charts/manager/HorizontalBar.vue";
import Doughnut from "@/components/charts/manager/Doughnut.vue";
import Pie from "@/components/charts/manager/Pie.vue";

export default {
  name: "ChartManager",

  data: () => ({
    selected: "bar",
    selectedPeriod: "year",

    chartsTypes: ["bar", "horizontal-bar", "doughnut", "pie", "line-chart"],
    periodTypes: ["day", "week", "month", "year"],

    dayLabels: ["Today"],
    weekLabels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    monthLabels: [],
    yearLabels: [
      "January",
      "February",
      "Mars",
      "April",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],

    data: {
      labels: [],
      datasets: []
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              max: 24,
              stepSize: 1,
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              max: 24,
              stepSize: 1,
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  props: {
    labels: {
      type: Array,
      default: () => []
    },
    datasetsProps: {
      type: Object,
      default: () => {}
    },
    optionsProps: {
      type: Object,
      default: () => {}
    }
  },

  created() {
    let dataset = [];
    this.data.labels = this[`${this.selectedPeriod}` + "Labels"];
    dataset.push({
      label: "Worked hours",
      data: this.randomArray(this.data.labels.length, 0, 12),
      backgroundColor: this.fillArrayOneValue(
        this.data.labels.length,
        "#008000"
      ),
      "border-color": ["#424242"],
      borderWidth: 1
    });
    this.data.datasets = dataset;
  },

  methods: {
    updateData() {
      let data = {};
      let datasets = [];
      data.labels = this[`${this.selectedPeriod}` + "Labels"];
      datasets.push({
        label: "Worked hours",
        data: this.randomArray(this.data.labels.length, 0, 24),
        backgroundColor: this.fillArrayOneValue(
          this.data.labels.length,
          "#008000"
        ),
        "border-color": ["#424242"],
        borderWidth: 1
      });
      data.datasets = datasets;
      this.data = data;
    },

    updatePeriod() {},

    randomInt(min, max) {
      let random = Math.random() * (max - min) + min;
      return Number.parseFloat(random).toFixed(1);
    },

    randomArray(number, min, max) {
      let array = [];
      for (let i = 0; i != number; i++) {
        array.push(this.randomInt(min, max));
      }
      return array;
    },

    fillArrayOneValue(number, val) {
      let array = new Array(number).fill(val);
      console.log(array);
      return array;
    }
  },

  watch: {
    selectedPeriod: function(newValue) {
      let data = this.data;
      switch (newValue) {
        case "day":
          data.labels = this.dayLabels;
          this.data = data;
          break;
        case "week":
          data.labels = this.weekLabels;
          this.data = data;
          break;
        case "month":
          data.labels = this.monthLabels;
          this.data = data;
          break;
        case "year":
          data.labels = this.yearLabels;
          this.data = data;
          break;
      }
      this.updateData();
    }
  },

  components: {
    Bar,
    LineChart,
    HorizontalBar,
    Doughnut,
    Pie
  }
};
</script>
