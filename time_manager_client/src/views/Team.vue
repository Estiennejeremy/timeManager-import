<template>
  <div class="container">
    <v-row justify="center">
      <v-col class="d-flex flex-column" cols="12" lg="4" md="6" sm="8">
        <v-select
          :items="teams"
          label="Select team"
          solo
          v-model="team"
          item-text="name"
          item-value="id"
          return-object
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" lg="2" md="4" sm="4">
        <v-btn block height="48" @click="addEmployee()">
          Add workingtime
        </v-btn>
      </v-col>
    </v-row>
    <h2 v-if="team">Team : {{ this.team.name }}</h2>
    <v-row v-if="team" align="top">
      <v-col class="d-flex flex-column" cols="12" md="6" lg="4">
        <v-row>
          <v-list-item v-for="e in team.employee" :key="e.id">
            <v-list-item-avatar>
              <v-icon class="grey lighten-1" dark>
                mdi-account
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="e.username"></v-list-item-title>

              <v-list-item-subtitle v-text="e.email"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="removeEmployee(e.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-row>
        <v-row>
          <v-row justify="center">
            <v-col class="d-flex" cols="12" lg="8" md="8" sm="8">
              <v-autocomplete
                :items="getUsersNotInTeam()"
                label="Select employee"
                solo
                v-model="employee"
                item-text="email"
                item-value="id"
                no-data-text="No user found"
                return-object
              ></v-autocomplete>
            </v-col>
            <v-col class="d-flex" cols="12" lg="4" md="4" sm="4">
              <v-btn block height="48" @click="addEmployee()">
                Add employee
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Team from "../services/TeamService.js";
import Account from "../services/AccountService.js";
export default {
  name: "Team",
  data: () => ({
    users: null,
    teams: null,
    team: null,
    employee: null,
  }),
  methods: {
    ...mapMutations("team", [
      "setId",
      "setName",
      "setEmployee",
      "setManagerId",
    ]),
    init() {
      Promise.all([Team.getTeams(), Account.getUsers()]).then((res) => {
        this.teams = res[0].data.data;
        if (this.id) {
          this.team = this.teams.find((t) => t.id == this.id);
        }
        this.users = res[1].data.data;
      });
    },
    getUsersNotInTeam() {
      return this.users.filter((user) =>
        user.teams.every((t) => t.id != this.team.id)
      );
    },
    addEmployee() {
      this.setId(this.team.id);
      Team.addEmployee(this.team.id, this.employee.id).then(() => {
        this.init();
        this.employee = null;
      });
    },
    removeEmployee(userId) {
      this.setId(this.team.id);
      this.employee = null;
      Team.removeEmployee(this.team.id, userId).then(() => {
        this.init();
      });
    },
    deleteEmployee() {
      Team.deleteTeam(this.id)
        .then(() => Team.getTeam(this.id))
        .then((res) => {
          let t = res.data.data;
          this.setId = t.id;
        });
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.setId(this.team.id);
  },
  computed: {
    ...mapState("team", ["id"]),
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
