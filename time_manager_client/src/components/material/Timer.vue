<template>
  <material-offset :inline="false" :full-width="true" offset="84">
    <v-card
      :color="color"
      :class="glow ? 'glowicon' : `elevation-12`"
      class="v-card--material__header mx-auto"
      max-width="256"
      style="border-radius: 128px;"
      dark
    >
      <v-avatar
        id="playicon"
        size="256"
        :style="'border: 20px solid ' + color + ';background: white;'"
      >
        <v-tooltip nudge-top="100" bottom v-if="!running && startedAt === null">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              id="playavatar"
              color="#424242"
              size="256"
              @click="launchTimer()"
            >
              mdi-play
            </v-icon>
          </template>
          <span class="display-1">Clock in</span>
        </v-tooltip>

        <span v-else class="display-3 black--text noselect">{{
          formatTime || hover
        }}</span>
      </v-avatar>
    </v-card>
  </material-offset>
</template>

<script>
import MaterialOffset from "@/components/material/Offset.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Timer",
  inheritAttrs: true,

  props: {
    glow: {
      type: Boolean,
      default: false
    }
  },

  components: {
    MaterialOffset
  },

  data: () => ({
    responsive: false,
    interval: null,
    timer: 0
  }),

  methods: {
    ...mapMutations("timer", ["setRunning", "setEnded", "setStartedAt"]),

    launchTimer() {
      this.setRunning(true);
      this.setStartedAt(new Date());
      this.$emit("launch");
      this.timer = this.duration;
      this.runTimer();
    },

    resumeTimer() {
      let diff = Math.abs(new Date() - new Date(this.startedAt)) / 1000;

      if (this.duration - diff > 0) {
        this.timer = this.duration - diff;
        this.runTimer();
      } else {
        this.timer = 0;
        this.setEnded(true);
        this.$emit("end");
      }
    },

    pauseTimer() {
      this.running = false;
      clearInterval(this.interval);
    },

    runTimer() {
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer -= 1;
        } else {
          this.$emit("end");
          this.setRunning(false);
          this.setEnded(true);
          clearInterval(this.interval);
        }
      }, 1000);
    },

    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },

  computed: {
    ...mapState("app", ["color"]),
    ...mapState("timer", ["running", "duration", "startedAt", "ended"]),

    formatTime() {
      let measuredTime = new Date(null);
      measuredTime.setSeconds(this.timer); // specify value of SECONDS
      let MHSTime = measuredTime.toISOString().substr(14, 5);
      return MHSTime;
    }
  },

  mounted() {
    if (this.running && !this.ended) {
      this.resumeTimer();
    }
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
};
</script>

<style scoped>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                      supported by Chrome, Edge, Opera and Firefox */
}

#playicon:hover {
  cursor: pointer;
  animation: rotation 0.2s !important;
}

.glowicon {
  animation: glow 1s infinite !important;
}

#playavatar:hover {
  filter: invert();
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(90deg);
  }
  75% {
    transform: rotate(135deg);
    transform: scale(1.05);
  }
  100% {
    transform: rotate(180deg);
    transform: scale(1.1);
  }
}

@keyframes glow {
  0% {
    filter: hue-rotate(10deg);
    /* transform: rotate(0deg); */
  }
  25% {
    filter: hue-rotate(20deg);
    /* transform: rotate(45deg); */
  }
  50% {
    filter: hue-rotate(30deg);
    /* transform: rotate(90deg); */
  }
  75% {
    filter: hue-rotate(45deg);
    /* transform: rotate(135deg); */
    transform: scale(1.05);
  }
  100% {
    filter: hue-rotate(90deg);
    /* transform: rotate(180deg); */
    transform: scale(1.1);
  }
}
</style>
