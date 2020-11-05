<template>
  <v-row justify="center">
    <v-dialog v-model="dialog"         class="form">
      <material-form
        :config="config"
        @update:config="config = $event"
        @validate="createEmployee(getEmployeeFromForm())"
      />
    </v-dialog>
    <v-col class="d-flex btn" cols="12">
      <v-btn block height="48" @click="dialog = true">
        New Employee
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import AccountService from "@/services/AccountService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "EmployeeCreate",
  data: () => ({
    dialog: false,
    config: {
      title: "Create employee",
      validate: "Create",
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      image: "",
      components: [
        {
          id: 0,
          model: "username",
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
            label: "Fisrtname and lastname",
            counter: 0,
            rules: [(v) => !!v || "This field is required"],
          },
        },
        {
          id: 1,
          model: "email",
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
            rules: [(v) => !!v || "Email is required"],
          },
        },
        {
          id: 2,
          model: "password",
          modelName: "password",
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
            label: "Password",
            counter: 0,
            rules: [(v) => !!v || "Password is required"],
          },
        },
        {
          id: 3,
          model: "confirm_password",
          modelName: "confirm_password",
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
            label: "Confirm password",
            counter: 0,
            rules: [(v) => !!v || "Confirmation of password is required"],
          },
        },
      ],
    },
  }),

  methods: {
    createEmployee(Employee) {
      AccountService.createUser(Employee).then(() => {
        this.dialog = false;
        this.$emit("created");
      });
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      return this.config.components[id].model;
    },

    getEmployeeFromForm() {
      return {
        username: this.getModel("username"),
        email: this.getModel("email"),
        password: this.getModel("password"),
        confirm_password: this.getModel("confirm_password"),
      };
    },
  },
  components: {
    MaterialForm,
  },
};
</script>

<style scoped>
.form {
  width: 100% !important;
}
.btn {
  margin-top: -13px
}
</style>
