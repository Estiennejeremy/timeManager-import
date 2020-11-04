<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        :cols="responsive ? 12 : 4"
        align-self="center"
        style="justify: center !important;"
      >
        <v-layout row wrap align-center justify-center>
          <color-picker
            id="colorpicker"
            class="mb-4 mt-4"
            v-bind="colorstate"
            initially-collapsed="true"
            mouse-scroll="true"
            @input="onInput"
          ></color-picker>
        </v-layout>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col :cols="responsive ? 12 : 3">
        <v-slider
          light
          v-model="colorstate.saturation"
          min="0"
          max="100"
          label="Saturation"
        ></v-slider>
        <v-slider
          light
          v-model="colorstate.luminosity"
          min="0"
          max="100"
          label="Luminosité"
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ColorPicker from "@radial-color-picker/vue-color-picker";
export default {
  name: "ColorSettings",

  components: {
    ColorPicker
  },

  data: () => ({
    responsive: false,
    colorstate: {
      hue: 0,
      saturation: 0,
      luminosity: 0,
      alpha: 1
    }
  }),

  methods: {
    ...mapMutations("app", ["setDark", "toggleDark", "setColor"]),

    onInput(hue) {
      this.colorstate.hue = hue;
      this.setColor(
        this.hslToHex(
          this.colorstate.hue,
          this.colorstate.saturation,
          this.colorstate.luminosity
        )
      );
    },

    titleColor() {
      return "background-color: " + this.color + ";color:white;";
    },

    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },

    hslToHex(h, s, l) {
      h /= 360;
      s /= 100;
      l /= 100;
      let r, g, b;
      if (s === 0) {
        r = g = b = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },

    hexToHsl(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      var r = parseInt(result[1], 16);
      var g = parseInt(result[2], 16);
      var b = parseInt(result[3], 16);
      (r /= 255), (g /= 255), (b /= 255);
      var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      var h,
        s,
        l = (max + min) / 2;
      if (max == min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      s = s * 100;
      s = Math.round(s);
      l = l * 100;
      l = Math.round(l);
      h = Math.round(360 * h);
      return [h, s, l];
    }
  },

  computed: {
    ...mapState("app", ["image", "color"])
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
    let initColor = this.hexToHsl(this.color);
    (this.colorstate.hue = initColor[0]),
      (this.colorstate.saturation = initColor[1]),
      (this.colorstate.luminosity = initColor[2]);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
};
</script>

<style scoped>
@import "~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css";

#colorpicker {
  background-color: #424242;
  border-radius: 200px;
  border: 4px solid #424242;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
}

.rcp__well {
  border: 6px solid #424242;
}

.sectionTitle {
  border-radius: 180px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
