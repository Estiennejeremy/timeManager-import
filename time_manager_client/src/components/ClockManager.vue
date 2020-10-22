<template>
  <span id="clockManager">
    <material-spa
      titlePrimary="Work in progress"
      subtitle="Since: 12/12/2020 14h00"
    >
      <template v-slot:header>
        <material-timer />
      </template>
    </material-spa>
  </span>
</template>

<script>
import MaterialSpa from "@/components/material/Spa.vue";
import MaterialTimer from "@/components/material/Timer.vue";
import ClockService from "@/services/ClockService";
export default {
  name: "ClockManager",

  data: () => ({
    startDateTime: null,
    clockIn: false
  }),

  components: {
    MaterialSpa,
    MaterialTimer
  },

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
