<template>

  <el-descriptions :title="Info" direction="vertical" :column="4" :size="size" border>
    <el-descriptions-item :label="infoatt1">{{ att1 }}</el-descriptions-item>
    <el-descriptions-item :label="infoatt2">{{ att2 }}</el-descriptions-item>
    <el-descriptions-item :label="infoatt3" :span="2">{{ att3 }}</el-descriptions-item>

  </el-descriptions>
</template>

<script setup>
import { ref } from 'vue'
import ComponentSize from 'element-plus'
const size = ref < ComponentSize > ('small')
defineProps({
  Info: {
    type: String,
    required: true,
  },
  infoatt1: {
    type: String,
    required: true,
  },
  infoatt2: {
    type: String,
    required: true,
  },
  infoatt3: {
    type: String,
    required: true,
  },
  att1: {
    type: Number,
    required: true,
  },
  att2: {
    type: Number,
    required: true,
  },
  att3: {
    type: Number,
    required: true,
  },
});

</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>
