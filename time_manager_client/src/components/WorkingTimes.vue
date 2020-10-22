<template>
  <v-container id="workingTimes">
    <working-time
      v-for="(item, index) in workingTimes"
      :key="index"
      :data="item"
    />

    <v-fab-transition>
      <v-btn
        fab
        large
        blue
        fixed
        bottom
        right
        @click="createWorkingTime()"
        class="v-btn--example"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import WorkingTime from "@/components/WorkingTime.vue";
import WorkingTimesService from "@/services/WorkingTimesService";
export default {
  name: "WorkingTimes",

  data: () => ({
    userId: null,
    workingTimes: [],
  }),

  components: {
    WorkingTime,
  },

  mounted() {
    WorkingTimesService.getWorkingTimes(JSON.parse(window.localStorage.TimeManager).route.params.userId)
      .then((res) => {
        this.workingTimes = res.data.data;
      })
      .catch((err) => console.log(err));
  },

  methods: {
    createWorkingTime() {
      this.$router.push(`/workingTime/${JSON.parse(window.localStorage.TimeManager).route.params.userId}`);
    },
  },
};
</script>
