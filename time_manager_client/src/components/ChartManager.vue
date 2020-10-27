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
    chartsTypes: ["bar", "horizontal-bar", "doughnut", "pie", "line-chart"],

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

    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        },
        {
          label: "# of Votes",
          data: [3, 9, 13, 35, 22, 53],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  components: {
    Bar,
    LineChart,
    HorizontalBar,
    Doughnut,
    Pie
  }
};
</script>
