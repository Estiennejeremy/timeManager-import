<template>
  <v-container fill-height id="about">
    <!-- <chart-manager /> -->

    <v-row justify="center">
      <a
        style="color: transparent;z-index: 20;"
        href="mobile/timemanager.apk"
        download
      >
        <v-btn rounded large dark>
          <v-icon dark large>mdi-download</v-icon>
          Download APK
        </v-btn>
      </a>
    </v-row>

    <v-row justify="center">
      <v-flex xs12 md12 lg4 style="z-index: 200;">
        <div v-if="!responsive" class="smartphone mt-4 .d-none .d-xl-flex">
          <div class="content">
            <v-img src="@/assets/demo_drawer.png" height="100%"> </v-img>
          </div>
        </div>
        <div v-else>
          <div class="content">
            <v-img contain src="@/assets/demo_drawer.png" height="100%">
            </v-img>
          </div>
        </div>
      </v-flex>

      <v-flex xs12 md12 lg4 style="z-index: 200;">
        <div v-if="!responsive" class="smartphone mt-4 .d-none .d-xl-flex">
          <div class="content">
            <v-img src="@/assets/demo_clockin.png" height="100%"> </v-img>
          </div>
        </div>
        <div v-else>
          <div class="content">
            <v-img src="@/assets/demo_clockin.png" height="100%"> </v-img>
          </div>
        </div>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
// import ChartManager from "@/components/ChartManager.vue";
export default {
  name: "About",

  data: () => ({
    publicPath: process.env.BASE_URL
  }),

  components: {
    // ChartManager
  },

  methods: {},

  mounted() {}
};
</script>

<style scoped>
.smartphone {
  position: relative;
  width: 300px;
  height: 600px;
  margin: auto;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
}

/* The horizontal line on the top of the device */
.smartphone:before {
  content: "";
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: "";
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}

/* The screen (or content) of the device */
.smartphone .content {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
