<template>
  <div id="map" class="map-container"></div>
</template>

<script>
/* global BMap */
export default {
  name: 'BaiduMap',
  props: {
    latitude: {
      type: Number,
      default: 59.915, // 默认纬度（北京）
      required: false
    },
    longitude: {
      type: Number,
      default: 116.404, // 默认经度（北京）
      required: false
    }
  },
  data() {
    return {
      map: null, // 保存地图实例
      marker: null // 保存地图标记
    };
  },
  mounted() {
    this.loadBaiduMapAPI();
  },
  methods: {
    // 加载百度地图API
    loadBaiduMapAPI() {
      // 动态加载百度地图API
      const script = document.createElement('script');
      script.src = 'https://api.map.baidu.com/api?v=3.0&ak=YOUR_API_KEY'; // 替换为你的API Key
      script.onload = this.initMap;  // 脚本加载完成后初始化地图
      document.head.appendChild(script);
    },

    // 初始化地图
    initMap() {
      if (typeof BMap !== 'undefined') {
        this.map = new BMap.Map('map');
        const point = new BMap.Point(this.longitude, this.latitude);
        this.map.centerAndZoom(point, 15);
        this.marker = new BMap.Marker(point);
        this.map.addOverlay(this.marker);
        this.addCenterButton();
      }
    },

    // 添加居中按钮
    addCenterButton() {
      const centerButton = document.createElement('button');
      centerButton.innerHTML = '<i class="el-icon-place"></i>';
      centerButton.style.position = 'absolute';
      centerButton.style.top = '10px';
      centerButton.style.right = '10px';
      centerButton.style.backgroundColor = '#fff';
      centerButton.style.border = '1px solid #ccc';
      centerButton.style.padding = '5px 10px';
      centerButton.style.cursor = 'pointer';
      centerButton.style.zIndex = 1000; // 确保在地图之上

      centerButton.onclick = () => {
        const point = new BMap.Point(this.longitude, this.latitude);
        this.map.setCenter(point); // 根据经纬度居中
        this.marker.setPosition(point); // 更新标记位置
      };

      this.map.getContainer().appendChild(centerButton); // 将按钮添加到地图容器
    },

    // 更新地图
    updateMap() {
      if (this.map && this.marker) {
        const point = new BMap.Point(this.longitude, this.latitude);
        this.map.centerAndZoom(point, 15);
        this.marker.setPosition(point); // 更新标记位置
      }
    }
  },
  watch: {
    latitude: 'updateMap',
    longitude: 'updateMap'
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 400px; /* 或根据需要设置 */
  border: 2px solid #007bff; /* 设置边框颜色和宽度 */
  border-radius: 5px; /* 可选：添加圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 可选：添加阴影 */
}
</style>
