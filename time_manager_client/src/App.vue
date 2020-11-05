<template>
  <v-app>
    <core-toolbar />

    <core-drawer />

    <core-view />
  </v-app>
</template>

<script>
import CoreToolbar from "./components/core/Toolbar.vue";
import CoreDrawer from "./components/core/Drawer.vue";
import CoreView from "./components/core/View.vue";

export default {
  name: "App",

  components: {
    CoreToolbar,
    CoreDrawer,
    CoreView
  },

  data: () => ({})
};
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: grey;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: white;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: lightgrey;
}

.v-dialog {
  box-shadow: unset !important;
}
</style>
