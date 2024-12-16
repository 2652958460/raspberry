<template>
  <el-main>
    <!-- 控制按钮 -->
    <el-button @click="toggleStream" type="primary" icon="el-icon-switch-button"
    :style="{ backgroundColor: isStreaming ? 'red' : ''}">
      {{ isStreaming ? '关闭摄像头' : '开启摄像头' }}
    </el-button>

    <el-button @click="shot" type="primary" style="background-color: #4CAF50" icon="el-icon-camera">
      拍照
    </el-button>

    <el-button @click="record" type="primary" style="background-color: black"
    :icon="isRecording ? 'el-icon-video-pause' : 'el-icon-video-camera'">
      {{ isRecording ? '停止录像' : '开始录像' }}
    </el-button>

    <!-- 布局中的两列 -->
    <el-row :gutter="20">
      <!-- 左侧视频显示区域 -->
      <el-col :span="14">
        <div class="video-container">
          <div v-if="isStreaming">
            <img :src="videoStreamUrl" style="width: 100%; height: 100%;" />
          </div>
        </div>
      </el-col>

      <!-- 右侧控制面板 -->
      <el-col :span="10">
        <el-row :gutter="10">
          <el-col :span="15">
            <div class="control-panel">
              <!-- 上方向按钮 -->
              <el-button
                @mousedown="handleButtonPress('w')"
                @mouseup="handleButtonRelease('w')"
                @click="handleClick"
                :class="{ 'button-pressed': isKeyPressed.up }"
            
                circle>
                 <el-icon><ArrowUp /></el-icon> 
              </el-button>
                
              

              <!-- 左右方向按钮 -->
              
                <el-row :gutter="25">
                  <el-col>
                    <el-button
                      @mousedown="handleButtonPress('a')"
                      @mouseup="handleButtonRelease('a')"
                      :class="{ 'button-pressed': isKeyPressed.left }"
                      circle>
                      <el-icon><ArrowLeft /></el-icon> 
                    </el-button>
                  </el-col>
                  <el-col>
                    <el-button
                      @mousedown="handleButtonPress('d')"
                      @mouseup="handleButtonRelease('d')"
                      :class="{ 'button-pressed': isKeyPressed.right }"
                      circle>
                      <el-icon><ArrowRight /></el-icon> 
                    </el-button>
                  </el-col>
                </el-row>
              

              <!-- 下方向按钮 -->
              <el-button
                @mousedown="handleButtonPress('s')"
                @mouseup="handleButtonRelease('s')"
                :class="{ 'button-pressed': isKeyPressed.down }"
                circle>
                <el-icon><ArrowDown /></el-icon> 
              </el-button>
            </div>
          </el-col>

          <!-- 滑块区域 -->
          <el-col :span="5">
            <div class="slider-container">
              <el-slider
                v-model="value"
                vertical
                height="200px">
              </el-slider>
            </div>
          </el-col>
        </el-row>

        <!-- 摇杆 -->
        <div id="joystck-container">
          <joystick-control
            :size="120"
            :speedFactor="0.1"
            color="blue"
            @move="handleMove"
            @end="handleEnd"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 自动移动按钮 -->
    <el-button @click="autoMove" type="primary" icon="el-icon-switch-button"
      :style="{ backgroundColor: isAutoMove ? 'red' : ''}">
      {{ isAutoMove ? '关闭路标识别' : '开启路标识别' }}
    </el-button>
  </el-main>
</template>

<script>
import axios from 'axios';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'; // 导入图标
import JoystickControl from '@/components/Joystick.vue';

