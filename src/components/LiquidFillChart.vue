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
        // 确保值在 0 到 100 之间
        return value >= 0 && value <= 100;
      }
    }
  },
  data() {
    return {
      myChart: null // 图表实例
    };
  },
  mounted() {
    this.initChart(); // 初始化图表
    this.updateChart(this.value); // 设置初始值
    window.addEventListener('resize', this.resizeChart); // 监听窗口大小变化
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom); // 初始化图表实例

      const option = {
        series: [
          {
            type: 'liquidFill',
            name: '液体填充', // 可选名称
            data: [this.value / 100], // 将值归一化为 0-1 之间
            radius: '80%',
            itemStyle: {
              opacity: 0.8,
            },
            label: {
              formatter: (param) => {
                return `${Math.round(param.value * 100)}%`; // 格式化文本
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

      this.myChart.setOption(option); // 设置图表选项
    },
    updateChart(newValue) {
      // 更新图表数据
      this.myChart.setOption({
        series: [
          {
            data: [newValue / 100] // 更新为新值并归一化
          }
        ]
      });
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize(); // 调整图表大小
      }
    }
  },
  watch: {
    value(newValue) {
      this.updateChart(newValue); // 当 value 变化时更新图表
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeChart); // 清理事件监听
    if (this.myChart) {
      this.myChart.dispose(); // 销毁图表实例
    }
  }
};
</script>

<style scoped>
</style>
