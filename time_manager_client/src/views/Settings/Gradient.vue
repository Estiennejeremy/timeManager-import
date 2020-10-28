<!--
  TODO:
    - Get darkness of gradient to switch dark/light
    - Generate a gradient with the chosen color
 -->

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        :cols="responsive ? 12 : 4"
        align-self="center"
        style="justify: center !important;"
      >
        <v-layout row wrap align-center justify-center>
          <v-row justify="center">
            <v-col v-for="(item, id) in gradients" :key="id" cols="6">
              <v-tooltip bottom color="#424242">
                <template v-slot:activator="{ on }">
                  <v-card
                    v-on="on"
                    elevation="12"
                    :class="
                      id === selected ? 'gradient-card-active' : 'gradient-card'
                    "
                    :style="gradientDisplay(item)"
                    @click="changeGradient(item)"
                  >
                  </v-card>
                </template>
                <span>{{ item.name }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "GradientSettings",

  data: () => ({
    responsive: false,
    selected: "",
    gradients: [
      {
        name: "Default",
        gradient:
          "linear-gradient(270deg, #74ebd5, #b8bfdb, #39c2d8) no-repeat;"
      },
      {
        name: "Red Blue",
        gradient: "linear-gradient(135deg, red, blue);"
      },
      {
        name: "Blurry beach",
        gradient: "linear-gradient(to right, #d53369, #cbad6d);"
      },
      {
        name: "Dark",
        gradient:
          "linear-gradient(to right, #424242, #323232, #222222, #111111);"
      }
    ]
  }),

  methods: {
    ...mapMutations("app", ["setDark", "toggleDark", "setColor"]),

    titleColor() {
      return "background-color: " + this.color + ";color:white;";
    },

    changeGradient(item) {
      this.gradient = item.gradient;
    },

    gradientDisplay(item) {
      return "background:" + item.gradient;
    },

    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },

  computed: {
    ...mapState("app", ["image", "color"]),

    gradient: {
      get() {
        return this.$store.state.app.gradient;
      },
      set(val) {
        this.selected = this.gradients.findIndex(item => item.gradient === val);
        this.$store.state.app.gradient = val;
      }
    }
  },

  mounted() {
    this.selected = this.gradients.findIndex(
      item => item.gradient === this.gradient
    );
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
};
</script>

<style scoped>
.sectionTitle {
  border-radius: 180px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
.gradient-card {
  min-height: 100px;
  border-radius: 30px;
}
.gradient-card:hover {
  border-radius: 30px;
  border: 3px solid #424242;
  cursor: pointer;
}
.gradient-card-active {
  min-height: 100px;
  border-radius: 28px;
  border: 2px double #424242;
  filter: blur(6px);
}
.v-card--link:before {
  display: none !important;
}
</style>
