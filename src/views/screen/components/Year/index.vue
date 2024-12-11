<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">年度游客量对比</p>
        <p class="bg"></p>
      </div>
      <div class="year-charts" ref="yearCharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let yearCharts = ref()

onMounted(() => {
  let charts = echarts.init(yearCharts.value)
  charts.setOption({
    xAxis: {
      type: 'category',
      data: ['2010', '2015', '2020', '2021', '2022', '2023', '2024'],
      name: '年度',
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
        rotate: 30,
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
        type: 'scatter',
        data: [20, 25, 10, 6, 5, 7, 3],
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
    grid: {
      top: 90,
      right: 50,
      bottom: 30,
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

  .year-charts {
    height: calc(100% - 30px);
  }
}
</style>
