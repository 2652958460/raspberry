<template>
  <div>
    <!-- container 1 -->
    <div class="container">
      <div class="item">
        <div>
          <PercentageChart :percentage="systemInfo.info.cpu.percent" />
        </div>
        <div>
          <InfoTable :Info="'CPU'" :infoatt1="'Freq'" :infoatt2="'Cores'" :infoatt3="'Temp'"
            :att1="systemInfo.info.cpu.freq" :att2="systemInfo.info.cpu.count" :att3="systemInfo.info.cpu.temp">
          </InfoTable>
        </div>
      </div>
      <div class="item">
        <div>
          <PercentageChart :percentage="systemInfo.info.mem.percent" />
        </div>
        <div>
          <InfoTable :Info="'mem'" :infoatt1="'Total'" :infoatt2="'Used'" :infoatt3="'Free'"
            :att1="systemInfo.info.mem.total" :att2="systemInfo.info.mem.used" :att3="systemInfo.info.mem.free">
          </InfoTable>
        </div>
      </div>
      <div class="item">

        <div>
          <PercentageChart :percentage="systemInfo.info.disk.percent" />
        </div>
        <div>
          <InfoTable :Info="'disk'" :infoatt1="'Total'" :infoatt2="'Used'" :infoatt3="'Free'"
            :att1="systemInfo.info.disk.total" :att2="systemInfo.info.disk.used" :att3="systemInfo.info.disk.free">
          </InfoTable>
        </div>
      </div>
    </div>
    <!-- container 2 -->
    <div class="container">
      <div class="item">
        <h4>IP Address:{{ }}</h4>
        <table>
          <thead style="background-color: rgb(235.9, 245.3, 255);">
            <tr>
              <td>net</td>
              <td>total_in</td>
              <td>total_out</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in systemInfo.info.net.interfaces" :key="index">
              <td style="background-color: rgb(235.9, 245.3, 255);">{{ item.name }}</td>
              <td>{{ item.total_in }}</td>
              <td>{{ item.total_out }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // 推荐使用顶部引入
import InfoTable from '@/components/InfoTable.vue';
import PercentageChart from '@/components/PercentageChart.vue';

export default {
  name: 'RaspberryStatus',
  components: {
    PercentageChart,
    InfoTable,
  },
  setup() {
    const systemInfo = ref({
      info: {
        cpu: {
          count: 0,
          freq: 0,
          percent: 0,
          temp: 0
        },
        mem: {
          free: 0,
          used: 0,
          total: 0,
          percent: 0,
        },
        disk: {
          free: 0,
          total: 0,
          used: 0,
          percent: 0,
        },
        net: {
          interfaces: [
            {
              name: "lo",
              total_in: 0,
              total_out: 0
            },
            {
              name: "eth0",
              total_in: 0,
              total_out: 0
            },
            {
              name: "wlan0",
              total_in: 0,
              total_out: 0
            }
          ]
        },
      }
    });


    // 定义 fetchSystemInfo 方法
    const fetchSystemInfo = async () => {
      const url = "http://raspberrypi.local:5003/system_info";

      try {
        const response = await axios.get(url);
        systemInfo.value = response.data;

        console.log("System Info Object:", systemInfo.value);
        console.log(systemInfo.value.info.mem.percent);
      } catch (error) {
        console.error("Error fetching system info:", error.message);
      }
    };

    // 定时任务：每2秒获取一次系统信息
    onMounted(() => {
      fetchSystemInfo(); // 初始化调用一次
      setInterval(fetchSystemInfo, 500);
    });

    return {
      systemInfo,
    };
  },
};
</script>

<style>
.PercentageChart {
  display: flex;
  margin-left: 0;
  align-items: start;
}

.container {
  display: flex;
  width: 80vw;
  margin: 20px;
  padding: 0;
}

/* 使子元素平分父容器 */
.item {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 20px;
}

table {
  width: 60%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid rgba(13, 13, 13, 0.231);
  padding: 8px;
  text-align: center;
}

h4 {
  margin-bottom: 10px;
}
</style>
