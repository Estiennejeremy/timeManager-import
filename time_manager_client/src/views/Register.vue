<template>
  <div class="register">
    <material-form
      :config="config"
      :class="responsive ? '' : 'vertical-center'"
      @update:config="config = $event"
      @validate="register()"
    />
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "Register",

  components: {
    MaterialForm
  },

  data: () => ({
    responsive: false,
    config: {
      title: "Register your account",
      validate: "Register",
      message: {
        type: null,
        text: null,
        duration: 5000
      },
      image: "https://img.icons8.com/plasticine/2x/telegram-app.png",
      icon: "mdi-account-circle",
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
              v => !!v || "Email required",
              v =>
                (v && v.length > 4) ||
                "Email must be superior than 4 characters"
            ]
          }
        },
        {
          id: 1,
          model: null,
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
            type: "password",
            label: "Password",
            counter: 0,
            rules: [
              v => !!v || "Password required",
              v =>
                (v && v.length > 4) ||
                "Password must be superior than 4 characters"
            ]
          }
        }
      ]
    }
  }),

  methods: {
    async register() {
      try {
        await AuthenticationService.register({
          email: this.getModel("email"),
          password: this.getModel("password")
        });
        this.config.message.type = "success";
        this.config.message.text =
          "Welcome " + this.getModel("email") + " You can now connect";
        console.log(
          "Welcome " + this.getModel("email") + " You can now connect"
        );
        setTimeout(() => {
          this.$router.push({
            path: "/login"
          });
        }, 5000);
      } catch (err) {
        this.config.message.type = "error";
        this.config.message.text =
          typeof err.response !== "undefined" ? err.response.data.message : err;
        console.log(
          typeof err.response !== "undefined" ? err.response.data.message : err
        );
      }
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        item => item.modelName === name
      );
      return this.config.components[id].model;
    },

    onResponsiveInverted() {
      if (window.innerWidth < 1450) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },

  watch: {
    "config.message.text": function(after) {
      if (after !== null) {
        setTimeout(() => {
          this.config.message.text = null;
        }, 5000);
      }
    }
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
};
</script>

<style scoped>
.register {
  height: 100%;
  position: relative;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 40%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
