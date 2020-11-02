<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="80%">
      <material-form
        :config="config"
        @update:config="config = $event"
        @validate="createWorkingTime(getWorkingTimeFromForm())"
      />
    </v-dialog>
    <v-btn block height="48" @click="dialog = true">
      Add workingtime
    </v-btn>
  </v-row>
</template>

<script>
import WorkingTimesService from "@/services/WorkingTimesService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "WorkingTimeCreate",
  props: ["teamId"],
  data: () => ({
    dialog: false,
    workingTime: {
      id: null,
      start: null,
      end: null,
    },
    config: {
      title: "Create working time",
      validate: "Create",
      message: {
        type: null,
        text: null,
        duration: 5000,
      },
      image: "",
      components: [
        {
          id: 0,
          model: new Date().toISOString().substr(0, 10),
          modelName: "startDate",
          name: "inputs-text-date",
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
            label: "Start date",
            counter: 0,
            rules: [(v) => !!v || "Start time is required"],
          },
        },
        {
          id: 1,
          model: new Date().getHours() + ":" + new Date().getMinutes(),
          modelName: "startTime",
          name: "inputs-text-time",
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
            label: "Start time",
            counter: 0,
            rules: [(v) => !!v || "Start time is required"],
          },
        },
        {
          id: 2,
          model: new Date().toISOString().substr(0, 10),
          modelName: "endDate",
          name: "inputs-text-date",
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
            label: "End date",
            counter: 0,
            rules: [(v) => !!v || "End time is required"],
          },
        },
        {
          id: 3,
          model: new Date().getHours() + ":" + new Date().getMinutes(),
          modelName: "endTime",
          name: "inputs-text-time",
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
            label: "End time",
            counter: 0,
            rules: [(v) => !!v || "End time is required"],
          },
        },
      ],
    },
  }),

  methods: {
    createWorkingTime(workingtime) {
      WorkingTimesService.createWorkingTime(workingtime).then(() => {
        this.dialog = false;
        this.$emit("created");
      });
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      return this.config.components[id].model;
    },

    getWorkingTimeFromForm() {
      return {
        start: `${this.getModel("startDate")}T${this.getModel("startTime")}`,
        end: `${this.getModel("endDate")}T${this.getModel("endTime")}`,
        team_id: this.teamId,
      };
    },
  },
  watch: {
    teamId: function(newVal) {
      this.teamId = newVal;
    },
  },

  components: {
    MaterialForm,
  },
};
</script>

<style scoped>
.dialog {
  display: hidden;
}
</style>
