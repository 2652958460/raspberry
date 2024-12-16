import { createApp } from 'vue'  // 使用 createApp 来初始化 Vue 3
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建 Vue 实例
const app = createApp(App)

// 注册插件
app.use(router)
app.use(ElementPlus)  // 使用 ElementPlus 插件

// 挂载应用
app.mount('#app')
