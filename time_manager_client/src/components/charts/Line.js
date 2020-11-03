import { Line } from "vue-chartjs";

export default {
    extends: Line,
    props: {
        chartdata: {
            type: Object,
            default: null,
        },
        options: {
            type: Object,
            default: null,
        },
    },
    mounted() {
        this.updateChart();
    },
    methods: {
        updateChart() {
            this.renderChart(this.chartdata, this.options);
        },
    },
    watch: {
        chartdata: function(newVal) {
            this.chartdata = newVal;
            this.updateChart();
        }
    },
};