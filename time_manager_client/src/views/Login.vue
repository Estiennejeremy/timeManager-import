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
              v => /.+@.+\.+./.test(v) || 'Invalid Email address',
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
                (v && v.length > 7) ||
                "Password must be superior than 7 characters"
            ]
          }
        }
      ]
    }
  }),

  methods: {
    ...mapMutations("user", ["setToken", "setRefreshToken", "setEmail", "setUsername", "setId", "setRole"]),

    async login() {
      try {
        const res = await AuthenticationService.login({
          email: this.getModel("email"),
          password: this.getModel("password")
        });
        this.setToken(res.data.data.token);
        this.setRefreshToken(res.data.data.renew_token);
        this.setEmail(this.getModel("email"));
        this.setUsername("Trump")
        this.setId(0)
        this.setRole("employee")
        this.$router.push({
          name: "Home"
        });
        this.getUsers()
      } catch (err) {
        this.config.message.type = "error";
        this.config.message.text =
          typeof err.response !== "undefined" ? err.response.data.error.message : err;
        console.log(
          typeof err.response === "undefined" ? err : err.response.data.error.message
        );
      }
    },

    async getUsers() {
      try {
        const res = await AccountService.getUsers()
        console.log(res)
      } catch (err) {
        console.log(err)
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
    ...mapState("user", ["user", "isUserLoggedIn", "token"])
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
