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
          <v-icon>mdi-chat</v-icon>
        </v-btn>
      </template>

      <v-card width="500">
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
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-container fluid style="height: 500px;overflow: auto;">
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
              <v-card rounded color="#424242" class="pa-4">
                <span class="px-4 white--text">{{ item.text }}</span>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-text-field
          v-model="message"
          append-icon="mdi-send"
          required
          hide-details
          @keyup.enter="sendMessage(), (message = '')"
          filled
          tile
          label="Enter message..."
        />

        <v-row justify="center">
          <v-col cols="6" class="text-center">
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
  name: "User",

  data: () => ({
    fav: true,
    menu: false,
    // message: false,
    hints: true,
    message: "",
    messages: [
      {
        text: "Hello !",
        emitter: "John"
      }
      // {
      //   text: "Hi !",
      //   emitter: "Nhoj"
      // }
    ],

    socket: {}
  }),

  created() {
    this.socket = io("http://localhost:8082");
  },

  mounted() {},

  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),

    sendMessage() {
      this.messages.push({
        text: this.message,
        emitter: this.username
      });
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
