<template>
  <div>
    <!-- 摇杆容器 -->
    <div id="joystick-container" style="width: 300px; height: 250px; position: relative;"></div>
    <!-- 移动的红色方块 -->
    <!-- <div id="moving-div" style="width: 50px; height: 50px; background-color: red; position: absolute;"></div> -->
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// 首先，确保你已通过 npm 安装了 nipplejs
import nipplejs from "nipplejs";

export default {
  name: "JoystickControl",
  props: {
    speedFactor: {
      type: Number,
      default: 0.05, // 控制移动速度
    },
  },
  data() {
    return {
      manager: null, // 存储 nipplejs manager 实例
      autoMoveInterval: null,  // 自动移动的定时器
    };
  },
  mounted() {
    this.initializeJoystick();
  },
  methods: {
    initializeJoystick() {
      const options = {
        zone: document.getElementById("joystick-container"),
        mode: "static",
        size: 100,
        position: { left: "50%", top: "50%" },
        color: "#999999",
      };

      // 存储 manager 实例
      this.manager = nipplejs.create(options);
      //const movingDiv = document.getElementById("moving-div");

      let posX = 0;
      let posY = 0;
      let distance;
      let angle;

      const stopAutoMove = () => {
        if (this.autoMoveInterval) {
          clearInterval(this.autoMoveInterval);
          this.autoMoveInterval = null;
        }
      };

      this.manager.on("move", (evt, data) => {
        if (data && data.direction) {
          distance = data.distance * this.speedFactor;
          angle = data.angle.radian;

          // posX += Math.cos(angle) * distance;
          // posY += Math.sin(angle) * distance;

          // movingDiv.style.transform = `translate(${posX}px, ${-posY}px)`;

          // 触发父组件的 handleMove 方法
          this.$emit("move", {
            distance: data.distance,
            angle: data.angle.radian,
          });
        }
      });

      this.manager.on("end", () => {
        stopAutoMove();

        // 触发父组件的 handleEnd 方法
        this.$emit("end", { posX, posY });
      });
    },
  },
  beforeUnmount() {
    if (this.manager) {
      this.manager.destroy(); // 销毁 manager 实例
    }
  },
};
</script>

<style scoped>
/* 样式可以根据需要调整 */
</style>
