<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  name: "DoughnutChart",
  mixins: [reactiveProp],
  props: ["options"],
  watch: {
    options: {
      handler() {
        this.renderChart(this.chartData, this.options);
      },
      deep: true
    }
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
