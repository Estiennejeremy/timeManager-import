<script>
import { HorizontalBar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: HorizontalBar,
  name: "HorizontalBarChart",
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
