<template>
  <div class="about">
    <div v-for="(item, index) in items" :key="index">
      <material-card-link
        :title="item.name"
        :icon="item.icon"
        :round="item.round"
        :link="item.link"
        :position="item.position"
      />
      <v-divider class="mt-4 mb-4" style="visibility: hidden;" />
    </div>
  </div>
</template>

<script>
import MaterialCardLink from "@/components/material/CardLink.vue";
export default {
  name: "About",

  data: () => ({
    items: [
      {
        name: "To Github",
        icon: "mdi-github-circle",
        round: "top",
        link: "http://github.com",
        position: "left"
      },
      {
        name: "To Google",
        icon: "mdi-google",
        round: "middle",
        link: "http://google.fr",
        position: "right"
      },
      {
        name: "Go Home",
        icon: "mdi-home",
        round: "bot",
        link: "/",
        position: "left"
      }
    ]
  }),

  components: {
    MaterialCardLink
  }
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 100%;
  padding-top: 2%;
}
</style>
