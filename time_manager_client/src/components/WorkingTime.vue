<template>
  <v-container id="workingTimes">
    <v-row>

      <v-col cols="4">
        <v-card color="orange">
          <span class="">{{ workingTime.start }}</span>
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-btn block>Edit</v-btn>
      </v-col>

      <v-col cols="4">
        <v-btn block>Delete</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "WorkingTime",

  data: () => ({
    workingTime: {
      start: null,
      end: null
    }
  }),

  mounted() {
    if (this.$props.data === null) {
      this.workingTime = {
        // api
        start: "azazeaze",
        end: "erzere"
      }
    } else {
      this.workingTime = this.$props.data
    }
  },

  props: {
    data: {
      type: Object,
      default: () => null
    }
  },

  methods: {
    async createWorkingTime() {},

    async updateWorkingTime() {},

    async deleteWorkingTime() {}
  }
};
</script>
