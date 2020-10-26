<template>
  <span id="home">
    <v-container fill-height>
      <v-container>
        <v-row justify="center">
          <v-avatar size="256">
            <v-img
              src="https://cdn1.iconfinder.com/data/icons/flat-mobile-app-icons/128/Clock-512.png"
            />
          </v-avatar>
        </v-row>

        <v-row class="pt-4" justify="center">
          <span class="display-3" style="text-shadow: 2px 2px 0 #7A7A7A;"
            >Welcome to TimeManager</span
          >
        </v-row>
      </v-container>

      <v-col cols="12">
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-card color="#0FAFF8" class="home-card" min-height="300">
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card color="#0FAFF8" class="home-card" min-height="300">
            </v-card>
          </v-col>

          <v-col cols="4">
            <v-card color="#0FAFF8" class="home-card" min-height="300">
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </span>
</template>

<script>
export default {
  name: "Home"
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
