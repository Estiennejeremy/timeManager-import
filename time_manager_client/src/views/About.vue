<template>
    <span id="about" style="height: 100%;">

      <v-parallax
        dark
        jumbotron
        :height="screenHeight"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            class="text-center"
            :cols="responsive ? 12 : 4"
          >
            <about-card
              title="Increase Productivity !"
              subtitle="Save time and money with TimeManager"
              image="https://cdn.iconscout.com/icon/premium/png-256-thumb/productivity-2075482-1751755.png"
            />
          </v-col>

          <v-col
            class="text-center"
            :cols="responsive ? 12 : 4"
          >
            <about-card
              title="Keep track of your employees"
              subtitle="Save time and money with TimeManager"
              image="https://h5p.org/sites/default/files/styles/medium-logo/public/logos/chart-icon-color.png?itok=kpLTYHHJ"
              tile
              button
              @button="scrollTo('android')"
            />
          </v-col>

          <v-col
            class="text-center"
            :cols="responsive ? 12 : 4"
          >
            <about-card
              title="Manage your teams"
              subtitle="Save time and money with TimeManager"
              image="https://png.pngtree.com/png-vector/20190412/ourlarge/pngtree-vector-team-icon-png-image_931080.jpg"
            />
          </v-col>
        </v-row>
      </v-parallax>

    <v-parallax
      dark
      jumbotron
      id="android"
      :height="screenHeight"
      src="@/assets/android.png"
    >
      <v-container fluid fill-height>
        <v-row justify="center">
          <a
          style="color: transparent;"
          href="mobile/timemanager.apk"
          download
          >
            <v-btn rounded x-large dark color="primary">
              <v-icon dark large>mdi-download</v-icon>
              Download APK
            </v-btn>
          </a>
        </v-row>

        <v-row justify="center">
          <v-flex xs12 md12 lg4>
            <div class="smartphone mt-4 .d-none .d-xl-flex">
              <div class="content">
                <v-img src="@/assets/demo_drawer.png" height="100%"> </v-img>
              </div>
            </div>
          </v-flex>

          <v-flex xs12 md12 lg4 v-if="!responsive">
            <div class="smartphone mt-4 .d-none .d-xl-flex">
              <div class="content">
                <v-img src="@/assets/demo_clockin.png" height="100%"> </v-img>
              </div>
            </div>

          </v-flex>
        </v-row>
      </v-container>
    </v-parallax>

  </span>
</template>

<script>
import AboutCard from "@/views/About/AboutCard.vue";
export default {
  name: "About",

  data: () => ({
    responsive: false
  }),

  computed: {
    screenHeight() {
      return window.innerHeight - 64
    }
  },

  methods: {
    scrollTo(name) {
      document.getElementById(name).scrollIntoView({
        behavior: 'smooth'
      });
    },

    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },

  components: {
    AboutCard
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
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

.smartphone .content {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
