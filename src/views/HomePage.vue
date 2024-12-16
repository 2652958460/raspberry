<template>
  <el-button
        type="primary"
        @click="toggleStart"
        circle
        :style="{ fontSize: '30px', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: isStarted ? 'red' : '' }"
      >
        {{ isStarted ? '关闭' : '启动' }}
    </el-button>
</template>

<script>
import axios from "axios";
export default {
    name: 'HomePage',
    data() {
        return {
        isStarted: false, // 按钮状态
        };
    },
    methods: {
        // 获取服务状态
        async fetchStatus() {
        try {
            const response = await axios.get("http://raspberrypi.local:8888/status");
            const status = response.data;
            // 更新按钮状态：所有服务都在运行时设为 true，否则设为 false
            this.isStarted = status.move && status.video && status.sensor_data;
        } catch (error) {
            console.error("Failed to fetch status:", error);
            this.isStarted = false; // 请求失败时默认为关闭状态
        }
        },
        // 切换服务启动/停止
        async toggleStart() {
        this.isStarted = !this.isStarted; // 更新按钮状态
        const url = `http://raspberrypi.local:8888/${this.isStarted ? "start" : "stop"}`;
        try {
            const response = await axios.post(url, {
            action: this.isStarted ? "start" : "stop",
            });
            console.log(response.data.message);
            // 再次更新状态以确保同步
            this.fetchStatus();
        } catch (error) {
            console.error("Failed to toggle state:", error);
            this.isStarted = !this.isStarted; // 恢复之前的状态
        }
        },
    },
    mounted() {
        // 页面加载时获取服务状态
        this.fetchStatus();
    },
};
    
</script>
