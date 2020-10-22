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

    <component :is="selected" :resize="resize" :grid="grid" />

    <v-row justify="center">
      <v-col cols="2">
        <v-checkbox v-model="resize" label="Resizable chart"></v-checkbox>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="2">
        <v-checkbox v-model="grid" label="Grid"></v-checkbox>
      </v-col>
    </v-row>
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
    selected: "donut",
    resize: false,
    grid: true,
    chartsTypes: ["donut", "bar", "chart-line", "chart-area"]
  }),

  components: {
    Bar,
    ChartLine,
    ChartArea,
    Donut
  }
};
</script>
