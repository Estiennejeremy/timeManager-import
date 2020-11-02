<template>
  <v-btn
    id="action-button"
    :color="color"
    :block="config.block || false"
    :x-large="config.xlarge || false"
    :dark="config.dark || false"
    :light="config.light || false"
    :dense="config.dense || false"
    :shaped="config.shaped || false"
    @click.stop="model = true"
  >
    <span>{{ config.label | capitalize }}</span>
  </v-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ActionsButton",
  data: () => ({
    responsive: false
  }),

  inheritAttrs: false,

  props: {
    config: {
      type: Object,
      default: () => {}
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

  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      let rvalue = value.replace(/_/g, " ");
      return rvalue.charAt(0).toUpperCase() + rvalue.slice(1);
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
    ...mapState("app", ["background", "color"]),

    model: {
      get() {
        return false;
      },
      set(val) {
        this.$emit("model", val);
      }
    }
  }
};
</script>

<style scoped>
#action-button {
  margin: 0 !important;
  font-weight: 350;
  font-size: 20px;
  opacity: 0.9;
  border-radius: 20px 20px 0px 0px;
}
</style>
