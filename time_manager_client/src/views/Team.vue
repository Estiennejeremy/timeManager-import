<template>
  <div class="container">
    <h2>Team : {{ this.name }}</h2>
    <v-row align="top">
      <v-col class="d-flex flex-column" cols="12" md="6" lg="4">
        <v-list-item
        v-for="e in employee"
        :key="e.id"
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1"
            dark
          >
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="e.username"></v-list-item-title>

          <v-list-item-subtitle v-text="e.email"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Team from "../services/TeamService.js";
export default {
  name: "Team",
  data: () => ({
  }),
  methods: {
    ...mapMutations("team", [
      "setId",
      "setName",
      "setEmployee",
      "setManagerId"
    ]),
    deleteEmployee(){
      Team.deleteTeam(this.id)
      .then(() => Team.getTeam(this.id))
      .then(res => {
        let t = res.data.data;
        this.setName = t.name;
        this.setEmployee = t.employee;
        this.setManager_id = t.manager_id;
      })
    }
  },

  computed: {
    ...mapState("team", ["id", "name", "employee", "manager_id"]),
  },
  components: {},
};
</script>

<style scoped>
.container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: auto; 
}
.isLate {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.timeColor {
  margin-right: 20px;
}

.infoTeam {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 40px;
}

.test {
  border: 5px solid #2eb9ce;
}
</style>
