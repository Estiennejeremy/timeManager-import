<template>
  <v-container id="home" :fill-height="!users.length">
    <span v-if="users.length">
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
    </span>

    <v-row v-else justify="center">
      <v-col cols="12">
        <v-row justify="center" align="center" class="mt-4">
          <v-avatar tile size="128">
            <v-img
              src="https://image.flaticon.com/icons/svg/1548/1548784.svg"
            />
          </v-avatar>
        </v-row>

        <v-row justify="center">
          <span class="text-center display-3">
            No users.
          </span>
        </v-row>

        <v-row justify="center">
          <span class="text-center display-1">
            Create one by clicking the user icon in the toolbar
          </span>
        </v-row>

        <v-row justify="center" class="mt-4">
          <v-btn dark fab color="#424242" @click="getUsers()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MaterialTitle from "@/components/material/Title.vue";
import AccountService from "@/services/AccountService";
export default {
  name: "Home",

  data: () => ({
    users: [
      {
        id: 0,
        username: "Oui",
        email: "oui@oui.fr"
      }
    ]
  }),

  mounted() {
    AccountService.getUsers()
      .then(res => {
        this.users = res.data.data;
      })
      .catch(err => console.log(err));
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
        const res = await AccountService.getUsers();
        this.users = res.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  },

  computed: {
    ...mapState("app", ["color"]),
    ...mapState("user", ["id", "username", "email"])
  },

  components: {
    MaterialTitle
  }
};
</script>
