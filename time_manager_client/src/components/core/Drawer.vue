<template>
  <v-navigation-drawer
    v-model="drawerStatus"
    mobile-breakpoint="991"
    width="260"
    persistent
    floating
    dark
    app
    :style="
      responsive
        ? 'z-index: 300;'
        : 'box-shadow: 0px 0px 10px 1px #121212 !important;z-index: 300;'
    "
    :src="image"
  >
    <v-container fluid>
      <v-row justify="start">
        <v-col cols="4">
          <v-avatar size="100">
            <v-img
              contain
              src="https://cdn1.iconfinder.com/data/icons/flat-mobile-app-icons/128/Clock-512.png"
            />
          </v-avatar>
        </v-col>

        <v-col cols="8" style="transform: rotate(33deg);">
          <span class="avatar-text headline font-weight-thin pt-2">
            TimeManager
          </span>
        </v-col>
      </v-row>
    </v-container>

    <v-divider
      style="margin-top: 30px;width: 70%;margin-left: auto;margin-right: auto;"
    />

    <v-list shaped>
      <v-list-item-group active-class="border" color="cyan">
        <v-list-item
          v-for="(item, i) in topPaths"
          active-class="border"
          :to="handleUrlParams(item)"
          class="my-4"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-list shaped style="bottom: 0;position: absolute;width: 100%;">
      <v-list-item-group
        v-if="!isUserLoggedIn"
        active-class="border"
        color="cyan"
      >
        <v-list-item
          v-for="(item, i) in botPaths"
          active-class="border"
          class="my-4"
          :to="item.path"
          :key="i"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group v-else active-class="border" color="green">
        <v-list-item
          v-if="isUserLoggedIn"
          class="mt-4 border"
          active-class="border"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click.stop="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService"
import { mapMutations, mapState } from "vuex";
import Paths from "@/router/paths.js";
export default {
  name: "CoreDrawer",

  data: () => ({
    responsive: false,
    items: [
      ["mdi-email", "Inbox"],
      ["mdi-account-supervisor-circle", "Supervisors"],
      ["mdi-clock-start", "Clock-in"]
    ]
  }),

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    ...mapMutations("user", ["setUsername", "setEmail", "setToken", "setRefreshToken"]),

    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },

    handleUrlParams(item) {
      let url = "";
      switch (item.parameters.length) {
        case 1:
          url = item.url + this.id;
          break;
        default:
          url = item.path;
          break;
      }
      return url;
    },

    async logout() {
      try {
        await AuthenticationService.logout(this.token)
        if (this.isUserLoggedIn) {
          this.setToken(null);
          this.setRefreshToken(null);
          this.setEmail(null);
          this.setUsername(null);
          this.$router.push({ name: "Home" });
        }
      } catch (err) {
        console.log(err)
      }
    }
  },

  computed: {
    ...mapState("app", ["image", "color"]),
    ...mapState("user", ["id", "isUserLoggedIn", "token", "role"]),

    topPaths() {
      return Paths.filter(path =>
        this.isUserLoggedIn
          ? path.group === "top" && path.show === true && (path.role.includes("default") || path.role.includes(this.role))
          : path.public === true &&
            path.group === "top" &&
            path.show === true &&
            (path.parameters.length === 0 ||
              (path.parameters.length > 0 && this.id !== null)) &&
            (path.role.includes("default") || path.role.includes(this.role))
      );
    },

    botPaths() {
      return Paths.filter(path => path.group === "bottom");
    },

    drawerStatus: {
      get() {
        return this.$store.state.app.drawer;
      },
      set(val) {
        this.setDrawer(val);
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
.avatar-text {
  font-size: 22px;
  color: white;
  text-shadow: 1px 1px 0 #7a7a7a;
  box-shadow: 0px 0px 10px 1px #121212 !important;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
}

.avatar-drawer {
  position: relative;
  text-align: center;
  left: 20%;
  color: white;
}

.border:hover {
  border: 2px solid cyan;
}

.v-list-item__title {
  font-size: 1.3em;
  font-weight: 300;
}

.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.centered-bottom {
  position: absolute;
  left: 50%;
  top: 85%;
  transform: translate(-50%, -50%);
}
</style>
