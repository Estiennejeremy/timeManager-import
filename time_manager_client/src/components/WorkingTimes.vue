<template>
  <v-container id="workingTimes">
    <span v-if="workingTimes.length > 0">
      <working-time
        v-for="(item, index) in workingTimes"
        :key="index"
        :data="item"
        @refresh="getWorkingTimes()"
      />
    </span>

    <span v-else>
      <v-row justify="center" align="center">
        <v-avatar tile size="128">
          <v-img src="https://image.flaticon.com/icons/svg/1548/1548784.svg" />
        </v-avatar>
      </v-row>

      <v-row justify="center">
        <span class="text-center display-3">
          No working times for this user
        </span>
      </v-row>
    </span>

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
    workingTimes: []
  }),

  components: {
    WorkingTime
  },

  mounted() {
    this.getWorkingTimes();
  },

  methods: {
    createWorkingTime() {
      this.$router.push(
        `/workingTime/${
          JSON.parse(window.localStorage.TimeManager).route.params.userId
        }`
      );
    },

    getWorkingTimes() {
      return WorkingTimesService.getWorkingTimes(
        JSON.parse(window.localStorage.TimeManager).route.params.userId
      )
        .then(res => {
          this.workingTimes = res.data.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
