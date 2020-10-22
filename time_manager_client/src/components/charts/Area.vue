<template>
  <area-chart
    id="area"
    style="background-color: white;"
    :data="areaData"
    xkey="year"
    ykeys='["a", "b"]'
    line-colors='[ "#FF6384", "#36A2EB" ]'
    grid="true"
    grid-text-weight="bold"
    resize="true">
  </area-chart>
</template>

<script>
import { AreaChart } from "vue-morris";
export default {
  name: "Area",

  data: () => ({
    areaData: [
      {year: "2013", a: 10, b: 5},
      {year: "2014", a: 40, b: 15},
      {year: "2015", a: 20, b: 25},
      {year: "2016", a: 30, b: 20}
    ]
  }),

  components: {
    AreaChart
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
