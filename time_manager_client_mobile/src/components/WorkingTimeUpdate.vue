<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="80%">
      <material-form
        v-if="workingtime"
        :config="config"
        @update:config="config = $event"
        @validate="updateWorkingTime(getWorkingTimeFromForm())"
      />
    </v-dialog>
    <v-btn icon @click="dialog = true">
      <v-icon>mdi-update</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import WorkingTimesService from "@/services/WorkingTimesService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "WorkingTimeUpdate",
  props: ["workingtime"],
  data: () => ({
    dialog: false,
    config: {
      title: "Update working time",
      validate: "Update",
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

  mounted() {
    this.setWorkingTime();
  },

  methods: {
    setWorkingTime() {
      let start = new Date(this.workingtime.start);
      let end = new Date(this.workingtime.end);
      this.setModel("startDate", start.toISOString().substr(0, 10));
      this.setModel(
        "startTime",
        `${("0" + start.getHours()).slice(-2)}:${(
          "0" + start.getMinutes()
        ).slice(-2)}`
      );
      this.setModel("endDate", end.toISOString().substr(0, 10));
      this.setModel(
        "endTime",
        `${("0" + end.getHours()).slice(-2)}:${("0" + end.getMinutes()).slice(
          -2
        )}`
      );
    },

    updateWorkingTime(workingtime) {
      WorkingTimesService.updateWorkingTime(this.workingtime.id, workingtime);
      this.dialog = false;
      this.$emit('updated')
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      return this.config.components[id].model;
    },

    setModel(name, value) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      this.config.components[id].model = value;
    },

    getWorkingTimeFromForm() {
      return {
        start: `${this.getModel("startDate")}T${this.getModel("startTime")}`,
        end: `${this.getModel("endDate")}T${this.getModel("endTime")}`,
        user_id: JSON.parse(window.localStorage.TimeManager).route.params
          .userId,
      };
    },
  },

  components: {
    MaterialForm,
  },
};
</script>
