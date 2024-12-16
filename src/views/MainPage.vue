<template>
  <el-container style="height: 100vh; margin-top: 50px;">
    <!-- Header -->
    <el-header style="display: flex; justify-content: center; align-items: center; font-size: 24px; background-color: #B3C0D1; position: relative;">
      <!-- 树莓派Logo -->
      <router-link to="/" style="position: absolute; left: 20px; display: flex; align-items: center;">
        <img src="@/assets/raspberry_pi_logo.png" alt="Raspberry Pi" style="width: 200px; height: 200px;" />
      </router-link>
      树莓派物联网监测
    </el-header>

    <!-- Main Container -->
    <el-container>
      <!-- Sidebar -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          default-active="1" 
          mode="vertical" 
        >
          <!-- 父菜单 -->
          <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>功能导航栏</span>
          </template>
          
             <el-menu-item index="1-1">
              <router-link to="/real-time-chart" class="no-link-style">
                <el-icon><DataAnalysis /></el-icon> 实时监测图表
              </router-link>
            </el-menu-item>

            <el-menu-item index="1-2">
              <router-link to="/remote-control" class="no-link-style">
                <el-icon><Rank /></el-icon> 远程控制
              </router-link>
            </el-menu-item>

            <el-menu-item index="1-3">
              <router-link to="/raspberry-status" class="no-link-style">
                <el-icon><Histogram /></el-icon> 树莓派运行状态
              </router-link>
            </el-menu-item>
       
          
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <!-- Main Content -->
      <el-main style="display: flex; justify-content: center; align-items: center;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ElIcon } from 'element-plus'
import { Setting, DataAnalysis, Rank, Histogram } from '@element-plus/icons-vue'

export default {
  name: 'MainPage',
  components: {
    ElIcon,
    Setting,
    DataAnalysis,
    Rank,
    Histogram,
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
  position: relative;
}

.el-aside {
  color: #333;
}

.el-menu-item .router-link-active {
  font-weight: bold;
  color: #409EFF; /* Active link color */
}

.no-link-style {
  text-decoration: none;
  color: inherit;
}

/* Optional: responsive layout for smaller screens */
@media (max-width: 768px) {
  .el-aside {
    width: 100px;
  }

  .el-header {
    font-size: 18px;
  }

  .el-container {
    flex-direction: column;
  }
}
</style>
