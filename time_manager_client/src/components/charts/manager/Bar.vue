<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  name: "BarChart",
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
