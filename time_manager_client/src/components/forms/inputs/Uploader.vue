<template>
  <span>
    <image-uploader
      v-if="!reset"
      :debug="config.debug"
      :maxWidth="config.maxWidth"
      :quality="config.quality"
      :autoRotate="config.autoRotate"
      :outputFormat="config.outputFormat"
      :preview="config.preview"
      :className="['fileinput', { 'fileinput--loaded': hasImage }]"
      :capture="config.capture"
      :accept="config.accept"
      :doNotResize="config.doNotResize"
      @input="setImage"
    >
      <label
        slot="upload-label"
        v-if="hasImage"
        class="hover v-btn theme--dark my-2"
        style="background-color: #E14540;width: 100%;padding: 20px;font-weight: 400;font-size: 16px;"
        @click="deleteImage()"
      >
        <span>{{ "Supprimer l'image" }}</span>
      </label>

      <label
        for="fileInput"
        slot="upload-label"
        class="hover v-btn theme--dark my-2"
        style="background-color: #4F9764;width: 100%;padding: 20px;font-weight: 400;font-size: 16px;border-bottom-left-radius: 0px;border-bottom-right-radius: 0px;"
      >
        <span class="upload-caption"
          >{{ hasImage ? "Remplacer l'image" : "Importer une image" }}
        </span>
      </label>
    </image-uploader>
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Uploader",
  data: () => ({
    model: null,
    image: null,
    reset: false,
    hasImage: false,
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
    },
    setImage(file) {
      this.hasImage = true;
      this.image = file;
      this.$emit("model", file);
      console.log("Img: ", this.image);
    },
    deleteImage() {
      console.log("Reset");
      this.hasImage = false;
      this.image = null;
      this.$emit("model", null);
      this.reset = true;
      let self = this;
      setTimeout(function() {
        self.reset = false;
        console.log("SetTimeout");
      }, 1);
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
    ...mapState("app", ["background", "color"])
  }
};
</script>

<style lang="scss">
.img-preview {
  border: 12px solid #424242 !important;
  margin: 4px;
  width: auto;
}

.hover {
  cursor: pointer;
}
</style>
