<template>
  <div>
    <div class="container">
      <div class="top">
        <p class="title">男女比例</p>
        <p class="bg"></p>
      </div>
      <div class="sex">
        <div class="male">
          <img src="../../../../assets/screen_image/man.png" alt="" />
        </div>
        <div class="female">
          <img src="../../../../assets/screen_image/woman.png" alt="" />
        </div>
      </div>
      <div class="rate" ref="rateCharts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

let rateCharts = ref()
// 男女比例
let maleRate = ref(49.7)

onMounted(() => {
  let rate = echarts.init(rateCharts.value)
  rate.setOption({
    xAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'category',
      show: false,
      data: ['男女比例'],
    },
    series: [
      {
        type: 'bar',
        data: [maleRate.value],
        z: 100,
        barWidth: 15,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20,
        },
        label: {
          formatter: `男性${maleRate.value}%`,
          show: true,
          offset: [0, -20],
          color: 'skyblue',
          fontSize: '17',
          fontWeight: 'bold',
        },
      },
      {
        type: 'bar',
        data: [100],
        barGap: '-100%',
        barWidth: 15,
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
        label: {
          formatter: `女性${100 - maleRate.value}%`,
          show: true,
          offset: [100, -20],
          color: 'pink',
          fontSize: '17',
          fontWeight: 'bold',
        },
      },
    ],
  })
})
</script>
<script lang="ts">
export default {
  name: 'Sex',
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

  .sex {
    height: 116px;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .male {
      width: 110px;
      height: 115px;
      background: url(../../../../assets/screen_image/man-bg.png);
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .female {
      width: 110px;
      height: 115px;
      background: url(../../../../assets/screen_image/woman-bg.png);
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  .rate {
    height: 100px;
  }
}
</style>
