<template>
  <v-container fluid>
    <material-title
      title="Options"
      :cols="responsive ? 12 : 4"
      justify="center"
    />

    <material-title
      :title="pages[page].title"
      :cols="responsive ? 10 : 2"
      justify="center"
      :before="true"
      :after="true"
      :button="true"
      @button-before="page--"
      @button-after="page++"
    />

    <component
      v-for="(component, id) in pages"
      :is="component.name"
      :key="id"
      v-show="page === id"
    >
    </component>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ColorSettings from "@/views/Settings/Color.vue";
import DrawerSettings from "@/views/Settings/Drawer.vue";
import GradientSettings from "@/views/Settings/Gradient.vue";
import LanguageSettings from "@/views/Settings/Language.vue";
import MaterialTitle from "@/components/material/Title.vue";
export default {
  name: "Settings",

  components: {
    ColorSettings,
    GradientSettings,
    DrawerSettings,
    LanguageSettings,
    MaterialTitle
  },

  data: () => ({
    responsive: false,
    page: 0,
    pages: [
      { title: "COLOR", name: "color-settings" },
      { title: "GRADIENT", name: "gradient-settings" },
      { title: "DRAWER IMAGE", name: "drawer-settings" },
      { title: "LANGUAGE", name: "language-settings" }
    ]
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

  watch: {
    page: function(val) {
      if (val === this.pages.length) {
        this.page = 0;
      } else if (val < 0) {
        this.page = this.pages.length - 1;
      }
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
.sectionTitle {
  border-radius: 180px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
