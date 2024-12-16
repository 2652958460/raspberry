<template>
  
    

      <!-- Main Content -->
      <el-main >
        <div class="chart-container">
          <el-row :gutter="5" style="margin-top: 20px;">
            <el-col :span="24">
              <BaiduMap :latitude="raspberryLatitude" :longitude="raspberryLongitude" />
            </el-col>
          </el-row>
          <br>
          <br>
          <el-row :gutter="5">
            <el-col :span="12">
              <div style="height: 400px;">
                <GaugeChart :chartId="'temperatureGauge'" :value="currentTemperature" />
              </div>
            </el-col>

            <el-col :span="12">
              <LiquidFillChart :value="currentHumidity" />
            </el-col>
          </el-row>

          <el-row :gutter="5" style="margin-top: 20px;">
            <el-col :span="24">
              <TempHumidityChart 
                :timeLabels="timeLabels" 
                :temperatureData="temperatureData" 
                :humidityData="humidityData" 
              />
            </el-col>
          </el-row>
        </div>
      </el-main>
   
 
</template>

<script>
import GaugeChart from '@/components/GaugeChart.vue';
import LiquidFillChart from '@/components/LiquidFillChart.vue';
import TempHumidityChart from '@/components/TempHumidityChart.vue';
import BaiduMap from '@/components/BaiduMap.vue';
import axios from 'axios';

export default {
  name: 'RealTimeChart',
  components: {
    GaugeChart,
    LiquidFillChart,
    TempHumidityChart,
    BaiduMap
  },
  data() {
    return {
      currentTemperature: 0,
      currentHumidity: 0,
      timeLabels: ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时'],
      temperatureData: [],
      humidityData: [],
      raspberryLatitude: 30.6767, // 默认经纬度
      raspberryLongitude: 104.0939, // 默认经纬度
    };
  }, 
  methods: {
    fetchSensorData() {
      axios.get('http://raspberrypi.local:5001/sensor-data')
      .then(response => {
        this.currentTemperature = response.data.temperature;
        this.currentHumidity = response.data.humidity;
        this.temperatureData = response.data.temperature_data;
        this.humidityData = response.data.humidity_data;
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
      });
    }
  },
  mounted() {
    setInterval(this.fetchSensorData, 2000);
  }
};
</script>

<style scoped>


.chart-container {
  padding: 20px;
}
</style>
 