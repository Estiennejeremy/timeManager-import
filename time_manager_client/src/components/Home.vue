<template>
  <v-container id="home">
    <material-title title="1. Sélectionner un utilisateur" :cols="6" />

    <v-row>
      <v-col cols="12" v-for="(user, index) in users" :key="index">
        <material-title
          :cols="4"
          :title="user.id + ' | ' + user.username + ' | ' + user.email"
          :button="true"
          :selected="isSelected(user)"
          @button-center="storeUser(user)"
        />
      </v-col>
    </v-row>

    <!-- <v-btn rounded block large dark :color="color" :to="`workingTimes/${id}`">
      WorkingTimes + id
    </v-btn> -->
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MaterialTitle from "@/components/material/Title.vue";
import AccountService from "@/services/AccountService"
export default {
  name: "Home",

  data: () => ({
    users: [
      {
        id: 0,
        email: "oui@oui.fr",
        username: "oui",
      },
      {
        id: 1,
        email: "non@non.fr",
        username: "non",
      },
    ]
  }),

  mounted() {
    AccountService.getUsers()
      .then((res) => {
        this.users = res.data.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),

    storeUser(user) {
      if (user) {
        console.log("== User stored ==");
        this.setId(user.id);
        this.setEmail(user.email);
        this.setUsername(user.username);
      } else {
        console.log("== User not stored ==");
      }
    },

    isSelected(user) {
      return this.id === user.id &&
        this.username === user.username &&
        this.email === user.email
        ? true
        : false;
    },

    async getUsers() {
      try {
        // const res = await AccountService.getUsers()
      } catch (err) {
        console.log(err);
      }
    },
  },

  computed: {
    ...mapState("app", ["color"]),
    ...mapState("user", ["id", "username", "email"]),
  },

  components: {
    MaterialTitle,
  },
};
</script>
