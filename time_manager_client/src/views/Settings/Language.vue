<!--
  TODO:
    - Add internationalization package (i18n ?)
    - Add selection of language
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
            <v-col
              v-for="(item, id) in flags"
              :key="id"
              :cols="responsive ? 6 : 3"
            >
              <v-tooltip bottom color="#424242">
                <template v-slot:activator="{ on }">
                  <v-card
                    v-on="on"
                    elevation="24"
                    :class="
                      id === selected ? 'flags-card-active' : 'flags-card'
                    "
                    :color="color"
                  >
                    <v-img
                      v-ripple
                      :src="item.url"
                      v-on="on"
                      elevation="24"
                      :class="
                        id === selected ? 'flags-card-active' : 'flags-card'
                      "
                    />
                  </v-card>
                </template>
                <span>{{ item.name + (id === selected ? " ✓" : "") }}</span>
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
  name: "LanguageSettings",

  data: () => ({
    responsive: false,
    selected: 0,
    flags: [
      {
        name: "English",
        url: "https://image.flaticon.com/icons/svg/555/555417.svg"
      }
    ]
  }),

  methods: {
    ...mapMutations("app", ["setDark", "toggleDark", "setColor"]),

    titleColor() {
      return "background-color: " + this.color + ";color:white;";
    },

    changeLocale(item) {
      this.flag = item.gradient;
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

    flag: {
      get() {
        return this.$store.state.app.locale;
      },
      set(val) {
        this.selected = this.flags.findIndex(item => item.url === val);
        this.$store.state.app.locale = val;
      }
    }
  },

  mounted() {
    this.selected = this.flags.findIndex(item => item.url === this.url);
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
.flags-card {
  border-radius: 60px;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}
.flags-card:hover {
  border-radius: 50px;
  cursor: pointer;
  filter: contrast(1.1);
}
.flags-card-active {
  border-radius: 28px;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}
.v-card--link:before {
  display: none !important;
}
</style>
