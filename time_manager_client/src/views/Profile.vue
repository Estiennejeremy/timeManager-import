<template>
  <div class="container">
    <h2 v-if="!hideTitle">{{ date }} | {{ username }}</h2>
    <v-row align="center" justify="space-around">
      <v-col class="d-flex flex-column" cols="12" md="3" lg="3">
        <div v-if="isWorking" class="isWorking">
          <v-btn fab color="green" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <section>
            <h3 v-for="workingtime in dailyWorkingtimes" :key="workingtime.id">
              {{ getPlanning(workingtime) }}
            </h3>
          </section>
        </div>
        <div v-if="!isWorking" class="isWorking">
          <v-btn fab color="red" class="timeColor">
            <v-icon></v-icon>
          </v-btn>
          <section>
            <h3 v-for="workingtime in dailyWorkingtimes" :key="workingtime.id">
              {{ getPlanning(workingtime) }}
            </h3>
            <h3 v-if="dailyWorkingtimes && dailyWorkingtimes.length == 0">
              No current workingtime
            </h3>
          </section>
        </div>
        <doughnut-chart
          v-if="dailyWorkData"
          :chartdata="dailyWorkData"
          :options="options"
        />
      </v-col>

      <v-col class="d-flex flex-column" cols="12" md="9" lg="9">
        <v-row align="center" justify="center">
          <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
            <v-select
              v-model="visualize"
              :items="visualizeOptions"
              label="Visualize"
              solo
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" lg="4" md="4" sm="6">
            <v-select
              v-model="periode"
              :items="periodeOptions"
              label="Select period"
              solo
            ></v-select>
          </v-col>
        </v-row>
        <line-chart
          v-if="weeklyWorkData"
          :chartdata="weeklyWorkData"
          :options="options"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import LineChart from "../components/charts/Line.js";