export default {
  name: 'RemoteControl',
  components: {
    JoystickControl,
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
  },
  data() {
    return {
      isLineFollow: false,  // 控制巡线功能的状态
      isRecording: false,  // 控制录像的状态
      isAutoMove: false,  // 控制自动驾驶的状态
      isStreaming: false,  // 控制视频流的状态
      videoStreamUrl: 'http://raspberrypi.local:8080/video_feed',  // 视频流的URL，需要根据实际情况更新
      isKeyPressed: {
        up: false,   // 上方向键状态
        down: false, // 下方向键状态
        left: false, // 左方向键状态
        right: false // 右方向键状态
      },
      value: 50  // 滑块的初始值
    };
  },
  methods: {
    // 摇杆事件
   handleMove({ distance, angle }) {
      console.log(`Joystick moving: Distance = ${distance}, Angle = ${angle}`);
      
      // 调用舵机控制
      this.controlServo(distance, angle);
    },


    handleEnd({ posX, posY }) {
      console.log(`Joystick released at position: x=${posX}, y=${posY}`);
    },


    // 控制舵机
     async controlServo(distance, angle) {
        try {
          const response = await axios.post('http://raspberrypi.local:5002/servo', {
            //发送distance和angle给后端API
            distance,
            angle,
          });

          // 打印返回的数据
          console.log('Servo response:', response.data);

        } catch (error) {
          console.error('Failed to control servo:', error);
        }
      },

    
    // 拍照
    async shot() {
      try {
        const response = await axios.get('http://raspberrypi.local:8080/shot');
        const imageUrl = response.data.imageUrl;
        console.log('拍照成功:', imageUrl);
        alert('拍照成功');
      } catch (error) {
        console.error('拍照失败:', error);
        alert('拍照失败');
      }
    },
    
    // 录像
    async record() {
      this.isRecording = !this.isRecording;
      try {
        const response = await axios.post('http://raspberrypi.local:8080/start_stop_record', {
          isRecording: this.isRecording
        });
        console.log('录像状态:', response.data.isRecording);

      } catch (error) {
        console.error('录像失败:', error);
        alert('录像失败');
       
      }
    },
    // 切换视频流
    async toggleStream() {
      this.isStreaming = !this.isStreaming;
    },

    // 交通标志识别  
    async autoMove() {
      this.isAutoMove = !this.isAutoMove;
      const url = `http://raspberrypi.local:5004/traffic_sign_${this.isAutoMove ? 'on' : 'off'}`;
      try {
        const response = await axios.post(url, {
          action: this.isAutoMove ? "on" : "off",
        });
        console.log('交通标志识别:', response.data.message);
      } catch (error) {
        console.error('交通标志识别失败:', error);
        alert('交通标志识别失败');
      }
    },
    // 巡线功能
    async lineFollow() {
      this.isLineFollow = !this.isLineFollow;
      //编写巡线功能代码
      // try {
      //   await axios.post('http://raspberrypi.local:5000/control', {
      //     cmd: /home/pi/Pi_Controlcmd/line_follow.py ${this.isLineFollow ? 'on' : 'off'}  // 发送对应的巡线功能命令
      //   });
      // } catch (error) {
      //   console.error('发送控制命令失败:', error);
      // }
    },
    
    // 发送移动指令到Flask服务器
    async move(direction, isPressed, speed = 0) {
      try {
        await axios.post('http://raspberrypi.local:5000/control', {
          direction,  // 方向
          isPressed,   // 按钮状态
          speed        // 速度
        });
      } catch (error) {
        console.error('发送控制命令失败:', error);
      }
    },

    // 按钮按下事件
    handleButtonPress(direction) {
      this.isKeyPressed[direction] = true;
      this.move(direction, true, this.value);  // 按下时发送指令，附带当前滑块值作为速度
      console.log(`正在按下按钮: ${direction}，速度: ${this.value}`);
    },


    // 按钮松开事件
    handleButtonRelease(direction) {
      this.isKeyPressed[direction] = false;
      this.move(direction, false, this.value);  // 松开时发送指令，附带当前滑块值作为速度
      console.log('松开了', direction);
    },

    // 键盘按下事件
    handleKeydown(event) {
      switch (event.key) {
        case 'ArrowUp':
          this.isKeyPressed.up = true;
          this.move('w',true,this.value);  // 发送“上”指令
          break;
        case 'ArrowDown':
          this.isKeyPressed.down = true;
          this.move('s',true,this.value);  // 发送“下”指令
          break;
        case 'ArrowLeft':
          this.isKeyPressed.left = true;
          this.move('a',true,this.value);  // 发送“左”指令
          break;
        case 'ArrowRight':
          this.isKeyPressed.right = true;
          this.move('d',true,this.value);  // 发送“右”指令
          break;

        case '+':  // 检测加号键
          this.adjustSliderValue(10);  // 调用调整滑块值的方法
          break;
        case '-':  // 检测减号键
          this.adjustSliderValue(-10);  // 调用调整滑块值的方法
          break;
      }
    },
    // 定义一个方法来调整滑块值
    adjustSliderValue(delta) {
      this.value = Math.min(Math.max(this.value + delta, 0), 100); // 限制在 0 到 100 范围内
    },

    // 键盘松开事件
    handleKeyup(event) {
      switch (event.key) {
        case 'ArrowUp':
          this.isKeyPressed.up = false;
           this.move('w',false,this.value);
          break;
        case 'ArrowDown':
          this.isKeyPressed.down = false;
          this.move('s',false,this.value);
          break;
        case 'ArrowLeft':
          this.isKeyPressed.left = false;
          this.move('a',false,this.value);
          break;
        case 'ArrowRight':
          this.isKeyPressed.right = false;
          this.move('d',false,this.value);
          break;
      }
    }
  },
  
  // 组件挂载时绑定键盘事件
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
  },
  
  // 组件销毁时移除键盘事件
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  }
}
</script>

<style scoped>
.el-row {
  height: 100%; /* 确保 row 的高度填满父容器 */
  display: flex;
  align-items: stretch; /* 让所有列的高度一致 */
}
.el-col {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  height: 480px;
  width: 100%;  /* 确保宽度适应父元素 */
  overflow: hidden;  /* 隐藏超出边界的内容 */
  background-color: #f5f5f5;
}

.control-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.control-panel div {
  display: flex;
  justify-content: left;
  margin: 10px 0;
}
.slider-container {
  display: flex;
  justify-content: flex-end; /* 右对齐滑块 */
  margin-top: 20px; /* 控制区域和滑块之间的间距 */
}
.el-button {
  margin: 2px;
}
.button-pressed {
  background-color: #409EFF;  /* 按钮按下时的背景颜色 */
  color: white;                /* 按钮按下时的文字颜色 */
  transform: translateY(2px);   /* 按钮按下时的下沉效果 */
}
.el-menu-item .router-link-active {
  font-weight: bold;
  color: #409EFF;
}

#joystck-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px; ; /* 设置高度 */
  width: 100%; /* 撑满父容器宽度 */
  margin: 0 auto; /* 水平居中 */
}

</style>