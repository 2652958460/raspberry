<template>
  <div id="map" class="map-container"></div>
</template>

<script>
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
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      if (typeof BMap !== 'undefined') {
        const map = new BMap.Map('map');
        const point = new BMap.Point(this.longitude, this.latitude);
        map.centerAndZoom(point, 15);
        const marker = new BMap.Marker(point);
        map.addOverlay(marker);

        // 添加居中控件
        this.addCenterButton(map);
      }
    },
    addCenterButton(map) {
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
        map.setCenter(new BMap.Point(this.longitude, this.latitude)); // 根据经纬度居中
      };

      map.getContainer().appendChild(centerButton); // 将按钮添加到地图容器
    },
    updateMap() {
      if (typeof BMap !== 'undefined') {
        const lat = this.latitude || 59.915;  // 默认纬度
        const lng = this.longitude || 116.404; // 默认经度
        const map = new BMap.Map('map');
        const point = new BMap.Point(lng, lat);
        map.centerAndZoom(point, 15);
        map.clearOverlays();
        const marker = new BMap.Marker(point);
        map.addOverlay(marker);
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
