<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">实时游客统计</p>
        <p class="bg"></p>
        <p class="reserve-total">
          可预约总量
          <span class="reserve-num">99999</span>
          人
        </p>
      </div>
      <div class="number">
        <span v-for="(item, index) in people" :key="index">{{ item }}</span>
      </div>
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 水球图
import 'echarts-liquidfill'

let people = ref<string>('216908人')
let charts = ref()

onMounted(() => {
  // 初始化
  let myCharts = echarts.init(charts.value)

  // 设置配置项
  myCharts.setOption({
    // 标题设置
    // title: {
    //     text: '水球图'
    // },
    // x轴
    xAxis: {},
    // y轴
    yAxis: {},
    // 系列
    series: {
      type: 'liquidFill',
      data: [0.6, 0.4, 0.2],
      radius: '90%',
      label: {
        formatter: '游客量',
        fontSize: '25px',
      },
    },
    // 布局
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  })
})
</script>
<script lang="ts">
export default {
  name: 'Tourist',
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url(../../../../assets/screen_image/dataScreen-main-lb.png)
    no-repeat;
  background-size: 100% 100%;

  .top {
    color: white;
    margin: 0 10px;

    .title {
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../../../assets/screen_image/dataScreen-title.png)
        no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .reserve-total {
      float: right;

      .reserve-num {
        color: yellowgreen;
      }
    }
  }

  .number {
    margin-top: 50px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;

    span {
      height: 40px;
      color: white;
      text-align: center;
      line-height: 40px;
      background: url(../../../../assets/screen_image/total.png) no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
      flex: 1;
    }
  }

  .charts {
    height: 230px;
    margin-top: 10px;
  }
}
</style>
