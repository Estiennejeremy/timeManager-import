<template>
  <span id="aboutcard">
    <v-avatar :tile="tile" size="128">
      <v-img :src="image" />
    </v-avatar>
    <h1 class="display-1 font-weight-thin mb-4">
      {{ title }}
    </h1>
    <h4 class="subheading">
      {{ subtitle }}
    </h4>
    <v-btn v-if="button" fab class="mt-4" large @click="$emit('button')">
      <v-icon>mdi-arrow-down</v-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  name: "AboutCard",

  data: () => ({
  }),

  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    tile: {
      type: Boolean,
      default: false
    },
    button: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>
