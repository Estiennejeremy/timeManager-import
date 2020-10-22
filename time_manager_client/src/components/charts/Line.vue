<template>
  <line-chart
    id="line"
    style="background-color: white;"
    :data="lineData"
    xkey="year"
    ykeys='["a", "b"]'
    line-colors='[ "#FF6384", "#36A2EB" ]'
    :grid="grid"
    grid-text-weight="bold"
    :resize="resize"
  >
  </line-chart>
</template>

<script>
import { LineChart } from "vue-morris";
export default {
  name: "Line",

  data: () => ({
    lineData: [
      { year: "2013", a: 10, b: 5 },
      { year: "2014", a: 40, b: 15 },
      { year: "2015", a: 20, b: 25 },
      { year: "2016", a: 30, b: 20 }
    ]
  }),

  components: {
    LineChart
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    resize: {
      type: Boolean,
      default: false
    },
    grid: {
      type: Boolean,
      default: false
    }
  }
};
</script>
