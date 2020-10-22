<template>
  <bar-chart
    id="bar"
    style="background-color: white;"
    :data="barData"
    xkey="year"
    ykeys='["and", "ios", "win"]'
    grid="true"
    grid-text-weight="bold"
    bar-colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
    resize="true">
  </bar-chart>
</template>

<script>
import { BarChart } from "vue-morris";
export default {
  name: "Bar",

  data: () => ({
    barData: [
      {"year": "2013", "and": 10, "ios": 5, "win": 2},
      {"year": "2014", "and": 10, "ios": 15, "win": 3},
      {"year": "2015", "and": 20, "ios": 25, "win": 2},
      {"year": "2015", "and": 30, "ios": 20, "win": 1}
    ]
  }),

  components: {
    BarChart
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
