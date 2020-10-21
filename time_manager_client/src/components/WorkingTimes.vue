<template>
  <v-container id="workingTimes">
    <v-data-table
      :headers="headers"
      :items="workingTimes"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
import WorkingTimesService from "@/services/WorkingTimesService";
export default {
  name: "WorkingTimes",

  data: () => ({
    userId: null,
    workingTimes: [],
    headers: [
      { text: "Debut", value: "start" },
      { text: "Fin", value: "end" },
    ],
  }),

  mounted() {
    WorkingTimesService.getWorkingTimes(1)
      .then((res) => {
        console.log(res.data.data);
        this.workingTimes = res.data.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>
