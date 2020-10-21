<template>
  <span class="home">
    <material-spa
      titlePrimary="Welcome"
      titleSecond="to a Vue Template"
      subtitle=" Go to about page"
      style="max-height: 93vh;"
      arrow="right"
      action="to"
      to="/about"
    />
  </span>
</template>

<script>
import MaterialSpa from "@/components/material/Spa.vue";
export default {
  name: "Home",
  components: {
    MaterialSpa
  }
};
</script>
