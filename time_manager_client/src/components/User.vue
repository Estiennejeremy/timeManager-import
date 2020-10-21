<template>
  <v-container id="user"> </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AccountService from "@/services/AccountService";
export default {
  name: "User",

  data: () => ({
    title: null
  }),

  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),

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
  },

  computed: {
    ...mapState("user", ["id", "email", "username"])
  }
};
</script>
