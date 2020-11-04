<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="80%">
      <material-form
        :config="config"
        @update:config="config = $event"
        @validate="createTeam(getTeamFromForm())"
      />
    </v-dialog>
    <v-btn block height="46" @click="dialog = true">
      Create team
    </v-btn>
  </v-row>
</template>

<script>
import TeamService from "@/services/TeamService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "TeamCreate",
  data: () => ({
    dialog: false,
    workingTime: {
      id: null,
      start: null,
      end: null
    },
    config: {
      title: "Create Team",
      validate: "Create",
      message: {
        type: null,
        text: null,
        duration: 5000
      },
      image: "",
      components: [
        {
          id: 0,
          model: "name",
          modelName: "name",
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
            label: "Team name",
            counter: 0,
            rules: [v => !!v || "Name is required"]
          }
        }
      ]
    }
  }),

  methods: {
    createTeam(team) {
      TeamService.createTeam(team).then(() => {
        this.dialog = false;
        this.$emit("created");
      });
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        item => item.modelName === name
      );
      return this.config.components[id].model;
    },

    getTeamFromForm() {
      return {
        name: this.getModel("name"),
        manager_id: this.id
      };
    }
  },
  watch: {
    teamId: function(newVal) {
      this.teamId = newVal;
    }
  },

  components: {
    MaterialForm
  }
};
</script>

<style scoped>
.dialog {
  display: hidden;
}
</style>
