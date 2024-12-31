<template>
    <div class="demo-progress">
        <el-progress type="dashboard" :percentage="percentage" :color="colors" />
        <!-- <el-progress type="dashboard" :percentage="percentage2" :color="colors" /> -->
        <!-- <div>
            <el-button-group>
                <el-button @click="decrease"> - </el-button>
                <el-button @click="increase"> + </el-button>
            </el-button-group>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'PercentageChart',
    props: {
        percentage: {
            type: Number,
            Required: true,
        }
    },

    data() {
        return {
            percentage2: 0,  // 绑定第二个 percentage
            colors: [
                { color: '#f56c6c', percentage: 100 },
                { color: '#e6a23c', percentage: 80 },
                { color: '#6f7ad3', percentage: 60 },
                { color: '#1989fa', percentage: 40 },
                { color: '#5cb87a', percentage: 20 },
            ]
        };
    },

    mounted() {
        // 设置 interval 来更新 percentage2
        setInterval(() => {
            this.percentage2 = (this.percentage2 % 100) + 10;
        }, 500);
    }
};
</script>

<style scoped>
.demo-progress .el-progress--line {
    margin-bottom: 15px;
    max-width: 600px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}
</style>