<template>
  <v-container id="workingTimes"> </v-container>
</template>

<script>
import WorkingTimesService from "@/services/WorkingTimesService";
export default {
  name: "WorkingTimes",

  data: () => ({
    userId: null,
    workingTimes: {}
  }),

  async getWorkingTimes() {
    try {
      const res = await WorkingTimesService.getWorkingTimes();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
