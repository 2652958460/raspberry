<template>

 
     
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>功能导航栏</span>
          </template>
          
             <el-menu-item index="1-1">
              <router-link to="/real-time-chart">
                <el-icon><DataAnalysis /></el-icon> 实时监测图表
              </router-link>
            </el-menu-item>

            <el-menu-item index="1-2">
              <router-link to="/remote-control">
                <el-icon><Rank /></el-icon> 远程控制
              </router-link>
            </el-menu-item>

            <el-menu-item index="1-3">
              <router-link to="/raspberry-status">
                <el-icon><Histogram /></el-icon> 树莓派运行状态
              </router-link>
            </el-menu-item>
       
          
          </el-sub-menu>
        
      </el-menu>

    
  
</template>

<script setup>
import {
 
 
} from '@element-plus/icons-vue'

</script>