<template>
  <div class="map" ref="map"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 中国地图数据
import ChinaJSON from './china.json'

let map = ref()

// 注册地图
echarts.registerMap('China', ChinaJSON as any)

onMounted(() => {
  let mapCharts = echarts.init(map.value)
  mapCharts.setOption({
    geo: {
      map: 'China',
      roam: true,
      label: {
        show: false,
        color: 'white',
      },
      zoom: 1.1,
      itemStyle: {
        areaColor: {
          type: 'linear',
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'skyblue' },
            { offset: 1, color: 'blue' },
          ],
        },
      },
      emphasis: {
        label: {
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              // 起点
              [117.412669, 40.605226],
              // 终点
              [129.704354, 42.427045],
            ],
            lineStyle: {
              color: '#f4ea2a',
              width: 1.5,
              curveness: 0.1,
              type: 'dotted',
            },
          },
        ],
        effect: {
          show: true,
          symbol:
            'path://M563.4 623.8c0.8-13.8 16.6-9 16.6-9l124 25.2 256 97.4c0-48-7.6-53-18.8-61.4L576 414c0 0-9.8-120-9.8-225.8 0-49-23.6-156.2-54.2-156.2s-54.2 108.8-54.2 156.2c0 100.4-9.8 225.8-9.8 225.8L82.8 676c-14.2 10-18.8 15.4-18.8 61.4L320 640l123.8-25.2c0 0 15.8-4.8 16.6 9 0.8 13.8-2.4 138.2 11.8 204.2 1.8 8.8-5 9.4-9.6 14.8l-103.8 65.6c-3.4 3.8-5 14.6-5 14.6l-2 37 136-32 24 64 24-64 136 32-2-37c0.2 0-1.4-10.8-4.8-14.6l-103.8-65.6c-4.6-5.4-11.4-6-9.6-14.8C565.4 762 562.6 637.6 563.4 623.8z',
          symbolSize: 20,
          color: '#d4237a',
        },
      },
    ],
  })
})
</script>

<style>
.map {
  margin: 10px 0;
}
</style>
