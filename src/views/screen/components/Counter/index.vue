<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">预约渠道数据统计</p>
        <p class="bg"></p>
      </div>
      <div class="counter-charts" ref="counterCharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let counterCharts = ref()

onMounted(() => {
  echarts.init(counterCharts.value).setOption({
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '痘印' },
          { value: 735, name: '红薯' },
          { value: 580, name: '慢脚' },
          { value: 484, name: '大眼' },
          { value: 300, name: '绿泡泡' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          color: '#fff',
          fontSize: 15,
          fontWeight: 'bold',
        },
      },
    ],
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
  margin-top: 20px;

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

  .counter-charts {
    height: calc(100% - 30px);
  }
}
</style>
