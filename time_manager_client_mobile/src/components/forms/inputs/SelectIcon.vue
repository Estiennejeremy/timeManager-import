<template>
  <span>
    <v-select
      :dark="config.dark"
      :shaped="config.shaped"
      :filled="config.filled"
      :label="config.label"
      :dense="config.dense"
      :items="config.items"
      :rules="config.rules"
      v-model="model"
    >
      <template slot="selection">
        <v-flex xs2>
          <v-avatar size="25px" icon="model">
            <v-icon>{{ model }}</v-icon>
          </v-avatar>
        </v-flex>
        <v-flex class="ml-1">
          {{ model }}
        </v-flex>
      </template>

      <template slot="item" slot-scope="data">
        <v-list-tile-avatar class="mx-4">
          <v-icon>{{ data.item }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ data.item }}</v-list-tile-title>
        </v-list-tile-content>
      </template>
    </v-select>
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectIcon",
  data: () => ({
    modelValue: null,
    responsive: false,
    passRules: [
      v => !!v || "Password required",
      v =>
        (v && v.length > 10) || "Password must be superior than 10 characters"
    ]
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
