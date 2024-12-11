<template>
  <div>
    <div class="container">
      <!-- 数据大屏内容 -->
      <div class="screen" ref="screen">
        <!-- 顶部 -->
        <div class="top">
          <Top />
        </div>
        <div class="bottom">
          <div class="left">
            <!-- 游客比例 -->
            <Tourists class="tourists" />
            <!-- 男女比例 -->
            <Sex class="sex" />
            <!-- 年龄比例 -->
            <Age class="age" />
          </div>
          <div class="center">
            <Map class="map" />
            <Line class="line" />
          </div>
          <div class="right">
            <Rank class="rank" />
            <Year class="year" />
            <Counter class="counter" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/Top/index.vue'
import Tourists from './components/Tourist/index.vue'
import Sex from './components/Sex/index.vue'
import Age from './components/Age/index.vue'
import Map from './components/Map/index.vue'
import Line from './components/Line/index.vue'
import Rank from './components/Rank/index.vue'
import Year from './components/Year/index.vue'
import Counter from './components/Counter/index.vue'

// 展示数据大屏盒子实例
let screen = ref()

// 设置缩放
const getScale = (w = 1920, h = 1080) => {
  const ww: number = window.innerWidth / w
  const wh: number = window.innerHeight / h

  return ww < wh ? ww : wh
}

// 设置数据大屏盒子
const setScreen = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

// 监听视口变化
window.addEventListener('resize', () => {
  setScreen()
})

onMounted(() => {
  // 数据大屏盒子
  setScreen()
})
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/screen_image/bg.png) no-repeat;
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      width: 100%;
      height: calc(100% - 40px);
      display: flex;
      margin-top: 10px;

      .left {
        height: 1040px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .tourists {
          flex: 1.3;
        }
        .sex {
          flex: 1;
          margin: 0;
        }
        .age {
          flex: 1;
        }
      }

      .center {
        flex: 3;
        display: flex;
        flex-direction: column;
        margin: 0 10px;

        .map {
          flex: 3;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        height: 1040px;
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          flex: 1;
        }
        .year {
          flex: 1;
          margin: 10px 0;
        }
        .counter {
          flex: 1;
        }
      }
    }
  }
}
</style>
