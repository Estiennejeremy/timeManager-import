<template>
  <v-container id="clockManager"> </v-container>
</template>

<script>
import ClockService from "@/services/ClockService";
export default {
  name: "ClockManager",

  data: () => ({
    startDateTime: null,
    clockIn: false
  }),

  methods: {
    async refresh() {
      try {
        const res = await ClockService.getClock();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async clock() {
      try {
        const res = await ClockService.updateClock();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
