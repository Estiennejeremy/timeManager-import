<template>
  <v-container id="workingTimes">
    <v-row align="center">
      <v-col cols="3">
        <v-card color="blue">
          <span class="">{{ workingTime.start }}</span>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="blue">
          <span class="">{{ workingTime.start }}</span>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-btn block v-on:click="updateWorkingTime">Edit</v-btn>
      </v-col>

      <v-col cols="3">
        <v-btn block v-on:click="deleteWorkingTime">Delete</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkingTimesService from "@/services/WorkingTimesService";
export default {
  name: "WorkingTime",

  data: () => ({
    workingTime: {
      id: null,
      start: null,
      end: null
    }
  }),

  // Mounted
  mounted() {
    if (this.$props.data === null) {
      this.workingTime = {
        // api
        start: "azazeaze",
        end: "erzere"
      };
    } else {
      this.workingTime = this.$props.data;
    }
  },

  props: {
    data: {
      type: Object,
      default: () => null
    }
  },

  methods: {
    updateWorkingTime() {
      this.$router.push(
        `/workingTime/${
          JSON.parse(window.localStorage.TimeManager).route.params.userId
        }/${this.workingTime.id}`
      );
    },

    deleteWorkingTime() {
      WorkingTimesService.deleteWorkingTime(this.workingTime.id)
        .then(() => this.$emit("refresh"))
        .catch(() => this.$emit("refresh"));
    }
  }
};
</script>
