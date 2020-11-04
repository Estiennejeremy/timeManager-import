<template>
  <v-app-bar
    app
    color="primary"
    dark
    style="box-shadow: 0px 0px 35px 6px #121212;"
  >
    <v-app-bar-nav-icon dark @click.stop="onClickBtn()" />

    <div class="d-flex align-center">
      <span class="mx-4 headline white--text font-weight-light">{{
        title
      }}</span>
    </div>

    <v-spacer></v-spacer>

    <v-btn fab text to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <chat />

    <v-btn href="https://github.com/" target="_blank" :fab="responsive" text>
      <span v-show="!responsive" class="mr-2">To Github</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Chat from "@/components/Chat.vue";
export default {
  name: "CoreToolbar",

  data: () => ({
    responsive: false,
    title: ""
  }),

  methods: {
    ...mapMutations("app", ["setDrawer"]),

    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },

    onClickBtn() {
      console.log("SetDrawer: ", !this.$store.state.app.drawer);
      this.setDrawer(!this.$store.state.app.drawer);
    }
  },

  computed: {
    ...mapState("app", ["color"])
  },

  watch: {
    $route(val) {
      this.title = val.name;
    }
  },

  components: {
    Chat
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
