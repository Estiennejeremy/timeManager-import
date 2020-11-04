<template>
  <span id="clockManager">
    <material-spa
      :titlePrimary="clockIn ? 'Work in progress' : 'Not clocked in yet'"
    >
      <template v-slot:header>
        <material-timer :glow="clockIn" @clockin="clock()" />
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
    clockIn: false,
    lastClock: null,
  }),

  components: {
    MaterialSpa,
    MaterialTimer,
  },

  computed: {
    ...mapState("user", ["id"]),
  },

  methods: {
    refresh() {
      ClockService.getLastClockUser(this.id).then(
        (res) => {
          this.lastClock = res.data.data.length == 1 ? res.data.data[0] : null;
          if(this.lastClock && this.lastClock.start && !this.lastClock.end) this.clockIn = true;
          else this.clockIn = false;
        }
      );
    },

    clock() {
      let now = new Date();
      now.setHours(now.getHours() + 1); // Offset timezone
      if ((this.lastClock && this.lastClock.end) || !this.lastClock) {
        ClockService.createClock(
          {
            start: now.toISOString(),
          },
          this.id
        )
          .then(() => this.refresh())
          .catch(() => this.refresh());
      } else {
        ClockService.updateClock(
          {
            end: now.toISOString(),
          },
          this.lastClock.id
        )
          .then(() => this.refresh())
          .catch(() => this.refresh());
      }
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>
