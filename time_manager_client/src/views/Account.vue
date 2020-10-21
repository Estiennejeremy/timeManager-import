<template>
  <div class="account">
    <material-title
      title="This is an account page"
      :cols="responsive ? 12 : 4"
      justify="start"
    />
  </div>
</template>

<script>
import MaterialTitle from "@/components/material/Title.vue";
export default {
  name: "Account",

  components: {
    MaterialTitle
  }
};
</script>
