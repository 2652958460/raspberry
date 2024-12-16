<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'TempHumidityChart',
  props: {
    temperatureData: {
      type: Array,
      required: true
    },
    humidityData: {
      type: Array,
      required: true
    },
    timeLabels: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.myChart = echarts.init(chartDom);  // 将图表实例保存为类的一个属性

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['温度', '湿度'],
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: this.timeLabels  // 动态绑定时间数据
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '湿度',
            min: 0,
            max: 100,
            position: 'right',
            axisLabel: {
              formatter: '{value} %'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 50,
            position: 'left',
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '湿度',
            type: 'bar',
            yAxisIndex: 0,
            data: this.humidityData  // 动态绑定湿度数据
          },
          {
            name: '温度',
            type: 'line',
            itemStyle: {
              color: 'rgba(253, 115, 71, 1)'  // 设置标记点颜色，与折线一致
            },
            smooth: true,
            yAxisIndex: 1,
            data: this.temperatureData  // 动态绑定温度数据
          }
        ]
      };

      this.myChart.setOption(option);  // 设置初始选项

      // 自动调整图表大小
      window.addEventListener('resize', this.myChart.resize);
    },
    updateChart(temperatureData, humidityData, timeLabels) {
      // 仅更新数据
      this.myChart.setOption({
        xAxis: [
          {
            data: timeLabels  // 更新时间数据
          }
        ],
        series: [
          {
            data: humidityData  // 更新湿度数据
          },
          {
            data: temperatureData  // 更新温度数据
          }
        ]
      });
    }
  },
  watch: {
    temperatureData(newData) {
      this.updateChart(newData, this.humidityData, this.timeLabels);
    },
    humidityData(newData) {
      this.updateChart(this.temperatureData, newData, this.timeLabels);
    },
    timeLabels(newData) {
      this.updateChart(this.temperatureData, this.humidityData, newData);
    }
  },
  beforeUnmount() {
    const chartDom = this.$refs.chartContainer;
    const myChart = echarts.getInstanceByDom(chartDom);
    if (myChart) {
      window.removeEventListener('resize', myChart.resize);  // 移除事件监听
      myChart.dispose();  // 销毁图表实例
    }
  }
};
</script>

<style scoped>
/* 可自定义样式 */
</style>
