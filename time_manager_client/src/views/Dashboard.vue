<template>
  <v-col align="basline">
    <v-row align="basline mx-5">
      <v-col
        class="d-flex mr-auto"
        align="center"
        cols="12"
        lg="3"
        md="3"
        sm="3"
      >
        <v-btn block height="46" @click="displayProfile()">
          My profile
        </v-btn>
      </v-col>
      <v-col class="d-flex" align="center" cols="12" lg="3" md="3" sm="3">
        <v-select
          :items="teams"
          label="Select team"
          solo
          v-model="team"
          item-text="name"
          item-value="id"
          v-on:change="changeTeam()"
          return-object
        ></v-select>
      </v-col>
      <v-col class="d-flex" align="center" cols="12" lg="3" md="3" sm="3">
        <team-create v-on:created="getTeams()" />
      </v-col>
    </v-row>
    <v-row v-if="team" align="baseline" justify="end" class="mx-5">
      <v-col class="d-flex" align="center" cols="12" lg="3" md="3" sm="3">
        <v-select
          :items="team.employee"
          label="Select employee"
          v-model="employee"
          item-text="username"
          item-value="id"
          return-object
          solo
        ></v-select>
      </v-col>
      <v-col class="d-flex" align="center" cols="12" lg="3" md="3" sm="3">
        <v-btn block height="46" @click="displayTeam()">
          Manage team
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around" class="mx-5">
      <profile v-if="employee" class="profile" v-bind:user-id="employee.id" />
      <team-dashboard v-if="team && !employee" class="profile" :team="team" />
    </v-row>
  </v-col>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Profile from "./Profile.vue";
import Team from "../services/TeamService.js";
import TeamCreate from "../components/TeamCreate.vue";
import TeamDashboard from "../components/TeamDashboard.vue";
export default {
  name: "Dashboard",
  data: () => ({
    date: `${new Date().getHours()}:${(new Date().getMinutes() < 10
      ? "0"
      : "") + new Date().getMinutes()}`,
    isLate: false,
    nbEmployees: 10,
    nbTeams: 3,
    teams: [],
    team: null,
    employee: null,
    EmployeeOption: ["Gregoire", "Jeremy", "Jules", "lucas"]
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),
    ...mapMutations("team", [
      "setId",
      "setName",
      "setEmployee",
      "setManagerId"
    ]),
    displayProfile() {
      this.$router.push("/profile");
    },
    displayTeam() {
      this.setId(this.team.id);
      this.$router.push(`/team/${this.team.name}`);
    },
    getTeams() {
      Team.getTeams().then(res => {
        this.teams = res.data.data;
        if (this.id) {
          this.team = this.teams.find(t => t.id == this.id);
        }
      });
    },
    changeTeam() {
      this.employee = null;
    }
  },

  computed: {
    ...mapState("user", ["id", "email", "username"]),
    ...mapState("team", ["id"])
  },
  mounted() {
    setInterval(
      () =>
        (this.date = `${new Date().getHours()}:${(new Date().getMinutes() < 10
          ? "0"
          : "") + new Date().getMinutes()}`),
      10000
    );
    this.getTeams();
  },
  components: {
    Profile,
    TeamCreate,
    TeamDashboard
  }
};
</script>

<style scoped>
.container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
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

.profile {
  border: 5px solid #2eb9ce;
}
</style>
