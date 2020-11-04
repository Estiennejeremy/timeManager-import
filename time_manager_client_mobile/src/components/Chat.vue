<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          bottom
          color="green accent-4"
          offset-x="10"
          offset-y="20"
          :value="unseen !== 0"
          :content="unseen"
        >
          <v-btn fab color="indigo" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-forum</v-icon>
          </v-btn>
        </v-badge>
      </template>

      <v-card width="500">
        <v-list v-if="available">
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU"
                alt="John"
              />
            </v-list-item-avatar>

            <v-list-item-content v-if="isUserLoggedIn || username">
              <v-list-item-title>{{ username }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
              <v-list-item-subtitle
                >{{ connections }}
                {{ connections === 1 ? "user" : "users" }}
                connected</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-content v-else>
              <v-text-field
                filled
                v-model="guest"
                label="Choose a guest username"
                required
                @keyup.enter="setUsername(guest)"
                :rules="[
                  v => !!v || 'Username required',
                  v =>
                    (v && v.length > 1) ||
                    'Username must be superior than 1 characters'
                ]"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-select
          v-if="available && (isUserLoggedIn || username)"
          hide-details
          filled
          no-data-text="No others chat rooms"
          label="General chat"
          :menu-props="{ offsetY: true }"
        />

        <v-divider></v-divider>

        <v-container
          v-if="available && (isUserLoggedIn || username)"
          fluid
          style="height: 400px;overflow: auto;"
        >
          <v-row
            v-for="(item, index) in messages"
            :key="index"
            :style="
              index % 2 === 0
                ? 'justify-content: flex-end;'
                : 'justify-content: flex-start;'
            "
          >
            <v-col cols="10">
              <v-row
                v-if="
                  index === 0 ||
                    (index > 0 && messages[index - 1].user !== username)
                "
                align="center"
              >
                <v-avatar><v-icon>mdi-account-circle</v-icon></v-avatar>
                <span>{{ username }}</span>
              </v-row>
              <v-card rounded color="#424242" class="pa-4">
                <span class="px-4 white--text">{{ item.message }}</span>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else fill-height fluid>
          <v-row justify="center" align="center">
            <v-avatar size="128">
              <v-img
                :src="
                  available
                    ? 'https://image.flaticon.com/icons/png/512/2115/2115958.png'
                    : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f3ebcf88-7437-4c07-ac43-e6f2b50fb766/dbchihl-d82fbe86-c8a6-4ca9-a719-7eddd7583d11.png/v1/fill/w_319,h_351,strp/dinosaurio_de_google_chrome_en_png_by_kevin_millan_by_imagenes_en_png_dbchihl-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0zNTEiLCJwYXRoIjoiXC9mXC9mM2ViY2Y4OC03NDM3LTRjMDctYWM0My1lNmYyYjUwZmI3NjZcL2RiY2hpaGwtZDgyZmJlODYtYzhhNi00Y2E5LWE3MTktN2VkZGQ3NTgzZDExLnBuZyIsIndpZHRoIjoiPD0zMTkifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ymHhmQoCJYDS48FS03B6gLISbafdhOHWqwwT0WYFqDg'
                "
              />
            </v-avatar>
          </v-row>
          <v-row justify="center" align="center">
            <span class="display-2 font-weight-light">{{
              available ? "Who are you ?" : "Server unavailable"
            }}</span>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card
          tile
          style="width: 100%;"
          class="justify-center"
          v-for="(item, index) in info"
          :key="index"
          :color="item.type === 'joined' ? 'green' : 'red'"
        >
          <v-card-title
            class="pa-4 headline white--text font-weight-light justify-center"
            style=""
          >
            {{ item.username }} {{ item.type }}
          </v-card-title>
        </v-card>

        <v-text-field
          v-if="available && (isUserLoggedIn || username)"
          v-model="message"
          append-icon="mdi-send"
          required
          hide-details
          @keyup.enter="sendMessage()"
          filled
          tile
          label="Enter message..."
        />

        <v-row justify="center" v-if="!available || isUserLoggedIn || username">
          <v-col v-if="available" cols="6" class="text-center">
            <v-btn block text @click="sendMessage">
              Send
            </v-btn>
          </v-col>

          <v-col cols="6" class="text-center">
            <v-btn text @click="menu = false">
              Close
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import io from "socket.io-client";
export default {
  name: "Chat",

  data: () => ({
    menu: false,
    guest: null,
    unseen: 0,
    message: null,
    messages: [],
    typing: false,
    available: false,
    ready: false,
    info: [],
    connections: 0,

    socket: {}
  }),

  mounted() {
    this.socket = io("http://localhost:8082");

    this.socket.on("available", data => {
      this.available = data;
    });

    window.onbeforeunload = () => {
      this.socket.emit("leave", this.username);
    };

    this.joinChat();

    this.socket.on("connections", data => {
      this.connections = data;
    });

    this.socket.on("chat-message", data => {
      this.messages.push({
        message: data.message,
        type: 1,
        user: data.user
      });
      if (!this.menu) {
        this.unseen++;
      }
    });

    this.socket.on("joined", data => {
      this.info.push({
        username: data,
        type: "joined"
      });
      this.connections++;
      setTimeout(() => {
        this.info = [];
      }, 5000);
    });

    this.socket.on("leave", data => {
      this.info.push({
        username: data,
        type: "left"
      });
      this.connections--;
      setTimeout(() => {
        this.info = [];
      }, 5000);
    });
  },

  methods: {
    ...mapMutations("user", ["setUsername"]),

    sendMessage() {
      this.messages.push({
        message: this.message,
        type: 0,
        user: this.username
      });

      this.socket.emit("chat-message", {
        message: this.message,
        user: this.username
      });
      this.message = null;
    },

    joinChat() {
      this.ready = true;
      this.socket.emit("joined", this.username);
    }
  },

  computed: {
    ...mapState("user", ["id", "email", "username", "isUserLoggedIn"])
  },

  watch: {
    menu: function(state) {
      if (state) {
        this.unseen = 0;
      }
    }
  }
};
</script>

<style scoped>
.v-dialog {
  box-shadow: none !important;
}
.ontop {
  z-index: 20;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: grey;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #424242;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: lightgrey;
}
</style>
