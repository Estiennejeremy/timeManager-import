<template>
  <div class="container">
    <h2>{{ date }} | {{ username }}</h2>
    <v-row align="center" justify="space-around">
      <v-col class="d-flex flex-column" cols="12" md="3" lg="3">
        <section class="infoTeam">
          <div class="d-flex flex-column align-center">
            <h2>{{ nbTeams }}</h2>
            <span>Teams</span>
          </div>
          <div class="d-flex flex-column align-center">
            <h2>{{ nbEmployees }}</h2>
            <span>Employee</span>
          </div>
        </section>

        <div v-if="!isLate" class="isLate">
          <v-btn fab color="green" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <h3>Enough time</h3>
        </div>
        <div v-if="isLate" class="isLate">
          <v-btn fab color="red" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <h3>Not enough time</h3>
        </div>

        <doughnut-chart :chartdata="doughnutData" :options="options" />
      </v-col>

      <v-col
        class="d-flex flex-column align-self-start"
        cols="12"
        md="9"
        lg="9"
      >
        <v-row align="baseline" justify="end">
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
              return-object
            ></v-select>
          </v-col>
          <v-col class="d-flex" align="center" cols="12" lg="3" md="3" sm="3">
            <v-btn block height="46">
              Create team
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="team" align="baseline" justify="end">
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
        <v-row align="center" justify="space-around">
          <profile v-if="employee" hideTitle="true" class="test" />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DoughnutChart from "../components/charts/Doughnut.js";
import Profile from "./Profile.vue";
import Team from "../services/TeamService.js";
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
    doughnutData: {
      labels: ["Workingtime", "Free time"],
      datasets: [
        {
          data: [70, 30],
          weight: 0.5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    },
    EmployeeOption: ["Gregoire", "Jeremy", "Jules", "lucas"]
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),
    ...mapMutations("team", ["setId", "setName", "setEmployee", "setManagerId"]),
    displayProfile() {
      this.$router.push("/profile");
    },
    displayTeam() {
      this.setId(this.team.id);
      this.$router.push(`/team/${this.team.name}`);
    },
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

    Team.getTeams().then(res => {
      this.teams = res.data.data;
      if(this.id){
        this.team = this.teams.find(t => t.id == this.id);
      }
    });
  },
  components: {
    DoughnutChart,
    Profile
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

.test {
  border: 5px solid #2eb9ce;
}
</style>
