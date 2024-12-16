<template>
  <div>
    <!-- 摇杆容器 -->
    <div id="joystick-container" style="width: 300px; height: 250px; position: relative;"></div>
    <!-- 移动的红色方块 -->
    <!-- <div id="moving-div" style="width: 50px; height: 50px; background-color: red; position: absolute;"></div> -->
  </div>
</template>

<script>
export default {
  name: "Joystick",
  props: {
    speedFactor: {
      type: Number,
      default: 0.05, // 控制移动速度
    },
  },
  mounted() {
    // 加载 NippleJS 脚本
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/nipplejs@latest/dist/nipplejs.min.js";
    script.onload = () => this.initializeJoystick();
    document.head.appendChild(script);
  },
  methods: {
    initializeJoystick() {
        const options = {
            zone: document.getElementById("joystick-container"),
            mode: "static",
            size: 100,
            position: {
            left: "50%",
            top: "50%",
            },
            color: "#999999",
        };

        const manager = nipplejs.create(options);
        const movingDiv = document.getElementById("moving-div");

        let posX = 0;
        let posY = 0;
        let distance;
        let angle;
        let autoMoveInterval = null;

        const stopAutoMove = () => {
            if (autoMoveInterval) {
            clearInterval(autoMoveInterval);
            autoMoveInterval = null;
            }
        };

        manager.on("move", (evt, data) => {
            if (data && data.direction) {
            distance = data.distance * this.speedFactor;
            angle = data.angle.radian;
            // posX += Math.cos(angle) * distance;
            // posY += Math.sin(angle) * distance;

            //movingDiv.style.transform = `translate(${posX}px, ${-posY}px)`;

            // 触发父组件的 handleMove 方法
            this.$emit("move", {
                distance: data.distance,
                angle: data.angle.radian,
            });
            }
        });

        manager.on("end", () => {
            stopAutoMove();

            // 触发父组件的 handleEnd 方法
            this.$emit("end", {
            posX,
            posY,
            });
        });
        },

  },
};
</script>
