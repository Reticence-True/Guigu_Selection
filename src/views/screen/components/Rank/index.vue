<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">热门景区排行</p>
        <p class="bg"></p>
      </div>
      <div class="charts-container" ref="charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let charts = ref()

onMounted(() => {
  let rankCharts = echarts.init(charts.value)
  rankCharts.setOption({
    xAxis: {
      type: 'category',
      data: ['华山', '嵩山', '衡山', '恒山', '泰山'],
      name: '景区',
      nameTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    yAxis: {
      type: 'value',
      name: '万人',
      nameTextStyle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      nameGap: 25,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    series: [
      {
        type: 'bar',
        data: [50, 30, 60, 40, 20],
      },
      {
        type: 'line',
        data: [50, 30, 60, 40, 20],
        smooth: true,
      },
    ],
    grid: {
      top: 90,
      right: 50,
      bottom: 25,
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

  .charts-container {
    height: calc(100% - 30px);
  }
}
</style>
