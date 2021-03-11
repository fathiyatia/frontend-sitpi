<script>
//import { HorizontalBar } from "vue-chartjs";
import { Bar } from "vue-chartjs";
export default {
  //extends: HorizontalBar,
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  methods: {
    update() {
      this.$data._chart.update();
    }
  }
};
</script>
