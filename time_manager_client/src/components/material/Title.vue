<template>
  <v-row :justify="$props.justify">
    <v-col
      v-if="$props.before && !responsive"
      :cols="$props.button ? 1 : ($props.cols - 12) / 2"
    >
      <div class="text-center">
        <v-icon
          size="64"
          v-ripple
          @click="$emit('button-before')"
          class="title button"
          :style="titleColor"
        >
          mdi-arrow-left
        </v-icon>
      </div>
    </v-col>

    <v-col :cols="$props.cols">
      <div class="text-center">
        <h3
          :style="!selected ? titleColor : titleSelectedColor"
          class="text-center text-uppercase font-weight-light title"
          :class="this.$props.button ? 'button' : ''"
          @click="$emit('button-center')"
        >
          {{ $props.title }}
        </h3>
      </div>
    </v-col>

    <v-col
      v-if="$props.after && !responsive"
      :cols="$props.button ? 1 : ($props.cols - 12) / 2"
    >
      <div class="text-center">
        <v-icon
          :style="titleColor"
          size="64"
          v-ripple
          @click="$emit('button-after')"
          class="title button"
        >
          mdi-arrow-right
        </v-icon>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MaterialTitle",
  inheritAttrs: true,

  props: {
    title: {
      type: String,
      default: "Title"
    },
    cols: {
      type: Number,
      default: 12
    },
    justify: {
      type: String,
      default: "center"
    },
    before: {
      type: Boolean,
      default: false
    },
    after: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    responsive: false
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

    titleColor() {
      return "background-color: " + this.color + ";";
    },

    titleSelectedColor() {
      return "background-color: darkcyan;";
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
.title {
  color: white;
  line-height: 1.5em;
  font-size: 1.25rem;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  border-radius: 180px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}
.button:hover {
  cursor: pointer;
}
</style>
