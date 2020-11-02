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
// import AccountService from "@/services/AccountService";
import AuthenticationService from "@/services/AuthenticationService";
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
      width: 4,
      image:
        "https://cdn1.iconfinder.com/data/icons/flat-mobile-app-icons/128/Clock-512.png",
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
          modelName: "github-login",
          name: "actions-button",
          directive: "config",
          options: {
            block: true,
            xlarge: true,
            dark: true,
            light: false,
            dense: false,
            shaped: false,
            label: "Login with Github"
          }
        }
      ]
    }
  }),

  methods: {
    ...mapMutations("user", ["setToken", "setUser"]),

    async login() {
      try {
        const res = await AuthenticationService.login({
          email: this.getModel("email"),
          password: this.getModel("password")
        });

        this.setToken(res.data.token);
        this.setUser(this.getModel("email"));

        this.$router.push({
          name: "Profile"
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
        const production = false;
        location.replace(
          production
            ? "http://51.75.122.116:8081/api/auth/github"
            : "http://localhost:8081/api/auth/github"
        );
      } catch (err) {
        this.config.message.type = "error";
        this.config.message.text = "Login with Github failed";
        console.log("Login with Github failed: ", err);
      }
    },

    getSignIn() {
      this.setToken(this.$route.query.token);
      this.$router.push({
        name: "Profile"
      });
      console.log("Your now connected with your github account");
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

    getButtonStateGithub() {
      return this.config.components[2].model;
    }
  },

  watch: {
    getButtonStateGithub: {
      handler: function(after, before) {
        if (after) {
          this.loginService();
          this.config.components[3].model = before;
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
      console.log("beforeRouteEnter: ", from);
      if (to.path === "/login" && typeof to.query.token != "undefined") {
        console.log("%c (...___=== SUCCESS ===___...)", "color: green;");
        vm.getSignIn();
      } else if (
        to.path === "/login" &&
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
      this.$router.push({ path: "/profile" });
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
