<template>
  <v-card
    :color="color"
    class="home-card"
    :height="height"
    @click="$router.push({ path: toPath })"
  >
    <v-container fill-height>
      <v-row justify="center">
        <v-avatar size="128">
          <v-icon color="white" size="128">{{ icon }}</v-icon>
        </v-avatar>
      </v-row>
      <v-row fill-height justify="center" align="center">
        <v-card-title class="display-2 white--text font-weight-light">{{
          title
        }}</v-card-title>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "HomeCard",

  data: () => ({}),

  props: {
    height: {
      type: Number,
      default: 300
    },
    color: {
      type: String,
      default: "#0FAFF8"
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    toPath: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.home-card:hover {
  cursor: pointer;
  filter: hue-rotate(-30deg);
  transform: translate(0, -5%);
  animation: movement 0.2s !important;
  z-index: 10;
}

@keyframes movement {
  0% {
    transform: rotate3d(0.2, 0.4, 0.6, 2deg);
  }
  25% {
    transform: rotate3d(0.4, 0.8, 1.2, 4deg);
  }
  50% {
    transform: rotate3d(0.6, 1.2, 1.8, 6deg);
  }
  75% {
    transform: rotate3d(0.8, 1.6, 2.4, 8deg);
    transform: scale(1.05);
  }
  100% {
    transform: rotate3d(1, 2, 3, 10deg);
    transform: scale(1.1);
  }
}
</style>
