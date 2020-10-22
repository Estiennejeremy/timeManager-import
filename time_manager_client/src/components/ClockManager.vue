<template>
  <span id="clockManager">
    <h1>{{ startDateTime }}</h1>
    <material-spa
      :titlePrimary="clockIn ? 'Work in progress' : 'Not clocked in yet'"
    >
      <template v-slot:header>
        <material-timer
          :glow="clockIn"
          @clockin="(clockIn = $event.active), (startDateTime = $event.date)"
        />
      </template>
    </material-spa>
  </span>
</template>

<script>
import { mapState } from "vuex";
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

  computed: {
    ...mapState("user", ["id"])
  },

  methods: {
    async refresh() {
      try {
        const res = await ClockService.getClock(this.id);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async clock() {
      try {
        const res = await ClockService.updateClock(
          {
            time: this.startDateTime,
            status: this.clockIn
          },
          this.id
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
