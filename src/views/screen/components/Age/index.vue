<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">年龄比例</p>
        <p class="bg"></p>
      </div>
      <div class="age-charts" ref="ageCharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

let ageCharts = ref()

onMounted(() => {
  let charts = echarts.init(ageCharts.value)
  charts.setOption({
    legend: {
      right: 'right',
      top: 'center',
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '0~8岁' },
          { value: 735, name: '9~18岁' },
          { value: 580, name: '19~30岁' },
          { value: 484, name: '31~55岁' },
          { value: 300, name: '55~岁' },
        ],
        right: 50,
      },
    ],
  })
})
</script>
<script lang="ts">
export default {
  name: 'Age',
}
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

  .age-charts {
    height: 260px;
  }
}
</style>
