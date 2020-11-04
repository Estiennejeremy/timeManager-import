<template>
  <div class="drawer-settings">
    <material-form
      :config="config"
      :class="responsive ? '' : 'vertical-center'"
      @update:config="config = $event"
      @validate="changeDrawerImage()"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "DrawerSettings",

  components: {
    MaterialForm
  },

  data: () => ({
    responsive: false,
    config: {
      title: "Change drawer background",
      message: {
        type: null,
        text: null,
        duration: 5000
      },
      image: "",
      icon: "mdi-image",
      components: [
        {
          id: 0,
          model: null,
          modelName: "url",
          name: "inputs-text-field",
          directive: "config",
          options: {
            dark: false,
            light: true,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: true,
            label: "Image URL",
            counter: 0,
            rules: [
              v => !!v || "URL required",
              v => (v && v.length > 4) || "URL not valid"
            ]
          }
        }
      ]
    }
  }),

  methods: {
    ...mapMutations("app", ["setDark", "toggleDark", "setColor", "setImage"]),

    getModel(name) {
      let id = this.config.components.findIndex(
        item => item.modelName === name
      );
      return this.config.components[id].model;
    },

    changeDrawerImage() {
      this.setImage(this.getModel("url"));
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
    ...mapState("app", ["image", "color"])
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

<style scoped></style>
