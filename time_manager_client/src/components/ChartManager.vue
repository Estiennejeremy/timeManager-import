<template>
  <v-container id="chartManager">
    <donut />
    <v-divider />
    <bar />
    <v-divider />
    <chart-line />
    <v-divider />
    <chart-area />
  </v-container>
</template>

<script>
import Raphael from "raphael/raphael";
import jQuery from "jquery";

global.Raphael = Raphael;
global.jQuery = jQuery;

import Bar from "@/components/charts/Bar.vue";
import ChartLine from "@/components/charts/Line.vue";
import ChartArea from "@/components/charts/Area.vue";
import Donut from "@/components/charts/Donut.vue";

export default {
  name: "ChartManager",

  data: () => ({
  }),

  components: {
    Bar,
    ChartLine,
    ChartArea,
    Donut
  }
};
</script>
