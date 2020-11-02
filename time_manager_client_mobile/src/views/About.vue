<template>
  <v-container fill-height id="about">
    <chart-manager />

    <v-flex xs12 md12 lg4 style="z-index: 200;">
      <a
        style="color: transparent;z-index: 20;"
        href="app-release-1.apk"
        download
      >
        <v-btn rounded large dark>
          <v-icon dark large>mdi-download</v-icon>
          Download static APK
        </v-btn>
      </a>
    </v-flex>

    <v-flex xs12 md12 lg4 style="z-index: 200;">
      <a
        style="color: transparent;z-index: 20;"
        href="app-release-unsigned.apk"
        download
      >
        <v-btn rounded large dark>
          <v-icon dark large>mdi-download</v-icon>
          Download new APK
        </v-btn>
      </a>
    </v-flex>
  </v-container>
</template>

<script>
import ChartManager from "@/components/ChartManager.vue";
export default {
  name: "About",

  data: () => ({
    publicPath: process.env.BASE_URL
  }),

  components: {
    ChartManager
  },

  methods: {},

  mounted() {}
};
</script>

<style scoped></style>
