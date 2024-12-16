<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill';

export default {
  name: 'LiquidFillChart',
  props: {
    value: {
      type: Number,
      required: true,
      validator(value) {
        // Ensure value is between 0 and 100
        return value >= 0 && value <= 100;
      }
    }
  },
  data() {
    return {
      myChart: null // Chart instance
    };
  },
  mounted() {
    this.initChart(); // Initialize the chart
    this.updateChart(this.value); // Set initial value
    window.addEventListener('resize', this.resizeChart); // Listen for window resize events
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom); // Initialize the chart instance

      const option = {
        series: [
          {
            type: 'liquidFill',
            name: 'Liquid Fill', // Optional name
            data: [this.value / 100], // Normalize value to between 0 and 1
            radius: '80%',
            itemStyle: {
              opacity: 0.8,
            },
            label: {
              formatter: (param) => {
                return `${Math.round(param.value * 100)}%`; // Format the label text
              },
              position: ['50%', '50%'],
              fontSize: 28,
              color: '#fff'
            },
            outline: {
              show: false
            },
          }
        ]
      };

      this.myChart.setOption(option); // Set chart options
    },
    updateChart(newValue) {
      // Update the chart data
      this.myChart.setOption({
        series: [
          {
            data: [newValue / 100] // Update with new normalized value
          }
        ]
      });
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize(); // Adjust chart size on window resize
      }
    }
  },
  watch: {
    value(newValue) {
      this.updateChart(newValue); // Update the chart when value changes
    }
  },
  beforeUnmount() {
    // Clean up event listeners and chart instance before unmount
    window.removeEventListener('resize', this.resizeChart);
    if (this.myChart) {
      this.myChart.dispose(); // Dispose the chart instance
    }
  }
};
</script>

<style scoped>
/* You can add custom styles for your component here */
</style>
