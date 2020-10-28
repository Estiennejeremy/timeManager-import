<template>
  <v-container fill-height id="about">
    <chart-manager />
  </v-container>
</template>

<script>
import ChartManager from "@/components/ChartManager.vue";
export default {
  name: "About",

  data: () => ({}),

  components: {
    ChartManager
  },

  methods: {},

  mounted() {}
};
</script>

<style scoped></style>
