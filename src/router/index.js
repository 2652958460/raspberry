import { createRouter, createWebHistory } from 'vue-router'  // Vue 3 和 Vue Router 4 的正确导入
import HomePage from '../views/HomePage.vue'
import RealTimeChart from '../views/RealTimeChart.vue'
import RemoteControl from '../views/RemoteControl.vue'
import RaspberryStatus from '../views/RaspberryStatus.vue'

// 配置路由
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage  // 默认显示首页
  },
  {
    path: '/real-time-chart',
    name: 'RealTimeChart',
    component: RealTimeChart
  },
  {
    path: '/remote-control',
    name: 'RemoteControl',
    component: RemoteControl
  },
  {
    path: '/raspberry-status',
    name: 'RaspberryStatus',
    component: RaspberryStatus
  }
]

// 创建并导出路由实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // 使用 Web 历史模式
  routes
})

export default router
