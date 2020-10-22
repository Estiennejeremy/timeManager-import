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

    <material-form
      :config="config"
      @update:config="config = $event"
      @validate="storeUser(getUserFromForm())"
    />

    <v-btn rounded block large dark :color="color" :to="`workingTimes/${id}`">
      WorkingTimes + id
    </v-btn>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import MaterialTitle from "@/components/material/Title.vue";
import MaterialForm from "@/components/forms/Form.vue";
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
    ],
    config: {
      title: "Enter UserID",
      validate: "Store user",
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      image: "",
      components: [
        {
          id: 0,
          model: null,
          modelName: "email",
          name: "inputs-text-field",
          directive: "config",
          options: {
            dark: false,
            light: true,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: true,
            label: "Email",
            counter: 0,
            rules: [
              (v) => !!v || "Email required",
              (v) =>
                (v && v.length > 4) ||
                "Email must be superior than 4 characters",
            ],
          },
        },
        {
          id: 1,
          model: null,
          modelName: "username",
          name: "inputs-text-field",
          directive: "config",
          options: {
            dark: false,
            light: true,
            filled: true,
            dense: false,
            shaped: true,
            outlined: true,
            clearable: true,
            autocomplete: false,
            required: true,
            label: "Username",
            counter: 0,
            rules: [(v) => !!v || "Username required"],
          },
        },
        {
          id: 2,
          model: null,
          modelName: "id",
          name: "inputs-text-field",
          directive: "config",
          options: {
            dark: false,
            filled: true,
            shaped: true,
            autocomplete: false,
            required: true,
            label: "UserID",
            type: "number",
            counter: 0,
            rules: [(v) => !!v || "UserID requis"],
          },
        },
      ],
    },
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

    getModel(name) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      return this.config.components[id].model;
    },

    getUserFromForm() {
      return {
        username: this.getModel("username"),
        email: this.getModel("email"),
        id: this.getModel("id"),
      };
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
    MaterialForm,
  },
};
</script>
