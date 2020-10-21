<template>
  <v-container id="user"> </v-container>
</template>

<script>
import AccountService from "@/services/AccountService";
export default {
  name: "User",

  data: () => ({}),

  methods: {
    async createUser() {
      try {
        const res = await AccountService.createUser();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async updateUser() {
      try {
        const res = await AccountService.updateUser();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async getUser() {
      try {
        const res = await AccountService.getUser();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser() {
      try {
        const res = await AccountService.deleteUser();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