import DoughnutChart from "../components/charts/Doughnut.js";
import WorkingTimesService from "../services/WorkingTimesService.js";
import ClockService from "../services/ClockService.js";
export default {
  name: "Profile",
  props: ["hideTitle", "userId"],
  data: () => ({
    date: `${new Date().getHours()}:${(new Date().getMinutes() < 10
      ? "0"
      : "") + new Date().getMinutes()}`,
    isWorking: false,
    dailyWorkingtimes: null,
    weeklyWorkingtimes: null,
    monthlyWorkingtimes: null,
    dailyClocks: null,
    weeklyClocks: null,
    monthlyClocks: null,
    dailyWorkData: null,
    weeklyWorkData: null,
    visualize: "Line",
    periode: "Weekly",
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
    visualizeOptions: ["Line", "Doughnut", "Bar"],
    periodeOptions: ["Weekly", "Monthly"],
  }),
  methods: {
    ...mapMutations("user", ["setId", "setEmail", "setUsername"]),
    getPlanning(workingtime) {
      let start = new Date(workingtime.start);
      let end = new Date(workingtime.end);
      return `${("0" + start.getHours()).slice(-2)}:${(
        "0" + start.getMinutes()
      ).slice(-2)}-${("0" + end.getHours()).slice(-2)}:${(
        "0" + end.getMinutes()
      ).slice(-2)}`;
    },
    getWeekNumber(d) {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      return weekNo;
    },
    init() {
      setInterval(
        () =>
          (this.date = `${new Date().getHours()}:${(new Date().getMinutes() < 10
            ? "0"
            : "") + new Date().getMinutes()}`),
        10000
      );

      Promise.all([
        WorkingTimesService.getWorkingTimesUser(
          this.userId ? this.userId : this.id
        ),
        ClockService.getClockUser(this.userId ? this.userId : this.id),
      ]).then((res) => {
        ///////////////// DAILY //////////////////////////////

        /// GET DAILY WORKINGTIMES
        let dailyWorkingtimes = res[0].data.workingtimes.filter(
          (workingTime) => {
            let current = new Date();
            let start = new Date(workingTime.start);
            let end = new Date(workingTime.end);
            return (
              start.toLocaleDateString() == current.toLocaleDateString() &&
              end.toLocaleDateString() == current.toLocaleDateString()
            );
          }
        );
        this.dailyWorkingtimes = dailyWorkingtimes;

        /// GET DAILY CLOCKS
        let dailyClocks = res[1].data.data.filter((clock) => {
          let current = new Date();
          let time = new Date(clock.start);
          return time.toLocaleDateString() == current.toLocaleDateString();
        });
        this.dailyClocks = dailyClocks;

        /// SET IF HE/SHE'S WORKING
        if (
          dailyWorkingtimes.some(
            (workingtime) =>
              new Date() > new Date(workingtime.start) &&
              new Date() < new Date(workingtime.end)
          )
        )
          this.isWorking = true;
        else this.isWorking = false;

        /// SET CURRENT WORKINGTIME AND HOW MANY WORKINGTIME LESS
        let currentWorkingTime = dailyWorkingtimes.find(
          (workingtime) =>
            new Date() > new Date(workingtime.start) &&
            new Date() < new Date(workingtime.end)
        );

        /// SET DAILY WORKINGTIME CHART
        if (currentWorkingTime) {
          let lastClock = dailyClocks.find(
            (clock) =>
              new Date(clock.start) >= new Date(currentWorkingTime.start) && !clock.end
          );
          if (lastClock) {
            let total = (
              (new Date(currentWorkingTime.end).getTime() -
                new Date(currentWorkingTime.start).getTime()) /
              (1000 * 3600)
            ).toFixed(2);
            let work = (
              (new Date().getTime() - new Date(lastClock.start).getTime()) /
              (1000 * 3600)
            ).toFixed(2);
            let late = (
              (new Date(lastClock.start).getTime() - new Date(currentWorkingTime.start).getTime()) /
              (1000 * 3600)
            ).toFixed(2);
            this.dailyWorkData = {
              labels: ["Late time", "Workingtime", "Less time"],
              datasets: [
                {
                  data: [late, work, total - work],
                  backgroundColor: ["yellow", "green"],
                  weight: 0.5,
                },
              ],
            };
          }
        }

        /////////////////// WEEKLY ///////////////////////////////////
        /// GET WEEKLY WORKINGTIMES
        let weeklyWorkingtimes = res[0].data.workingtimes.filter(
          (workingTime) => {
            let current = new Date();
            let start = new Date(workingTime.start);
            let end = new Date(workingTime.end);
            return (
              this.getWeekNumber(start) == this.getWeekNumber(current) &&
              this.getWeekNumber(end) == this.getWeekNumber(current)
            );
          }
        );
        this.weeklyWorkingtimes = weeklyWorkingtimes;

        /// GET WEEKLY CLOCKS
        let weeklyClocks = res[1].data.data.filter((clock) => {
          let current = new Date();
          let time = new Date(clock.time);
          return this.getWeekNumber(time) == this.getWeekNumber(current);
        });
        this.weeklyClocks = weeklyClocks;

        /// SET WEEKLY WORKINGTIME CHART
        // let sortyWorkingtimeByDay = weeklyWorkingtimes.reduce((sort,workingtime) => {
        //   switch(new Date(workingtime.start).toLocaleString("default", { weekday: "long" })){
        //     case "Monday":
        //       sort[0].push(workingtime);
        //       break;
        //     case "Tuesday":
        //       sort[1].push(workingtime);
        //       break;
        //     case "Wednesday":
        //       sort[2].push(workingtime);
        //       break;
        //     case "Thursday":
        //       sort[3].push(workingtime);
        //       break;
        //     case "Friday":
        //       sort[4].push(workingtime);
        //       break;
        //     case "Saturday":
        //       sort[5].push(workingtime);
        //       break;
        //     case "Sunday":
        //       sort[6].push(workingtime);
        //       break;
        //   }
        //   return sort;
        // }, [[],[],[],[],[],[],[]])

        let sortClockByDay = weeklyClocks.reduce(
          (sort, clock) => {
            switch (
              new Date(clock.time).toLocaleString("default", {
                weekday: "long",
              })
            ) {
              case "Monday":
                sort[0].push(clock);
                break;
              case "Tuesday":
                sort[1].push(clock);
                break;
              case "Wednesday":
                sort[2].push(clock);
                break;
              case "Thursday":
                sort[3].push(clock);
                break;
              case "Friday":
                sort[4].push(clock);
                break;
              case "Saturday":
                sort[5].push(clock);
                break;
              case "Sunday":
                sort[6].push(clock);
                break;
            }
            return sort;
          },
          [[], [], [], [], [], [], []]
        );

        sortClockByDay.map((dayClocks) =>
          dayClocks.sort((c1, c2) =>
            new Date(c1.time).getTime() > new Date(c2.time).getTime() ? 1 : -1
          )
        );

        this.weeklyWorkData = {
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          datasets: [
            {
              data: sortClockByDay.map((dayClocks) =>
                dayClocks.reduce((hours, clock, index) => {
                  if (index % 2 == 1) {
                    return (
                      hours +
                      parseInt(
                        (
                          Math.abs(
                            new Date(clock.time) -
                              new Date(dayClocks[index - 1].time)
                          ) / 36e5
                        ).toFixed(2)
                      )
                    );
                  } else return hours;
                }, 0)
              ),
              label: "Workingtime",
              backgroundColor: "green",
              weight: 0.5,
            },
          ],
        };
      });
    },
  },

  computed: {
    ...mapState("user", ["id", "email", "username"]),
  },
  mounted() {
    this.init();
  },
  watch: {
    userId: function(newVal) {
      this.userId = newVal;
      this.isWorking = false;
      this.dailyWorkingtimes = null;
      this.weeklyWorkingtimes = null;
      this.monthlyWorkingtimes = null;
      this.dailyClocks = null;
      this.weeklyClocks = null;
      this.monthlyClocks = null;
      this.dailyWorkData = null;
      this.weeklyWorkData = null;
      this.init();
    },
  },
  components: {
    LineChart,
    DoughnutChart,
  },
};
</script>

<style scoped>
.container {
  padding: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.isWorking {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}
.timeColor {
  margin-right: 20px;
}
</style>
