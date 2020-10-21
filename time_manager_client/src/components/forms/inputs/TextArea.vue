<template>
  <v-textarea
    :shaped="config.shaped || false"
    :filled="config.filled || false"
    :dark="config.dark || true"
    :autocomplete="config.autocomplete || false"
    :required="config.required || false"
    :counter="config.counter || 0"
    :label="config.label || '...'"
    :rows="config.rows"
    :auto-grow="config.grow"
    :rules="config.rules"
    v-model="model"
  ></v-textarea>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TextArea",
  data: () => ({
    modelValue: null,
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
    this.model =
      "(# Titre)\n# Titre\n(## Titre 2)\n## Titre2\n(- Puce)\n- Puce\n- [X] Run `> npm-install`";
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
        return this.modelValue;
      },
      set(val) {
        this.modelValue = val;
        this.$emit("model", val);
      }
    }
  }
};
</script>

<style lang="scss"></style>
