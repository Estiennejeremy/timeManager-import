<template>
  <v-container id="workingTimes">
    <material-form
      :config="config"
      @update:config="config = $event"
      @validate="createWorkingTime(getWorkingTimeFromForm())"
    />
  </v-container>
</template>

<script>
// import WorkingTimesService from "@/services/WorkingTimesService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "WorkingTimeCreate",

  data: () => ({
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
          model: null,
          modelName: "start",
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
            label: "Start",
            counter: 0,
            rules: [(v) => !!v || "Start time is required"],
          },
        },
        {
          id: 1,
          model: null,
          modelName: "end",
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
            label: "End",
            counter: 0,
            rules: [(v) => !!v || "End time is required"],
          },
        },
      ],
    },
  }),

  methods: {
    createWorkingTime(workingtime) {
      console.log(workingtime);
    },

    getModel(name) {
      let id = this.config.components.findIndex(
        (item) => item.modelName === name
      );
      return this.config.components[id].model;
    },

    getWorkingTimeFromForm() {
      return {
        start: this.getModel("start"),
        end: this.getModel("end"),
        user_id: JSON.parse(window.localStorage.TimeManager).route.params.userId,
      };
    },
  },

  components: {
    MaterialForm,
  },
};
</script>
