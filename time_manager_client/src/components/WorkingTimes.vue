<template>
  <v-container id="workingTimes">
      <working-time
        v-for="(item, index) in workingTimes"
        :key="index"
        :data="item"
      />

  </v-container>
</template>

<script>
import WorkingTime from "@/components/WorkingTime.vue";
import WorkingTimesService from "@/services/WorkingTimesService";
export default {
  name: "WorkingTimes",

  data: () => ({
    userId: null,
    workingTimes: [
      {
        start: "start",
        end: "end"
      }
    ],
    headers: [
      { text: "Debut", value: "start" },
      { text: "Fin", value: "end" }
    ]
  }),

  components: {
    WorkingTime
  },

  mounted() {
    WorkingTimesService.getWorkingTimes(1)
      .then(res => {
        this.workingTimes = res.data.data;
      })
      .catch(err => console.log(err));
  }
};
</script>
