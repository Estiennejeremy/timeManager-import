<template>
  <v-row justify="center">
    <v-col :cols="responsive ? 10 : 6">
      <v-card
        :class="getStyle"
        :color="darkmode ? '#424242' : '#363636'"
        dark
        :max-width="responsive ? 'auto' : 800"
      >
        <v-card-title>
          <v-list-item v-if="position === 'left'">
            <v-list-item-avatar :size="responsive ? 64 : 128" class="shadow">
              <v-avatar
                :size="responsive ? 64 : 128"
                :color="color"
                class="shadow avatar"
              >
                <v-icon :size="responsive ? 32 : 64" dark>{{ icon }}</v-icon>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-btn
                :href="isRouterLink ? null : link"
                :to="isRouterLink ? { path: link } : null"
                :target="isRouterLink ? '' : '_blank'"
                rounded
                block
                :color="color"
                style="font-weight: 400;"
              >
                {{ title }}
              </v-btn>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-else>
            <v-list-item-content>
              <v-btn
                :to="isRouterLink ? { path: link } : null"
                :href="isRouterLink ? null : link"
                :target="isRouterLink ? '' : '_blank'"
                rounded
                block
                :color="color"
                style="font-weight: 400;"
              >
                {{ title }}
              </v-btn>
            </v-list-item-content>

            <v-list-item-avatar :size="responsive ? 64 : 128" class="shadow">
              <v-avatar
                :size="responsive ? 64 : 128"
                :color="color"
                class="shadow avatar"
              >
                <v-icon :size="responsive ? 32 : 64" dark>{{ icon }}</v-icon>
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CardLink",

  data: () => ({
    responsive: false
  }),

  inheritAttrs: false,

  props: {
    icon: {
      type: String,
      default: "mdi-circle"
    },
    title: {
      type: String,
      default: "Title"
    },
    link: {
      type: String,
      default: "#"
    },
    round: {
      type: String,
      default: "middle"
    },
    position: {
      type: String,
      default: "left"
    }
  },

  methods: {
    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  computed: {
    ...mapState("app", ["darkmode", "color"]),

    isRouterLink() {
      return this.$props.link.startsWith("/", 1) ? true : false;
    },

    getStyle() {
      return "mx-auto shadow nicecard-" + this.$props.round;
    }
  }
};
</script>

<style scoped>
.nicecard {
  border-top-left-radius: 20px !important;
  border-top-right-radius: 20px !important;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  z-index: 20;
}

.nicecard-top {
  border-top-left-radius: 80px !important;
  border-top-right-radius: 80px !important;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  z-index: 20;
}

.nicecard-middle {
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  z-index: 20;
}

.nicecard-bot {
  border-bottom-left-radius: 80px !important;
  border-bottom-right-radius: 80px !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  z-index: 20;
}
.shadow {
  -webkit-box-shadow: -5px -5px 0px 6px rgba(51, 46, 51, 1) !important;
  -moz-box-shadow: -5px -5px 0px 6px rgba(51, 46, 51, 1) !important;
  box-shadow: -5px -5px 0px 6px rgba(51, 46, 51, 1) !important;
}
</style>
