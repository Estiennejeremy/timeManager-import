<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" id="form">
      <material-form
        :config="config"
        @update:config="config = $event"
        @validate="updateEmployee(getEmployeeFromForm())"
      />
    </v-dialog>
    <v-btn icon @click="dialog = true">
      <v-icon>mdi-update</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import AccountService from "@/services/AccountService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "EmployeeUpdate",
  props: ["employee"],
  data: () => ({
    dialog: false,
    config: {
      title: "Update employee information",
      validate: "Update",
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      image: "",
      components: [
        {
          id: 0,
          model: "",
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
            rules: [(v) => !!v || "Usernme is required"],
          },
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
            rules: [(v) => !!v || "Email is required"],
          },
        },
        {
          id: 2,
          model: null,
          modelName: "role",
          name: "inputs-select",
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
            label: "Role",
            items: ["employee", "manager", "generalManager"],
            counter: 0,
            rules: [(v) => !!v || "Role is required"],
          },
        },
      ],
    },
  }),

  methods: {
    updateEmployee(employee) {
      AccountService.updateUser(employee, this.employee.id).then(() => {
        this.dialog = false;
        this.$emit("updated");
      });
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      return this.config.components[id].model;
    },

    setModel(name, value) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      this.config.components[id].model = value;
    },

    getEmployeeFromForm() {
      return {
        username: this.getModel("username"),
        email: this.getModel("email"),
        role: this.getModel("role"),
      };
    },
    init() {
      this.setModel("username", this.employee.username);
      this.setModel("email", this.employee.email);
      this.setModel("role", this.employee.role);
    },
  },
  components: {
    MaterialForm,
  },
  mounted() {
    this.init();
  },

  watch: {
    emmployee: function(newVal) {
      this.employee = newVal;
      this.init();
    },
  },
};
</script>

<style nested>
.btn {
  margin-top: -13px;
}
</style>
