<template>
  <v-container id="workingTimes">
    <material-form
      v-if="workingTime.start != null"
      :config="config"
      @update:config="config = $event"
      @validate="updateWorkingTime(getWorkingTimeFromForm())"
    />
  </v-container>
</template>

<script>
import WorkingTimesService from "@/services/WorkingTimesService";
import MaterialForm from "@/components/forms/Form.vue";
export default {
  name: "WorkingTimeUpdate",

  data: () => ({
    workingTime: {
      id: null,
      start: null,
      end: null,
    },
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
    this.getWorkingTime();
  },

  methods: {
    getWorkingTime() {
      WorkingTimesService.getWorkingTime(
        JSON.parse(window.localStorage.TimeManager).route.params.workingTimeId,
        JSON.parse(window.localStorage.TimeManager).route.params.userId
      )
        .then((res) => {
          this.workingTime = res.data.data;
          this.setModel("startDate", new Date(this.workingTime.start).toISOString().substr(0, 10));
          this.setModel("startTime", new Date(this.workingTime.start).getHours() + ":" + new Date(this.workingTime.start).getMinutes());
          this.setModel("endDate", new Date(this.workingTime.end).toISOString().substr(0, 10));
          this.setModel("endTime", new Date(this.workingTime.end).getHours() + ":" + new Date(this.workingTime.end).getMinutes());
        })
        .catch((err) => console.log(err));
    },

    updateWorkingTime(workingtime) {
      WorkingTimesService.updateWorkingTime(this.workingTime.id,workingtime);
      this.$router.push(
        `/workingTimes/${
          JSON.parse(window.localStorage.TimeManager).route.params.userId
        }`
      );
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
