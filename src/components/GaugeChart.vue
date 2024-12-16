<template>
  <div :id="chartId" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'GaugeChart',
  props: {
    chartId: {
      type: String,
      default: 'gauge-chart'  // 默认的 DOM 元素 ID
    },
    value: {
      type: Number,
      default: 0   // 表盘初始的温度值
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(document.getElementById(this.chartId));
      const option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 60,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: 'inherit'
            },
            data: [
              {
                value: 0
              }
            ]
          },
          {
            type: 'gauge',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      };
      this.chartInstance.setOption(option);
    },
    updateChart(newValue) {
      // 更新图表数据
      this.chartInstance.setOption({
        series: [
          {
            data: [
              {
                value: newValue
              }
            ]
          },
          {
            data: [
              {
                value: newValue
              }
            ]
          }
        ]
      });
    }
  },
  watch: {
    value(newValue) {
      this.updateChart(newValue);  // 当父组件的值发生变化时，更新图表
    }
  },
  mounted() {
    this.initChart();  // 初始化图表
    window.addEventListener('resize', this.chartInstance.resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.chartInstance.resize);
    this.chartInstance.dispose();
  }
};
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>
