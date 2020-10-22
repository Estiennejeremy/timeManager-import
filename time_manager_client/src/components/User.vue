<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab color="indigo" dark v-bind="attrs" v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU"
                alt="John"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                username || "Username"
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                email || "Email"
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>ID: {{ id }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-btn fab color="green" @click="createDialog = true">
                <v-icon></v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-title>Create User</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-btn fab color="purple" @click="editDialog = true">
                <v-icon></v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-title>Update User</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-btn fab color="red" @click="deleteDialog = true">
                <v-icon></v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-title>Delete User</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    <!-- Create Dialog -->

    <v-dialog v-model="createDialog" max-width="1000" class="ontop">
      <v-card color="grey" rounded="pill">
        <material-form
          :config="configCreate"
          @update:config="config = $event"
          @validate="createUser(), (createDialog = false)"
        />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="createDialog = false">
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Dialog -->

    <v-dialog v-model="editDialog" max-width="1000" class="ontop">
      <v-card color="grey" rounded="pill">
        <material-form
          :config="configEdit"
          @update:config="config = $event"
          @validate="updateUser(), (editDialog = false)"
        />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="editDialog = false">
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->

    <v-dialog v-model="deleteDialog" max-width="1000" class="ontop">
      <v-card color="grey" rounded="pill">
        <material-form
          :config="configDelete"
          @update:config="config = $event"
          @validate="deleteUser(), (deleteDialog = false)"
        />

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AccountService from "@/services/AccountService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "User",

  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,

    createDialog: false,
    editDialog: false,
    deleteDialog: false,

    configCreate: {
      title: "Créer un utilisateur",
      validate: "Confimer la création",
      message: {
        type: null,
        text: null,
        duration: 5000
      },
      image: "https://img.icons8.com/plasticine/2x/telegram-app.png",
      icon: "mdi-google-fit",
      components: [
        {
          id: 0,
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
            rules: [
              v => !!v || "username required",
              v =>
                (v && v.length > 2) ||
                "username must be superior than 2 characters"
            ]
          }
        },
        {
          id: 1,
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
              v => !!v || "email required",
              v =>
                (v && v.length > 1) ||
                "Email must be superior than 2 characters"
            ]
          }
        }
      ]
    },

    configEdit: {
      title: "Modifier vos informations",
      validate: "Valider les modifications",
      message: {
        type: null,
        text: null,
        duration: 5000
      },
      image: "https://img.icons8.com/plasticine/2x/telegram-app.png",
      icon: "mdi-google-fit",
      components: [
        {
          id: 0,
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
            rules: [
              v => !!v || "username required",
              v =>
                (v && v.length > 2) ||
                "username must be superior than 2 characters"
            ]
          }
        },
        {
          id: 1,
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
              v => !!v || "email required",
              v =>
                (v && v.length > 1) ||
                "Email must be superior than 2 characters"
            ]
          }
        }
      ]
    },

    configDelete: {
      title: "Supprimer votre compte",
      validate: "Confirmer la suppression",
      message: {
        type: null,
        text: null,
        duration: 5000
      },
      image: "https://img.icons8.com/plasticine/2x/telegram-app.png",
      icon: "mdi-google-fit",
      components: []
    }
  }),

  components: {
    MaterialForm
  },

  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),

    async createUser() {
      try {
        const res = await AccountService.createUser(
          {
            email: this.getModel("configCreate", "email"),
            username: this.getModel("configCreate", "username")
          },
          this.id
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async updateUser() {
      try {
        const res = await AccountService.updateUser(
          {
            email: this.getModel("configEdit", "email"),
            username: this.getModel("configEdit", "username")
          },
          this.id
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async getUser() {
      try {
        const res = await AccountService.getUser(this.id);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    async deleteUser() {
      try {
        const res = await AccountService.deleteUser(this.id);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    getModel(configname, name) {
      let id = this[configname].components.findIndex(
        item => item.modelName === name
      );
      return this[configname].components[id].model;
    }
  },

  computed: {
    ...mapState("user", ["id", "email", "username"])
  }
};
</script>

<style>
.v-dialog {
  box-shadow: none !important;
}
.ontop {
  z-index: 20;
}
</style>
