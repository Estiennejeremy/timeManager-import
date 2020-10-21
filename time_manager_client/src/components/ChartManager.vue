<template>
  <v-container id="chartManager">
    <donut-chart
      id="donut"
      :data="donutData"
      colors='[ "#FF6384", "#36A2EB", "#FFCE56" ]'
      resize="true"
    >
    </donut-chart>
  </v-container>
</template>

<script>
import Raphael from "raphael/raphael";
import jQuery from "jquery";

global.Raphael = Raphael;
global.jQuery = jQuery;
import { DonutChart } from "vue-morris";

export default {
  name: "ChartManager",

  data: () => ({
    donutData: [
      { label: "Red", value: 300 },
      { label: "Blue", value: 50 },
      { label: "Yellow", value: 100 }
    ]
  }),

  components: {
    DonutChart
  }
};
</script>
