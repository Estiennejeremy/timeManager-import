<template>
  <div class="login">
    <material-form
      :config="config"
      :class="responsive ? '' : 'vertical-center'"
      @update:config="config = $event"
      @validate="login()"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import InfosService from "@/services/InfosService";
import AuthenticationService from "@/services/AuthenticationService";
import AccountService from "@/services/AccountService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "Login",

  components: {
    MaterialForm
  },

  data: () => ({
    responsive: false,
    config: {
      title: "Login to your account",
      validate: "Login",
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
        },
        {
          id: 2,
          model: false,
          modelName: "google-login",
          name: "actions-button",
          directive: "config",
          options: {
            block: true,
            xlarge: true,
            dark: true,
            light: false,
            dense: false,
            shaped: false,
            label: "Google login"
          }
        }
      ]
    }
  }),

  methods: {
    ...mapMutations("user", ["setToken", "setUser"]),

    async login() {
      try {
        await InfosService.status();
        const res = await AuthenticationService.login({
          email: this.getModel("email"),
          password: this.getModel("password")
        });

        this.setToken(res.data.token);
        this.setUser(this.email);

        this.$router.push({
          path: "/"
        });
      } catch (err) {
        this.config.message.type = "error";
        this.config.message.text =
          typeof err.response !== "undefined" ? err.response.data.message : err;
        console.log(
          typeof err.response === "undefined" ? err : err.response.data.message
        );
      }
    },

    async loginService() {
      try {
        await InfosService.status();

        const production = false;
        location.replace(
          production ? "" : "http://localhost:8081/api/auth/google"
        );
      } catch (err) {
        this.config.message.type = "error";
        this.config.message.text = "Sign in with Google failed: " + err;
        console.log("Sign in with Google failed: ", err);
      }
    },

    getSignIn() {
      this.setToken(this.$route.query.token);
      this.getGoogleEmail().then(result => {
        this.setUser(result);
      });
      this.$router.push({
        path: "/"
      });
      console.log("You are now connected");
    },

    async getGoogleEmail() {
      try {
        await InfosService.status();
        const res = await AccountService.email(this.token);
        return res.data.google_email || "Unknown email";
      } catch (err) {
        this.config.message.type = "error";
        this.config.message.text =
          typeof err.response !== "undefined" ? err.response.data.message : err;
        console.log(
          typeof err.response === "undefined" ? err : err.response.data.message
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

  computed: {
    ...mapState("user", ["user", "isUserLoggedIn", "token"]),

    getButtonStateGoogle() {
      return this.config.components[2].model;
    }
  },

  watch: {
    getButtonStateGoogle: {
      handler: function(after, before) {
        if (after) {
          this.loginService();
          this.config.components[2].model = before;
        }
      },
      deep: true
    },
    "config.message.text": function(after) {
      if (after !== null) {
        setTimeout(() => {
          this.config.message.text = null;
        }, 5000);
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name === "Login" && typeof to.query.token != "undefined") {
        console.log("%c (...___=== SUCCESS ===___...)", "color: green;");
        vm.getSignIn();
      } else if (
        to.name === "Login" &&
        typeof to.query.service != "undefined" &&
        typeof to.query.success != undefined
      ) {
        if (to.query.success === "true") {
          console.log(
            "%c (...___=== SUCCESS CHECK ===___...)",
            "color: green;"
          );
        } else {
          console.log("%c (...___=== ERROR CHECK ===___...)", "color: red;");
        }
      }
    });
  },

  created() {
    if (this.isUserLoggedIn) {
      this.$router.push({ path: "/" });
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
.login {
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
