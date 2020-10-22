<template>
  <donut-chart
    id="donut"
    :data="donutData"
    colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
    resize="true"
  >
  </donut-chart>
</template>

<script>
import { DonutChart } from "vue-morris";
export default {
  name: "Donut",

  data: () => ({
    donutData: [
      { label: "Red", value: 300 },
      { label: "Blue", value: 50 },
      { label: "Yellow", value: 100 }
    ]
  }),

  components: {
    DonutChart
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>
