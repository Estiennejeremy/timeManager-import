<!--
  TODO:
    - Handle gradient for old browsers
 -->

<template>
  <v-main>
    <div id="core-view" :style="'background: ' + gradient">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CoreView",

  data: () => ({
    //
  }),

  computed: {
    ...mapState("app", ["gradient"])
  }
};
</script>

<style scoped>
html {
  background-color: #424242;
}
#core-view {
  height: 100%;
  background: #424242; /* fallback */
  background-size: 800% 800% !important;
  /* background: -webkit-linear-gradient(to top, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
  /* background: linear-gradient(to top, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-animation: gradient 30s ease-in infinite !important;
  -moz-animation: gradient 30s ease-in infinite !important;
  animation: gradient 30s ease-in infinite !important;
}
@-webkit-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
