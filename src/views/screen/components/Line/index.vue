<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">未来七天游客数量趋势</p>
        <p class="bg"></p>
      </div>
      <div class="line-charts" ref="lineCharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let lineCharts = ref()

onMounted(() => {
  let line = echarts.init(lineCharts.value)
  line.setOption({
    xAxis: {
      type: 'category',
      data: ['一', '二', '三', '四', '五', '六', '日'],
      splitLine: false,
      name: '星期',
      nameTextStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      axisLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: false,
      splitLine: false,
      name: '游客数',
      nameTextStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      axisLabel: {
        color: 'white',
        fontSize: 16,
      },
      axisTick: {
        show: true,
      },
      axisLine: {
        show: true,
      },
    },
    series: [
      {
        type: 'line',
        data: [500, 300, 400, 200, 100, 700, 900],
        smooth: true,
      },
    ],
    grid: {
      top: '20%',
      left: '10%',
      bottom: '20%',
      right: '10%',
    },
  })
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: url('../../../../assets/screen_image/dataScreen-main-lb.png')
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
  }

  .line-charts {
    height: calc(100% - 40px);
  }
}
</style>
