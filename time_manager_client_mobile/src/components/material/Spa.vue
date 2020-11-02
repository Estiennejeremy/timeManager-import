<template>
  <v-container
    fluid
    fill-height
    class="home-hero"
    :style="
      background !== null
        ? {
            'background-image': 'url(' + imageUrl + ')',
            'background-size': 'cover',
            width: '100%',
            height: '100%'
          }
        : { gradientColor }
    "
  >
    <v-layout justify-center align-center column pa-5 style="z-index: 20;">
      <span class="pb-4">
        <slot name="header" />
      </span>
      <div
        :class="
          !responsive
            ? `display-4 font-weight-black ${colorPrimary}--text text-xs-center`
            : `display-1 font-weight-black ${colorPrimary}--text text-xs-center`
        "
        style="text-align: center;"
      >
        {{ titlePrimary }}
      </div>
      <div
        :class="
          !responsive
            ? `display-4 font-weight-black ${colorPrimary}--text text-xs-center mb-3`
            : `display-1 font-weight-black ${colorPrimary}--text text-xs-center mb-3`
        "
        style="text-align: center;"
      >
        {{ titleSecond }}
      </div>
      <div
        :class="
          !responsive
            ? `display-1 font-weight-bold ${colorSecondary}--text text-xs-center`
            : `body-1 font-weight-bold ${colorSecondary}--text text-xs-center`
        "
        style="text-align: justify;"
      >
        {{ subtitle }}
      </div>

      <v-btn
        fab
        v-if="button"
        color="#424242"
        class="mt-5"
        @click="
          $props.action === 'scroll'
            ? $emit('scroll')
            : $router.push({ path: $props.to })
        "
      >
        <v-icon large color="white">{{
          "mdi-arrow-" + this.$props.arrow
        }}</v-icon>
      </v-btn>

      <slot name="content"></slot>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Spa",
  inheritAttrs: true,

  props: {
    titlePrimary: {
      type: String,
      default: ""
    },
    titleSecond: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: "../../assets/background.jpg"
    },
    button: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: "scroll"
    },
    arrow: {
      type: String,
      default: "down"
    },
    colorPrimary: {
      type: String,
      default: "white"
    },
    colorSecondary: {
      type: String,
      default: "white"
    }
  },

  data: () => ({
    responsive: false,
    publicPath: process.env.BASE_URL
  }),

  methods: {
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

    imageUrl() {
      return this.$props.background.startsWith("http")
        ? this.$props.background
        : `${this.publicPath}${this.$props.background}`;
    },

    gradientColor() {
      return (
        "background-image: linear-gradient(to top, " +
        this.color +
        " 20%, #27273c 80%);z-index: 20;"
      );
    }
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
.home-hero {
  background-color: "#424242";
}
</style>
